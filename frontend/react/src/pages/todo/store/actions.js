import * as Backend from '../../../helper/backend';

// Action types
export const UPDATE_TASK = 'UPDATE_TASK';
export const FETCH_TASKS_DATA = 'FETCH_TASKS_DATA';


// Action creator
export const updateTask = (value) => {
  return (dispatch, getState) => {
    const tasks = {
      type: UPDATE_TASK,
      value: value
    }
    Backend.post('todo/todo-update', { payload: { tasks: value } }).then((result) => {
      dispatch(tasks);
    });
  }
}

export const fetchTasks = () => {
  return (dispatch) => {
    Backend.get('todo/todo-list').then((result) => {
      const tasks = {
        type: FETCH_TASKS_DATA,
        value: { tasks: result.data }
      }
      dispatch(tasks);
    })
  }
}