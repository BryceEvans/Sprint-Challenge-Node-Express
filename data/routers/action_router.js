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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    actionDB.get(id)
    .then(action => {
        if (action) {
            res.json(action);
        } else {
            res.status(404)
            .json({ error: "The action with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500)
        .json({ message: "The action information could not be retrieved." })
    });
});

module.exports = router;