import { FETCH_USER_INFO, UPDATE_PROFILE, LOG_OUT } from './actions';

const initialState = {
  userInfo: null
}

const Main_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        userInfo: null
      }

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

export default Main_Reducer;
