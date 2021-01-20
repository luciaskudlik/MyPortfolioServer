const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require("./../models/user.model");
const Project = require('./../models/project.model');
const {isLoggedIn} = require("./../helpers/middlewares");

//require uploader, already exported from cloudinary-setup.js
const uploader = require("./../config/cloudinary-setup");


// include CLOUDINARY:
//upload a single image per once.
// ADD an horitzontal middleware
router.post("/upload", uploader.single("image"), (req, res, next) => {
    console.log("file is: ", req.file);
  
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // get secure_url from the file object and save it in the
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
  });

//POST 'api/projects'  => to post a new workshop

router.post('/projects', isLoggedIn, (req, res, next) => {
    const { title, image, about, description, technologies, deployedLink, githubLink, userId}= req.body;

  
    Project.create({
      title,
      image,
      about,
      description,
      technologies,
      deployedLink,
      githubLink,
      likedBy: [],
      comments: [],
      user: userId
    })
    .then((createdProject) => {
      
      
      User.findByIdAndUpdate(userId, {$push: {portfolio: createdProject._id}}, {new:true})
          .then((updatedUser) => {
            res.status(200).send("User updated succesfully.");
          })
          .catch((err) =>  next(err))
  
  
    })
    .catch((err) => {
      next(err)
    });
  });

  //DELETE 'api/projects/:id'  => to delete a project

router.post('/projects/:id', (req, res, next) => {
  console.log("ROUTE WAS CALLED")
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400) //  Bad Request
      .json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndRemove(id)
    .then(() => res.status(200).send("Project deleted succesfully."))
    .catch((err) => next(err))
})



module.exports = router;
