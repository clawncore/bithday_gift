const twilio = require('twilio');

// Load environment variables
require('dotenv').config();

async function testTwilio() {
    console.log('Testing Twilio integration...');

    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
        const testPhoneNumbers = ['+9653686568', '+918790813536'];

        if (!accountSid || !authToken || !twilioPhoneNumber) {
            console.log('Missing Twilio credentials');
            return;
        }

        const client = twilio(accountSid, authToken);

        // Send a test message to each number
        for (const phoneNumber of testPhoneNumbers) {
            try {
                const message = await client.messages.create({
                    body: 'Test message from Happy Birthday Reel app!',
                    from: `whatsapp:${twilioPhoneNumber}`,
                    to: `whatsapp:${phoneNumber}`
                });

                console.log(`Message sent to ${phoneNumber}: ${message.sid}`);
            } catch (error) {
                console.error(`Error sending message to ${phoneNumber}:`, error.message);
            }
        }
    } catch (error) {
        console.error('Error testing Twilio:', error);
    }
}

testTwilio();