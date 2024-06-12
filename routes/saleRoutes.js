// routes/saleRoutes.js
const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

router.post('/', saleController.addSale);
router.put('/:id', saleController.modifySale);
router.delete('/:id', saleController.deleteSale);
router.get('/search', saleController.searchSales);

module.exports = router;
