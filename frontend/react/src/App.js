import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import TextEditor from './components/text-editor/TextEditor';
import Home from './pages/home/Home';
import Todo from './pages/todo/Todo';
import Dashboard from './pages/dashboard/Dashboard';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <div className="dashboard">
              <div className="wrapper ">
                <Sidebar />
                <div className="main-panel">
                  <Header className="header" />
                  <Route path="/" exact component={Home} />
                  <Route path="/dashboard" exact component={Dashboard} />
                  <Route path="/todos" exact component={Todo} />
                  <Route path="/text-editor" exact component={TextEditor} />
                  <Footer />
                </div>
              </div>
            </div>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }

}
