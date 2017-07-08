import React, {Component} from 'react';
import {connect} from 'react-redux';
import ExpenseCard from './ExpenseCard';

class ExpenseListComponent extends Component {
  render() {
    let items = this.props.items;
    return (
      <div className = "container">
        {items.map(function(item) {
          return <ExpenseCard key= {item.id} item={item} />
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items : state.expenseReducer.list
  }
}
export default connect(mapStateToProps)(ExpenseListComponent);
