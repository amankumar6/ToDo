const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

// Logging in
exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login!',
    successRedirect: '/',
    // successFlash: 'You are now logged in!',
});

// Logging out
exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out! 👋');
    res.redirect('/login');
};

// Checking if the user is logged in or not if not logged in send them to the login page
exports.checkLogIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
};

// rendering the forgot page
exports.forgot = async (req, res) => {
    if (req.isAuthenticated()) res.redirect('/');
    else res.render('forgotPassword', { title: 'Forgot Password' });
};

// middleware for checking if user exits or not, if any user exits then send the reset email
exports.forgotPassword = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    // if no user found then redirect them to login page
    if (!user) {
        req.flash('error', 'No account exist!');
        return res.redirect('/login');
    }

    // genereating the resetPasswordToken and resetPasswordExpires
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    const resetURL = `http://${req.headers.host}/resetPassword/${user.resetPasswordToken}`;

    // sending the information which is to be sent from them mail
    await mail.send({
        user,
        filename: 'password-reset',
        subject: 'Password Reset',
        resetURL,
    });

    req.flash('success', 'You have been emailed a password reset link');
    res.redirect('/login');
};

// checking the resetToken is valid and not expired and then rendering the resetPassword form
exports.resetPassword = async (req, res) => {
    // checking the resetPasswordToken and resetPasswordExpires is valid and not expired yet respectively
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    // if resetPasswordToken or resetPasswordExpires is notvalid and or expired then redirecting them to login page
    if (!user) {
        req.flash('error', 'Password reset is invalid or has expired');
        return res.redirect('/login');
    }

    // if user exits then send them to the resetPassword page
    res.render('resetPassword', { title: 'Reset your Password' });
};

// checking if the password entered in the fields match or not
exports.confirmedPassword = (req, res, next) => {
    if (req.body.password === req.body['confirm-password']) return next();
    req.flash('error', 'Password do no match!');
    res.redirect(`/resetPassword/${req.params.token}`);
};

// after resetting the password logging in the user
exports.updatePassword = async (req, res) => {
    // checking again that resetPasswordToken and resetPasswordExpires is valid and not expired yet respectively because there is a case that user can go to the resetPassword page and then change the password after 1hr in that case we have to check that the resetPasswordExpires is still not expired
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
        req.flash('error', 'Password reset is invalid or has expired');
        return res.redirect('/login');
    }

    // if everything goes fine then finally change the password
    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body.password);
    
    // after resetting the password deleting the resetPasswordToken and resetPasswordExpires from schema and then save the user and directly logged them in
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    const updatedUser = await user.save();
    await req.login(updatedUser);
    res.redirect('/');
};
