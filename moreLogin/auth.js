const crypto = require('crypto');

// Function to generate a random string
function generateRandom(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to generate a NonceId
function generateNonceId() {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomString = generateRandom();
    return `${timestamp}${randomString}`;
}

// Function to calculate the MD5 hash for the Authorization header
function md5Encode(nonceId) {
    const concatenatedString = process.env.APPID + nonceId + process.env.SECRETKEY;
    return crypto.createHash('md5').update(concatenatedString).digest('hex');
}

// Function to generate request headers
function requestHeader() {
    const nonceId = generateNonceId();
    const md5Str = md5Encode(nonceId);
    return {
        'X-Api-Id': process.env.APPID,
        'Authorization': md5Str,
        'X-Nonce-Id': nonceId,
        'Content-Type': 'application/json'
    };
}

module.exports = requestHeader