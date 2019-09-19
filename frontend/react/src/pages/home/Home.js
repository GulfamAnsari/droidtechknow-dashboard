import React, { Component } from 'react';
import Login from '../../components/Home/log-in/Login';
import Signup from '../../components/Home/sign-up/Signup';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import * as hlp from '../../helper/helper-functions';
import * as Backend from '../../helper/backend';
import * as Notiflix from '../../helper/notiflix';
import './Home.scss';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedForm: 'sign-in',
      loading: false,
      error: {
        status: false,
        msg: ''
      }
    }
  }

  componentDidMount = () => {
    const token = hlp.getCookie('token');
    if (token) {
      this.fetchInitData()
    }
  };

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
        usertype: 'admin',
        country: data.signUp.country,
        device: data.signUp.device,
      }
      this.gotoDashboard('/signup', { payload });
    }
  }

  gotoDashboard(url, data) {
    this.setState({ loading: true });
    Backend.post(url, data).then((result) => {
      this.setState({ loading: false });
      if (result.data) {
        if (result.data.existence && url === '/signup') {
          this.setState(() => {
            setTimeout(() => {
              this.setState({ error: { status: false, msg: '' } })
            }, 0);
            return {
              error: { status: true, msg: 'User Already Exists.' }
            }
          });
          return;
        } else if (!result.data.existence && url === '/login') {
          this.setState(() => {
            setTimeout(() => {
              this.setState({ error: { status: false, msg: '' } })
            }, 0);
            return {
              error: { status: true, msg: 'Please check your email and password' }
            }
          });
          return;
        }
        hlp.setCookie('token', result.data.data['access_token'], result.data.data['expires_in']);
        this.fetchInitData();
      }
    }, (error) => {
      this.setState(() => {
        setTimeout(() => {
          this.setState({ error: { status: false, msg: '' } })
        }, 0);
        return {
          loading: false,
          error: { status: true, msg: 'Something went wrong. Please try again.' }
        }
      });
    })
  }

  fetchInitData = () => {
    this.props.fetchUserInfo();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.userInfo) {
      this.props.history.push({ pathname: '/dashboard' });
    }
  }

  render() {
    const { selectedForm, error, loading } = this.state;
    return (
      <div className="login" style={{ overflow: 'hidden' }}>
        {loading ? Notiflix.loading('Sign In....') : Notiflix.remove()}
        {error.status && !loading ? Notiflix.notify('Failure', error.msg) : ''}
        <div className="login-wrap">
          <div className="login-html">
            <input id="tab-1" type="radio" name="tab" className="sign-in" name="sign-in" checked={selectedForm === 'sign-in' ? true : false} onChange={this.formSelectionHanndler.bind(this)} /><label htmlFor="tab-1" className="tab">Sign In</label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" name="sign-up" checked={selectedForm === 'sign-up' ? true : false} onChange={this.formSelectionHanndler.bind(this)} /><label htmlFor="tab-2" className="tab">Sign Up</label>
            <div className="login-form">
              <Login loading={loading} onSubmitHandler={(event, payload) => { this.onSubmitHandler(event, payload) }} />
              <Signup loading={loading} onSubmitHandler={(event, payload) => { this.onSubmitHandler(event, payload) }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    userInfo: state.Main_Reducer.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: () => dispatch(actions.fetchUserInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
