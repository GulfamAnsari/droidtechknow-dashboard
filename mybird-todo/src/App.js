import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Scrol from './components/scrol/Scrol';
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
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/todos" exact component={Todo} />
            <Route path="/scroll" exact component={Scrol} />
            <Route path="/text-editor" exact component={TextEditor} />
          </Switch>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    )
  }

}
