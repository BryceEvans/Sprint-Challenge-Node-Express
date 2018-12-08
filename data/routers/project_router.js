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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    projectDB.get(id)
    .then(project => {
        if (project) {
            res.json(project);
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