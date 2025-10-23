const twilio = require('twilio');

// Load environment variables
require('dotenv').config();

async function verifyTwilioSetup() {
    console.log('Verifying Twilio WhatsApp setup...');

    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

        if (!accountSid || !authToken || !twilioPhoneNumber) {
            console.log('Missing Twilio credentials in .env file');
            return;
        }

        const client = twilio(accountSid, authToken);

        // Check if we can fetch the Twilio phone number
        try {
            const numbers = await client.incomingPhoneNumbers.list();
            const matchingNumber = numbers.find(num => num.phoneNumber === twilioPhoneNumber);

            if (matchingNumber) {
                console.log(`✓ Found Twilio phone number: ${twilioPhoneNumber}`);
                console.log(`  SMS URL: ${matchingNumber.smsUrl}`);
                console.log(`  WhatsApp integration: ${matchingNumber.capabilities.MMS ? 'Enabled' : 'Not enabled'}`);
            } else {
                console.log(`✗ Twilio phone number ${twilioPhoneNumber} not found in your account`);
            }
        } catch (error) {
            console.error('Error fetching phone numbers:', error.message);
        }

        // Try to send a simple message to verify credentials
        try {
            // First check if we're using a WhatsApp sandbox number
            if (twilioPhoneNumber.includes(':')) {
                console.log('Using WhatsApp sandbox number');
            } else {
                console.log('Using regular Twilio number - may need WhatsApp setup');
            }

            console.log('\nTo receive WhatsApp messages, the recipients must first opt-in by sending a message to your Twilio number.');
            console.log('If you are using the WhatsApp sandbox, recipients need to send "join <keyword>" to your sandbox number.');

        } catch (error) {
            console.error('Error testing message sending:', error.message);
        }

    } catch (error) {
        console.error('Error verifying Twilio setup:', error);
    }
}

verifyTwilioSetup();