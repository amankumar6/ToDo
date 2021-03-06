const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

// setting the options for multer
const multerOption = {
    // we are storing the file in memory
    storage: multer.memoryStorage(),
    // checking the fileType
    fileFilter(req, file, next) {
        const isAvatar = file.mimetype.startsWith('image/');
        if (isAvatar) next(null, true);
        else next({ message: "That filetype isn't allowed!" }, false);
    },
};

// rendring the loginForm page
exports.loginForm = (req, res) => {
    if (req.isAuthenticated()) res.redirect('/');
    else res.render('login', { title: 'Login' });
};

// rendring the registerForm page
exports.registerForm = (req, res) => {
    if (req.isAuthenticated()) res.redirect('/');
    else res.render('register', { title: 'Register' });
};

// before registring the user we are passing the data to the middleware to validating the registration details
exports.validateRegister = (req, res, next) => {
    // sanitizing so that user cannot signup with script tags or do any monkey business
    req.sanitizeBody('name');
    req.sanitizeBody('username');

    // checking the user provide all important details
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('username', 'You must enter a unique username!').notEmpty();
    req.checkBody('email', 'That Email is not Valid!').notEmpty().isEmail();

    // normalizing email
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false,
    });

    req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
    req.checkBody(
        'confirm-password',
        'Confirm-Password Cannot be Blank!'
    ).notEmpty();
    req.checkBody('confirm-password', "Oops! Password Didn't matched!").equals(
        req.body.password
    );

    // it will check all the validation methods and if there is any error then it will put them into the errors object
    const errors = req.validationErrors();

    // if there is any errors then passing them to flashes
    if (errors) {
        req.flash(
            'error',
            errors.map((err) => err.msg)
        );
        res.render('register', {
            tite: 'Register',
            body: req.body,
            flashes: req.flash(),
        });
        return;
    }
    next();
};

// if there are no errors then register the user
exports.register = async (req, res, next) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
    });

    // as register is based on callback so we used promisify to make it promise based function
    const register = promisify(User.register, User);
    await register(user, req.body.password);
    next();
};

// rendering the user account 
exports.account = (req, res) => {
    res.render('account', { title: 'Your Account' });
};

// reading the file
exports.upload = multer(multerOption).single('avatar');

// after reading the file we are resizing the file
exports.resize = async (req, res, next) => {
    // checking if there is no new file to resize
    if (!req.file) return next();
    const extension = req.file.mimetype.split('/')[1];
    req.body.avatar = `${uuid.v4()}.${extension}`;

    // resizing the photo
    const avatar = await jimp.read(req.file.buffer);
    await avatar.resize(800, 800);

    // writing the photo in our filesystem
    await avatar.write(`./public/uploads/${req.body.avatar}`);
    next();
};

// updating the user account 
exports.updateAccount = async (req, res) => {
    // finding the current user which is logged in
    const user = await User.find({ _id: req.user._id });

    const currentUserName = user[0]._doc.username;
    const currentEmailId = user[0]._doc.email;

    const username = await User.find({ username: req.body.username });
    const emailId = await User.find({ email: req.body.email });

    // here we are checking that then new username or emailId which user has requested is unique or not if it is not unique then send them then error
    if (username.length && currentUserName != req.body.username) {
        req.flash('error', 'Username is already taken!');
        res.render('account', { flashes: req.flash() });
        return;
    }

    if (emailId.length && currentEmailId != req.body.email) {
        req.flash('error', 'Email-Id already exits!');
        res.render('account', { flashes: req.flash() });
        return;
    }

    // if the requested username and emailId is unique then create a object with all updated values
    let updates = {
        name: req.body.name,
        username: req.body.username,
        bio: req.body.bio,
        email: req.body.email,
    };

    // if user has requested to update the avatart then only change the avatar if we dont't do that then it will set the default avatar
    if (req.file) updates.avatar = req.body.avatar;

    // finally find the user and update the information
    await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query' }
    );

    req.flash('success', 'Updated');
    res.redirect('/account');
};
