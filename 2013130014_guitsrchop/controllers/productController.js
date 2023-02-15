const Product = require("../models/product")
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/index')
const product = require("../models/product")

exports.add = async (req, res, next) => {
    try{
    const {p_id, p_name, p_type, p_brand, p_price, p_instock} = req.body

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("The infomation recived is wrong. / ข้อมูลผิดพลาด")
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    }
    
    const existid = await Product.findOne({p_id: p_id})

    if(existid){
        const error = new Error("This serial number is already added. / รหัสสินค้านี้มีในระบบอยู่แล้ว")
        error.statusCode = 400;
        throw error;
    }

    let product = new Product;
    product.p_id = p_id
    product.p_name = p_name
    product.p_type = p_type
    product.p_brand = p_brand
    product.p_price = p_price
    product.p_instock = p_instock

    await product.save()
    res.status(200).json({
        message: "Adding product to system succeeded. / เพิ่มสินค้าเข้าในระบบเรียบร้อยแล้ว"
    })
    } catch (error){
    next(error)
    }
}