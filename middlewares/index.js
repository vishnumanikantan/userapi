const jwt = require('jsonwebtoken');
const Users = require('../models/User');
const jwtConfig = require('../config/jwt');

const userAuth = (req, res, next) => {
  let token = req.get('Authentication');
  if (typeof token == 'string' && token.length > 0) {
    jwt.verify(token, jwtConfig.secret, (err, message) => {
      if (err) {
        console.log(err);
        return res.json({success: false, message: 'ERR_VERIFICATION'});
      } else if (message.iss == jwtConfig.iss) {
        if (message.id) {
          Users.findById({_id: message.id}).then((user) => {
            if (user && user != {}) {
              req.user = user;
              next();
            } else {
              return res.json({success: false, message: 'ERR_USER_NOT_FOUND'});
            }
          });
        } else {
          return res.json({success: false, message: 'ERR_INVALID_TOKEN'});
        }
      } else {
        // wrong issuer
        console.error(`Wrong token issuer ${message.iss}`);
        return res.json({
          success: false,
          message: `ERR_UNKNOWN_ISSUER`,
        });
      }
    });
  } else {
    return res.json({success: false, message: 'ERR_INVALID_TOKEN'});
  }
}


module.exports = {
    userAuth
};