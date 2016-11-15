import React, {PropTypes} from 'react';
import {Avatar, ListItem} from 'material-ui';

// let {Avatar, ListItem} = mui;

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, text } = this.props;
    const avatar = <Avatar src={`${this.props.userAvatarUrl}`}/>
    
    return (
    	<ListItem leftAvatar={avatar} style={styles.box}>
            <span style={styles.author}>{user}</span><br />
            {text}
    	</ListItem>
    	);
  }
}

const styles = {
  // date: {
  //   fontSize: '0.8em',
  //   color: 'gray',
  //   marginRight: 10
  author: {
    fontWeight: 'bold',
    fontSize: '16px'
  },
  box: {
  	marginLeft: 10, 
  	padding: 10,
  	fontSize: 10
  }
}

export default Message;