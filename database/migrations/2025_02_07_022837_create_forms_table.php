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
        Schema::create('forms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('alias')->nullable();
            $table->string('code');
            $table->unsignedBigInteger('form_category_id');
            $table->longText('descriptions')->nullable();
            $table->enum('status', ['pending','confirmed', 'ongoing', 'completed','closed'])
            ->default('pending')
            ->comment('Status of the forms:  pending, confirmed, ongoing, completed','closed');
            $table->timestamp('effective_from');
            $table->timestamp('effective_to');
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forms');
    }
};
