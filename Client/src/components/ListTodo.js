import React, {Fragment, useEffect, useState} from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Tooltip,
} from '@material-ui/core';
import {RemoveCircle} from '@material-ui/icons';
import EditTodo from './EditTodo';
import InputTodo from './InputTodo';

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  //Delete todo

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  //Edit todo

  const updateDescription = async (description, todo) => {
    try {
      const body = {description};
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });
      const response = await fetch('http://localhost:5000/todos/');
      setTodos(await response.json());

      console.log(description);
    } catch (err) {
      console.log(err.message);
    }
  };

  //Add todo

  const addTodoItem = async (description) => {
    try {
      const body = {description};
      await fetch(`http://localhost:5000/todos/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });
      const response = await fetch('http://localhost:5000/todos/');
      // window.location = "/";
      setTodos(await response.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos/');

      setTodos(await response.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <InputTodo addTodoItem={addTodoItem} />
      <List>
        {todos.map((todo) => (
          <ListItem role={undefined} button key={todo.todo_id} divider>
            <ListItemText
              primary={<Typography variant="h6">{todo.description}</Typography>}
            />
            <ListItemSecondaryAction>
              <Box display="flex">
              <Tooltip title="Edit" aria-label="Edit"> 
                <Box pr={2}>
                  <EditTodo todo={todo} updateDescription={updateDescription} />
                </Box>
                </Tooltip>
                <Tooltip title="Delete" aria-label="Delete"> 
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  <RemoveCircle />
                </IconButton>
                </Tooltip>
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
};

export default ListTodo;
