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
              <Route exact path="/" component = {ExpenseListComponent} />
              <Route path="/list" component = {ExpenseListComponent} />
              <Route path="/add" component = {AddCard} />
              <Route path="/edit/:id" component = {EditCard} />
              <Link to="/add">
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