import { UPDATE_PROFILE, FETCH_USER_INFO } from './actions';

const initialState = {
  userInfo : {
    firstname: '',
    lastname: '',
    mobile: '',
    occupation: '',
    gender: '',
    address: '',
    city: '',
    userDefiendCountry: '',
    about: '',
    userImage: 'https://res.cloudinary.com/dcbkmnryr/image/upload/v1568225419/person-default_biywdl.svg'
  }
}

const Profile_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        userInfo: action.value.userInfo
      }

    case FETCH_USER_INFO:
      return {
        ...state,
        userInfo: action.value.userInfo
      }

    default:
      return state;
  }
}

export default Profile_Reducer;