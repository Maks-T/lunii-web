<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stock extends Model
{
    protected $fillable = ['warehouse_id', 'product_id', 'quantity', 'reserved'];

    public function warehouse(): BelongsTo { return $this->belongsTo(Warehouse::class); }

    public function product(): BelongsTo { return $this->belongsTo(Product::class); }

    protected static function booted(): void
    {
        // При сохранении или удалении остатка на складе — пересчитываем общую сумму
        $refreshStock = function ($stock) {
            $product = $stock->product;
            $product->update([
                'total_stock' => $product->stocks()->sum('quantity')
            ]);
        };

        static::saved($refreshStock);
        static::deleted($refreshStock);
    }
}
