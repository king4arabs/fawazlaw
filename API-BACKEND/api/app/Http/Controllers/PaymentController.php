<?php

namespace App\Http\Controllers;

use App\Models\MyFatoorah;
use App\Models\Service;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    protected $client;
    protected $base_url = "https://apitest.myfatoorah.com";

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => $this->base_url,
            'headers' => [
                'Authorization' => 'Bearer ' . config('myfatoorah.api_key'),
                'Content-Type' => 'application/json',
            ]
        ]);
    }

    // Generic API call function
    public function callApi($method, $url, $data, $id)
    {
        try {
            $response = $this->client->request($method, $url, [
                'json' => $data
            ]);
            return json_decode($response->getBody()->getContents(), true);
        } catch (\Throwable $th) {
            return false;
        }
    }

    // Execute Payment Function
    public function executePayment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|exists:services,id',
            'customerName' => 'required',
            'price' => 'required',
            'qty' => 'required',
            'customerEmail' => 'required|email',
            'cardNumber' => 'required',
            'ExpiryMonth' => 'required',
            'ExpiryYear' => 'required',
            'SecurityCode' => 'required',
            'CardHolderName' => 'required',
        ]);

        if ($validator->fails()) {
            $errorMessage = $validator->errors();
            return response()->json(['error' => $errorMessage], 401);
        }

        $serviceData = Service::findOrFail($request->service_id);

        $requestData = [
            'paymentMethodId' => 20,
            'InvoiceValue' => $serviceData->price * $request->qty,
            "CustomerName"  => $request->customerName,
            "DisplayCurrencyIso" => "SAR",
            "CustomerEmail"      => $request->customerEmail,
        ];

        $response = $this->callApi('POST', '/v2/ExecutePayment', $requestData, 1);
        $invoiceUrl = $response['Data']['PaymentURL'];
        $invoiceId = $response['Data']['InvoiceId'];

        $response = $this->directPayment($invoiceId, $invoiceUrl, $request->all(), $serviceData);

        if (!$response) {
            $response = [
                "IsSuccess" => false,
                "Message" => "Somthing went wrong!",
                "ValidationErrors" => null,
                "Data" => []
            ];
        }
        return $response;
    }

    // Example of direct payment
    public function directPayment($invoiceId, $invoice_url, $requestData, $serviceData)
    {
        $directpayRequest = [
            'PaymentType' => 'card',
            'Bypass3DS' => true,
            'SaveToken' => true,
            'Card' => [
                'Number' => $requestData['cardNumber'],
                'ExpiryMonth' => $requestData['ExpiryMonth'],
                'ExpiryYear' => $requestData['ExpiryYear'],
                'SecurityCode' => $requestData['SecurityCode'],
                'CardHolderName' => $requestData['CardHolderName']
            ]
        ];

        $response = $this->callApi('POST', $invoice_url, $directpayRequest, 2);
        if ($response) {
            $myfatoorah = new MyFatoorah();
            $myfatoorah['service_id'] = $serviceData->id;
            $myfatoorah['customer_name'] = $requestData['customerName'];
            $myfatoorah['invoice_value'] = $serviceData->price * $requestData['qty'];
            $myfatoorah['display_currency_iso'] = "SAR";
            $myfatoorah['customer_email'] = $requestData['customerEmail'];
            $myfatoorah['invoice_url'] = $invoice_url;
            $myfatoorah['callback_payment_id'] = 20;
            $myfatoorah['callback_invoice_id'] = $invoiceId;
            $myfatoorah->save();
            return $response;
        } else {
            return false;
        }
    }
}
