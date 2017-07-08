export const AddAction = (expenseobj, dispatch) => {
  return ({
    type: 'ADD_EXPENSE',
    payload: {expenseobj:expenseobj,dispatch:dispatch}
  });
}
export const DeleteAction = (id, dispatch) => {
  return ({
    type: 'DELETE_EXPENSE',
    payload: {id: id, dispatch: dispatch}
  })
}
export default AddAction;
