const { User } = require('../models');

const { signToken } = require('../utils/auth');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
          });
      
          if (!foundUser) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' });
          }
      
          res.json(foundUser);
    },
    async createUser({ body }, res) {
        const user = await User.create(body);

        if (!user) {
            return res.status(400).json({ message: 'Something is wrong!' });
        }

        const token = signToken(user);
        
        res.json({ token, user });
    },
    async login({ body }, res) {
        const user = await User.findOne({ username: body.username });

        if(!user) {
            res.status(400).json({ message: 'No user found at this username!' });
            return;
        };

        const correctPw = await user.isCorrectPassword(body.password);

        if(!correctPw) {
            return res.status(400).json({ message: 'Incorrect PW!' });
        };

        await User.findOneAndUpdate(
            { username: body.username },
            { confirmVerified: false },
            { new: true }    
        )

        const token = signToken(user);

        res.json({ token, user });
    },
    async sendMail(req, res, next) {

        console.log(process.env.GOOGLE_PW)

        // Create the transporter to send mail
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'acuddwebdev@gmail.com',
                pass: `${process.env.GOOGLE_PW}`
            }
        });

        // Create random 6 digit code
        let code = '';
        for(let i = 0; i < 6; i++) {
            code += Math.floor(Math.random() * 10)
        }

        // Set the code in to the User model
        const userData = await User.findOneAndUpdate(
            { email: req.body.email }, 
            { passwordVerify: code } ,
            { new: true }
        );

        // If no user comes back, then email is incorrect
        if(!userData) {
            res.status(400).json({ message: 'No user found at this email adress!' });
            return;
        }

        // Based of user data that comes back, send email to user with code
        let info = await transporter.sendMail({
            from: '"AJWebDev" acuddwebdev@gmail.com',
            to: req.body.email,
            subject: "Authentication Code",
            text: `Your one time code is ${code}. Your code will expire in 15 minutes. Please do not share your code with anyone.`
        });

        console.log("Message sent: %s", info.messageId);

        res.json(userData)
    },
    async confirmCode(req, res) {
        const userData = await User.findOneAndUpdate(
            { passwordVerify: req.body.code },
            {confirmVerified: true},
            {new: true}
        );

        if(!userData) {
            res.status(400).json({ message: 'The code does not match!' });
            return;
        };

        res.json(userData)
    },
    async resetPW({ body }, res) {

        const userData = await User.findOneAndUpdate(
            { $and: [{email: body.email}, {confirmVerified: true}] },
            { password: body.password },
            { new: true }
        );

        if(!userData) {
            return res.status(400).json({ message: "No user found at this email!" });
        };

        res.json(userData);
    }
};