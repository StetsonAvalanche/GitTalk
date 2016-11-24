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
import { getUserRepos } from './../api/user/userRequest.js';
import { grey200 } from './../util/colorScheme';
import {Card, CircularProgress} from 'material-ui';

// /* Websocket */
// import io from 'socket.io-client';
// const socket = io('', { path: '/api/chat'});

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      channels: [],
      inviteSent: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };

    window.onresize = () => {
      this.setState({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    }; 

    // console.log(this.props.params.username + '/' + this.props.params.reponame)
    /* this bindings for methods */
    // this.updateMemberRepos = this.updateMemberRepos.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
    // this.sendEmailInvite = this.sendEmailInvite.bind(this);
    


  }

  componentWillMount() {
    /* websockets */
    // socket.emit('join chatroom', {id: this.props.chatroomId});
    /* update active chatroom id in global store object */
    /* fetch messages for this (=active) chatroom from DB */
    
    this.fetchMessages(this.props.params.username + '/' + this.props.params.reponame);
  }

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
      this.props.dispatch(actions.setActiveChatroom(this.props.params.username + '/' + this.props.params.reponame));
    })
    .catch(err => console.log(err));
  }

  // sendEmailInvite() {
  //   // Send email invitation to collaborators
  //   const chatroomLink = '/rooms/' + this.state.chatroomId;
  //   const currRepoName = this.props.params.reponame;
  //   getUserRepos().then(repos => { 
  //     const forkedRepoUrl = repos.reduce((targetUrl, repo) => {
  //       if (repo.name === currRepoName) {targetUrl = repo.url;}
  //       return targetUrl;
  //     });
  //     sendInvite(chatroomLink, forkedRepoUrl).then(() => {
  //       this.setState({inviteSent: true});
  //     }).catch(err => { 
  //       console.log('ERROR',err); 
  //     });
  //   }).catch(err => console.log(err));
  // }


  render() {
    return (
      <div>
        <NavBar username={this.props.authUser.username} photo={this.props.authUser._json.avatar_url} channels={this.state.channels} changeChannel={this.updateMessages} sendEmailInvite={this.sendEmailInvite} inviteSent={this.state.inviteSent}/>
        <TopBar reponame={this.props.params.reponame} windowWidth={this.state.windowWidth} />
       
        {(this.props.messages.length > 0) ?
          <Messages messages={this.props.messages} windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight}/>
        : null}
        {console.log(this.props.chatroomId)}
        {(this.props.chatroomId) ? 
          <EnterMessage username={this.props.authUser.username} userAvatarUrl={this.props.authUser._json.avatar_url} reponame={this.props.params.reponame} windowWidth={this.state.windowWidth} renderSentMessage={this.renderSentMessage}/>
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
          chatroomId: state.activeChatroomId
      };
  }

export default connect(mapStateToProps)(Chatroom);
// export default Chatroom;
