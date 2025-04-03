const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Function to shorten URLs if needed (useful for long URLs)
async function shortenURL(url) {
    try {
        const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        return response.data; // Returns shortened URL
    } catch (error) {
        console.error("Error shortening URL:", error);
        return url; // If shortening fails, return original URL
    }
}

exports.generateQR = async (req, res) => {
    try {
        let data = req.body.data; // Data to be encoded
        console.log("QR Data Length:", data.length);

        // If data is a long URL, try shortening it
        if (data.startsWith('http') && data.length > 100) {
            console.log("Data is a long URL, attempting to shorten...");
            data = await shortenURL(data);
            console.log("Shortened URL:", data);
        }

        const fileName = `qrcode_${Date.now()}.png`; // Unique filename
        const filePath = path.join(__dirname, '../../outputs', fileName); // Save in outputs folder

        const options = {
            version: 10,  // Increase if needed (max: 40)
            errorCorrectionLevel: 'H', // High error correction
        };

        await QRCode.toFile(filePath, data, options);

        res.status(200).json({
            success: true,
            message: 'QR Code generated successfully',
            path: `/outputs/${fileName}` // Relative path for frontend access
        });

    } catch (error) {
        console.error('Error generating QR:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating QR code',
            error: error.message
        });
    }
};
