const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true
        }, 
        last_name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email adress']
        }, 
        password: {
            type: String, 
            required: true
        },
        passwordVerify: {
            type: String
        }, 
        confirmVerified: {
            type: Boolean,
            default: false
        }
    }, 
    {
        toJSON: {
            virtuals: true
        }
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.pre('updateOne', async function(next) {
        const data = this.getUpdate();
        const saltRounds = 10;
        data.password = await bcrypt.hash(data.password, saltRounds);


    next();
})

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;