<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOrderRequest;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\Product;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Throwable;

class OrderController extends Controller
{
    public function store(CreateOrderRequest $request, Order $order, OrderDetails $orderDetails)
    {
        $data = $request->validated();
        $orderData = Arr::only($data, 'customer_code');

        try {
            DB::beginTransaction();
            $createdOrder = $order->create($orderData);
            $orderDetailsData = collect(Arr::get($data, 'order_details'))->map(function ($item) use ($createdOrder) {
                $item['order_number'] = $createdOrder->order_number;
                return Arr::only($item, ['order_number', 'product_code', 'quantity', 'gross_sales']);
            })->toArray();

            $createdOrderDetails = $orderDetails->insert($orderDetailsData);

            DB::commit();

            return $this->successResponse($orderDetailsData, 201);
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
