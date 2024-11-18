const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Định nghĩa route GET để lấy danh sách sản phẩm
router.get('/users', userController.getAllUsers);
// Định nghĩa route POST để tạo sản phẩm
router.post('/users', userController.createUser);
// Định nghĩa route DELETE để xóa sản phẩm
router.delete('/users/:id', userController.deleteUser);
// Định nghĩa route PUT để update sản phẩm
router.put('/users/:id', userController.updateUser);
router.get('/user/me/:id', userController.getUserInfo);
// Định nghĩa route GET để lấy sản phẩm theo id
router.get('/user/:id', userController.getUserById);
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/logout', userController.logout);
module.exports = router;