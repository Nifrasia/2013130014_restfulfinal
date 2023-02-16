const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const productSchema = new Schema({
    p_id: {type: String, require: true, trim: true, unique: true},
    p_name: {type: String, require: true, trim: true},
    p_type: {type: String, require: true, trim: true, index: true},
    p_brand: {type: String, default: 'No Brand', trim: true},
    p_price: {type: Number, require: true, trim: true}
},{collection:"products"});

const product = mongoose.model("Product", productSchema)

module.exports = product