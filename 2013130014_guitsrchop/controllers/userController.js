const User = require("../models/user")
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/index')

    exports.register = async (req, res, next) => {
        try{
        const {name, email, password} = req.body

        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("The infomation recived is wrong. / ข้อมูลผิดพลาด")
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }
        
        const existemail = await User.findOne({email: email})

        if(existemail){
            const error = new Error("E-mail is already in the system. / อีเมลล์มีในระบบแล้ว")
            error.statusCode = 400;
            throw error;
        }

        let user = new User();
        user.name = name
        user.email = email
        user.password = await user.encryptPassword(password)

        await user.save()
        res.status(200).json({
            message: "Registered. / ลงทะเบียนระบบเรียบร้อยแล้ว"
        })
        } catch (error){
        next(error)
        }
    }

    exports.login = async(req, res, next) => {
        try{
        const {name, email, password} = req.body

        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("The infomation recived is wrong. / ข้อมูลผิดพลาด")
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }

        //check email isExist
        const existuser = await User.findOne({email: email})

        if(!existuser){
            const error = new Error("E-mail is not exsist in the system. / อีเมลล์ไม่มีในระบบ")
            error.statusCode = 404;
            throw error;
        }

        //check password
        const isValid = await existuser.checkPassword(password)

        if(!isValid){
            const error = new Error("Wrong password. / รหัสผ่านไม่ถูกต้อง")
            error.statusCode = 401;
            throw error;
        }

        //creat token
        const token = await jwt.sign({
            id: existuser._id,
            role: existuser.role,
        }, config.TOKEN, { expiresIn: "5 days"})

        const expires_in = jwt.decode(token) 

        res.status(200).json({
            access_token: token,
            expires_in: expires_in.exp,
            token_type: 'Bearer'
        });

        } catch (error){
        next(error)
        }
    }

    exports.profile = (req, res, next) => {

        const {name, role, email} = req.user
        res.status(200).json({
        name: name,
        role: role,
        email: email,
        })
    }