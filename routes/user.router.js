const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require("./../models/user.model");
const Project = require('./../models/project.model');
const {isLoggedIn} = require("./../helpers/middlewares");


//GET/api/user => to get the current user

router.get('/user', isLoggedIn, (req, res, next) => {
    const { _id } = req.session.currentUser;
    console.log(_id)

    User.findById(_id)
        .populate("portfolio")
        .populate("followers")
        .populate("following")
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
        .populate("portfolio")
        .populate("followers")
        .populate("following")
        .then((foundUser) => {
            res.status(200).json(foundUser);
        })
        .catch((err) => {
            next(err);
        })
})

//POST/api/user/follow/:id => to follow a specific user

router.post('/user/follow/:id', (req, res, next) => {

    const {id} = req.params;
    const currentUserId = req.body.currentUserId;

    console.log(currentUserId);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res
          .status(400) //  Bad Request
          .json({ message: "Specified id is not valid" });
        return;
      }


    User.findByIdAndUpdate(id, {$push: {followers: currentUserId}} )
        .then((updatedUser) => {
            User.findByIdAndUpdate(currentUserId, {$push: {following: id}} )
            .then(() => {
                res.status(200).send("User updated succesfully.");
            }).catch(() => { next(err)})
        })
        .catch((err) => { next(err)})
        

})

//POST/api/user/follow/:id => to unfollow a specific user

router.post('/user/unfollow/:id', (req, res, next) => {

    const {id} = req.params;
    const currentUserId = req.body.currentUserId;

    console.log(currentUserId);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res
          .status(400) //  Bad Request
          .json({ message: "Specified id is not valid" });
        return;
      }


    User.findByIdAndUpdate(id, {$pull: {followers: currentUserId}} )
        .then((updatedUser) => {
            User.findByIdAndUpdate(currentUserId, {$pull: {following: id}} )
            .then(() => {
                res.status(200).send("User updated succesfully.");
            }).catch(() => { next(err)})
        })
        .catch((err) => { next(err)})
        

})

module.exports = router;
