import React, {useState} from 'react';
import {Edit, Close} from '@material-ui/icons';
import {
  IconButton,
  makeStyles,
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Backdrop,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    outline: 0,
    minWidth: '40vw',
  },
  button: {
    maxWidth: '98px',
  },
  modalButton: {
    marginTop: '8px',
    maxWidth: '98px',
  },
  padding: {
    padding: '4px 0 0 0',
    margin: '0 0 12px 0',
  },
}));

const EditTodo = ({todo, updateDescription}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = useState(todo.description);

  return (
    <>
      <IconButton
        data-target={`#id${todo.todo_id}`}
        edge="end"
        aria-label="edit"
        onClick={() => setOpen(true)}
      >
        <Edit />
      </IconButton>
      <Modal
        disableEnforceFocus
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        id={`id${todo.todo_id}`}
      >
        <div className={classes.paper}>
          <Box display="flex" justifyContent="space-between">
            <Typography
              variant="h5"
              id="transition-modal-title"
              style={{margin: '10px 0'}}
            >
              Edit Thing To Do
            </Typography>
            <Box>
              <IconButton onClick={() => setOpen(false)} color="inherit">
                <Close />
              </IconButton>
            </Box>
          </Box>
          <Box pt={2}>
            <TextField
              fullWidth
              id="edit-todo"
              label="Edit Item"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  updateDescription(description, todo);
                  setOpen(false);
                }
              }}
              className={classes.textField}
            />
          </Box>
          <Box pt={2} display="flex" justifyContent="flex-end">
            <Box pr={1}>
              <Button color="primary" onClick={() => setOpen(false)}>
                Discard
              </Button>
            </Box>
            <Button
              onClick={(e) => {
                e.preventDefault();
                updateDescription(description, todo);
                setOpen(false);
              }}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default EditTodo;
