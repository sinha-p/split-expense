import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {applyMiddleware,createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import promise from 'redux-promise';
import logger from 'redux-logger';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import allReducers from './reducers';
import getAllData from './db';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

injectTapEventPlugin();

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(allReducers,applyMiddleware(thunkMiddleware,logger,middleware));
ReactDOM.render(<Provider store={store}>
  <App />
</Provider>,
   document.getElementById('root'));
store.dispatch((dispatch) => {
  dispatch({type:'FETCH_START'});
  getAllData(dispatch);
})

registerServiceWorker();
