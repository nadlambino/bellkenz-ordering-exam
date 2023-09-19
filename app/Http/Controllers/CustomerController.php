<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function all(Customer $customer)
    {
        return $this->successResponse($customer->query()->get()->toArray());
    }
}
