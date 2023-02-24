var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const { body } = require('express-validator');

const passportJWT = require('../middleware/passportJWT');
const checkAdmin = require('../middleware/checkAdmin');

router.post('/productadd', [passportJWT.islogin, checkAdmin.isAdmin,
    body('p_id').trim().not().isEmpty().withMessage("Please enter serial number. / โปรดใส่รหัสของสินค้า"),
    body('p_name').trim().not().isEmpty().withMessage("Please enter product's name. / โปรดใส่ชื่อของสินค้า"),
    body('p_type').trim().not().isEmpty().withMessage("Please enter product's type. / โปรดใส่ประเภทของสินค้า"),
    body('p_price').trim().not().isEmpty().withMessage("Please enter product's price. / โปรดใส่ราคาของสินค้า"),
    body('p_brand').trim(),
], productController.addp);

router.post('/brandadd', [passportJWT.islogin, checkAdmin.isAdmin,
    body('p_brand').trim().not().isEmpty().withMessage("Please enter brand's name. / โปรดใส่ชื่อแบรนด์")
], productController.addb);

router.get('/productdetail', productController.getProduct);

router.get('/branddetail', productController.getBrand);

router.get('/', productController.getBp);

router.delete('/productdelete', [passportJWT.islogin, checkAdmin.isAdmin], productController.delpro);

router.delete('/branddelete', [passportJWT.islogin, checkAdmin.isAdmin], productController.delbra);
  
module.exports = router;
