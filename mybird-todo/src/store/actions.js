import localForage from 'localforage';
import Axios from 'axios';

export const updateTask = (value) => {
  return (dispatch, getState) => {
    const tasks = {
      type: 'UPDATE_TASK',
      value: value
    }
    if (getState().authState.isAuthenticated) {
      Axios.post('https://mybird-todo.herokuapp.com/send-data', { tasks: value, email: getState().authState.email }, { 'Content-Type': 'application/json' }).then((result) => {
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