import React, { Component } from 'react';
import Helmet from 'react-helmet';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import Todos from '../Todos/Todos';

class App extends Component {
  render() {
    return (
      <div>
        <a href="/auth/google">Login via Google</a>
        <Todos />
      </div>
    );
  }
};

export default App;
