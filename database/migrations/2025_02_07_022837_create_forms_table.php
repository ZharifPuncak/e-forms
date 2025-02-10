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
            $table->unsignedBigInteger('form_type_id');
            $table->longText('description')->nullable();
            $table->longText('instructions')->nullable();
            $table->text('status')->default('new')->comment('new','pending','confirm','ongoing','completed');
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
