var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT')
const checkAdmin = require('../middleware/checkAdmin')

router.post('/regis', [
    body('name').trim().not().isEmpty().withMessage("Please enter Name."),
    body('email').trim().not().isEmpty().withMessage("Please enter Email.").isEmail().withMessage("Email type is wrong."),
    body('password').trim().not().isEmpty().withMessage("Please enter Password.").isLength({ min: 5 }).withMessage("Password must be over 5 letter.")
], userController.register);

router.post('/login', [
    body('email').trim().not().isEmpty().withMessage("Please enter Email.").isEmail().withMessage("Email type is wrong."),
    body('password').trim().not().isEmpty().withMessage("Please enter Password.").isLength({ min: 5 }).withMessage("Password must be over 5 letter.")
], userController.login)

router.get('/profile', [passportJWT.islogin],userController.profile)

router.put('/', [passportJWT.islogin, checkAdmin.isAdmin], userController.update)

router.delete('/', [passportJWT.islogin, checkAdmin.isAdmin], userController.destroy)
  
module.exports = router;
