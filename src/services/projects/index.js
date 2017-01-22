'use strict';

const service = require('feathers-mongoose');
const projects = require('./projects-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: projects,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/projects', service(options));

  // Get our initialize service to that we can bind hooks
  const projectsService = app.service('/projects');

  // Set up our before hooks
  projectsService.before(hooks.before);

  // Set up our after hooks
  projectsService.after(hooks.after);
};
