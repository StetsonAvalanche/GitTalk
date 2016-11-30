import React, {PropTypes} from 'react';

/* Material-UI components */
import {Avatar, ListItem, Paper, Subheader} from 'material-ui';

/* Color Scheme */
import { grey700 } from './../util/colorScheme';
import MarkdownElement from './markdownelement';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;
    const text = <MarkdownElement text={this.props.text} />;
    const { image } = this.props;
    const avatar = <Avatar src={this.props.userAvatarUrl} />;
    const chatroom = this.props.chatroom;
    const subheaderStyle = {
      fontWeight: 'bold',
    };

    return (
      <Paper style={styles.box} zDepth={1}>
        <Subheader style={subheaderStyle}>Found in {chatroom}:</Subheader>
        <ListItem leftAvatar={avatar} disabled={true}>
          <span style={styles.author}>{user}</span>
          <br />
          <span style={styles.text}>{text}</span>
          { image ? <a href={ image } ><img src={ image } width='50%' /></a> : null }
        </ListItem>
      </Paper>
    );
  } 
}

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

export default SearchResult;
