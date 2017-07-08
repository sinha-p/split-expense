import { combineReducers } from 'redux';
import expenseReducer from './expenseReducer';

const allReducers = combineReducers({
  expenseReducer : expenseReducer
});

export default allReducers;
