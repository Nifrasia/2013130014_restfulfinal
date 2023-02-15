var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const { body } = require('express-validator');

router.post('/', [
    body('p_id').not().isEmpty().withMessage("Please enter serial number. / โปรดใส่รหัสของสินค้า"),
    body('p_name').not().isEmpty().withMessage("Please enter product's name. / โปรดใส่ชื่อของสินค้า"),
    body('p_type').not().isEmpty().withMessage("Please enter product's type. / โปรดใส่ประเภทของสินค้า"),
    body('p_price').not().isEmpty().withMessage("Please enter product's price. / โปรดใส่ราคาของสินค้า"),
], productController.add);
  
module.exports = router;
