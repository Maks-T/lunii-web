<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained();
            $table->string('name'); // Дневной крем MEDICUBE, 75 мл
            $table->string('slug')->unique();
            $table->string('sku')->unique()->nullable();
            $table->text('description')->nullable();

            // Цены для быстрой фильтрации
            $table->decimal('price', 12, 2)->index();
            $table->decimal('old_price', 12, 2)->nullable();

            // Суммарный остаток
            $table->integer('total_stock')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
