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
    $categories = \App\Models\Category::all();
    $labels = \App\Models\ProductLabel::all();
    $warehouse = \App\Models\Warehouse::first();

    // Получаем все возможные значения атрибутов
    $allValues = \App\Models\AttributeValue::with('attribute')->get();

    for ($i = 1; $i <= 20; $i++) {
      $price = rand(40, 150);
      $hasSale = rand(0, 1);
      $oldPrice = $hasSale ? $price + 20 : null;

      $product = \App\Models\Product::create([
        'category_id' => $categories->random()->id,
        'name' => "MEDICUBE Care Sun Cream " . ($i > 1 ? "v.$i" : "origin"),
        'slug' => \Illuminate\Support\Str::slug("medicube-sun-cream-$i"),
        'sku' => "MED-" . rand(1000, 9999),
        'description' => 'ДНЕВНОЙ КРЕМ ДЛЯ НОРМАЛЬНОЙ КОЖИ, 75 ML',
        'price' => $price,
        'old_price' => $oldPrice,
        'total_stock' => rand(0, 50), // У некоторых будет 0 для статуса "Ожидается"
        'is_active' => true,
      ]);

      // 1. Привязываем метки
      if ($hasSale) {
        $product->labels()->attach($labels->where('code', 'sale')->first()->id);
      }
      if (rand(0, 1)) {
        $product->labels()->attach($labels->where('code', 'new')->first()->id);
      }
      if (rand(0, 1)) {
        $product->labels()->attach($labels->where('code', 'hit')->first()->id);
      }

      // 2. Привязываем атрибуты для фильтрации
      // Берем по 1 значению из каждой группы
      $brandVal = $allValues->where('attribute.code', 'brand')->random();
      $areaVal = $allValues->where('attribute.code', 'area')->random();
      $skinVal = $allValues->where('attribute.code', 'skin_type')->random();
      $concernVal = $allValues->where('attribute.code', 'concern')->random();

      $product->attributeValues()->attach([
        $brandVal->id,
        $areaVal->id,
        $skinVal->id,
        $concernVal->id
      ]);

      // 3. Остатки и Цены
      $product->stocks()->create(['warehouse_id' => $warehouse->id, 'quantity' => $product->total_stock]);
      $product->prices()->create(['type' => 'base', 'price' => $price, 'old_price' => $oldPrice]);
    }
  }
}
