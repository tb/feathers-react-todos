'use strict';

// projects-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'todos' }],

  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const projectsModel = mongoose.model('projects', projectsSchema);

module.exports = projectsModel;
