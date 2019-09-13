import * as Backend from '../helper/backend';
import * as Helper from '../helper/helper-functions';

export const LOG_OUT = 'LOG_OUT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const FETCH_USER_INFO = 'FETCH_USER_INFO';

export const logout = () => {
  return (dispatch, getState) => {
    Helper.setCookie('token', '', 0);
    const data = {
      type: LOG_OUT
    }
    dispatch(data);
  }
}

export const fetchUserInfo = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      Backend.get('/fetch-user-info').then((result) => {
        const data = {
          type: FETCH_USER_INFO,
          value: result.data
        }
        dispatch(data);
        resolve(data);
      });
    })
  }
}

export const updateProfile = (value) => {
  return (dispatch, getState) => {
    Backend.post('/update-user-info', value).then((result) => {
      const data = {
        type: UPDATE_PROFILE,
        value: result.data
      }
      dispatch(data);
    });
  }
}