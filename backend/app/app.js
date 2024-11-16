require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const productRoutes = require('./routes/productRoutes'); // Import productRoutes
const userRoutes = require('./routes/userRoutes'); // Import userRoutes
const connectDB = require('./connectdb');
// Connect to the database
connectDB();
var app = express();
app.use(cors());
app.use(express.json()); // Middleware để parse JSON
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Sử dụng các route
app.use('/api', productRoutes); // Gán prefix "/api" cho các route
app.use('/api', userRoutes); // Gán prefix "/api" cho các route
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
