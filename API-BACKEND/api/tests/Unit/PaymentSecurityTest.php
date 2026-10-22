<?php

namespace Tests\Unit;

use App\Http\Controllers\PaymentController;
use App\Models\Service;
use Tests\TestCase;

class PaymentSecurityTest extends TestCase
{
    public function test_direct_payment_does_not_bypass_3ds_or_save_cards(): void
    {
        $controller = new class extends PaymentController {
            public array $payload = [];
            public function callApi($method, $url, $data, $id)
            {
                $this->payload = $data;
                return false;
            }
        };
        $controller->directPayment(1, 'https://example.invalid/payment', [
            'cardNumber' => 'test-only', 'ExpiryMonth' => '01',
            'ExpiryYear' => '2030', 'SecurityCode' => '000',
            'CardHolderName' => 'Test',
        ], new Service());
        $this->assertFalse($controller->payload['Bypass3DS']);
        $this->assertFalse($controller->payload['SaveToken']);
    }
}
