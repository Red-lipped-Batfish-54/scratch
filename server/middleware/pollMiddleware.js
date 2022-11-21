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
      let pollOptions = results.rows;
      const pollOptionsArray = [];
      let pollPrompt;
      pollOptions.forEach((object) => {
        if (object.poll_options) pollOptionsArray.push(object.poll_options);
        if (object.poll_prompt) pollPrompt = object.poll_prompt;
      })
      res.locals.getPollFormat = {
        pollOptionsArray: pollOptionsArray,
        pollPrompt: pollPrompt
      }
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
