const axios = require('axios');
const fs = require('fs');

async function testProxy() {
    const targetUrl = 'https://www.rmd.ac.in/dept/ece/images/image-slider-1.jpg';
    const proxyUrl = `http://localhost:3000/api/ece/image?url=${encodeURIComponent(targetUrl)}`;

    console.log('Testing Proxy URL:', proxyUrl);

    try {
        const response = await axios({
            method: 'get',
            url: proxyUrl,
            responseType: 'stream'
        });

        console.log('Status:', response.status);
        console.log('Content-Type:', response.headers['content-type']);

        const writer = fs.createWriteStream('test_image.jpg');
        response.data.pipe(writer);

        writer.on('finish', () => console.log('Image saved as test_image.jpg - SUCCESS'));
        writer.on('error', (err) => console.error('Write error:', err));

    } catch (error) {
        console.error('Proxy Test Failed COMPLETE ERROR:', error);
        if (error.code) console.error('Error Code:', error.code);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Headers:', error.response.headers);
        }
    }
}

testProxy();
