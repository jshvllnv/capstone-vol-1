const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json()); //req.body
app.use(cors());

//routes

//register and login routes
app.use('/auth', require('./routes/jwtAuth'));

//dashboard route
app.use('/dashboard', require('../server/routes/dashboard'));


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});