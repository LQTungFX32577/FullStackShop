const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        userId: String,
        fullName: String,
        email: String,
        phone: String,
        address: String
    },
    orders: [
        {
            item: { 
                _id: String,
                category: String,
                long_desc: String,
                name: String,
                photos: [String],
                price: String,
                short_desc: String,
             },
            quantity: { type: Number, required: true },
            date: {type: Date, default: Date.now()}
        }
    ],
    totalPrice: {
            type: Number,
            required: true 
    },
    status: {   
        type: String,
        enum: ["pending", "shipping", "completed", "canceled"],
        default: "pending"
    }
},{timestamps: true})

module.exports = mongoose.model('orders', orderSchema);