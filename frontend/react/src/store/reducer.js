const initialState = {
  taskState: {
    tasks: []
  },
  authState: {
    isAuthenticated: false
  }
}

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TASK':
      return {
        ...state,
        taskState: { tasks: action.value, openNewTodo: false }
      }

    case 'FETCH_TASKS_DATA':
      return {
        ...state,
        taskState: { tasks: action.value.tasks },
        authState: { isAuthenticated: true }
      }

    default:
      return state;
  }
}

export default Reducer;