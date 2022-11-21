const db = require("../db/db.js");

// require db
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


middleware.deletePoll = async (req, res, next) => {
    try{
        const results = await db.query("DELETE FROM poll WHERE id = $1", [req.params.key]);
        console.log(req.params.key)
        console.log('results', results);
        res.locals = data;
        next();
        return;
      } catch(err){ 
        next(err);
        return;
      }
}


module.exports = middleware;
