require("dotenv").config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.port || 4000;
//const port = 8000;
const cookieParser = require("cookie-parser");
require("./config/mongoose.config");
require("./config/jwt.config");
app.use(express.json(),express.urlencoded({extended:true})); 
app.use(cookieParser());
/*app.use(
    cors({
        origin: 'http://localhost:3000',
    }),
); */
app.use(cors({origin: "http://localhost:3000" , credentials: true }));
require("./routes/user.route")(app);
require('./routes/rental.routes')(app); 
//make sure to have models and controllers for line 15 can have callback funtion 

app.listen(port, () => console.log(`Listening on port: ${port}`) );