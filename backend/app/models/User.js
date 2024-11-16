const mongoose = require('mongoose');

// Import jsonwebtoken
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    urlimg: { type: String },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone:{ type: String, required: true  },

});

// Hàm tạo JWT
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Lưu token vào mảng tokens của user (nếu muốn lưu trữ token)
    user.tokens = user.tokens.concat({ token });
    await user.save();
    
    return token;
  };
module.exports = mongoose.model('User', userSchema);