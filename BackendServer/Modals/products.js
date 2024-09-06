const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const productSchema = new Schema({
    category: {
        type: String,
        require: true
    },
    photos: [
        {
            type: String,
            require: true
        }
    ],
    
    long_desc:{
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    short_desc: {
        type: String,
        require: true
    },
    count: {
        type: Number,
        default: 10
    },
    deleted: {
        type: Boolean,
        default: false,
    }

},{timestamps: true})
productSchema.plugin(mongoose_delete, {deletedAt: true, overrideMethods: "all"})

module.exports = mongoose.model('products', productSchema);