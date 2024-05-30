const Customer = require('../models/Customer');
const axios = require('axios');
require('dotenv').config();

// Function to send payment without using the Myfatoorah library
exports.sendPayment = async (req, res) => {
    console.log(req.body);
    try {
        // Check if the customer exists in the database
        let customer = await Customer.findOne({ email: req.body.email }).lean();
        
        // If the customer does not exist, create a new one
        if (!customer) {
            customer = new Customer({
                name: req.body.name,
                email: req.body.email,
                number: req.body.phoneNumber,
                numberCode: req.body.countryCode
            });
            await customer.save(); // Save the new customer to the database
        }

        const sessionDetails = {
            "CustomerIdentifier": customer.id,
            "SaveToken": false,
            "IsRecurring": false
        };

        // Construct the API URL
        const apiUrl = 'https://api-sa.myfatoorah.com/v2/InitiateSession';

        // Set up the headers for the request
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MYFATOORAH_API_KEY}`
        };
        const response = await axios.post(apiUrl, sessionDetails, { headers });
        if(response.data.IsSuccess) {
            res.status(200).json({ SessionId: response.data.Data.SessionId, CountryCode: response.data.Data.CountryCode, id: customer.id, price: req.body.price });
        }

        // Extract the callback URL from the response
        console.log(response.data);

    } catch (error) {
        console.error("Failed to send payment:", error.message);
        throw error;
    }
}


exports.executePayment = async (req, res) => {
    console.log(req.body);
    const services = req.body.services;
    try {
        // Check if the customer exists in the database
        let customer = await Customer.findOne({ id: req.body.id }).lean();
        const number = customer.number <= 11? customer.number : "";
        const details = {
            "SessionId": req.body.sessionID,
            "InvoiceValue": req.body.price,
            "IsRecurring": false,
            "CustomerName": customer.name,
            "MobileCountryCode": customer.numberCode,
            "CustomerMobile": number,
            "CustomerEmail": customer.email,
            "CustomerReference": customer.id,
            "InvoiceItems": services.map(service => ({
                "ItemName": service.title,
                "UnitPrice": service.price,
                "Quantity": 1
            }))
        };
        
        console.log(details);
        // Construct the API URL
        const apiUrl = 'https://api-sa.myfatoorah.com/v2/ExecutePayment';

        // Set up the headers for the request
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MYFATOORAH_API_KEY}`
        };
        const response = await axios.post(apiUrl, details, { headers });
        if(response.data.IsSuccess) {
            res.status(200).json({ paymentUrl: response.data.Data.PaymentURL });
        }

        // Extract the callback URL from the response
        console.log(response.data);

    } catch (error) {
        console.error("Failed to send payment:", error.message);
        throw error;
    }
}

