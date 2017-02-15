import io from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication-client';
import socketio from 'feathers-socketio/client';
import rx from 'feathers-reactive';
import RxJS from 'rxjs';

// FIXME jwt not set in localStorage
// import cookie from 'react-cookie';
// console.log(cookie.load('feathers-jwt'))
// localStorage.setItem('feathers-jwt', cookie.load('feathers-jwt'));

// eslint-disable-next-line
const socket = window.socket = io('http://localhost:3030');

export const client = window.client = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(authentication({ storage: window.localStorage, idField: '_id' }));

export const clientRx = client
  .configure(rx(RxJS, { idField: '_id' }));

