const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'Please Enter a username',
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        // server side validation for email address
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please Enter an Email Address',
    },
    name: {
        type: String,
        trim: true,
        required: 'Please Enter your Name',
    },
    slug: String,
    bio: String,
    avatar: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    todos: [
        {
            task: {
                type: String,
                trim: true,
                required: 'Please Enter your Task',
            },
            dueDate: {
                type: Date,
                default: new Date(+new Date() + 3 * 24 * 60 * 60 * 1000),
            },
            dueTime: String,
            done: {
                type: Boolean,
                default: false,
            },
        },
    ],
});

// setting the virtual schema for default avatar
userSchema.virtual('gravatar').get(function () {
    const hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}`;
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
