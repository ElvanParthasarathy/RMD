const axios = require('axios');
const fs = require('fs');

async function fetchData() {
    try {
        console.log('Fetching http://localhost:3000/api/home...');
        const { data } = await axios.get('http://localhost:3000/api/home');
        if (data.certifications && data.certifications.length > 0) {
            console.log('Success! Found', data.certifications.length, 'certifications.');
            console.log(JSON.stringify(data.certifications, null, 2));
        } else {
            console.log('Data fetched but NO certifications found.');
            console.log('Keys:', Object.keys(data));
        }
    } catch (e) {
        console.error('Error fetching data:', e.message);
    }
}

// Wait a few seconds for server to start if running immediately
setTimeout(fetchData, 4000);
