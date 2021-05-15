const { User } = require('../models');

const { signToken } = require('../utils/auth');
const sendMail = require('../utils/sendMail');

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
    },
    async sendMail(req, res, next) {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            port: 587,
            secure: false
        });

        let code = 456;

        const userData = User.findOneAndUpdate(
            { email: req.body.email }, 
            { $set: { passwordVerify: code } },
            { new: true }
        );

        if(!userData) {
            res.status(400).json({ message: 'No user found at this email adress!' });
            return;
        }

        let info = await transporter.sendMail({
            from: '"Me" ajcuddeback@gmail.com',
            to: userData.email,
            subject: "Authentication Code",
            text: `Your one time code is ${code}. Your code will expire in 15 minutes. Please do not share your code with anyone.`
        });

        console.log("Message sent: %s", info.messageId);
    },
    async resetPW({ body }, res) {
        

        const userData = await User.findOneAndUpdate(
            { email: body.email },
            { $set: { password: body.password } },
            {new: true }
        );

        if(!userData) {
            return res.status(400).json({ message: "No user found at this email!" });
        };

        res.json(userData);
    }
};