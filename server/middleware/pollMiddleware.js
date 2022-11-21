const db = require('../db/db')

const middleware = {};

middleware.savePollFormat = async (req, res, next) => {
  try {
    const query = 'SELECT MAX(poll_id) FROM poll';
    const pollID = await db.query(query);

    const maxID = pollID.rows[0].max + 1;
    const prompt = req.body[0];
    const options = req.body;

    for (let i = 1; i < req.body.length; i++) {
      const insert = "INSERT INTO poll (poll_id, poll_options, poll_prompt) VALUES ($1, $2, $3)" ;
      db.query(insert, [maxID, options[i], prompt], (err, res) => {
        console.log('update successful')
      })
    }
    res.locals.pollID = maxID;
    return next();
  } catch(err) {
    console.log(err)
  }
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
  try{
    const insert = "INSERT INTO poll (poll_id, entries, users) VALUES ($1, $2, $3)";
    const pollId = req.params.id
    const users = req.body.user;
    const entries = req.body.answer;
    db.query(insert, [pollId, entries, users], (err, res) => {
        console.log('update successful')
      })
    next();
    return;
  } catch(err) {
    console.log(err)
  }
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
        res.locals = results;
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
