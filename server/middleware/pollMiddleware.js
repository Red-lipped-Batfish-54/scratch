const db = require('../db/db')

const middleware = {};

middleware.savePollFormat = (req, res, next) => {
    res.locals = {data: 'Im a poll format!'}
    next();
    return;
}

middleware.getPollFormat = async (req, res, next) => {
    try {
      const results = await db.query("SELECT poll_options, poll_prompt FROM poll WHERE poll_id = $1", [req.params.id]);
      res.locals.poll_options = results.rows;
      next();
      return;
    }
    catch(err) {
        console.log(err);
        return next(err);
    }
}

middleware.savePollResponse = (req, res, next) => {
    res.locals = {data: 'Im one poll response for ID: ' + req.params.id}
    next();
    return;

}

middleware.getPollResponses = async (req, res, next) => {
    try{
        const results = await db.query("SELECT * FROM poll WHERE poll_id = $1", [req.params.id]);
        console.log('results', results);
        const data = {
          status: "success",
          results: results.rows.length,
            poll: results.rows
        };
        res.locals = data;
        next();
        return;
      } catch(err){ 
        next(err);
        return;
      }
}

module.exports = middleware;
