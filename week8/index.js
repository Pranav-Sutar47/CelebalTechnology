const express = require('express');
const upload = require('./config/MulterConfig');
const errorMiddleware = require('./middleware/errorMiddleware');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(errorMiddleware);

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({
        message: 'File uploaded successfully',
        file: req.file
    });
});

//Third Party api integration
app.get('/weather/:city', async (req, res, next) => {
    const { city } = req.params;
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

app.listen(5000,()=>{
    console.log('Server is up at port 5000');
});