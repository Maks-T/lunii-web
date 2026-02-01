<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
  public function index(): Response
  {
    // Базовый запрос для активных товаров с картинками и метками
    $baseQuery = Product::query()
      ->with(['images', 'labels'])
      ->where('is_active', true);



    return Inertia::render('Home', [
      // Получаем 4 хита
      'hits' => (clone $baseQuery)
        ->whereHas('labels', fn($q) => $q->where('code', 'hit'))
        ->take(4)
        ->get()
        ->map(fn($p) => $this->formatProduct($p)),

      // Получаем 4 новинки
      'newArrivals' => (clone $baseQuery)
        ->whereHas('labels', fn($q) => $q->where('code', 'new'))
        ->take(4)
        ->get()
        ->map(fn($p) => $this->formatProduct($p)),

      // Получаем 4 товара со скидкой
      'saleProducts' => (clone $baseQuery)
        ->whereHas('labels', fn($q) => $q->where('code', 'sale'))
        ->take(4)
        ->get()
        ->map(fn($p) => $this->formatProduct($p)),

      'categories' => \App\Models\Category::orderBy('name')->get(['id', 'name', 'slug'/*, 'image'*/]),

    ]);
  }

  /**
   * Форматирование продукта (такое же как в CatalogController)
   */
  protected function formatProduct(Product $product): array
  {
    return [
      'id' => $product->id,
      'name' => $product->name,
      'slug' => $product->slug,
      'price' => (float) $product->price,
      'old_price' => $product->old_price ? (float) $product->old_price : null,
      'description' => $product->description,
      'is_available' => $product->total_stock > 0,
      'image' => $product->images->firstWhere('is_main', true)?->path
        ?? $product->images->first()?->path,
      'labels' => $product->labels->map(fn($l) => [
        'id' => $l->id, 'name' => $l->name, 'code' => $l->code, 'color' => $l->color
      ]),
    ];
  }
}
