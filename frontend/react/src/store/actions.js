import localForage from 'localforage';
import Backend from '../helper/backend';

export const updateTask = (value) => {
  return (dispatch, getState) => {
    const tasks = {
      type: 'UPDATE_TASK',
      value: value
    }
    if (getState().authState.isAuthenticated) {
      Backend.post('/todo-update', { tasks: value, email: getState().authState.email }, { 'Content-Type': 'application/json' }).then((result) => {
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