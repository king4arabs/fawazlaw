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
            });
            await customer.save(); // Save the new customer to the database
        }

        const sessionDetails = {
            "CustomerIdentifier": customer.id,
            "SaveToken": true,
            "IsRecurring": false
        };

        // Construct the API URL
        const apiUrl = 'https://apitest.myfatoorah.com/v2/InitiateSession';

        // Set up the headers for the request
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MYFATOORAH_API_KEY}`
        };
        const response = await axios.post(apiUrl, sessionDetails, { headers });
        if(response.data.IsSuccess) {
            res.status(200).json({ SessionId: response.data.Data.SessionId, CountryCode: response.data.Data.CountryCode });
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
    try {
        // Check if the customer exists in the database
        let customer = await Customer.findOne({ email: req.body.email }).lean();
        
        // If the customer does not exist, create a new one
        if (!customer) {
            customer = new Customer({
                name: req.body.name,
                email: req.body.email,
                number: req.body.phoneNumber,
            });
            await customer.save(); // Save the new customer to the database
        }

        const sessionDetails = {
            "CustomerIdentifier": customer.id,
            "SaveToken": true,
            "IsRecurring": false
        };

        // Construct the API URL
        const apiUrl = 'https://apitest.myfatoorah.com/v2/InitiateSession';

        // Set up the headers for the request
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MYFATOORAH_API_KEY}`
        };
        const response = await axios.post(apiUrl, sessionDetails, { headers });
        if(response.data.IsSuccess) {
            res.status(200).json({ SessionId: response.data.Data.SessionId, CountryCode: response.data.Data.CountryCode });
        }

        // Extract the callback URL from the response
        console.log(response.data);

    } catch (error) {
        console.error("Failed to send payment:", error.message);
        throw error;
    }
}