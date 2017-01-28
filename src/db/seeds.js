import app from '../app';
import userModel from '../services/user/user-model';
import projectsModel from '../services/projects/projects-model';
import todosModel from '../services/todos/todos-model';

async function main() {
  await userModel.remove({});

  const user = await app.service('users').create({
      email: 't.bak@selleo.com',
      password: 'secret'
  });

  const user2 = await app.service('users').create({
    email: 'user1@example.com',
    password: 'secret'
  });

  await todosModel.remove({});
  const todos = await todosModel.create([
    {
      text: 'Todo 1.1',
      complete: true,
      owner: user,
    },
    {
      text: 'Todo 1.2',
      owner: user,
    },
    {
      text: 'Todo 2.1',
      owner: user2,
    },
    {
      text: 'Todo 2.2',
      owner: user2,
    }
  ]);

  await projectsModel.remove({});
  const projects = await projectsModel.create([
    {
      name: 'Project 1',
      owner: user,
      todos: [
        todos[0],
        todos[1],
      ]
    },
    {
      name: 'Project 2',
      owner: user2,
      todos: [
        todos[2],
        todos[3],
      ]
    },
  ]);

  console.log('Seeds DONE');
  process.exit();
}

main();
