<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attributes', function (Blueprint $table) {
            $table->id();
            $table->string('name');           // Название: "Тип кожи"
            $table->string('code')->unique(); // Код: "skin_type"
            $table->boolean('allow_multiple')->default(false); // Одиночный выбор или список
            $table->boolean('is_filterable')->default(true);   // Выводить ли в фильтры на сайте
            $table->integer('sort_order')->default(0);         // Порядок в боковом меню
            $table->string('display_type')->default('checkbox'); // checkbox, select, color
            $table->json('settings')->nullable(); // Например: ['tooltip' => '...', 'unit' => 'мл', 'is_featured' => true]
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attributes');
    }
};
