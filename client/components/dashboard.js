import React from 'react';
import { Link, browserHistory } from 'react-router';
import RepoList from './repoList.js';
import Profile from './profile.js';
import { getUser } from './../api/user/userRequest.js';
import { init } from '../api/chatroom/chatroomRequest.js';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

import Paper from 'material-ui/Paper';
import { grey200 } from './../util/colorScheme';

class Dashboard extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props;
    getUser().then(user => {
      dispatch(actions.getAuthUser(JSON.parse(user)));
    }).catch(err => console.log(err));
  }

  render () {
    return (
      <div style={ styles.dashboardContainer } >
        <Paper style={ styles.listContainer } zDepth={ 2 }>
          <RepoList />
        </Paper>
        <Paper style={ styles.profileContainer } zDepth={ 2 }>
          { (this.props.authUser) ? <Profile user={ this.props.authUser } /> : null }
        </Paper>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        authUser: state.authUser
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
