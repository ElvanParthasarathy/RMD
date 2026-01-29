const axios = require('axios');

async function fetchData() {
    try {
        console.log('Fetching http://localhost:3000/api/home...');
        const response = await axios.get('http://localhost:3000/api/home');
        const data = response.data; // { success: true, data: { ... } }

        if (data.data && data.data.certifications && data.data.certifications.length > 0) {
            console.log('Success! Found', data.data.certifications.length, 'certifications.');
            console.log('First Item:', data.data.certifications[0]);
        } else {
            console.log('Fetched but NO certifications found in data.data.');
            if (data.data) console.log('Keys in content:', Object.keys(data.data));
        }
    } catch (e) {
        console.error('Error fetching data:', e.message);
    }
}

fetchData();
