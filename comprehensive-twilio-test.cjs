const twilio = require('twilio');

// Load environment variables
require('dotenv').config();

async function comprehensiveTwilioTest() {
  console.log('=== Comprehensive Twilio Test ===\n');
  
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    const testPhoneNumbers = ['+9653686568', '+918790813536'];
    
    if (!accountSid || !authToken || !twilioPhoneNumber) {
      console.log('❌ Missing Twilio credentials in .env file');
      return;
    }
    
    console.log('1. Initializing Twilio client...');
    const client = twilio(accountSid, authToken);
    console.log('✅ Twilio client initialized successfully\n');
    
    console.log('2. Checking account details...');
    try {
      const account = await client.api.accounts(accountSid).fetch();
      console.log(`   Account Status: ${account.status}`);
      console.log(`   Account Type: ${account.type}\n`);
    } catch (error) {
      console.log('   ❌ Error fetching account details:', error.message);
    }
    
    console.log('3. Checking available phone numbers...');
    try {
      const numbers = await client.incomingPhoneNumbers.list({limit: 5});
      console.log(`   Found ${numbers.length} phone numbers:`);
      numbers.forEach(num => {
        console.log(`   - ${num.friendlyName} (${num.phoneNumber})`);
        console.log(`     Capabilities: SMS=${num.capabilities.SMS}, MMS=${num.capabilities.MMS}, Voice=${num.capabilities.Voice}`);
      });
      console.log();
    } catch (error) {
      console.log('   ❌ Error fetching phone numbers:', error.message);
    }
    
    console.log('4. Checking messaging services...');
    try {
      const services = await client.messaging.services.list();
      console.log(`   Found ${services.length} messaging services:`);
      if (services.length === 0) {
        console.log('   No messaging services found. You may need to set up WhatsApp messaging.\n');
      } else {
        services.forEach(service => {
          console.log(`   - ${service.friendlyName} (${service.sid})`);
        });
        console.log();
      }
    } catch (error) {
      console.log('   Note: Messaging services may not be available in all regions.');
    }
    
    console.log('5. Testing message sending...');
    console.log('   To receive WhatsApp messages, recipients MUST opt-in first by:');
    console.log('   - Sending a message to your Twilio number, OR');
    console.log('   - If using WhatsApp Sandbox, sending "join <keyword>" to the sandbox number\n');
    
    console.log('   Current Twilio phone number:', twilioPhoneNumber);
    console.log('   Test phone numbers:', testPhoneNumbers.join(', '));
    console.log('\n   If you are using the WhatsApp Sandbox:');
    console.log('   1. Go to Twilio Console > Messaging > Try It Out > WhatsApp Sandbox');
    console.log('   2. Note the sandbox number and join keyword');
    console.log('   3. Have recipients send "join <keyword>" to the sandbox number');
    console.log('   4. THEN you can send messages to them\n');
    
    console.log('=== Test Complete ===');
    console.log('\nIf you are still having issues:');
    console.log('1. Verify your Twilio account has WhatsApp access');
    console.log('2. Check that your phone numbers are correctly formatted with country codes');
    console.log('3. Ensure recipients have opted in by messaging your Twilio number first');
    
  } catch (error) {
    console.error('❌ Error in comprehensive test:', error);
  }
}

comprehensiveTwilioTest();