const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(corsOptions)) // Use this after the variable declaration

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/auth/v1', authRoutes);
app.use('/auth/v1', adminRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
