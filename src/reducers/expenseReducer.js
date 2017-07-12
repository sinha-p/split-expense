import {putData, deleteData, updateData, getAllData, getItemData} from '../db';
var INITIAL_STATE = {fetching:false,fetched:false,list:[],error:null,itemtoedit:null};

const Expensereducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'FETCH_START' :
      return {...state,fetching:true};
    case 'FETCH_RECEIVED' :
      return {...state,fetching:false,fetched:true,list:action.payload}
    case 'GET_EXPENSE_DATA' :
      getItemData(action.payload).then(function(result){
        let new_state = state;
        new_state.itemtoedit = result;
        return new_state;
      }).catch(function(error) {
        return {...state, itemtoedit: null}
      });
      return state;
    case 'ADD_EXPENSE' :
      action.payload.expenseobj._id = Date.now().toString();
      putData(action.payload.expenseobj).then(function(result) {
        getAllData(action.payload.dispatch);
      }).catch(function(error) {
        return state;
      });
      return state;
      break;
    case 'EDIT_EXPENSE' :
      updateData(action.payload.expenseobj).then(function(result) {
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
