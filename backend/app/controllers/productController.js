// Import Product model
const Product = require('../models/Product');

// Hàm để tạo sản phẩm mới
exports.createProduct = async (req, res) => {
    try {
     // Tạo một sản phẩm mới
        const newProduct = new Product({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            stock:req.body.stock,
            sold: req.body.sold||0, 
            description: req.body.description || null // Nếu không có mô tả, truyền null cho description
        });

        // Lưu sản phẩm vào database
        await newProduct.save();

        // Trả về phản hồi thành công
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};


// Hàm lấy danh sách sản phẩm
exports.getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find();
        return  res.status(201).json({
                success: true,
                products,
            });
    } 
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }  
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        else{
            res.status(200).json({ message: 'Product deleted successfully' });
        }
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while deleting product")
        );
    }
}
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        else{
            res.status(200).json({ product });
        }
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving product")
        );
    }
}
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        else{
            res.status(200).json({ product });
        }
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while updating product")
        );
    }
}