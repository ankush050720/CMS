exports.simplePaymentGateway = (req, res) => {
    console.log('Request Body:', req.body);

    // You can process the request body here if needed

    // Respond with the expected structure
    res.status(200).json({ success: true, message: 'This is a simple payment gateway endpoint.' });
};
