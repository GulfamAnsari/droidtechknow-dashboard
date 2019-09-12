import { combineReducers } from 'redux';

// Reducers
import Main_Reducer from './reducer';
import Todo_Reducer from '../pages/todo/store/reducer'

const Reducer = combineReducers({
  Main_Reducer,
  Todo_Reducer
})

export default Reducer;