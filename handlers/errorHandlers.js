// instead of using try catch in each controller, I wrap the function in catchErrors() which will catch any errors they throw, and pass it along to the express middleware with next()
exports.catchErrors = (fn) => {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

// if there is any route that in not found than we mark it as 404 and pass it along to the next error handler to display
exports.notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};

// it will detect if there are mongodb validation errors
exports.flashValidationErrors = (err, req, res, next) => {
    if (!err.errors) return next(err);
    // validation errors look like
    const errorKeys = Object.keys(err.errors);
    errorKeys.forEach((key) => req.flash('error', err.errors[key].message));
    res.redirect('back');
};

// it shows good error message if we hit a syntax or any other previously un-handled error
exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status,
        stackHighlighted: err.stack.replace(
            /[a-z_-\d]+.js:\d+:\d+/gi,
            '<mark>$&</mark>'
        ),
    };
    res.status(err.status || 500);
    res.format({
        // Based on the `Accept` http header
        'text/html': () => {
            res.render('error', errorDetails);
        }, // Form Submit, Reload the page
        'application/json': () => res.json(errorDetails), // Ajax call, send JSON back
    });
};

// removed all stacktraces so that they are not leaked to user
exports.productionErrors = (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
    });
};
