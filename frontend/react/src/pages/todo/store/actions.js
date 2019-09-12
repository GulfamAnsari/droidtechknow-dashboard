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
    const tasks = {
      type: FETCH_TASKS_DATA
    }
    Backend.get('todo/todo-list').then((result) => {
      const tasks = result.data;
      dispatch(tasks);
    })
  }
}