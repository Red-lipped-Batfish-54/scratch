const express = require('express');
// const cookierParser = require('cookie-parser');
const path = require('path');
const db = require('./db/db.js');
const PORT = 3000;



const cors = require('cors')
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../client')));
app.use(cors());
/////////////////////////
app.get("/api/:id", async(req, res)=>{
  try{
    const results = await db.query("SELECT * FROM poll WHERE poll_id = $1", [req.params.id]);
    console.log('results', results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
        poll: results.rows
    })
  } catch(err){ 
    console.log(err)
  }
})

app.get("/api", async(req, res)=>{
    try{
      const results = await db.query("SELECT * FROM poll");
      console.log(results);
      res.status(200).json({
        status: "success",
        results: results.rows.length,
          poll: results.rows
      })
    } catch(err){ 
      console.log(err)
    }
})
  

////////////////////////////
app.listen(PORT, () => console.log(`SERVER IS LISTENING ON PORT: ${PORT}`)); //listens on port 3000 -> http://localhost:3000/

// modules.exports = app;
