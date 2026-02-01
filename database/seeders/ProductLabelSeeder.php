<?php

namespace Database\Seeders;

use App\Models\ProductLabel;
use Illuminate\Database\Seeder;

class ProductLabelSeeder extends Seeder
{
  public function run(): void
  {
    $labels = [
      ['name' => 'New', 'code' => 'new', 'color' => '#84CC16'], // Салатовый
      ['name' => 'Hit', 'code' => 'hit', 'color' => '#FACC15'], // Желтый
      ['name' => 'Sale', 'code' => 'sale', 'color' => '#FF5C35'], // Оранжево-красный
    ];

    foreach ($labels as $label) {
      \App\Models\ProductLabel::updateOrCreate(['code' => $label['code']], $label);
    }
  }
}
