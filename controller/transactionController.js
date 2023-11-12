import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";


/**
 * @desc GET Tansactions
 * @route GET /api/transaction/get
 * @access private
*/
const getTransaction = expressAsyncHandler(async(req,res) => {
  const transactions = await Transaction.find({ user : req.user.id });
  res.status(200).json(transactions);
})

/**
 * @desc POST Tansactions
 * @route POST /api/transaction/add
 * @access private
*/
const addTransaction = expressAsyncHandler(async(req,res) => {
  if(!req.body.description && !req.body.amount && !req.body.expenseType && !req.body.category){
    res.status(400)
    throw new Error('Please all fields');
  }
  const transaction = await Transaction.create({
    user : req.user.id,
    description : req.body.description,
    amount : req.body.amount,
    expenseType : req.body.expenseType,
    category : req.body.category
  });
  res.status(200).json(transaction);
})

/**
 * @desc DELETE Tansactions
 * @route DELETE /api/transaction/:id
 * @access private
*/
const deleteTransaction = expressAsyncHandler(async(req,res) => {
  const transaction = await Transaction.findById(req.params.id);
  if(!transaction){
    res.status(100);
    throw new Error('Transaction not found');
  }

  else if(!req.user.id){
    res.status(401);
    throw new Error('User not Found');
  }

  else if(transaction.user.toString() !== req.user.id){
    res.status(401);
    throw new Error('User is not authorised');
  }

  await transaction.deleteOne({ id : req.params.id });
  res.status(200).json({ id : req.params.id })
})

export {
  getTransaction, addTransaction, deleteTransaction
} 