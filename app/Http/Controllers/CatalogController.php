<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
  /**
   * Отображение страницы каталога с фильтрацией
   */
  public function index(Request $request): Response
  {
    // 1. Базовый запрос: только активные товары с предзагрузкой картинок и меток
    $query = Product::query()
      ->with(['images', 'labels'])
      ->where('is_active', true);

    // 2. ФИЛЬТРАЦИЯ ПО КАТЕГОРИИ (Верхние пилюли)
    if ($request->filled('category')) {
      $query->whereHas('category', function ($q) use ($request) {
        $q->where('slug', $request->category);
      });
    }

    // 3. ФИЛЬТРАЦИЯ ПО МЕТКАМ (Верхние пилюли: hit, new, sale)
    if ($request->filled('label')) {
      $query->whereHas('labels', function ($q) use ($request) {
        $q->where('code', $request->label);
      });
    }

    // 4. ФИЛЬТРАЦИЯ ПО АТРИБУТАМ (Боковая панель)
    // Ожидаемый формат: ?attr[skin_type][]=dry&attr[brand][]=medipeel
    if ($request->has('attr') && is_array($request->attr)) {
      foreach ($request->attr as $code => $slugs) {
        $slugs = array_filter((array)$slugs); // Убираем пустые значения

        if (empty($slugs)) continue;

        $query->whereHas('attributeValues', function ($q) use ($code, $slugs) {
          $q->whereIn('slug', $slugs)
            ->whereHas('attribute', function ($attrQ) use ($code) {
              $attrQ->where('code', $code);
            });
        });
      }
    }

    // 5. СОРТИРОВКА (По умолчанию самые новые)
    // В будущем здесь можно добавить $request->sort (price_asc, price_desc)
    $query->latest();

    // 6. ПАГИНАЦИЯ (12 товаров на страницу)
    $products = $query->paginate(12)->withQueryString();

    // 7. ДАННЫЕ ДЛЯ КОМПОНЕНТОВ ИНТЕРФЕЙСА

    // Список всех категорий для CatalogPills
    $categories = Category::orderBy('name')->get(['id', 'name', 'slug']);

    // Структура фильтров для CatalogFilters (Brand, Skin Type и т.д.)
    $filters = Attribute::where('is_filterable', true)
      ->with(['values' => fn($q) => $q->orderBy('value')])
      ->orderBy('sort_order')
      ->get()
      ->map(fn($attr) => [
        'id' => $attr->id,
        'name' => $attr->name,
        'code' => $attr->code,
        'options' => $attr->values->map(fn($val) => [
          'id' => $val->id,
          'label' => $val->value,
          'slug' => $val->slug,
        ])
      ]);

    // 8. РЕНДЕР СТРАНИЦЫ ЧЕРЕЗ INERTIA
    return Inertia::render('Catalog/index', [
      'categories' => fn () => Category::orderBy('name')
        ->with('images') // Подгружаем картинки
        ->get(['id', 'name', 'slug'])
        ->map(fn($cat) => [
          'id' => $cat->id,
          'name' => $cat->name,
          'slug' => $cat->slug,
          // Достаем путь первой картинки
          'image' => $cat->images->first()?->path
        ]),

      'filters' => fn() => Attribute::where('is_filterable', true)
        ->with(['values' => fn($q) => $q->orderBy('value')])
        ->orderBy('sort_order')
        ->get()
        ->map(fn($attr) => [
          'id' => $attr->id,
          'name' => $attr->name,
          'code' => $attr->code,
          'options' => $attr->values->map(fn($val) => [
            'id' => $val->id,
            'label' => $val->value,
            'slug' => $val->slug,
          ])
        ]),
      'products' => [
        'data' => $products->getCollection()->map(fn($product) => $this->formatProduct($product)),
        'total' => $products->total(),
        'current_page' => $products->currentPage(),
        'last_page' => $products->lastPage(),
        'links' => $products->linkCollection()->toArray(),
      ],
      'activeFilters' => [
        'category' => $request->category, // это должна быть строка, например "creams"
        'label' => $request->label,       // например "hit"
        'attr' => $request->attr ?? [],
      ],
    ]);
  }

  /**
   * Вспомогательный метод для форматирования продукта под фронтенд
   */
  protected function formatProduct(Product $product): array
  {
    return [
      'id' => $product->id,
      'name' => $product->name,
      'slug' => $product->slug,
      'price' => (float)$product->price,
      'old_price' => $product->old_price ? (float)$product->old_price : null,
      'description' => $product->description,
      'is_available' => $product->total_stock > 0,
      // Путь к первой главной картинке
      'image' => $product->images->firstWhere('is_main', true)?->path
        ?? $product->images->first()?->path,
      // Метки товара (Sale, Hit, New)
      'labels' => $product->labels->map(fn($label) => [
        'id' => $label->id,
        'name' => $label->name,
        'code' => $label->code,
        'color' => $label->color,
      ]),
    ];
  }
}
