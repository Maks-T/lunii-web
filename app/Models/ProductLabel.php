<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ProductLabel extends Model
{
    protected $fillable = ['name', 'code', 'color', 'icon'];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'label_product');
    }
}
