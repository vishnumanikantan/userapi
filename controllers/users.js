const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const accConfig = require('../config/account');
const jwtConfig = require('../config/jwt');


const registerUser = (req, res) => {
  let {name, email, password} = req.body;
  if (
    typeof name != 'string' ||
    name.length == 0 ||
    typeof email != 'string' ||
    email.length == 0 ||
    typeof password != 'string' ||
    password.length < accConfig.minPasswordLength
  )
    return res.json({success: false, message: 'ERR_SCHEMA_NOT_FOLLOWED'});
  bcrypt.hash(password, accConfig.saltRounds, function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      console.log(err);
      return res.json({success: false, message: 'ERR_PASSWORD'});
    } else {
      let newUser = new User({name, email, password: hash});
      newUser
        .save()
        .then((user) => {
          let {_id, name, email} = user;
          return res.json({success: true, user: {_id, name, email}});
        })
        .catch((err) => {
          console.log(err);
          return res.json({success: false, message: 'ERR_USER_NOT_CREATED'});
        });
    }
  });
};

const loginUser = (req, res) => {
  let {email, password} = req.body;
  if (
    typeof email != 'string' ||
    email.length == 0 ||
    typeof password != 'string' ||
    password.length < accConfig.minPasswordLength
  )
    return res.json({success: false, message: 'ERR_SCHEMA_NOT_FOLLOWED'});
  User.findOne({email})
    .then((user) => {
      if (user && user != {}) {
        // Check password
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.log(err);
            return res.json({success: false, message: 'ERR_WRONG_CREDENTIALS'});
          }
          if (result) {
              // Create a token and send
              jwt.sign(
                {id: user._id},
                jwtConfig.secret,
                {issuer: jwtConfig.iss, expiresIn: jwtConfig.expiry},
                (err, token) => {
                  if (err) {
                    console.log(err);
                    return res.json({success: false, message: 'ERR_LOGGING_IN'});
                  } else {
                    res.setHeader('Authentication', token);
                    return res.json({success: true});
                  }
                }
              );
            
          } else {
            return res.json({
              success: false,
              message: 'ERR_WRONG_CREDENTIALS',
            });
          }
        });
      } else {
        // send "Username/password is wrong"
        return res.json({success: false, message: 'ERR_WRONG_CREDENTIALS'});
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({success: false, message: 'ERR_WRONG_CREDENTIALS'});
    });
};

const getUserDetails = (req, res) => {
    let {_id, name, email} = req.user;
    return res.json({success: true, user: {_id, name, email}});
}

module.exports = {
  registerUser,
  loginUser,
  getUserDetails
};
