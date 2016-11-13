import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import NavBar from './navbar';
import Messages from './messages';
import Logout from './logout.js';

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      repos: [
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

  render() {
    return (
      <div>
        <NavBar username={this.props.params.username} reponame={this.props.params.reponame} repos={this.state.repos} />
        <Messages username={this.props.params.username} />
        <Link to="/dashboard" className="link-to-dashboard">Home</Link>
        <Logout />
      </div>
    );
  }
}

const styles = {
};

export default Chatroom;
