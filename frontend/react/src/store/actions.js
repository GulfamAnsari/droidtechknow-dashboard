import * as Backend from '../helper/backend';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const FETCH_USER_INFO = 'FETCH_USER_INFO';

export const fetchUserInfo = () => {
  return (dispatch, getState) => {
    Backend.get('/fetch-user-info').then((result) => {
      const data = {
        type: FETCH_USER_INFO,
        value: result.data
      }
      dispatch(data);
    });
  }
}

export const updateProfile = (value) => {
  return (dispatch, getState) => {
    Backend.post('/update-user-info', value).then((result) => {
      const data = {
        type: UPDATE_PROFILE,
        userInfo: result.data
      }
      dispatch(data);
    });
  }
}