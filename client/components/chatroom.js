import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import TopBar from './topbar';
import NavBar from './navbar';
import Messages from './messages';
import EnterMessage from './entermessage';

import { getUser, getMemberRepos } from './../api/user/userRequest';
import { getMessages } from './../api/chatroom/messageRequest';
import { sendInvite } from '../api/chatroom/chatroomRequest.js';
import { grey200 } from './../util/colorScheme';
import {Card, CircularProgress} from 'material-ui';

/* Websocket */
import io from 'socket.io-client';
const socket = io('', { path: '/api/chat'});

class Chatroom extends React.Component {
  constructor(props){
    super(props);

    this.props.dispatch(actions.updateWindowSize({ 
      width: window.innerWidth, 
      height: window.innerHeight
    }));

    this.state = {
      channels: []
    };

    window.onresize = () => {
      this.props.dispatch(actions.updateWindowSize({ 
        width: window.innerWidth, 
        height: window.innerHeight
      }));
    }; 

    /* this bindings for methods */
    // this.updateMemberRepos = this.updateMemberRepos.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
    
    
    /* update active chatroom id in global store object */
    this.props.dispatch(actions.setActiveChatroom(this.props.params.username + '/' + this.props.params.reponame));
    
    /* websockets */
    socket.on('new bc message', (message) => {
      this.props.dispatch(actions.updateMessages(message));
      // this.updateMemberRepos();
    });

  }

  // componentWillMount() {
    /* websockets */
    // socket.emit('join chatroom', {id: this.props.chatroomId});
    
    /* fetch messages for this (=active) chatroom from DB */
    // this.fetchMessages(this.props.params.username + '/' + this.props.params.reponame);
  // }

  // updateMemberRepos() {
  //   getMemberRepos(this.state.username)
  //   .then(repos => {
  //     this.setState({
  //       channels: repos
  //     });
  //   })
  //   .catch(err => console.log('error in getMemberRepos', err));
  // }

  fetchMessages(chatroomId) {
    // fetch all messages from DB
    getMessages(chatroomId)
    .then(messages => {
      this.props.dispatch(actions.updateMessages(JSON.parse(messages)));
    })
    .catch(err => console.log(err));
  }


  render() {
    return (
      <div>
        <NavBar username={this.props.authUser.username} photo={this.props.authUser._json.avatar_url} channels={this.state.channels} changeChannel={this.updateMessages} />
        <TopBar reponame={this.props.params.reponame} windowWidth={this.props.windowSize.width} />
       
        {/*{(this.props.messages.length > 0) ? */}
          <Messages windowWidth={this.props.windowSize.width} windowHeight={this.props.windowSize.height}/>
        {/*: null} */}

        {(this.props.chatroomId) ? 
          <EnterMessage username={this.props.authUser.username} userAvatarUrl={this.props.authUser._json.avatar_url} reponame={this.props.params.reponame} windowWidth={this.props.windowSize.width} renderSentMessage={this.renderSentMessage}/>
          : null
        }
      </div>
    );
  }
}

  function mapStateToProps(state) {
      return {
          authUser: state.authUser,
          repos: state.repos,
          messages: state.messages,
          chatroomId: state.activeChatroomId,
          windowSize: state.windowSize
      };
  }

export default connect(mapStateToProps)(Chatroom);

