'use strict';

// Add any common hooks you want to share across services in here.
// 
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

import { get } from 'lodash';

// IMPORTANT: start server with: npm run start:dbg
exports.debugger = function() {
  return function(hook) {
    console.log(hook);
    debugger;
  };
};

// https://github.com/feathersjs/feathers-authentication/issues/223#issuecomment-226209456
exports.googleAuthCallback = function (options) {
  return function (hook) {
    if (!hook.data.google) return hook; //bail if there's data;

    const email = hook.data.google.emails[0].value;
    const data = {
      email,
    };

    // Find existing user OR just crete new account
    return this.find({ query: { email } })
      .then(results => {
        let existingUser = results[0] || results.data && results.data[0];
        if (existingUser) {
          // update
          return this.patch(existingUser.id, data)
            .then(updatedUser => {
              hook.result = updatedUser;
              return hook;
            });
        } else {
          // generate password
          data.password = Math.random().toString(36).slice(-20);
        }
        // create
        return this.create(data).then(user => {
          hook.result = user;
          return hook;
        }).catch(err => console.log(err));

      }).catch(err => console.log(err));
  };
};
