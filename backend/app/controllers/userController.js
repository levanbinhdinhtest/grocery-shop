const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.createUser = async (req, res) => {
    try {
        const user = new User({     
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,      
            role: req.body.role,
            urlimg: req.body.urlimg || null,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
        });
        const newUser = await user.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
     catch (error) {
        return res.status(400).json({ message: error.message });
     }
    }

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return  res.status(201).json({
                success: true,
                users,
            });
    } 
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }  
}

exports.getUserById = async (req, res,next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        else{
            res.status(200).json({ user });
        }
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving product")
        );
    }
}

exports.updateUser = async (req, res,next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        else{
            res.status(200).json({ user });
        }
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while updating product")
        );
    }
}

exports.deleteUser = async (req, res,next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        else{
            res.status(200).json({ message: 'User deleted successfully' });
        }
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while deleting product")
        );
    }
}



exports.login = async function(req, res, next) {
    const { username, password } = req.body;

    try {
      // Tìm người dùng dựa trên tên đăng nhập
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      // Kiểm tra mật khẩu
    //   const isPasswordValid = await bcrypt.compare(password, user.password);
      if (password !==user.password) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      // Tạo JWT token
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Thời gian hết hạn của token, có thể tùy chỉnh
      });
  
      // Trả về token và vai trò của người dùng
      res.json({ token, role: user.role });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
}
exports.logout = async function (req, res) {
    try {
      req.user.tokens = req.user.tokens.filter((token) => token.token!== req.token);
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  
}
exports.signup = async function (req, res){
    const {name, username, password} = req.body;
    try {
      const user = await User.create({name, username, password});
      res.json(user);
    } catch (e) {
      if(e.code === 11000) return res.status(400).send('Username already exists');
      res.status(400).send(e.message)
    }
}