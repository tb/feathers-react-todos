import React, { Component } from 'react';
import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import rx from 'feathers-reactive';
import RxJS from 'rxjs';

import {
  Button,
  Checkbox,
  CircularProgress,
  TextField,
} from 'react-md/lib';

// eslint-disable-next-line
const socket = window.socket = io('http://localhost:3030');
const app = window.app = feathers()
  .configure(socketio(socket))
  .configure(rx(RxJS, {idField: '_id'}));
const todos = app.service('todos');

class Todos extends Component {
  state = {
    todos: [],
    text: ''
  };

  componentDidMount() {
    this.todos$ = todos.find().subscribe(todos => this.setState({todos: [...todos.data], loaded: true}));
  }

  componentWillUnmount() {
    this.todos$.unsubscribe();
  }

  updateText(value) {
    this.setState({text: value});
  }

  createTodo(ev) {
    debugger

    ev.preventDefault();
    todos.create({
      text: this.state.text,
      complete: false
    });
    this.setState({text: ''});
  }

  updateTodo(todo, value) {
    todo.complete = value;
    todos.patch(todo._id, todo);
  }

  deleteTodo(todo) {
    todos.remove(todo._id);
  }

  render() {
    const renderTodo = todo => (
      <tr key={todo._id}>
        <td>
          <Checkbox
            id="todo-{todo.id}"
            name="complete"
            checked={todo.complete}
            onChange={this.updateTodo.bind(this, todo)}
          />
        </td>
        <td style={{width: '100%'}}>
          {todo.text}
        </td>
        <td>
          <Button icon primary onClick={this.deleteTodo.bind(this, todo)}>close</Button>
        </td>
      </tr>
    );

    return (
      <div className='container'>
        <div className="md-grid">
          <div className="md-cell md-cell--6">
            {!this.state.loaded && <CircularProgress key="progress" id="todos-loading"/>}
            <table className="mdl-data-table md-data-table--plain">
              <tbody>
                {this.state.todos.map(renderTodo)}
              </tbody>
            </table>
          </div>
        </div>

        <div className="md-grid">
          <form className="md-cell md-cell--6" onSubmit={this.createTodo.bind(this)}>
            <TextField
              id="text"
              lineDirection="center"
              placeholder="New Todo"
              value={this.state.text}
              onChange={this.updateText.bind(this)}
            />
          </form>
        </div>
      </div>
    );
  }
};

export default Todos;
