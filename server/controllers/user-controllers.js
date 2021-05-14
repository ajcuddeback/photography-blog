const { User } = require('../models');

const { signToken } = require('../utils/auth');

module.exports = {
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }]
        });

        if(!foundUser) {
            res.status(400).json({ message: 'No user found at this id!' });
            return;
        };

        res.json(foundUser);
    },
    async createUser({ body }, res) {
        const userData = await User.create(body);

        if(!userData) {
            res.status(400).json({ message: 'Something went wrong!' });
            return;
        };

        const token = signToken(userData);

        res.json({ token, userData });
    },
    async login({ body }, res) {
        const userData = await User.findOne({ username: body.username });

        if(!userData) {
            res.status(400).json({ message: 'No user found at this username!' });
            return;
        };

        const isCorrectPw = userData.isCorrectPw(body.password);

        if(!isCorrectPw) {
            res.status(400).json({ message: 'Incorrect PW!' });
            return;
        };

        const token = signToken(userData);

        res.json({ token, userData });
    }
};