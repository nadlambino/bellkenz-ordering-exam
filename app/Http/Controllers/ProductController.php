<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function all(Product $product)
    {
        return $this->successResponse($product->query()->get()->toArray());
    }
}
