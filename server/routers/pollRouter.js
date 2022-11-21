const express = require('express');
const router = express.Router();
const pollFunctions = require('../middleware/pollMiddleware');

router.post('/', pollFunctions.savePollFormat, (req, res) => {
    res.status(200).json(res.locals.pollID);
    return;
})

router.get('/:id', pollFunctions.getPollFormat, (req, res) => {
    res.status(200).json(res.locals.getPollFormat);
    return;
})

router.post('/:id', pollFunctions.savePollResponse, (req, res) => {
    res.status(200).send('update successful');
    return;
})

router.get('/:id/display', pollFunctions.getPollResponses, (req, res) => {
    res.status(200).json(res.locals);
    return;
})

module.exports = router;
