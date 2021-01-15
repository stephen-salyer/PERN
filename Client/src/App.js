import React, {Fragment} from 'react';
import './App.css';
import {Container} from '@material-ui/core/';

//components

import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';

function App() {
  return (
    <Fragment>
      <Container maxWidth="md" style={{marginTop: 80}}>
        <ListTodo />
      </Container>
    </Fragment>
  );
}

export default App;
