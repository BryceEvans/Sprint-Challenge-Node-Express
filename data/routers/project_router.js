const express = require('express');
const projectDB = require('../helpers/projectModel');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    projectDB.get()
    .then((projects) => {
        res.json(projects);
    })
    .catch(err => {
        res.status(500)
        .json({ error: "The projects could not be retrieved." })
    });
});

module.exports = router;