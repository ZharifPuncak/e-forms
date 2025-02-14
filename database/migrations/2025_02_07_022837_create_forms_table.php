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
            $table->longText('description')->nullable();
            $table->enum('status', ['new', 'pending', 'confirm', 'ongoing', 'completed','closed'])
            ->default('new')
            ->comment('Status of the forms: new, pending, confirm, ongoing, completed','closed');
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
