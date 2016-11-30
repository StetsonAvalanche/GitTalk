import React, {PropTypes} from 'react';
import AddImage from './addImage';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

/* Material-UI components */
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSend from 'material-ui/svg-icons/content/send';

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

/* Websocket */
import io from 'socket.io-client';
const socket = io('', { path: '/chat'});

class EnterMessage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
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
      user: this.props.authUser.username,
      userAvatarUrl: this.props.authUser._json.avatar_url,
      chatroom: this.props.chatroomId,
      image: image,
      text: image ? null : this.state.value
    };

    // socket.emit('join chatroom', {id: this.props.chatroomId});
    socket.emit('new message', newMessage);
    // this.props.dispatch(actions.addMessages(newMessage));
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

    const reponame = this.props.chatroomId.split('/')[1];

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

function mapStateToProps(state) {
    return {
        authUser: state.authUser,
        chatroomId: state.activeChatroomId
    };
}

export default connect(mapStateToProps)(EnterMessage);
