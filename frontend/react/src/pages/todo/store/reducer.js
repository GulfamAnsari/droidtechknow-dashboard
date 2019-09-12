import { FETCH_TASKS_DATA, UPDATE_TASK } from './actions';

const initialState = {
  taskState: {
    tasks: []
  }
}

const Todo_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TASK:
      return {
        ...state,
        taskState: { tasks: action.value, openNewTodo: false }
      }

    case FETCH_TASKS_DATA:
      return {
        ...state,
        taskState: { tasks: action.value.tasks }
      }

    default:
      return state;
  }
}

export default Todo_Reducer;