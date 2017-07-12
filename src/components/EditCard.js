import React from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {DeleteAction} from '../actions/expenseActions';
import Avatar from 'material-ui/Avatar';
import {HomeIcon, ProfileIcon, DollarIcon, PayIcon, MemberIcon, ShareIcon} from './Icons';
import { Link } from 'react-router-dom';
import {GetInfo} from '../actions/expenseActions';
import AddCard from './AddCard';

const getInfo = (list, id) => {
    let editItem = p => p.id === id;
    return list.find(editItem);
}

class EditCard extends React.Component {

  constructor(props) {
    super(props);
    console.log("constructor:",props);
  }

  render() {
    let item = getInfo(this.props.items, this.props.match.params.id);
    return (
      <AddCard editItem= {item}/>
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
