import React from 'react';
import { Link } from 'react-router';
import RepoList from './repoList.js';
import Logout from './logout.js';
import { getUserRepos } from './../api/user/userRequest.js';

class Dashboard extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    getUserRepos().then(repos => {
      this.setState({ repos: repos });
    }).catch(err => console.log(err));
  }

  render () {
    return (
      <div>
        <h1>You are in Dashboard View</h1>
        <Logout />
        <RepoList repos={this.state.repos}/>
        <br />
        <Link to="rooms/anicknam/hello">Chatroom FIXME</Link>
      </div>
    )
  }
}

const styles = {
};

export default Dashboard;
