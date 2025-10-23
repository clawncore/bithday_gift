// Simple test to verify reply functionality
import fetch from 'node-fetch';

async function testReply() {
    try {
        console.log('Testing reply endpoint...');

        const response = await fetch('http://localhost:5010/api/reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                choice: 'yes',
                message: 'This is a test reply from the test script'
            })
        });

        const data = await response.json();
        console.log('Reply response:', data);

        if (data.ok) {
            console.log('Reply sent successfully!');
        } else {
            console.log('Reply failed:', data.error);
        }
    } catch (error) {
        console.error('Error testing reply:', error.message);
    }
}

testReply();