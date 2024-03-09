const express = require("express");
const mongoose = require("mongoose");
const router = require('./routes/app');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();

// Enable CORS for specific origin
const corsOptions = {
  origin: 'https://lmsfront.netlify.app', // Adjust the origin to match your frontend URL
  optionsSuccessStatus: 200
};

// Use CORS middleware with specific options
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/books', router);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected!");
    app.listen(process.env.PORT, () => {
      console.log(`The Server is Running on:${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error("Database Cannot Connect!", err);
  });
