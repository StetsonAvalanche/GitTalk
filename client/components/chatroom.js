import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import NavBar from './navbar';
import Messages from './messages';
import Logout from './logout.js';

import { getUser } from './../api/user/userRequest.js';

import FlatButton from 'material-ui/FlatButton';

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
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
      const username = JSON.parse(data).username;
      this.setState({ username: username });
    })
    .catch(err => console.log('error in getUser', err));
  }

  render() {
    // Add Flat Button to test that MuiThemeProvider is working
    return (
      <div>
        <NavBar username={this.state.username} reponame={this.props.params.reponame} channels={this.state.channels} />
        <Messages username={this.state.username} />
        <Link to="/dashboard" className="link-to-dashboard">Home</Link>
        <Logout />
        <FlatButton
          label="Logout"
          primary={true}
        />
      </div>
    );
  }
}

const styles = {
};

export default Chatroom;
