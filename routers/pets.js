const express = require('express');
const router = express.Router();//tiny lego brick
const Pet = require('../models/pet');

// routes (get, create, update, delete)

// get all pets
router.get('/pets', async (req, res, next) => {
    try {
        const pets = await Pet.find();
        res.status(200).json({
            "pets": pets
        })
    } catch(err) {
        next(err);
    }
});
// get one special pet by id
router.get('/pets/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const pets = await Pet.find({ _id: id });
        res.status(200).json({
            pets: pets
        })
    }   catch (err) {
            next(err);
        }
    

});
// create new pet
router.post('/pets', async (req, res, next) => {
    const { name, owner, petType, age, createdAt } = req.body;
    try {
        const pet = new Pet({ name, owner, petType, age, createdAt });
        await pet.save();
        res.status(201).json({
            msg: "Saved pet",
        });
    } catch (err) {
        next(err);
    }
});
//update one special pet by id
router.put('/pets/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, owner, petType, age } = req.body;
    try {
     const updatedPet = await Pet.findByIdAndUpdate(id, { name, owner, petType, age }, { new: true });
     res.status(200).json({
         msg: "update successful",
     });
    } catch (error) {
        next(err);
    }
});
//delete one special pet by id
router.delete('/pets/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await Pet.findByIdAndRemove(id);
        res.status(200).json({
            msg: "yayyy destruction"
        });
    }   catch (err) {
        next(err);
    }
});

module.exports = router;