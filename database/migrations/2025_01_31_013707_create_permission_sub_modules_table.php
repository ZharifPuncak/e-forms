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
        Schema::create('permission_sub_modules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('permission_module_id');
            $table->string('name');
            $table->string('prefix');
            $table->enum('method', ['view', 'create', 'update', 'delete']);
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permission_sub_modules');
    }
};
