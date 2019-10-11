import * as Backend from '../helper/backend';
import * as Helper from '../helper/helper-functions';

export const LOG_OUT = 'LOG_OUT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const FETCH_USER_INFO = 'FETCH_USER_INFO';
export const API_ERROR = 'API_ERROR';
export const SEARCH = 'SEARCH';

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
      }, (error) => {
        const data = {
          type: API_ERROR,
          value: { error: { status: true, message: 'Somthing went wrong. Please try again leter', errorObject: error } }
        }
        dispatch(data);
        reject(data);
      });
    })
  }
}

export const updateProfile = (value) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      Backend.post('/update-user-info', value).then((result) => {
        const data = {
          type: UPDATE_PROFILE,
          value: result.data
        }
        dispatch(data);
        resolve(data);
      }, (error) => {
        const data = {
          type: API_ERROR,
          value: { error: { status: true, message: 'Somthing went wrong. Please try again leter', errorObject: error } }
        }
        dispatch(data);
        reject(data);
      });
    });
  }
}

export const search = (value) => {
  return (dispatch, getState) => {
    let data = {
      type: SEARCH
    };
    if (value.name === 'query') {
      data['value'] = { ...getState()['Main_Reducer']['searchResult'], query: value.query}
    } else if (value.name === 'result'){
      data['value'] = { ...getState()['Main_Reducer']['searchResult'], result: value.result }
    } else if (value.name === 'selected') {
      data['value'] = { ...getState()['Main_Reducer']['searchResult'], selected: value.selected }
    }
    dispatch(data);
  }

}