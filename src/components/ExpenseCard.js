import React from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {DeleteAction} from '../actions/expenseActions';
import Avatar from 'material-ui/Avatar';
import {HomeIcon, ProfileIcon, DollarIcon, PayIcon, MemberIcon, ShareIcon} from './Icons';

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
      members:this.props.item.doc.members+""
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  handleDelete = (e, id) => {
    console.log("handleDelete:",id);
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
        <CardTitle title={item.doc.desc} subtitle={new Date(item.doc.date).toUTCString()} expandable={true} />
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
            <div className="info"> Sharing Type : {item.doc.sharetype}</div>
          </div>
        </CardText>
        <CardActions>
          <FlatButton label="Expand" onTouchTap={this.handleExpand} />
          <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
          <FlatButton label="Delete" onTouchTap={(event)=> this.handleDelete(event,item.doc._id)} />
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
