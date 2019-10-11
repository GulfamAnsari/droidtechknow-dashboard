import { API_ERROR, FETCH_USER_INFO, UPDATE_PROFILE, LOG_OUT, SEARCH } from './actions';

const initialState = {
  userInfo: null,
  error: null,
  searchResult: {
    query: null,
    result: [],
    selected: null
  }
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
    case API_ERROR:
      return {
        ...state,
        error: action.value.error
      }
    case SEARCH:
      return {
        ...state,
        searchResult: { result: action.value.result, query: action.value.query, selected: action.value.selected }
      }
    default:
      return state;
  }
}

export default Main_Reducer;
