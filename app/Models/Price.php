<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Price extends Model
{
    protected $fillable = [
        'priceable_id',
        'priceable_type',
        'type',
        'price',
        'old_price',
        'discount_percent'
    ];

    public function priceable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Автоматический расчет процента скидки при сохранении
     */
    protected static function booted(): void
    {
        static::saving(function ($priceRecord) {
            if ($priceRecord->old_price && $priceRecord->old_price > $priceRecord->price) {
                $priceRecord->discount_percent = (int) round(
                    (($priceRecord->old_price - $priceRecord->price) / $priceRecord->old_price) * 100
                );
            } else {
                $priceRecord->discount_percent = null;
            }
        });
    }
}
