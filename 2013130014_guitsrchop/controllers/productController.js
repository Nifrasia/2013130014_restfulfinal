const Product = require("../models/product")
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/index')
const Brand = require("../models/brand")

//add product
exports.addp = async (req, res, next) => {
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

//add brand
exports.addb = async (req, res, next) => {
    try{
    const {p_brand} = req.body

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("The infomation recived is wrong. / ข้อมูลผิดพลาด")
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    }
    
    const existid = await Brand.findOne({p_brand : p_brand})

    if(existid){
        const error = new Error("This brand is already added. / แบรนด์นี้มีในระบบอยู่แล้ว")
        error.statusCode = 400;
        throw error;
    }

    let brand = new Brand;
    brand.p_brand = p_brand

    await brand.save()
    res.status(200).json({
        message: "Adding brand to system succeeded. / เพิ่มแบรนด์เข้าในระบบเรียบร้อยแล้ว"
    })
    } catch (error){
    next(error)
    }
}

//get product info
exports.getProduct = async (req, res, next) => {

    const pdata = await Product.find();
    res.status(200).json({
        data:pdata
    })
}

//get brand info
exports.getBrand = async (req, res, next) => {

    const bdata = await Brand.find()
    res.status(200).json({
        data: bdata
    })
}

exports.getBp = async (req, res, next) => {

    const bpdata = await Brand.find().populate('product')
    res.status(200).json({
        data: bpdata
    })

}

exports.delpro = async (req, res, next) => {

    try{
        const {p_id} = req.body

        const product = await Product.deleteOne({p_id : p_id});

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

exports.delbra = async (req, res, next) => {

    try{
        const {p_brand} = req.body

        const brand = await Brand.deleteOne({p_brand : p_brand});

        if(brand.deletedCount === 0){
            const error = new Error('This brand is not in the system. / ไม่พบข้อมูลแบรนด์')
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