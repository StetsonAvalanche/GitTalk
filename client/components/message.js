import React, {PropTypes} from 'react';
import {Avatar, ListItem} from 'material-ui';

// let {Avatar, ListItem} = mui;

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, text } = this.props;
    return (
    	<ListItem >
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
  }
}

export default Message;