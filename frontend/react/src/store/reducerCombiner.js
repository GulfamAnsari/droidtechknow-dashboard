import { combineReducers } from 'redux';

// Reducers
import Main_Reducer from './reducer';
import Profile_Reducer from '../pages/profile/store/reducer'
import Todo_Reducer from '../pages/todo/store/reducer'

const rootReducer = combineReducers({
  Main_Reducer,
  Todo_Reducer,
  Profile_Reducer
})

// export default Reducer;
const Reducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }
  return rootReducer(state, action);
};

export default Reducer;