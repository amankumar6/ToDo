const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');
const mg = require('nodemailer-mailgun-transport');

let auth = {
    auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN,
    },
};

const transport = nodemailer.createTransport(mg(auth));

const generateHTML = (filename, options = {}) => {
    const html = pug.renderFile(
        `${__dirname}/../views/email/${filename}.pug`,
        options
    );
    const inline = juice(html);
    return inline;
};

exports.send = async (options) => {
    const html = generateHTML(options.filename, options);
    const text = htmlToText.fromString(html);
    const mailOption = {
        from: 'amankumar786dpsdh@gmail.com',
        to: options.user.email,
        subject: options.subject,
        html,
        text,
    };
    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOption);
};
