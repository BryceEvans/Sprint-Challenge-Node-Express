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

router.post('/', (req, res) => {
    const newAction = req.body;
    if (newAction.project_id && newAction.description && newAction.notes) {
        actionDB.insert(newAction)
        .then(idInfo => {
            actionDB.get(idInfo.id)
            .then(action => {
                res.status(201)
                .json(action);
            })
        })
        .catch(err => {
            res.status(500)
            .json({ message: "There was an error while saving the action to the database." })
        })
    } else {
        res.status(400)
        .json({ message: "Provide the action project_id, description, and notes." })
    }
});

module.exports = router;