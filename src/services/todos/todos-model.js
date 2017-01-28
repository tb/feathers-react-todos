'use strict';

// todos-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose, { Schema } from '../../db/mongoose';

const todosSchema = new Schema({
  complete: { type: Boolean},
  text: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'user' },

  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const todosModel = mongoose.model('todos', todosSchema);

module.exports = todosModel;
