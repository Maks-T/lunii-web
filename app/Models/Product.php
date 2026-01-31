<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute as CastAttribute;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, MorphMany, MorphOne};

class Product extends Model
{
    protected $fillable = [
        'category_id', 'name', 'slug', 'sku',
        'description', 'price', 'old_price',
        'total_stock', 'is_active'
    ];

    // Связи
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function attributeValues(): BelongsToMany
    {
        return $this->belongsToMany(AttributeValue::class);
    }

    public function labels(): BelongsToMany
    {
        // Добавляем 'label_product' как имя таблицы
        return $this->belongsToMany(ProductLabel::class, 'label_product');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function stocks(): HasMany
    {
        return $this->hasMany(Stock::class);
    }


    // Полиморфные связи
    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable')->orderBy('sort_order');
    }

    /**
     * Динамическое поле: Процент скидки
     * Доступно через $product->discount_percent
     */
    protected function discountPercent(): CastAttribute
    {
        return CastAttribute::make(
            get: function () {
                if (!$this->old_price || $this->old_price <= $this->price) return null;
                return (int)round((($this->old_price - $this->price) / $this->old_price) * 100);
            }
        );
    }

    public function prices(): MorphMany
    {
        return $this->morphMany(Price::class, 'priceable');
    }

    // Хелпер для получения базовой цены
    public function basePrice(): ?Price
    {
        return $this->prices()->where('type', 'base')->first();
    }

    // Связь с SEO
    public function seo(): MorphOne
    {
        return $this->morphOne(SeoData::class, 'seoable');
    }
}
