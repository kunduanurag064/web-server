const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const userRouter = require('./routes/user.router');
require('dotenv').config()
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); 
app.use(express.json());
app.use(cors({
 origin:["https://web-client-black.vercel.app"],
 methods:["POST","GET"],
 credentials:true
}));


 connectDB; 

app.use('/',(req,res)=>{console.log("Hello from server"})

app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
