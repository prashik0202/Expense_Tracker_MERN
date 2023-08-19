const Transaction = require('../models/Transaction');
const User = require('../models/User');

/**
 * @desc get all transaction 
 * @route GET /api/transaction 
 * @access private 
*/
exports.getTransactions = async(req,res,next) => {
    try {
        const transactions = await Transaction.find({ user : req.user.id});

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data : transactions
        })
    } catch (error) {
        return res.status(500).json({
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

        const transaction = await Transaction.create({
            text : req.body.text,
            amount : req.body.amount,
            user : req.user.id
        });

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
            return res.status(500).json({
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
        if(!req.user){
            return res.status(401).json({
                success : false,
                error : "User Not Found"
            })
        }
        if(transaction.user.toString() !== req.user.id ) {
            return res.status(401).json({
                success : false,
                error : "Not authorized user"
            })
        }
        if(!transaction) {
            return res.status(404).json({
                success : false,
                error : "No Transaction Found"
            })
        }  
        await transaction.deleteOne({ id : req.params.id});
        return res.status(200).json({
            success : true,
            data : {}
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            error : 'Server Error'
        })
    }
}
