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
    }
};