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
        if (newAction.description.length < 128) {
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
            .json({ message: "Action descripition must be less than 128 characters." })
        }
    } else {
        res.status(400)
        .json({ message: "Provide the action project_id, description, and notes." })
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    actionDB.remove(id)
    .then(count => {
        if (count) {
            res.json({ message: "Action successfully deleted." })
        } else {
            res.status(404)
            .json({ message: "The action with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500)
        .json({ message: "The action could not be removed." })
    })
})

router.put('/:id', (req, res) => {
    const editAction = req.body;
    const { id } = req.params;
    if (editAction) {
        actionDB.update(id, editAction)
        .then(count => {
            if (count) {
                res.json({ message: "The action was updated." });
            } else {
                res.status(400)
                .json({ message: "The action with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500)
            .json({ message: "The action infomration could not be updated." })
        })
    } else {
        res.status(400)
        .json({ message: "Provide action project_id, description, and notes." })
    }
})

module.exports = router;