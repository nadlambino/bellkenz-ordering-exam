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
    public function store(CreateOrderRequest $request, Order $order, OrderDetails $orderDetails, Product $product)
    {
        $data = $request->validated();
        $orderData = Arr::only($data, 'customer_code');
        $orderDetailsData = Arr::only($data, ['product_code', 'quantity']);

        try {
            DB::beginTransaction();
            $createdOrder = $order->create($orderData);
            $productData = $product->findOrFail($data['product_code']);

            $orderDetailsData['order_number'] = $createdOrder->order_number;
            $orderDetailsData['gross_sales'] = $productData->product_price * $data['quantity'];

            $createdOrderDetails = $orderDetails->create($orderDetailsData);

            DB::commit();

            return $this->successResponse($createdOrderDetails->toArray(), 201);
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
