const User = require('../models');

module.exports = {
    confirmCode: function(req, res, next) {

        const userData = User.findOne({ passwordVerify: req.body.code });

        if(!userData) {
            res.status(400).json({ message: "The code does not match!" });
            return;
        };

        next();
    }
};
 