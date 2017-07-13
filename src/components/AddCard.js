import React from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {AddIcon, ProfileIcon, RemoveIcon} from './Icons';
import {AddAction, EditAction} from '../actions/expenseActions';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Link} from 'react-router-dom';

const iconStyles = {
  marginRight: 15,
};
const cardStyles = {
  width: '50%',
  marginRight: 'auto',
  marginLeft: 'auto',
  marginTop: 10,
};
const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};
class AddCard extends React.Component {

  constructor(props) {
    super(props);
    let edit = null
    if(this.props.editItem) {
      edit = this.props.editItem.doc;
    }
    this.state = {
      descError: '',
      costError: '',
      expanded: false,
      dataSource: [],
      pershare: 0.00,
      members: (edit && edit.members) ? edit.members : ["me"],
      sharepermember: (edit && edit.sharepermember) ? edit.sharepermember : [0],
      isdisabled: (edit && edit.sharetype === "unequalshare") ? false : true,
      desc: (edit && edit.desc) ? edit.desc : null,
      date: (edit && edit.date) ? new Date(edit.date) : new Date(),
      cost: (edit && edit.cost) ? edit.cost : null,
      sharetype: (edit && edit.sharetype) ? edit.sharetype : null,
      paidby: (edit && edit.paidby) ? edit.paidby : 'me'
    };
  }

  handleChange = (event, index, value) => {
    if(value === "equalshare") {
      this.setState({isdisabled : true});
      this.handleEqualShare();
    } else {
      this.setState({isdisabled : false});
      this.handleUnequalShare();
    }
    this.setState({sharetype : value});
  }

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [value],
    });
  };

  handleEqualShare = () => {
    let pershare = 0, new_shares, new_members;
    this.setState({
      pershare : this.state.cost / (this.state.members.length+1)
    })
    pershare = this.state.cost / (this.state.members.length);
    new_shares = this.state.sharepermember.map((m) => {
      return pershare;
    });
    new_members = this.state.members;
    this.setState({
      members : new_members,
      sharepermember : new_shares
    });
  }

  handleUnequalShare = () => {
    let new_shares = this.state.sharepermember.map((m) => {
      return 0;
    });
    let new_members = this.state.members;
    this.setState({
      members : new_members,
      sharepermember : new_shares
    });
  }

  handleAddMember = (event) => {
    let new_shares, new_members;
    this.state.sharepermember.push(0);
    this.state.members.push(this.state.dataSource[0]);
    if(this.state.sharetype === "equalshare" || this.state) {
      this.handleEqualShare();
    } else {
      this.handleUnequalShare();
    }
}

  handleSubmit = (dispatch) => {
    let compstate = this.state;
    if(compstate.desc === '' || compstate.desc === null) {
      this.setState({descError: 'This Field cannot be empty'});
      return;
    }
    if(compstate.cost === '' || compstate.cost === null) {
      this.setState({costError: 'This Field cannot be empty'});
      return;
    }
    if(compstate.desc !== '' && compstate.cost !== '') 
    {
      let formobj = {
        desc: compstate.desc,
        cost: compstate.cost,
        date: compstate.date,
        paidby: compstate.paidby,
        sharetype: compstate.sharetype,
        members: compstate.members,
        sharepermember: compstate.sharepermember
      };
      if(this.props.editItem) {
        formobj._id = this.props.editItem.doc._id;
        formobj._rev = this.props.editItem.doc._rev;
        this.props.dispatch(EditAction(formobj, this.props.dispatch));
      } else {
        this.props.dispatch(AddAction(formobj, this.props.dispatch));
      }
      this.props.history.push('/list');
    }
    
  }

  handleInput = (e, v) => {
    if (e.target.name == "desc" && v != '') {
      this.setState({ descError: '' })
    } else if(e.target.name == "desc" && v == ''){
      this.setState({ descError: 'This field cannot be Empty' });
    } else if(e.target.name == "cost" && v != '' && !isNaN(v)){
      this.setState({ costError: '' });
    } else if(e.target.name == "cost" && (v == '' || isNaN(v))){
      this.setState({ costError: 'Provide a valid Input'});
    }
    if(e == null) {
      this.setState({
        date: v
      });
    } else {
      this.setState({
        [e.target.name]: v
      });
    }
  }

  handlePaidby = (event, value) => {
    this.setState({
      paidby: value,
    });
  }

  handleShareChange = (i,e) => {
    this.state.sharepermember[i] = e.target.value;
    let new_sharepermember = this.state.sharepermember;
    this.setState({
      sharepermember : new_sharepermember
    });
  }

  handleRemoveMember = (i,e) => {
    this.state.members.splice(i,1);
    this.state.sharepermember.splice(i,1);
    this.setState({
      members: this.state.members,
      sharepermember: this.state.sharepermember
    });
    if(this.state.sharetype === 'equalshare') {
      this.handleEqualShare();
    } else {
      this.handleUnequalShare();
    }
  }

  renderlist() {
    return this.state.members.map((m,i) => {
      return (
        <ListItem
        leftAvatar={<Avatar icon={<ProfileIcon />} />}
        rightAvatar={<span><TextField value={this.state.sharepermember[i]} disabled = {this.state.isdisabled} onChange = {(event) => this.handleShareChange(i,event)}></TextField><RemoveIcon onTouchTap = {(event) => this.handleRemoveMember(i,event)}/></span>}
        primaryText={m} >
       </ListItem>
      );
    });
  }
  renderpaidby() {
    return this.state.members.map((m,i) => {
      return (
        <RadioButton
        value={this.state.members[i]}
        label={this.state.members[i]}
        style={styles.radioButton}
        />
      );
    });
  }

  render() {
    let item = this.props.item;
    return (
      <Card style={cardStyles}>
        <form>
          <CardText>
            <TextField name="desc" defaultValue = {this.state.desc} errorText = {this.state.descError} hintText="Pizza" floatingLabelText="Title" floatingLabelFixed={true} onChange = {this.handleInput}/><br />
            <DatePicker name="date" defaultDate = {this.state.date} hintText="Landscape Dialog" mode="landscape" onChange = {this.handleInput} />
            <TextField name="cost" defaultValue = {this.state.cost} errorText = {this.state.costError} hintText="00.0" floatingLabelText="Total Expense" floatingLabelFixed={true} onChange = {this.handleInput} /><br />
            <SelectField name="sharetype" floatingLabelText="Split Type" value={this.state.sharetype} errorText={'' && 'Select a type'} onChange={this.handleChange}>
              <MenuItem value="equalshare" primaryText="Equal Share" />
              <MenuItem value="unequalshare" primaryText="Unequal Share" />
            </SelectField>
            <List name="members">
              <Subheader>Members</Subheader>
                {this.renderlist()}
            </List>
            <AutoComplete hintText="Add Members" dataSource={this.state.dataSource} onUpdateInput={this.handleUpdateInput} />
            <AddIcon style={iconStyles} onTouchTap={this.handleAddMember} /><br/>
            <Subheader>Paid By</Subheader>
            <RadioButtonGroup name="paidBy" defaultSelected={this.state.paidby} onChange={this.handlePaidby}>
                {this.renderpaidby()}
            </RadioButtonGroup>
          </CardText>
          <CardActions>
            <FlatButton label="Save" onTouchTap={this.handleSubmit} />
            <Link to="/list"><FlatButton label="Cancel" /></Link>
          </CardActions>
        </form>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapDispatchToProps)(AddCard);
