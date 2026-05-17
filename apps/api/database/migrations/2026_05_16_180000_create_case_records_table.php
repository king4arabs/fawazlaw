<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('case_records', function (Blueprint $table): void {
            $table->id();
            $table->string('reference')->unique();
            $table->string('client_name');
            $table->string('case_type');
            $table->string('court_name');
            $table->string('status');
            $table->string('owner_name');
            $table->date('opened_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('case_records');
    }
};
