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
import Profile from './pages/profile/Profile';
import Weather from './pages/weather/Weather';
import Aqi from './pages/aqi/Aqi';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter basename="/admin/react/">
        <React.Fragment>
          <Switch>
            <Route path="/admin/react/" exact component={Home} />
            <div className="dashboard">
              <div className="wrapper ">
                <Route path="/admin/react/" component={Sidebar} />
                <div className="main-panel">
                  <Route path="/admin/react/" component={Header} />
                  <Route path="/admin/react/dashboard" exact component={Dashboard} />
                  <Route path="/admin/react/profile" exact component={Profile} />
                  <Route path="/admin/react/todos" exact component={Todo} />
                  <Route path="/admin/react/weather" exact component={Weather} />
                  <Route path="/admin/react/aqi" exact component={Aqi} />
                  <Route path="/admin/react/text-editor" exact component={TextEditor} />
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
