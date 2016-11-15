import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import TopBar from './topbar';
import NavBar from './navbar';
import Messages from './messages';
import Logout from './logout.js';

import { getUser } from './../api/user/userRequest.js';

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      picture: '',
      channels: [  // FIXME 
        'aframe-boilerplate',
        'aframe-react',
        'aframe-react-boilerplate',
        'GitTalk',
        'material-ui-browserify-gulp-example',
        'microscope',
        'sembly-heroku-server'
      ]
    };
  }

  componentDidMount() {
    getUser()
    .then((data) => {
      const JSONdata = JSON.parse(data);
      const username = JSONdata.username;
      const photo = JSONdata._json.avatar_url;

      this.setState({ 
        username: username, 
        photo: photo
      });
    })
    .catch(err => console.log('error in getUser', err));
  }

  render() {
    return (
      <div>
        <NavBar username={this.state.username} photo={this.state.photo} channels={this.state.channels} />
        <TopBar reponame={ this.props.params.reponame } />
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
