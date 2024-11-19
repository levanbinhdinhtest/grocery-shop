const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'carts', required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, default: 'Cash on delivery' },
    status: { type: String, default: 'Completed' },
    paymentDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);