import {putData, deleteData, getAllData} from '../db';
var INITIAL_STATE = {fetching:false,fetched:false,list:[],error:null};

const Expensereducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'FETCH_START' :
      return {...state,fetching:true};
    case 'FETCH_RECEIVED' :
      return {...state,fetching:false,fetched:true,list:action.payload}
    case 'GET_EXPENSE_DATA' :
      return action.payload;
      break;
    case 'ADD_EXPENSE' :
      action.payload.expenseobj._id = Date.now().toString();
      putData(action.payload.expenseobj).then(function(result) {
        getAllData(action.payload.dispatch);
      }).catch(function(error) {
        return state;
      });
      return state;
      break;
    case 'DELETE_EXPENSE' :
      deleteData(action.payload).then(function(){})
      .catch(function(error) {
        return state;
      })
      return state;
      break;
    default: return state;
  }
}
export default Expensereducer;
