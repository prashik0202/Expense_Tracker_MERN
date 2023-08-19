const express = require('express');
const router = express.Router();

const { getTransactions , addTransaction , deleteTransaction } = require('../controller/transaction');
const {protect} = require('../middleware/AuthMiddleware');

router.get('/',protect , getTransactions);
router.post('/',protect ,  addTransaction);
router.delete('/:id' ,protect ,  deleteTransaction);


module.exports = router;