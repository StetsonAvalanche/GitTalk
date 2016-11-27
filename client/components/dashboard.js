import React from 'react';
import RepoList from './repoList.js';
import Profile from './profile.js';
import { getUser } from './../api/user/userRequest.js';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

/* Material-UI components */
import Paper from 'material-ui/Paper';

/* Color Scheme */
import { grey200 } from './../util/colorScheme';

const Dashboard = (props) => (
      <div style={ styles.dashboardContainer } >
        <Paper style={ styles.listContainer } zDepth={ 2 }>
          <RepoList />
        </Paper>
        <Paper style={ styles.profileContainer } zDepth={ 2 }>
          { (props.authUser) ? <Profile user={ props.authUser } /> : null }
        </Paper>
      </div>
)

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
