<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\AttributeValue;
use App\Models\ProductLabel;
use App\Models\Warehouse;
use Illuminate\Support\Str;


class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category = Category::first();
        $warehouse = Warehouse::first();
        $labels = ProductLabel::all();

        // Берем некоторые значения атрибутов для рандома
        $brands = AttributeValue::whereHas('attribute', fn($q) => $q->where('code', 'brand'))->get();
        $skinTypes = AttributeValue::whereHas('attribute', fn($q) => $q->where('code', 'skin_type'))->get();

        for ($i = 1; $i <= 10; $i++) {
            $price = 100.00;
            $oldPrice = ($i % 3 == 0) ? 120.00 : null; // Каждому третьему даем скидку

            $product = Product::create([
                'category_id' => $category->id,
                'name' => "MEDICUBE Care Sun Cream origin " . ($i > 1 ? "#$i" : ""),
                'slug' => Str::slug("medicube-sun-cream-origin-$i"),
                'sku' => "MED-SUN-" . Str::upper(Str::random(5)),
                'description' => "ДНЕВНОЙ КРЕМ ДЛЯ НОРМАЛЬНОЙ КОЖИ, 75 МЛ. Интенсивная защита от солнца.",
                'price' => $price,
                'old_price' => $oldPrice,
                'total_stock' => 50,
                'is_active' => true,
            ]);

            // Привязываем бренд (одиночный)
            $product->attributeValues()->attach($brands->random()->id);

            // Привязываем типы кожи (множественный)
            $product->attributeValues()->attach($skinTypes->random(2)->pluck('id'));

            // Добавляем метку (New или Sale)
            if ($oldPrice) {
                $product->labels()->attach($labels->where('code', 'sale')->first()?->id);
            } else {
                $product->labels()->attach($labels->where('code', 'new')->first()?->id);
            }

            // Создаем запись в таблице цен
            $product->prices()->create([
                'type' => 'base',
                'price' => $price,
                'old_price' => $oldPrice,
            ]);

            // Создаем остаток на складе
            $product->stocks()->create([
                'warehouse_id' => $warehouse->id,
                'quantity' => 50,
            ]);

            // Добавляем SEO заглушку
            $product->seo()->create([
                'title' => $product->name . " купить в Минске",
                'description' => "Купить " . $product->name . " по лучшей цене в магазине LUNII.",
            ]);
        }
    }
}
