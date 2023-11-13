import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref: 'User'
  },
  description: {
    type : String,
    required : [true, 'Please enter description']
  },
  amount : {
    type : Number,
    required : [true, 'Please enter amount']
  },
  expenseType : {
    type : String,
    required : [true, 'Please enter Expense Type']
  },
  category : {
    type : String,
    required : [true, 'Please enter category']
  },
  createdAt :{
    type : String,
    default: () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }
}, { timestamps : true});

const Transaction = mongoose.model('Transaction' , transactionSchema);

export default Transaction;