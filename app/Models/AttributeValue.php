<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany};

class AttributeValue extends Model
{
    protected $fillable = ['attribute_id', 'value', 'slug'];

    public function attribute(): BelongsTo { return $this->belongsTo(Attribute::class); }

    public function products(): BelongsToMany { return $this->belongsToMany(Product::class); }
}
