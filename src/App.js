import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddCard from './components/AddCard';
import EditCard from './components/EditCard';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import ExpenseListComponent from './components/ExpenseListComponent';

const AppBarStyle = {
  "background-color": "#5C6BC0"
}
class App extends Component {
  render() {
    return (
    	<MuiThemeProvider>
        <div className="App">
  	      <AppBar style={AppBarStyle} title="Split-Expense" showMenuIconButton={false}/>
          <Router>
            <div>
              <Route exact path={process.env.PUBLIC_URL +"/"} component = {ExpenseListComponent} />
              <Route path={process.env.PUBLIC_URL +"/list"} component = {ExpenseListComponent} />
              <Route path={process.env.PUBLIC_URL +"/add"} component = {AddCard} />
              <Route path={process.env.PUBLIC_URL +"/edit/:id"} component = {EditCard} />
              <Link to={process.env.PUBLIC_URL +"/add"}>
                <FloatingActionButton className="addbtn" backgroundColor="#5C6BC0" >
                  <ContentAdd />
                </FloatingActionButton>
              </Link>
            </div>         
          </Router>
        </div>
    	</MuiThemeProvider>
    );
  }
}

export default App;
