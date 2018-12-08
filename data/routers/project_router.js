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

router.post('/', (req, res) => {
    const newProject = req.body;
    if (newProject.name && newProject.description) {
        projectDB.insert(newProject)
        .then(idInfo => {
            projectDB.get(idInfo.id)
            .then(project => {
                res.status(201)
                .json(project);
            })
        })
        .catch(err => {
            res.status(500)
            .json({ message: "There was an error while saving the project to the database." })
        })
    } else {
        res.status(400)
        .json({ message: "Provide the project name and description." })
    }
});

module.exports = router;