const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true

    },
    phone: {
        type: Number,
        require: true
    },
    role: {
        type: String,
        enum : ['customer','staff','admin'],
        default: 'customer'
    },
   cart: {
        items: [
            {
                productId: {    
                    type: Schema.Types.ObjectId,
                    ref: 'products',
                    required: true
                },
                quantity: { type: Number, required: true },
            }
        ],
        date: {type: Date, default: Date.now()}
  },
    order: [
        {
            type: Schema.Types.ObjectId,
            ref: 'orders',
            require: true
        }
    ]
    
})

module.exports = mongoose.model('users', userSchema);