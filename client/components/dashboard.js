import React from 'react';
import { Link, browserHistory } from 'react-router';
import RepoList from './repoList.js';
import Logout from './logout.js';
import { getUserRepos } from './../api/user/userRequest.js';
import { init } from '../api/chatroom/chatroomRequest.js';

import { grey200 } from './../util/colorScheme.js';

class Dashboard extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      repos: []
    }
  }

  navToChatroom(name) {
    init(name).then(() => {
      browserHistory.push(`/rooms/${name}`);
    }).catch(err => { 
      console.log(err); 
    });
  }

  componentDidMount() {
    getUserRepos().then(repos => {
      this.setState({ repos: repos });
    }).catch(err => console.log(err));
  }


  render () {
    return (
      <div style={ styles.dashboardContainer } >
        <div style={ styles.listContainer } >
          <RepoList navToChatroom={this.navToChatroom.bind(this)} repos={this.state.repos}/>
        </div>
        <div style={ styles.profileContainer } >
          <p>This is a placeholder for the profile</p>
          <Logout />
        </div>
      </div>
    )
  }
}

const styles = {
  dashboardContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  listContainer: {
    minWidth: '400px',
    flexGrow: '2',
  },
  profileContainer: {
    minWidth: '400px',
    background: grey200,
    flexGrow: '1',
  }
};

export default Dashboard;
