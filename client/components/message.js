import React, {PropTypes} from 'react';
import {Avatar, ListItem, Paper} from 'material-ui';
import { grey700 } from './../util/colorScheme.js';
import MarkdownElement from './markdownelement.js';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;
    const text = <MarkdownElement text={this.props.text} />;
    const { image } = this.props;
    const avatar = <Avatar src={this.props.userAvatarUrl} />;

    const styles = {
      box: {
        position: 'relative',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10, 
        marginRight: 10,
      },
      author: {
        color: grey700,
        fontSize: '16px',
        fontWeight: 'bold',
      },
      text: {
        fontSize: '13px',
      },
    };

    console.log(image);
    console.log('image ^^^'); 
    return (
      <Paper style={styles.box} zDepth={1}>
        <ListItem leftAvatar={avatar}>
          <span style={styles.author}>{user}</span>
          <br />
          <span style={styles.text}>{text}</span>
          <br />
          <a href={ image } ><img src={ image } width='50%' /></a>
        </ListItem>
      </Paper>
    );
  }
}

export default Message;
