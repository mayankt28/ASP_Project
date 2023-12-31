const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');

exports.protect = async (req, res ,next) => {

    let token;
    
    if(
        req.headers.authorization 
        && 
        req.headers.authorization.startsWith("Bearer")
      ) {
          token = req.headers.authorization.split(" ")[1];
      }

      if(!token){
          return next(new ErrorResponse("Not authorized to access this route", 401))
      }

      try {
          const decode = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findById(decode.id);

          if(!user){
              return next(new ErrorResponse("No user with this ID found", 404));
          }

          req.user = user;
          next();
      }

      catch(err){
          return next(new ErrorResponse("Not authorized to access this route", 401));
      }
};