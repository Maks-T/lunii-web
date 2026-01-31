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
            ['name' => 'Сыворотки', 'slug' => 'serums'],
            ['name' => 'Маски и патчи', 'slug' => 'masks'],
            ['name' => 'Тонеры', 'slug' => 'toners'],
        ];

        foreach ($categories as $cat) {
            \App\Models\Category::create($cat);
        }
    }
}
