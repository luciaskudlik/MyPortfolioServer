const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require("./../models/user.model");
const Project = require('./../models/project.model');
const {isLoggedIn} = require("./../helpers/middlewares");


//GET/api/user => to get the current user

router.get('/user', isLoggedIn, (req, res, next) => {
    const { _id } = req.session.currentUser;

    User.findById(_id)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            next(err);
        })
})

//GET/api/users => to get all users

router.get('/users', (req, res, next) => {
    
    User.find()
        .then((allUsers) => {
            res.status(200).json(allUsers);
        })
        .catch((err) => {
            next(err);
        })
})

//GET/api/user/:id => to get a specific user

router.get('/user/:id', (req, res, next) => {

    const {id} = req.params;

    User.findById(id)
        .then((foundUser) => {
            res.status(200).json(foundUser);
        })
        .catch((err) => {
            next(err);
        })
})


module.exports = router;
