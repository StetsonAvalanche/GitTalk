import React, {PropTypes} from 'react';
import {Avatar, ListItem} from 'material-ui';


class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, text } = this.props;
    const avatar = <Avatar src={`${this.props.userAvatarUrl}`}/>
    
    return (
    	<ListItem leftAvatar={avatar} style={styles.box}>
    		 <div>
    	       <span style={styles.author}>{user}</span>
    	       <br />
    	       <span style={styles.text}>{text}</span>
    	     </div> 
    	</ListItem>
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
  	fontSize: '16px',
  	left: '80px',
  	top: '20px',
  	// position: 'absolute'
  }
}

export default Message;