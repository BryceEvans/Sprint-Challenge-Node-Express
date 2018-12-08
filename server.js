const express = require('express');

const server = express();
PORT = 5050;

server.use(express.json());


server.get('/', (req, res) => {
    res.json({ message: "Up and running" })
});

// Always on bottom!
server.listen(PORT, () => {
    console.log(`Server up and running on ${PORT}`)
});