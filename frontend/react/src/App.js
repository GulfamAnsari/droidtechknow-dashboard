import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import TextEditor from './components/text-editor/TextEditor';
import Home from './pages/home/Home';
import Todo from './pages/todo/Todo';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/todos" exact component={Todo} />
            <Route path="/text-editor" exact component={TextEditor} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }

}
