const express = require('express');
const app = express();
const port = 8000;
require("./config/mongoose.config");
app.listen(port, () => console.log(`Listening on port: ${port}`) );
