<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
  public function show(string $slug): Response
  {
    // Загружаем товар со всеми связями
    $product = Product::with(['images', 'labels', 'attributeValues.attribute', 'category'])
      ->where('slug', $slug)
      ->where('is_active', true)
      ->firstOrFail();

    return Inertia::render('Product/Show', [
      'product' => [
        'id' => $product->id,
        'name' => $product->name,
        'slug' => $product->slug,
        'price' => (float) $product->price,
        'old_price' => $product->old_price ? (float) $product->old_price : null,
        'description' => $product->description,
        'is_available' => $product->total_stock > 0,
        'category' => $product->category->name,
        'images' => $product->images->map(fn($img) => [
          'path' => $img->path,
          'is_main' => $img->is_main
        ]),
        'labels' => $product->labels->map(fn($l) => [
          'id' => $l->id, 'name' => $l->name, 'code' => $l->code, 'color' => $l->color
        ]),
        // Группируем атрибуты для удобного вывода в таблицу
        'attributes' => $product->attributeValues->groupBy('attribute.name')->map(function($values, $name) {
          return [
            'name' => $name,
            'values' => $values->pluck('value')->join(', ')
          ];
        })->values()
      ]
    ]);
  }
}
