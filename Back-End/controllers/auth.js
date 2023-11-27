const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');


exports.login = async (req, res, next) => {
    
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorResponse('Please provide email and password', 400));
    
    try{
        const user = await User.findOne({ email }).select('+password');
        if(!user) return next(new ErrorResponse('Invalid username/password', 401));
    
        const isMatch = await user.matchPassword(password);
        if(!isMatch) return next(new ErrorResponse('Invalid username/password', 401));

        sendToken(user, 200, res);
    }

    catch(err){
        next(err);
    }
}

exports.register = async (req, res, next) => {
    
    const { firstname, lastname, email, password } = req.body;
    const dob = new Date(req.body.dob);
    console.log(firstname, lastname, email, dob);

    try{
        const user = await User.create({
            firstname,
            lastname,
            email,
            password,
            dob
        });

        sendToken(user, 200, res);
    }

    catch(err){
        next(err);
    }
}

exports.forgetPassword = async (req, res, next) => {
    const { email } = req.body;

    if(!email) return next(new ErrorResponse('Please provide email', 400));
    
    try{

        const user = await User.findOne({ email });
        if(!user) return next(new ErrorResponse('E-mail address not linked to any account', 401));

        const resetToken = user.getResetPasswordToken();
        await user.save();

        //For development purpose only
        res.send(`<a href= "localhost:3000/api/user/resetpassword/${resetToken}">Reset Password</a>`)

    }

    catch(err){
        next(err);
    }
}

exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    
    try{
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });
        
        if(!user) return next(new ErrorResponse('Invalid Token', 400));

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Updated Successfully",
            token: user.getSignedJwtToken()
        });
    }

    catch(err){
        next(err);
    }
   
}

function sendToken(user, statusCode, res){
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ success: true, token });
}

