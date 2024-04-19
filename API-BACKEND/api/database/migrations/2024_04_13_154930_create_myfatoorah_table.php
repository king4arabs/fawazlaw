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
        Schema::create('myfatoorah', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained('services'); // Assuming 'services' is the table name for services
            $table->string('customer_name');
            $table->decimal('invoice_value', 10, 2); // Assuming 10 digits with 2 decimal places
            $table->string('display_currency_iso', 3); // Assuming ISO code is 3 characters long
            $table->string('customer_email');
            $table->string('invoice_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('myfatoorah');
    }
};
