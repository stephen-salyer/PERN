import React, {Fragment, useState} from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  makeStyles,
} from '@material-ui/core';
import {ListTodo} from './ListTodo';

const useStyles = makeStyles((theme) => ({
  textField: {
    [`& fieldset`]: {
      borderRadius: '5px 0 0 5px',
    },
  },
}));

const InputTodo = ({todo, addTodoItem}) => {
  const classes = useStyles();
  const [description, setDescription] = useState('');

  return (
    <Fragment>
      <form onSubmit={(e) => {
                  e.preventDefault();
                  addTodoItem(description, todo);
                  setDescription('');
                }}>
      <Box pb={2}>
        <Typography variant="h3">Things To Do</Typography>
      </Box>
      <Grid container>
        <Grid item xs={12}>
          <Box pt={2} display="flex" alignItems="center">
              <TextField
                fullWidth
                id="add-todo"
                label="Add To Your list"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value, todo)}
                className={classes.textField}
              />
              <Button
                variant="contained"
                color="primary"
                style={{
                  height: 56,
                  marginLeft: -1,
                  borderRadius: '0 5px 5px 0',
                  minWidth: 120,
                }}
              >
                Add To List
              </Button>
          </Box>
        </Grid>
      </Grid>
      </form>
    </Fragment>
  );
};

export default InputTodo;
