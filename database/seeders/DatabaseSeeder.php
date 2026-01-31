<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Создаем админа, если пользователя с таким email еще нет
        User::firstOrCreate(
            ['email' => 'admin@admin.com'], // По какому полю искать
            [
                'name' => 'Admin',
                'password' => Hash::make('111222'),
            ]
        );

        // 2. Вызываем остальные сидеры каталога
        $this->call([
            CategorySeeder::class,
            WarehouseSeeder::class,
            ProductLabelSeeder::class,
            AttributeSeeder::class,
            ProductSeeder::class,
        ]);
    }
}
