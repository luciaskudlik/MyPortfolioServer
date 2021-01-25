const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require("./../models/user.model");
const Project = require('./../models/project.model');
const Comment = require('./../models/comment.model');
const {isLoggedIn} = require("./../helpers/middlewares");



//POST 'api/comments'  => to post a new comment

router.post('/comments', isLoggedIn, (req, res, next) => {
    const {text, projectId, userId}= req.body;

  
    Comment.create({
        text,
        project: projectId,
        writtenBy: userId
    })
    .then((createdComment) => {
      
      
      Project.findByIdAndUpdate(projectId, {$push: {comments: createdComment._id}}, {new:true})
          .then((updatedProject) => {
            res.status(200).send("Project updated succesfully.");
          })
          .catch((err) =>  next(err))
  
  
    })
    .catch((err) => {
      next(err)
    });
  });


  //GET 'api/comments/:id'  => to get a specific comment

  router.get('/comments/:id', (req, res, next) => {
    const {id}= req.params;

    Comment.findById(id)
    .populate("writtenBy")
    .then((foundComment) => {
        res.status(200).json(foundComment);
    })
    .catch((err) => {
      next(err)
    });
  });




module.exports = router;