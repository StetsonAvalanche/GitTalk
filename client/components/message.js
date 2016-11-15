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
    	  <div style={styles.content}>
    	    <div style={styles.author}>
              <span>{user}</span><br />
            </div>
            <br />
            <div style={styles.text}>
              {text}
            </div>
          </div>  
    	</ListItem>
    	);
  }
}

const styles = {
  box: {
    marginRight: 10,
    marginBottom: '15px',
    height: 'auto',
    width: 'auto',
    position: 'relative',
    background: 'white'
  },
  author: {
  	fontFamily: 'Droid Sans',
  	fontSize: '16px',
  	fontWeight: 'bold',
  	left: '80px',
  	top: '20px',
  	position: 'absolute'
  },
  text: {
  	fontFamily: 'Droid Sans',
  	fontSize: '16px',
  	left: '80px',
  	top: '20px',
  	position: 'absolute'
  },
  content: {
  	marginLeft: 10, 
  	padding: 10,
  	width: 'auto',
  	height: 'auto'
  }
}

export default Message;