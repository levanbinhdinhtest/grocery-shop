
const connectdb = () =>{
  const express = require('express');
  const mongoose = require('mongoose');
  // Kết nối tới MongoDB
  mongoose.connect('mongodb://localhost:27017/groceryStore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Kết nối MongoDB thành công!'))
  .catch(err => console.error('Kết nối MongoDB thất bại:', err)); 
}
module.exports = connectdb;