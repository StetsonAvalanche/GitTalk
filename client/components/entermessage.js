import React, {PropTypes} from 'react';
import AddImage from './addImage';

/* Color Scheme */
import {
  githubLightGreen,
  githubGreen,
  githubBrown,
  githubBlue,
  fullWhite,
  grey200,
  grey100,
} from './../util/colorScheme';

/* Material-UI components */
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSend from 'material-ui/svg-icons/content/send';

/* Websocket */
import io from 'socket.io-client';
const socket = io('', { path: '/api/chat'});

class EnterMessage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      chatroom: this.props.chatroomId,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage(message, image) {
    image = image || null;

    const newMessage = {
      type: image ? 'image': 'text',
      user: this.props.username,
      userAvatarUrl: this.props.userAvatarUrl,
      chatroom: this.state.chatroom,
      image: image,
      text: image ? null : this.state.value
    };

    console.log('message sent', newMessage);
    socket.emit('new message', newMessage);
    // this.props.renderSentMessage(newMessage);
    if (!image) this.setState({ value: '' });
  }

  render() {

    const divStyle = {
      position: 'absolute',
      bottom: 0,
      left: 300,
      width: this.props.windowWidth - 300,
      zIndex: 5,
    };

    const textHintStyle = {
      fontSize: '12px',
      fontColor: grey100,
    };

    const textFieldStyle = {
      position: 'absolute',
      bottom: '5px',
      width: this.props.windowWidth - 450,
      left:'70px',
    };

    const underlineStyle = {
      borderColor: fullWhite,
    };

    const underlineFocusStyle = {
      borderColor: githubLightGreen,
    };

    const buttonStyle = {
      position: 'absolute',
      bottom: '10px',
      right:'10px',
    };

    const reponame = this.props.reponame;

    return (
      <div style={divStyle}>
        <AddImage sendMessage={ this.sendMessage } />
        <TextField
          hintText={`Message @${reponame}`}
          floatingLabelText="*italics* __bold__ `code` ~~strike~~"
          floatingLabelFixed={true}
          floatingLabelStyle={{color: fullWhite}}
          floatingLabelFocusStyle={{color: githubLightGreen}}
          style={textFieldStyle}
          underlineStyle={underlineStyle}
          underlineFocusStyle={underlineFocusStyle}

          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}

          value={this.state.value}
        />
        <FloatingActionButton 
          backgroundColor={githubGreen}

          onClick={this.sendMessage}
          style={buttonStyle}
        >
          <ContentSend />
        </FloatingActionButton>
      </div>
    );
  }
}

export default EnterMessage;
