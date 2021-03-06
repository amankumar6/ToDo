const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('./helpers');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const errorHandlers = require('./handlers/errorHandlers');
// for timezone
const moment = require('moment-timezone');

require('./handlers/passport');

// creating express app
const app = express();

// Sentry.init({
//     dsn: process.env.DSN,
//     integrations: [
//         new Sentry.Integrations.Http({ tracing: true }),
//         new Tracing.Integrations.Express({ app }),
//     ],
//     tracesSampleRate: 1.0,
// });

// view engine setup

// folder were all pug files are stored
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// sentry is for error monoitoring
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler());

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// exposes a bunch of methods for validating data.
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// sessions allow us to store data on visitors from request to request
// this keeps users logged in and allows us to send flash messages
app.use(
    session({
        secret: process.env.SECRET,
        key: process.env.KEY,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

// Passport JS is used to handle logins
app.use(passport.initialize());
app.use(passport.session());

// flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    res.locals.user = req.user || null;
    res.locals.currentPath = req.path;
    next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
    req.login = promisify(req.login, req);
    next();
});

// after all that above middleware, we finally handle our own routes!
app.use('/', routes);

// error monoitoring
// app.use(Sentry.Handlers.errorHandler());

// if above routes didn't work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Ooe of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// otherwise this was a really bad error we didn't expect!
if (app.get('env') === 'development') {
    app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// done! exporting it so we can start the site in start.js
module.exports = app;
