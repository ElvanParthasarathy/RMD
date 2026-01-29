const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/home_files', express.static('../home_files'));

// Basic Route
const noticesRouter = require('./routes/notices');
const homeRouter = require('./routes/home');
const eceRouter = require('./routes/ece');

app.use('/api/notices', noticesRouter);
app.use('/api/home', homeRouter);
app.use('/api/ece', eceRouter);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
