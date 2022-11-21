const db = require("../db/db.js");

// require db
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
