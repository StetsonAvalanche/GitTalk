import React, {PropTypes} from 'react';

/* Color Scheme */
import {
  githubLightGreen,
  githubGreen,
  githubBrown,
  githubBlue,
  fullWhite,
  grey200,
  grey100,
} from './../util/colorScheme.js';

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
      chatroom: 'anicknam/gittalk' // FIXME make me dynamic
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

  sendMessage(message) {
    const newMessage = {
      user: this.props.username,
      text: this.state.value,
      chatroom: this.state.chatroom 
    };
    console.log('message sent', newMessage);
    socket.emit('new message', newMessage);
    this.setState({ value: '' });
  }

  render() {

    const divStyle = {
      position: 'absolute',
      bottom: 0,
      left: 300,
      width: window.innerWidth - 300,
      zIndex: 5,
    };

    const textHintStyle = {
      fontSize: '12px',
      fontColor: grey100,
    };

    const textFieldStyle = {
      position: 'absolute',
      bottom: '5px',
      left:'20px',
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

    return (
      <div style={divStyle}>
        <TextField
          hintText="Say something :)"
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