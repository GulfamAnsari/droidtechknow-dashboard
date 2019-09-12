import * as Backend from '../../../helper/backend';

// Action types
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const FETCH_USER_INFO = 'FETCH_USER_INFO';

// Action creator
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

export const fetchUserInfo = () => {
  return (dispatch, getState) => {
    Backend.get('/fetch-user-info').then((result) => {
      const data = {
        type: FETCH_USER_INFO,
        value: result.data
      }
      dispatch(data);
    });
    // const data = {
    //   type: FETCH_USER_INFO,
    //   value: {
    //     userInfo: {
    //       firstname: '',
    //       lastname: '',
    //       mobile: '',
    //       occupation: '',
    //       gender: '',
    //       address: '',
    //       city: '',
    //       userDefiendCountry: '',
    //       about: '',
    //       userImage: 'https://res.cloudinary.com/dcbkmnryr/image/upload/v1568225419/person-default_biywdl.svg'
    //     }
    //   }
    // }
    // dispatch(data);
  }
}

