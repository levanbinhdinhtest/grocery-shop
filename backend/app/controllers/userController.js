const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET="f8D7LZj3H9fPziw3VuY0mWz6YB0mNbOlH9t1F8pJmNk";
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
      res.json({ token, role: user.role,id:user._id });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
}
exports.logout = async function (req, res) {
    try {
        // Lấy token từ header Authorization
        const token = req.header("Authorization")?.replace("Bearer ", "");
    
        if (!token) {
          return res.status(400).send({ error: "Token is required for logout." });
        }
    
        // Xác thực token
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).send({ error: "Invalid token. Logout failed." });
          }
    
          // Token hợp lệ, thực hiện logout
          res.status(200).send({ message: "Successfully logged out." });
        });
      } catch (error) {
        res.status(500).send({ error: "Logout failed." });
      }
  
}
exports.signup = async function (req, res) {
    const { name, username, password } = req.body;

    try {
        // Thêm các trường mặc định khi tạo người dùng mới
        const user = await User.create({
            name,
            username,
            password,
            phone: "",       // Mặc định chuỗi rỗng
            address: "",     // Mặc định chuỗi rỗng
            email: "",      
            urlimg: "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",      // Mặc định chuỗi rỗng
            role: "client" // 
        });

        res.json(user);
    } catch (e) {
        // Kiểm tra lỗi nếu tên người dùng đã tồn tại
        if (e.code === 11000) {
            return res.status(400).send('Username already exists');
        }

        
        res.status(400).send(e.message);
    }
};
