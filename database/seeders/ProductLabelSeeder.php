<?php

namespace Database\Seeders;

use App\Models\ProductLabel;
use Illuminate\Database\Seeder;

class ProductLabelSeeder extends Seeder
{
    public function run(): void
    {
        $labels = [
            [
                'name' => 'New',
                'code' => 'new',
                'color' => '#84cc16', // Lime-500 (Зеленый как на скрине)
                'icon' => 'heroicon-o-sparkles',
            ],
            [
                'name' => 'Hit',
                'code' => 'hit',
                'color' => '#f97316', // Orange-500 (Оранжевый огонь)
                'icon' => 'heroicon-o-fire',
            ],
            [
                'name' => 'Sale',
                'code' => 'sale',
                'color' => '#ef4444', // Red-500 (Красный процент)
                'icon' => 'heroicon-o-receipt-percent',
            ],
            [
                'name' => 'Рекомендовано',
                'code' => 'recommended',
                'color' => '#06b6d4', // Cyan-500 (Голубая капля)
                'icon' => 'heroicon-o-beaker',
            ],
        ];

        foreach ($labels as $label) {
            ProductLabel::updateOrCreate(
                ['code' => $label['code']], // Чтобы не дублировать при повторном запуске
                $label
            );
        }
    }
}
