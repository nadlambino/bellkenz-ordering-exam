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
    public function all(Order $order) 
    {
        $data = $order->query()
            ->with('customer')
            ->with('orderDetails')
            ->get()
            ->toArray();

        $collection = collect($data)->map(function ($item) {
            $item['gross_sales'] = collect($item['order_details'])->sum('gross_sales');

            return $item;
        })->toArray();
        return $this->successResponse($collection);
    }

    public function cancel(Order $order)
    {
        $order->status = 'cancelled';
        $order->save();

        return $this->successResponse($order->refresh()->toArray());
    }

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

            $orderDetails->insert($orderDetailsData);

            DB::commit();

            return $this->successResponse($orderDetailsData, 201);
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
