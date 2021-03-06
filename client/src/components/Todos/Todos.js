import React, { Component } from 'react';
import { clientRx } from '../../feathers';

import {
  Button,
  Checkbox,
  CircularProgress,
  TextField,
} from 'react-md/lib';

const todos = clientRx.service('todos');

class Todos extends Component {
  state = {
    todos: [],
    text: ''
  };

  componentDidMount() {
    this.todos$ = todos.find()
      .subscribe(todos => this.setState({todos: [...todos.data], loaded: true}));
  }

  componentWillUnmount() {
    this.todos$.unsubscribe();
  }

  updateText(value) {
    this.setState({text: value});
  }

  createTodo(ev) {
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
            {
              !this.state.loaded &&
              <CircularProgress key="progress" id="todos-loading"/>
            }
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
