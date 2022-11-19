const middleware = {};

middleware.savePollFormat = (req, res, next) => {
    res.locals = {data: 'Im a poll format!'}
    next();
    return;
}

middleware.savePollResponse = (req, res, next) => {
    res.locals = {data: 'Im one poll response for ID: ' + req.params.id}
    next();
    return;

}

middleware.getPollResponses = (req, res, next) => {
    res.locals = {data: 'Im all of the poll responses for ID: ' + req.params.id}
    next();
    return;
}

module.exports = middleware;
