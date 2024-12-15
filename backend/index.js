const express = require('express');
const dotenv = require('dotenv');
const cors=require("cors");
const cookieParser = require('cookie-parser');
const authRouter=require('./route/authRouter');
dotenv.config();
const app = express();
app.use(express.json());
require("./models/db");
// require("./init/index.js")
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow cookies
}));
const PORT = process.env.PORT || 3000;
app.use('/',authRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});