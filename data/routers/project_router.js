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

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    projectDB.remove(id)
    .then(count => {
        if (count) {
            res.json({ message: "Project successfully deleted." })
        } else {
            res.status(404)
            .json({ message: "The project with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500)
        .json({ message: "The project could not be removed." })
    })
})

router.put('/:id', (req, res) => {
    const editProject = req.body;
    const { id } = req.params;
    if (editProject) {
        projectDB.update(id, editProject)
        .then(count => {
            if (count) {
                res.json({ message: "The project was updated." })
            } else {
                res.status(400)
                .json({ message: "The project with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500)
            .json({ message: "The project information could not be updated." })
        })
    } else {
        res.status(400)
        .json({ message: "Provide the project name and description." })
    }
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
    projectDB.getProjectActions(id)
    .then(actions => {
        if (actions.length > 0) {
            res.json(actions);
        } else {
            res.status(404)
            .json({ message: "The project with the specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(500)
        .json({ message: "The project's actions could not be retireved." });
    })
});

module.exports = router;