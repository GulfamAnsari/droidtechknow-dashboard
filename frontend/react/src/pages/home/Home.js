import React, { Component } from 'react';
import Login from '../../components/log-in/Login';
import Signup from '../../components/sign-up/Signup';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import * as hlp from '../../helper/helper-functions';
import * as Backend from '../../helper/backend';
import './Home.scss';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedForm: 'sign-in',
      error: ''
    }
  }

  componentDidMount = () => {
    const token = hlp.getCookie('token');
    if (token) {
      jwt.verify(token, 'pakhi', (err, decoded) => {
        if (decoded) {
          this.getUserData(decoded.email);
        }
      });
    }
  };

  getUserData(email) {
    Backend.post('/todo-list', { email: email }).then((result) => {
      const tasks = result.data.tasks;
      this.props.fetchTasks({ tasks: tasks, email: result.data.email });
      setTimeout(() => {
        this.props.history.push({ pathname: '/todos' });
      }, 1000);
    })
  }

  formSelectionHanndler(event) {
    this.setState({
      selectedForm: event.target.name
    })
  }

  onSubmitHandler(event, data) {
    event.preventDefault();
    if (data.name === 'sign-in') {
      const payload = {
        email: data.signIn.username,
        password: data.signIn.password,
        remember: data.signIn.remember
      }
      this.gotoDashboard('/login', { payload });
    } else if (data.name === 'sign-up') {
      const payload = {
        email: data.signUp.email,
        username: data.signUp.username,
        password: data.signUp.password,
        usertype: 'admin'
      }
      this.gotoDashboard('/signup', { payload });
    }
  }

  gotoDashboard(url, data) {
    Backend.post(url, data).then((result) => {
      if (result.data) {
        hlp.setCookie('token', result.data['access_token'], result.data['expires_in']);
        this.getUserData(result.data.user.email);
      } else if (!result.data && url === '/signup') {
        this.setState({
          error: 'User Already Exists.'
        });

      } else if (!result.data && url === '/login') {
        this.setState({
          error: 'Please check your email and password'
        });
      }
    })
  }

  render() {
    const { selectedForm, error } = this.state;
    return (
      <div className="login">
        <div className="login-wrap">
          <div className="login-html">
            <p style={{ color: '#8e0428f7' }}>{error}</p>
            <input id="tab-1" type="radio" name="tab" className="sign-in" name="sign-in" checked={selectedForm === 'sign-in' ? true : false} onChange={this.formSelectionHanndler.bind(this)} /><label htmlFor="tab-1" className="tab">Sign In</label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" name="sign-up" checked={selectedForm === 'sign-up' ? true : false} onChange={this.formSelectionHanndler.bind(this)} /><label htmlFor="tab-2" className="tab">Sign Up</label>
            <div className="login-form">
              <Login onSubmitHandler={(event, payload) => { this.onSubmitHandler(event, payload) }} />
              <Signup onSubmitHandler={(event, payload) => { this.onSubmitHandler(event, payload) }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    taskState: state.taskState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: ({ tasks, email }) => dispatch(actions.fetchTasks({ tasks, email })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);