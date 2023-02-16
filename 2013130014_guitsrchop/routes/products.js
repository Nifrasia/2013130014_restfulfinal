var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const { body } = require('express-validator');

router.post('/', [
    body('p_id').trim().not().isEmpty().withMessage("Please enter serial number. / โปรดใส่รหัสของสินค้า"),
    body('p_name').trim().not().isEmpty().withMessage("Please enter product's name. / โปรดใส่ชื่อของสินค้า"),
    body('p_type').trim().not().isEmpty().withMessage("Please enter product's type. / โปรดใส่ประเภทของสินค้า"),
    body('p_price').trim().not().isEmpty().withMessage("Please enter product's price. / โปรดใส่ราคาของสินค้า"),
], productController.add);

router.get('/detail', productController.getProduct)
  
module.exports = router;
