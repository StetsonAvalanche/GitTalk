import React from 'react';
import { Link, browserHistory } from 'react-router';
import RepoList from './repoList.js';
import Profile from './profile.js';
import {getUser, getUserRepos, getRepoInfo } from './../api/user/userRequest.js';
import { init } from '../api/chatroom/chatroomRequest.js';
import {connect} from 'react-redux';

import Paper from 'material-ui/Paper';
import { grey200 } from './../util/colorScheme';

class Dashboard extends React.Component {
  constructor(props){
    super(props)

    // this.state = {
    //   repos: [],
    //   user: null
    // }

    /* this bindings for methods */
    this.navToChatroom = this.navToChatroom.bind(this);
  }

  navToChatroom(repo) {
      // Initiate chatroom
      init(repo).then(() => {
        browserHistory.push(`/rooms/${repo.path}`);
      }).catch(err => { 
        console.log(err); 
      });
  }

  // componentDidMount() {
  //   getUser().then(user => {
  //     this.setState({ user: user });
  //   }).catch(err => console.log(err));

  //   getRepoInfo().then(reposPaths => {
  //     this.reposPaths = reposPaths;
  //     getUserRepos().then(repos => {
  //       this.setState({ 
  //         repos: repos.map(repo => ({ path: this.reposPaths[repo.id], ...repo })) 
  //       });
  //     }).catch(err => console.log(err));        
  //   }).catch(err => console.log(err));
  // }

  render () {
    return (
      <div style={ styles.dashboardContainer } >
        <Paper style={ styles.listContainer } zDepth={ 2 }>
          <RepoList navToChatroom={this.navToChatroom} repos={this.props.repos} />
        </Paper>
        {/*<Paper style={ styles.profileContainer } zDepth={ 2 }>
          { this.state.user ? <Profile user={ this.state.user } /> : null }
        </Paper>*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        repos: state.repos
    };
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
    marginRight: '10px'
  },
  profileContainer: {
    height: '100%',
    minWidth: '400px',
    flexGrow: '1',
    position: 'relative'
  }
};

export default connect(mapStateToProps)(Dashboard);
