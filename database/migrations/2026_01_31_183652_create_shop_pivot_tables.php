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
        // 1. Связь Товара и Значений Атрибутов (для фильтров: Бренд, Тип кожи и т.д.)
        Schema::create('attribute_value_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('attribute_value_id')->constrained()->cascadeOnDelete();
        });

        // 2. Связь Товара и Меток (New, Hit, Sale)
        Schema::create('label_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_label_id')->constrained()->cascadeOnDelete();
        });

        // 3. Связь Товара и SEO-тегов (для поиска и группировок)
        Schema::create('product_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_tag');
        Schema::dropIfExists('label_product');
        Schema::dropIfExists('attribute_value_product');
    }
};
