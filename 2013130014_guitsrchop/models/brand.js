const mongoose = require('mongoose');
const Schema = mongoose.Schema

const brandSchema = new Schema({
    p_brand: {type: String, default: 'No Brand', trim: true}
},{
    toJSON: {virtuals: true},
    timestamp: true,
    collection:"brands"
});

brandSchema.virtual('product',{
    ref: 'Product',
    localField: '_id',
    foreignField: 'p_brand'
});


const brand = mongoose.model("Brand", brandSchema)

module.exports = brand