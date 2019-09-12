const initialState = {
  userInfor: {

  },
  authState: {
    isAuthenticated: false
  }
}


const Main_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        authState: { isAuthenticated: true }
      }

    default:
      return state;
  }
}

export default Main_Reducer;
