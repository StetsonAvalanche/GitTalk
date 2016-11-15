import React, {PropTypes} from 'react';
import {Avatar, ListItem, Card} from 'material-ui';

// let {Avatar, ListItem} = mui;

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, text } = this.props;
    // const avatar = <Avatar src={`${message.profileImageURL}`}/>
    const avatar = <Avatar src='https://cdn4.iconfinder.com/data/icons/rcons-user-line/32/user_woman_girl_female_avatar_chat_message_talk_im-512.png'/>
    
    return (
    	<ListItem leftAvatar={avatar} style={styles.box}>
          <span style={styles.author}>{user}</span>: {text}
    	</ListItem>
    	);
  }
}

const styles = {
  date: {
    fontSize: '0.8em',
    color: 'gray',
    marginRight: 10
  },
  author: {
    fontWeight: 'bold'
  },
  box: {
  	border: 'solid'
  }
}

export default Message;