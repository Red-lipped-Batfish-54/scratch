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
//in progress
middleware.updatePoll = async (req, res, next) => {
    try{
        console.log('in updatepoll middleware', req.body)
        console.log(req.params.key)
        const results = await db.query("UPDATE poll SET users=$1, entries=$2 WHERE id=$3", [req.body.users, req.body.entries, req.params.key]);
        // console.log(req.params.key)
        // console.log('results', results);
        const data = {
            status: "success",
            results: results.rows.length,
              poll: results.rows[0]
          };
        res.locals = data;
        next();
        return;
      } catch(err){ 
        console.log
        next(err);
        return;
      }
}

module.exports = middleware;
