const Product = require("../models/product")
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/index')
const product = require("../models/product")

exports.add = async (req, res, next) => {
    try{
    const {p_id, p_name, p_type, p_brand, p_price} = req.body

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

    console.log(p_brand)

    let pb

    if(p_brand === ""){
        pb = "No Brand"
    }else{
        pb = p_brand
    }

    let product = new Product;
    product.p_id = p_id
    product.p_name = p_name
    product.p_type = p_type
    product.p_price = p_price
    product.p_brand = pb

    await product.save()
    res.status(200).json({
        message: "Adding product to system succeeded. / เพิ่มสินค้าเข้าในระบบเรียบร้อยแล้ว"
    })
    } catch (error){
    next(error)
    }
}

//get product info
exports.getProduct = (req, res, next) => {

    const data = product.find();
    res.status(200).json({
        data:data
    })
}

exports.delpro = async (req, res, next) => {

    try{
        const {p_id} = req.body

        const product = await Product.deleteOne({p_id : p_id});

        const exist = await Product.findOne({p_id : p_id});

        if(product.deletedCount === 0){
            const error = new Error('This product is not in the system. / ไม่พบข้อมูลสินค้า')
            error.statusCode = 400
            throw error;
        }else {
            return res.status(200).json({
                message: 'Data deleted. / ลบข้อมูลเรียบร้อยแล้ว',
            });
        }

    } catch(error){
        next(error)
    }
}