const express = require('express');
const server = express();
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

//setup environment variables
dotenv.config();

//connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });


// setup our port
const port = process.env.PORT || 8008;

// power ups (middleware)
server.use(helmet());
server.use(morgan("combined"));
server.use(bodyParser.json());  //accept json data
server.use(bodyParser.urlencoded({ extended: true }));  //accept html form data

//models
const Pet = mongoose.model('Pet', { name: String, owner: String });

// routes (get, create, update, delete)

// get all pets
server.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json({
            "pets": pets
        })
    } catch(err) {
        res.status(500).json({
            msg: 'stuff done broke'
        });
    }
});
// get one special pet by id
server.get('/pets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pets = await Pet.find({ _id: id });
        res.status(200).json({
            pets: pets
        })
    }   catch (err) {
        res.status(500).json({
            msg: 'Stuff still broke!!!'
        });
    }

});
// create new pet
server.post('/pets', async (req, res) => {
    const { name, owner } = req.body;
    try {
        const pet = new Pet({ name, owner });
        await pet.save();
        res.status(201).json({
            msg: "Saved pet",
            pet
        });
    } catch (err) {
        res.status(500).json({
            msg: "Pet not created"
        });
    }
});
//update one special pet by id
server.put('/pets/:id', (req, res) => {
    res.send(`updating ${req.params.id} pet`);
});
//delete one special pet by id
server.delete('/pets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Pet.findByIdAndRemove(id);
        res.status(200).json({
            msg: "yayyy destruction"
        });
    }   catch (err) {
        res.status(500).json({
            msg: "broked"
        });
    }
});

// kick it off
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});