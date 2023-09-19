<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $primaryKey = 'order_number';

    protected $fillable = ['customer_code'];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_code', 'customer_code');
    }

    public function orderDetails(): HasMany
    {
        return $this->hasMany(OrderDetails::class, 'order_number', 'order_number');
    }
}
