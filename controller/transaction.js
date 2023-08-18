const Transaction = require('../models/Transaction');

/**
 * @desc get all transaction 
 * @route GET /api/transaction 
 * @access private 
*/
exports.getTransactions = async(req,res,next) => {
    try {
        const transactions = await Transaction.find();

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data : transactions
        })
    } catch (error) {
        return res.status(500).josn({
            success : false,
            error : 'Server Error'
        })
    }
}

/**
 * @desc add transaction 
 * @route POST /api/transaction 
 * @access private 
*/
exports.addTransaction = async (req,res,next) => {

    try {
        const { text , amount } = req.body;

        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success : true,
            data : transaction
        })
    } catch (error) {
        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            res.status(400).json({
                success : false,
                error : messages
            })
        } else {
            return res.status(500).josn({
                success : false,
                error : 'Server Error'
            })
        }
    }
    
}

/**
 * @desc Delete transaction 
 * @route DELETE /api/transaction 
 * @access private 
*/
exports.deleteTransaction = async(req,res,next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if(!transaction) {
            return res.status(404).json({
                success : false,
                error : "No Transaction Found"
            })
        } else {
            await transaction.deleteOne({ id : req.params.id});
            return res.status(200).json({
                success : true,
                data : {}
            })
        }
    } catch (error) {
        return res.status(500).josn({
            success : false,
            error : 'Server Error'
        })
    }
}
