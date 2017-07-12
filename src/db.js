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

export const getItemData = (id) => {
  return new Promise(function(resolve, reject){
    console.log("getItem:",id)
    db.get(id).then(function (doc) {
      console.log("getItem:",doc)
      return resolve(doc);
    }).catch(function (err) {
      console.log(err);
      return reject(err);
    });
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

export const updateData = (expense) => {
  return new Promise(function(resolve, reject){
    db.get(expense._id).then(function(doc) {
      return db.put({
        _id: expense._id,
        _rev: doc._rev,
        desc: expense.desc,
        cost: expense.cost,
        date: expense.date,
        paidby: expense.paidby,
        sharetype: expense.sharetype,
        members: expense.members,
        sharepermember: expense.sharepermember
      });
    }).then(function(response) {
      return resolve(response);
    }).catch(function (err) {
      return reject(err);
    });
  });
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
