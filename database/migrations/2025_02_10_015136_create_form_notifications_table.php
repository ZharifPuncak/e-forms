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
        Schema::create('form_notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('form_id');
            $table->string('channel')->default('email');
            $table->string('applied_to')->default('all')->comment('all | specific');
            $table->string('type')->comment('new | deadline | reminder');
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('form_notificable_id')->nullable()->comment('User ID | Department ID | Category ID');
            $table->unsignedBigInteger('form_notificable_type')->nullable();
            $table->string('title')->nullable();
            $table->string('message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_notifications');
    }
};
