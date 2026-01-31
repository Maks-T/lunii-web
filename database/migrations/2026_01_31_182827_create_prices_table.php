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
        Schema::create('prices', function (Blueprint $table) {
            $table->id();
            // Полиморфная связь (Product или в будущем SKU)
            $table->morphs('priceable');

            $table->string('type')->default('base'); // base, vip, wholesale

            $table->decimal('price', 12, 2);           //
            $table->decimal('old_price', 12, 2)->nullable(); // Цена до скидки
            $table->integer('discount_percent')->nullable(); // Процент скидки

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prices');
    }
};
