// Simple test to verify authentication functionality
import fetch from 'node-fetch';

async function testAuth() {
    try {
        console.log('Testing authentication with wrong word...');

        const response = await fetch('http://localhost:5010/api/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secretWord: 'wrongword'
            })
        });

        const data = await response.json();
        console.log('Auth response:', data);

        if (data.ok) {
            console.log('Authentication successful!');
        } else {
            console.log('Authentication failed:', data.error);
        }
    } catch (error) {
        console.error('Error testing authentication:', error.message);
    }
}

testAuth();