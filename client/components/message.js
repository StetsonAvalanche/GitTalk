import React, {PropTypes} from 'react';
import {Avatar, ListItem, Paper} from 'material-ui';


class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, text } = this.props;
    const avatar = <Avatar src={`${this.props.userAvatarUrl}`}/>
    
    return (
    	<Paper style={styles.box} zDepth={1}>
    	  <ListItem leftAvatar={avatar}>
    		 <div>
    	       <span style={styles.author}>{user}</span>
    	       <br />
    	       <span style={styles.text}>{text}</span>
    	     </div> 
    	  </ListItem>
    	</Paper>
    	);
  }
}

const styles = {
  author: {
  	fontFamily: 'Droid Sans',
  	fontSize: '16px',
  	fontWeight: 'bold',
  	left: '80px',
  	top: '20px',
  	// position: 'absolute'
  },
  text: {
  	fontFamily: 'Droid Sans',
  	fontSize: '13px',
  	left: '80px',
  	top: '20px',
  	// position: 'absolute'
  },
  box: {
    height: 'auto',
    width: 'auto',
    margin: 10,
    // display: 'inline-block',
  }
}

export default Message;