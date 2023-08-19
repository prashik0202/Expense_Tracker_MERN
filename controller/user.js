const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * We are generating a JWT for authentication of user
 * We are providing id as data attribute
 * and token expires in 30 days
 */
const generateToken = (id) => {
    return jwt.sign({ id } , process.env.JWT_SECRET , { expiresIn : '30d'});
}

/**
 * @desc    Create User i.e registering user and save to database
 * @route   POST : /api/user/
 * @access  Public
 */
exports.registerUser = async (req,res,next) => {
    try {
        const { name , email , password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                success : false,
                message : "Please enter all fields"
            })
        }

        const userExist = await User.findOne({email});
        if(userExist) {
            res.status(400).json({ message : "User already exits"});
        }

        // hashing password:
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = await User.create({ 
            name , email , password : hashedPassword
        });

        if(user) {
            res.status(201).json({
                _id : user.id,
                name : user.name,
                email : user.email,
                token : generateToken(user.id)
            })
        }
    } catch (error) {
        
        return res.status(500).json({
            success : false,
            error : 'Server Error'
        })
    }
}

/**
 * @desc    Authenticate User i.e login functionality
 * @route   POST : /api/user/login
 * @access  Public
 */
exports.loginUser = async (req,res,next) => {
    try {
        const { email , password } = req.body;
        if( !email || !password) {
            return res.status(400).json({
                success : false,
                message : "Please enter all fields"
            })
        }

        const user = await User.findOne({email});

        if(user){
            if(!await bcrypt.compare(password,user.password)){
                return res.status(500).json({
                    success : "false",
                    message : "Enter Correct Password"
                })
            }
            return res.status(200).json({
                _id : user.id,
                name : user.name,
                email : user.email,
                token : generateToken(user.id)
            })
        } else {
            return res.status(500).json({
                success : false,
                messgae : "Email not Found!"
            })
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Interal Server Error"
        })
    }
}

/**
 * @desc    Get User i.e getting the use details
 * @route   GET : /api/user/me
 * @access  Public
 */
exports.getUser = (req,res,next) => {
    res.status(200).json(req.user);
    // res.send('We got user!');
}