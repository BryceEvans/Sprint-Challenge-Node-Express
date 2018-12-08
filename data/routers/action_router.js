const express = require('express');
const actionDB = require('../helpers/actionModel');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    actionDB.get()
    .then((actions) => {
        res.json(actions);
    })
    .catch(err => {
        res.status(500)
        .json({ error: "The actions could not be retrieved." })
    });
});

module.exports = router;