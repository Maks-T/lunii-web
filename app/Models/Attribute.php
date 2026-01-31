<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attribute extends Model
{
    protected $fillable = ['name', 'code', 'allow_multiple', 'is_filterable', 'sort_order', 'display_type', 'settings'];

    protected $casts = [
        'settings' => 'array',
        'allow_multiple' => 'boolean',
        'is_filterable' => 'boolean',
    ];

    public function values(): HasMany
    {
        return $this->hasMany(AttributeValue::class);
    }
}
