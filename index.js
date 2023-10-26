const express = require('express');
const cors = require('cors');
const app = express();
const Auth= require('./Routes');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cors());
app.use(cookieParser());
require('./Config');
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
app.use(Auth);