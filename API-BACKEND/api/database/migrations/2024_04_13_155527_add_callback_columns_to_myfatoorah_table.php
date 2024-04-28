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
        Schema::table('myfatoorah', function (Blueprint $table) {
            // Add columns for callback data
            $table->string('callback_payment_id')->nullable();
            $table->string('callback_invoice_id')->nullable();
            $table->string('callback_invoice_status')->nullable();
            $table->string('callback_invoice_error')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('myfatoorah', function (Blueprint $table) {
            $table->dropColumn('callback_payment_id');
            $table->dropColumn('callback_invoice_id');
            $table->dropColumn('callback_invoice_status');
            $table->dropColumn('callback_invoice_error');
        });
    }
};
