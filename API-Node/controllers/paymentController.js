const axios = require('axios');
require('dotenv').config();

// Function to send payment without using the Myfatoorah library
exports.sendPayment = async (req, res) => {
    const transactionDetails = {
        CustomerName: req.name,
        NotificationOption: 'ALL',
        MobileCountryCode: '+965',
        CustomerMobile: '12345678',
        CustomerEmail: req.email,
        InvoiceValue: req.price,
        DisplayCurrencyIso: 'SAR',
        CallBackUrl: 'https://google.com',
        ErrorUrl: 'https://yahoo.com',
        Language: 'en',
        CustomerReference: 'ref 1',
        CustomerCivilId: 12345678,
        UserDefinedField: 'Custom field',
        ExpiryDate: '',
        CustomerAddress: {
            Block: '',
            Street: '',
            HouseBuildingNo: '',
            Address: '',
            AddressInstructions: ''
        },
        InvoiceItems: [
            {
                ItemName: 'Product 01',
                Quantity: 1,
                UnitPrice: 100
            }
        ]
    };

    try {
        // Construct the API URL
        const apiUrl = 'https://apitest.myfatoorah.com/v2/InitiatePayment';

        // Set up the headers for the request
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MYFATOORAH_API_KEY}`
        };

        // Make the POST request to Myfatoorah's API
        const response = await axios.post(apiUrl, transactionDetails, { headers });

        // Extract the callback URL from the response
        const callbackUrl = response.data.callbackUrl;
        console.log(callbackUrl);

        return callbackUrl;
    } catch (error) {
        console.error("Failed to send payment:", error.message);
        throw error;
    }
}
