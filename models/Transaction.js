const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    text : {
        type : String,
        trim : true,
        required : [ true , 'Please add some text'],
    },
    amount : {
        type : Number,
        required : [true,'please add a positive or negative number']
    },
    type : {
        type : String,
        required : [true, 'Please specify the tracsaction type']
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Transaction" , TransactionSchema);
