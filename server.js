const express = require('express');

const projectRouter = require('./data/routers/project_router');
const actionRouter = require('./data/routers/action_router');

const server = express();
PORT = 5050;

server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.json({ message: "Up and running and running." })
});

// Always on bottom!
server.listen(PORT, () => {
    console.log(`Server up and running on ${PORT}`)
});