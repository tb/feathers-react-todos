import React, { Component } from 'react';

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
