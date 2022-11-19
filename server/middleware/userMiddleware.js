const middleware = {};

// Sign Up
middleware.signUp = (req, res, next) => {
    res.locals = {data: 'I am signing up!'}
    next();
    return;
}

// Log In
middleware.logIn = (req, res, next) => {
    res.locals = {data: 'I am logging in!'}
    next();
    return;
}

// Session Authentication
middleware.verifyUser = (req, res, next) => {
    res.locals = {data: 'I am getting verified!'}
    next();
    return;
}


module.exports = middleware;