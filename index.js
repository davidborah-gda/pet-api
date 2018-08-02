const express = require('express');
const server = express();


// setup our port
const port = process.env.PORT || 8008;

// power ups (middleware)


// routes (get, create, update, delete)

// get all pets
server.get('/pets', (req, res) => {
    res.send('getting all pets');
});
// get one special pet by id
server.get('/pets/:id', (req, res) => {
    res.send(`get ${req.params.id} pet`);
});
// create new pet
server.post('/pets', (req, res) => {
    res.send(`creating a new pet`);
});
//update one special pet by id
server.put('/pets/:id', (req, res) => {
    res.send(`updating ${req.params.id} pet`);
});
//delete one special pet by id
server.delete('/pets/:id', (req, res) => {
    res.send(`deleting ${req.params.id} pet`);
});

// kick it off
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});