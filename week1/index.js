const express = require('express');

const app = express();

const PORT = 5000;

app.get('/',(req,res)=>{
    res.send('<h1>Hello World !</h1>');
});

app.listen(PORT,()=>{
    console.log(`Server is Up and listening at Port :${PORT}`);
});