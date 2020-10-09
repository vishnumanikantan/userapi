const bcrypt = require('bcrypt');
const User = require('../models/User');
const accConfig = require('../config/account');

const registerUser = (req, res) => {
    let {name, email, password} = req.body;
    console.log(name, email, password);
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
            newUser.save().then(user=>{
                user.password = undefined;
                return res.json({success: true, user});
            }).catch(err=>{
                console.log(err);
                return res.json({success: false, message: 'ERR_USER_NOT_CREATED'});
            });
        }
    });
}


module.exports = {
    registerUser
}