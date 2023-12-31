import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { notFound , errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();

//importing the connect to DB function
import connectDB from './config/db.js';

//importing routes:
import userRoutes from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js'

const port = process.env.PORT || 5000;

//connecting to DB:
connectDB();

//creating a express app:
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended : false}))
// app.use(cors({
//   origin:'*', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200,
// }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api/users',userRoutes);
app.use('/api/transaction', transactionRoutes)
app.use(notFound);
app.use(errorHandler);

app.get('/' , (req,res) => {
  res.send('Api is running bro!');
})

app.listen(port, () => {
  console.log(`server is running on the port : ${port}`);
})