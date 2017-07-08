import PouchDB from 'pouchdb' ;

var db = new PouchDB('splitIt');

export const getAllData = (dispatch) => {
  db.allDocs({
    include_docs: true,
    attachments: true
  }).then(function (result) {
    console.log("getAllData:",result);
    let list = [];
    result.rows.forEach(function(i) {
      list.push(i);
    });
    dispatch({type:'FETCH_RECEIVED',payload:list});
  }).catch(function (err) {
    console.log(err);
    return null;
  });
}

export const putData = (expense) => {
  console.log("putData",expense);
  return new Promise(function(resolve, reject) {
    db.put(expense).then(function (response) {
      console.log("putData resolve");
      resolve(expense);
    }).catch(function (err) {
      console.log("putData reject:",err);
      reject(err);
    });
  })
}

export const deleteData = (payload) => {
  return new Promise(function(resolve, reject) {
    db.get(payload.id).then(function(doc) {
      return db.remove(doc);
    }).then(function (result) {
      resolve(getAllData(payload.dispatch));
    }).catch(function (err) {
      console.log(err);
      reject(err);
    });
  });
}
export default getAllData;
