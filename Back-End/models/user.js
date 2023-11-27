const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 15,
        required: [true, 'Please provide first name']
    },
    lastname: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 15,
        required: [true, 'Please provide last name']
    },
    email: {
        type: String,
        required: [true, 'Please provide email address'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
          ]
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 8,
        select: false
    },
    dob: {
        type: Date,
        required: [true, 'Please provide date of birth']
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
});

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); //Expires in 10 minutes

    return resetToken;
}


module.exports = mongoose.model('User', userSchema);