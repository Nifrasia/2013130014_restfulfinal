var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

const passportJWT = require('../middleware/passportJWT');
const checkAdmin = require('../middleware/checkAdmin');

router.post('/regis', [
    body('name').trim().not().isEmpty().withMessage("Please enter Name. / โปรดป้อนชื่อผู้ใช้"),
    body('email').trim().not().isEmpty().withMessage("Please enter Email. / โปรดป้อนอีเมลล์").isEmail().withMessage("Email type is wrong. / โปรดใส่อีเมลล์ให้ถูกต้อง"),
    body('password').trim().not().isEmpty().withMessage("Please enter Password. / โปรดป้อนรหัสผ่าน").isLength({ min: 5 }).withMessage("Password must be over 5 letter. / รหัสผ่านต้องมีมากกว่า 5 ตัวอักษร")
], userController.register);

router.post('/login', [
    body('email').trim().not().isEmpty().withMessage("Please enter Email. / โปรดป้อนอีเมลล์").isEmail().withMessage("Email type is wrong. / โปรดใส่อีเมลล์ให้ถูกต้อง"),
    body('password').trim().not().isEmpty().withMessage("Please enter Password. / โปรดป้อนรหัสผ่าน").isLength({ min: 5 }).withMessage("Password must be over 5 letter. / รหัสผ่านต้องมีมากกว่า 5 ตัวอักษร")
], userController.login);

router.get('/profile', [passportJWT.islogin],userController.profile);

router.put('/', [passportJWT.islogin, checkAdmin.isAdmin], userController.update);

router.delete('/', [passportJWT.islogin, checkAdmin.isAdmin], userController.destroy);
  
module.exports = router;
