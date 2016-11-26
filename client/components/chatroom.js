import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import TopBar from './topbar';
import NavBar from './navbar';
import Messages from './messages';
import EnterMessage from './entermessage';

import { getMemberRepos } from './../api/user/userRequest';

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

    /* this binding for methods */
    // this.updateMemberRepos = this.updateMemberRepos.bind(this);
    
    /* update active chatroom id in global store object */
    this.props.dispatch(actions.setActiveChatroom(this.props.params.username + '/' + this.props.params.reponame));
  }

  componentDidMount() {
    /* websockets */
    socket.emit('join chatroom', {id: this.props.chatroomId});

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

  render() {
    return (
      <div>
        <NavBar channels={this.state.channels} changeChannel={this.updateMessages} />
        <TopBar reponame={this.props.params.reponame} windowWidth={this.props.windowSize.width} />
       
        <Messages windowWidth={this.props.windowSize.width} windowHeight={this.props.windowSize.height}/>

        {(this.props.chatroomId) ? 
          <EnterMessage reponame={this.props.params.reponame} windowWidth={this.props.windowSize.width} />
          : null
        }
      </div>
    );
  }
}

  function mapStateToProps(state) {
      return {
          repos: state.repos,
          chatroomId: state.activeChatroomId,
          windowSize: state.windowSize
      };
  }

export default connect(mapStateToProps)(Chatroom);

