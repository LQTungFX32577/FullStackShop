const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');
const roomSchema = new Schema({
 userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
 },
 Room: {
    type: String,
    require: true,
 }
 
}, {timestamps: true});
roomSchema.plugin(mongoose_delete, {deletedAt: true, overrideMethods: "all"})
module.exports = mongoose.model('rooms', roomSchema)