import React from 'react';
import {connect} from 'react-redux';
import AddCard from './AddCard';

const getInfo = (list, id) => {
    let editItem = p => p.id === id;
    return list.find(editItem);
}

class EditCard extends React.Component {
  render() {
    let item = getInfo(this.props.items, this.props.match.params.id);
    return (
      <AddCard editItem= {item} history={this.props.history}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

const mapStateToProps = (state) => {
    return {
        items: state.expenseReducer.list
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCard);
