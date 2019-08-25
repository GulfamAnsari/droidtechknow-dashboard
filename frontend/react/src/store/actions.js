import localForage from 'localforage';
import * as Backend from '../helper/backend';

export const updateTask = (value) => {
  return (dispatch, getState) => {
    const tasks = {
      type: 'UPDATE_TASK',
      value: value
    }
    if (getState().authState.isAuthenticated) {
      Backend.post('todo/todo-update', { payload: { tasks: value } }).then((result) => {
        dispatch(tasks);
      });
    } else {
      localForage.setItem('tasks', tasks).then((success) => {
        dispatch(success);
      });
    }
  }
}

export const fetchTasks = (value) => {
  return (dispatch) => {
    const tasks = {
      type: 'FETCH_TASKS_DATA',
      value: value
    }
    dispatch(tasks);
  }
}