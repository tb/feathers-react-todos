import React, { Component } from 'react';
import Helmet from 'react-helmet';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import Todos from '../Todos/Todos';

class App extends Component {
  render() {
    return (
      <Todos />
    );
  }
};

export default App;
