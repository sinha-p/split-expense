export const AddAction = (expenseobj, dispatch) => {
  return ({
    type: 'ADD_EXPENSE',
    payload: {expenseobj:expenseobj,dispatch:dispatch}
  });
}
export const EditAction = (expenseobj, dispatch) => {
  return ({
    type: 'EDIT_EXPENSE',
    payload: {expenseobj:expenseobj, dispatch:dispatch}
  });
}
export const DeleteAction = (id, dispatch) => {
  return ({
    type: 'DELETE_EXPENSE',
    payload: {id: id, dispatch: dispatch}
  })
}
export const GetInfo = (id) => {
  return ({
    type: 'GET_EXPENSE_DATA',
    payload: id
  });
}
export default AddAction;
