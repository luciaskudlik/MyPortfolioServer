const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {type: String, required: true},
    image: {type: String},
    about: String,
    description: {type: String, required: true},
    technologies: {type: String},
    deployedLink: {type: String, required: true},
    githubLink: {type: String, required: true},
    likedBy: [{type: Schema.Types.ObjectId, ref: "User"}],
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
    user: {type: Schema.Types.ObjectId, ref: "User"}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;