const express = require('express');
const router = express.Router();

const { getTransactions , addTransaction , deleteTransaction } = require('../controller/transaction');

router.get('/',getTransactions);
router.post('/', addTransaction);
router.delete('/:id' , deleteTransaction);


module.exports = router;