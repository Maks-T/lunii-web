<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AttributeSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // 1. Бренды
    $brand = \App\Models\Attribute::updateOrCreate(['code' => 'brand'], [
      'name' => 'БРЕНД:', 'is_filterable' => true, 'sort_order' => 1
    ]);
    $brand->values()->delete();
    $brand->values()->createMany([
      ['value' => 'MEDIPEEL', 'slug' => 'medipeel'],
      ['value' => 'MEDICUBE', 'slug' => 'medicube'],
    ]);

    // 2. Область применения
    $area = \App\Models\Attribute::updateOrCreate(['code' => 'area'], [
      'name' => 'ОБЛАСТЬ ПРИМЕНЕНИЯ:', 'is_filterable' => true, 'sort_order' => 2, 'allow_multiple' => true
    ]);
    $area->values()->delete();
    $area->values()->createMany([
      ['value' => 'Лицо', 'slug' => 'face'],
      ['value' => 'Вокруг глаз', 'slug' => 'eyes'],
      ['value' => 'Шея/декольте', 'slug' => 'neck'],
    ]);

    // 3. Тип кожи
    $skin = \App\Models\Attribute::updateOrCreate(['code' => 'skin_type'], [
      'name' => 'ТИП КОЖИ:', 'is_filterable' => true, 'sort_order' => 3, 'allow_multiple' => true
    ]);
    $skin->values()->delete();
    $skin->values()->createMany([
      ['value' => 'Нормальная', 'slug' => 'normal'],
      ['value' => 'Комбинированная', 'slug' => 'combined'],
      ['value' => 'Жирная', 'slug' => 'oily'],
      ['value' => 'Сухая', 'slug' => 'dry'],
    ]);

    // 4. Назначение
    $concern = \App\Models\Attribute::updateOrCreate(['code' => 'concern'], [
      'name' => 'НАЗНАЧЕНИЕ:', 'is_filterable' => true, 'sort_order' => 4, 'allow_multiple' => true
    ]);
    $concern->values()->delete();
    $concern->values()->createMany([
      ['value' => 'Anti_age', 'slug' => 'anti-age'],
      ['value' => 'Воспаленная/комедоны', 'slug' => 'acne'],
      ['value' => 'Излишняя жирность', 'slug' => 'oil-control'],
      ['value' => 'Купероз', 'slug' => 'rosacea'],
      ['value' => 'Нарушенный защитный барьер', 'slug' => 'barrier'],
      ['value' => 'Постакне/пигментация', 'slug' => 'pigmentation'],
      ['value' => 'Раздражения/покраснения', 'slug' => 'redness'],
      ['value' => 'Сухость/шелушения', 'slug' => 'dryness'],
      ['value' => 'Тусклость', 'slug' => 'dullness'],
      ['value' => 'Чувствительность', 'slug' => 'sensitive'],
    ]);
  }
}
