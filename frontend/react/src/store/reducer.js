import { FETCH_USER_INFO } from './actions'

const initialState = {
  userInfo: null
}

const Main_Reducer = (state = initialState, action) => {
  switch (action.type) {
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
