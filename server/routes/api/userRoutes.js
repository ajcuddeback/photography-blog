const router = require('express').Router();

const { authMiddleware } = require('../../utils/auth');

const {
    getSingleUser,
    createUser,
    login, 
    sendMail,
    confirmCode,
    resetPW   
} = require('../../controllers/user-controllers');

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/').post(createUser);

router.route('/login').post(login);

router.route('/resetpw').put(resetPW);

router.route('/sendMail').put(sendMail);

router.route('/confirmCode').put(confirmCode);

module.exports = router;