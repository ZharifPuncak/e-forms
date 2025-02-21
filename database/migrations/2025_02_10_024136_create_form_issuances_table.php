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
        Schema::create('form_issuances', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('form_id');
            $table->string('applied_to')->default('all')->comment('all | specific');
            $table->unsignedBigInteger('company_id')->nullable();
            $table->unsignedBigInteger('form_issuance_id')->nullable()->comment('User ID | Department ID | Category ID');
            $table->unsignedBigInteger('form_issuance_type')->nullable();
            $table->timestamp ('issued_at');
            $table->timestamp ('deadline_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_issuances');
    }
};
