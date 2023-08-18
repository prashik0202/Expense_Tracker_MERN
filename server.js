const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
dotenv.config({ path: './config/config.env'});

connectDB();

const transactionRoutes = require('./routes/transactions');

const app = express();
app.use(express.json());

app.use('/api/transaction',transactionRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold))