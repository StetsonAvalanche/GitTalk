import React from 'react';
import { Link } from 'react-router';
import RepoList from './repoList.js';
import { getUserRepos } from './../api/user/userRequest.js';

class Dashboard extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    getUserRepos((err, repos) => {
      if (err) console.log(err);
      this.updateRepos(repos);
    });
  }

  updateRepos(repos) {
    this.setState({
      repos: repos
    });
  }

  render () {
    return (
      <div>
        <h1>You are in Dashboard View</h1>
        <a href='auth/logout'>Logout</a>
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
