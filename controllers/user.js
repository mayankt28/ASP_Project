const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');



exports.getUserDetails = (req, res, next) => {
    if(!req.user) return next(new ErrorResponse('Not authorised to access this route', 401));

    res.json({
        success: true,
        data: req.user
    })
}

exports.updateUserDetails = async (req, res, next) => {
    const updateFields = req.body;
    try{
        const user = await User.findById(req.user._id);
        if(!user) return next(new ErrorResponse('No user Found', 404))

        if(updateFields.firstname) user.firstname = updateFields.firstname;
        if(updateFields.lastname) user.lastname = updateFields.lastname;
        if(updateFields.dob) user.dob = new Date(updateFields.dob);

        await user.save();

        res.status(201).json({
            success: true,
            message: "Profile updated",
            data: user
        })

    }
    catch(err){
        next(err);
    }
    
}

