const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async(req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            // getting token from the headers
            token  = req.headers.authorization.split(' ')[1];
            //verify the token
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            // get user from the token:
            req.user = await User.findById(decode.id).select('-password');
            next();
        } catch(error) {
            console.log(error);
            res.status(401).json({
                success : fail,
                message : "Not authorized"
            });
            // throw new Error('Not authorized!');
        }
    }

    if(!token) {
        res.status(401).json({
            success : false,
            message : "Not Authorized! , No TOKEN"
        });
        // throw new Error('Not authorized!, no token');
    }
})

module.exports = {protect};