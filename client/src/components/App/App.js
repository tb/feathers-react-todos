import React, { Component } from 'react';
import Button from 'react-md/lib/Buttons';

import Todos from '../Todos/Todos';

import { client } from '../../feathers';

class App extends Component {
  state = {
    loggedIn: false,
  };

  componentDidMount() {}

  login = () => {
    client.authenticate({
      type: 'local',
      email: 'admin@feathersjs.com',
      password: 'secret',
    })
      .then((result) => {
        this.setState({ loggedIn: true });
        console.log('Login Success', result);
      })
      .catch((result) => {
        console.log('Login Failed', result);
      })
  };

  logout = () => {
    client.logout()
      .then((result) => {
        this.setState({ loggedIn: false });
        console.log('Logout Success', result);
      })
      .catch((result) => {
        console.log('Logout Failed', result);
      })
  };

  render() {
    return (
      <div>
        {
          !this.state.loggedIn &&
          <div>
            <Button raised href={'/auth/google'} label={'Login via Google'} />
            <Button raised onClick={this.login} label={'Login via Password'} />
          </div>
        }
        {
          this.state.loggedIn &&
          <div>
            <Button raised onClick={this.logout} label={'Logout'} />
            <Todos />
          </div>
        }
      </div>
    );
  }
};

export default App;
