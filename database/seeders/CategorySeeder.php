<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $categories = [
      ['name' => 'Кремы', 'slug' => 'creams'],
      ['name' => 'Пенки и гели', 'slug' => 'cleansers'],
      ['name' => 'Сыворотки, ампулы', 'slug' => 'serums'],
      ['name' => 'Тонеры, эссенции, мисты', 'slug' => 'toners'],
      ['name' => 'Маски и патчи', 'slug' => 'masks'],
      ['name' => 'Мини наборы', 'slug' => 'sets'],
      ['name' => 'Бьюти девайсы', 'slug' => 'devices'],
      ['name' => 'Уход за волосами', 'slug' => 'hair-care'],
    ];

    foreach ($categories as $cat) {
      \App\Models\Category::updateOrCreate(['slug' => $cat['slug']], $cat);
    }
  }
}
