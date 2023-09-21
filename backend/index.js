const express = require('express');
const morgan = require('morgan'); 
const cors = require("cors")
const connectDB = require('./config/db');
const newsRoutes = require('../backend/routes/news.routes');
const bodyParser = require('body-parser');

require('dotenv').config();

connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(express.json());
cors({
  origin: "*",
});
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use('/api/news', newsRoutes);

app.listen(PORT, () => {
  console.log(`Server running  on port ${PORT}`);
});
