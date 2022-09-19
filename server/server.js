const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors'); 
require("./config/mongoose.config");

app.use(express.json(),express.urlencoded({extended:true})); 

app.use(
    cors({
        origin: 'http://localhost:3000',
    }),
); 

require('./routes/rental.routes')(app); 
//make sure to have models and controllers for line 15 can have callback funtion 

app.listen(port, () => console.log(`Listening on port: ${port}`) );