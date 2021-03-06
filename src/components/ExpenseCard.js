import React from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {DeleteAction} from '../actions/expenseActions';
import Avatar from 'material-ui/Avatar';
import {ProfileIcon, DollarIcon, PayIcon, MemberIcon, ShareIcon} from './Icons';
import { Link } from 'react-router-dom';

const iconStyles = {
  marginRight: 15,
};
const cardStyles = {
  marginBottom: 10,
  width: "50%",
  marginLeft: "auto",
  marginRight: "auto"
};

class ExpenseCard extends React.Component {

  constructor(props) {
    super(props);
    let title;
    if(this.props.item.doc.paidby === "me") {
      title = this.props.item.doc.members.slice(1) + " owes";
    } else {
      title = "You Owe"
    }
    this.state = {
      expanded: false,
      title: title,
      members:this.props.item.doc.members+"",
      sharetype: (this.props.item.doc.sharetype === "equalshare")?"Equal Sharing" : "Custom Sharing"
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  handleDelete = (e, id) => {
    this.props.dispatch(DeleteAction(id,this.props.dispatch));
  }
  render() {
    let item = this.props.item;
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}
        style={cardStyles}>
        <CardHeader
          title={this.state.title}
          subtitle={item.doc.sharepermember[0]}
          avatar={<Avatar icon={<ProfileIcon />} />}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardTitle title={item.doc.desc.charAt(0).toUpperCase() + item.doc.desc.substr(1).toLowerCase()} subtitle={new Date(item.doc.date).toLocaleDateString()} expandable={true} />
        <CardText expandable={true}>
          <div>
            <DollarIcon style={iconStyles}/>
            <div className="info"> Total Expense : {item.doc.cost}</div>
          </div>
          <div>
            <PayIcon style={iconStyles}/>
            <div className="info"> Paid By : {item.doc.paidby}</div>
          </div>
          <div>
            <MemberIcon style={iconStyles}/>
            <div className="info"> Members : {this.state.members}</div>
          </div>
          <div>
            <ShareIcon style={iconStyles}/>
            <div className="info"> Sharing Type : {this.state.sharetype}</div>
          </div>
        </CardText>
        <CardActions>
          <FlatButton label="Delete" onTouchTap={(event)=> this.handleDelete(event,item.doc._id)} />
          <Link to={process.env.PUBLIC_URL +'/edit/'+item.id}>
          <FlatButton label="Edit" />
          </Link>         
        </CardActions>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapDispatchToProps)(ExpenseCard);
