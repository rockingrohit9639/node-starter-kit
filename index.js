const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Configuring dotenv 
dotenv.config({ path: "config/config.env" });

// Creating port
const PORT = process.env.PORT || 5000;

// Creating express app 
const app = express();

// Adding middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ extended: false }));

// Making connection with MongoDB
require("./db/connection");

// Using authRoutes
app.use(require("./routes/authRoutes"));

// Listening to the server
app.listen(PORT, () =>
{
    console.log(`Server running on port http://localhost:${ PORT }/`);
})
