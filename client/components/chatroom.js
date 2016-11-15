import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import NavBar from './navbar';
import Messages from './messages';
import Logout from './logout.js';

import { getUser } from './../api/user/userRequest.js';

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      channels: [
        'aframe-boilerplate',
        'aframe-react',
        'aframe-react-boilerplate',
        'GitTalk',
        'material-ui-browserify-gulp-example',
        'microscope',
        'sembly-heroku-server'
      ]// still hardcoded
    };
  }

  componentDidMount() {
    getUser()
    .then((data) => {
      const username = JSON.parse(data).username;
      this.setState({ username: username });
    })
    .catch(err => console.log('error in getUser', err));
  }

  render() {
    return (
      <div>
        <NavBar username={this.state.username} reponame={this.props.params.reponame} channels={this.state.channels} />
        <Messages username={this.state.username} />
        <Link to="/dashboard" className="link-to-dashboard">Home</Link>
        <Logout />
      </div>
    );
  }
}

const styles = {
};

export default Chatroom;
