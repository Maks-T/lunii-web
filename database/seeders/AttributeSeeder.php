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
        $brand = \App\Models\Attribute::create([
            'name' => 'Бренд',
            'code' => 'brand',
            'display_type' => 'checkbox',
            'is_filterable' => true,
            'sort_order' => 1
        ]);
        $brand->values()->createMany([
            ['value' => 'MEDIPEEL', 'slug' => 'medipeel'],
            ['value' => 'MEDICUBE', 'slug' => 'medicube'],
        ]);

        // 2. Область применения
        $area = \App\Models\Attribute::create([
            'name' => 'Область применения',
            'code' => 'area',
            'allow_multiple' => true,
            'is_filterable' => true,
            'sort_order' => 2
        ]);
        $area->values()->createMany([
            ['value' => 'Лицо', 'slug' => 'face'],
            ['value' => 'Вокруг глаз', 'slug' => 'eyes'],
            ['value' => 'Шея и декольте', 'slug' => 'neck'],
        ]);

        // 3. Тип кожи
        $skin = \App\Models\Attribute::create([
            'name' => 'Тип кожи',
            'code' => 'skin_type',
            'allow_multiple' => true,
            'is_filterable' => true,
            'sort_order' => 3
        ]);
        $skin->values()->createMany([
            ['value' => 'Нормальная', 'slug' => 'normal'],
            ['value' => 'Комбинированная', 'slug' => 'combined'],
            ['value' => 'Жирная', 'slug' => 'oily'],
            ['value' => 'Сухая', 'slug' => 'dry'],
        ]);
    }
}
