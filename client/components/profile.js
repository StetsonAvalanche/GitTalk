import React from 'react';
import Logout from './logout.js';
import CreateApp from './createApp';
import MyApps from './myApps';
import { getUserApps } from './../api/app/appRequest.js';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

/* Material-UI components */
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

/* Color Scheme */
import { githubGreen, githubBlue } from './../util/colorScheme.js';


class Profile extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   apps: []
    // };

    this.updateUserApps = this.updateUserApps.bind(this);
  }

  updateUserApps() {
    getUserApps()
      .then(userApps => this.props.dispatch(actions.updateMyApps(userApps)))
      .catch(err => console.log('err', err));
  }

  componentDidMount() {
    this.updateUserApps();
  }

  render() {
    const user = this.props.user._json;
    return (
      <div>
        <Paper style={ styles.header } zDepth={ 2 }>
        </Paper>
        <Paper style={ styles.avatarContainer }>
          <img style={ styles.avatar }  src={user.avatar_url} />
        </Paper>
        <div style={ styles.info }>
          <h1>{ user.name }</h1>
          { user.bio ? <p>{ user.bio }</p> : null }
          <Divider />
          { user.company ? <p>{ user.company }</p> : null }
          { user.location ? <p>{ user.location }</p> : null }
          { user.blog ? <p><a  style={ styles.blueFont } href={ user.blog }>{ user.blog }</a></p> : null }
          { user.email ? <p>{ user.email }</p> : null }
          <CreateApp login={ user.login } updateUserApps={this.updateUserApps}/>
          <br />
          <MyApps apps={this.props.myApps} />
          <br />
          <Logout />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myApps: state.myApps,
  };
}

const styles = {
  avatar: {
    width: '150px',
    height: '150px',
  },
  avatarContainer: {
    position: 'absolute',
    left: '40px',
    top: '75px',
    paddingBottom: '-10px'
  },
  header: {
    height: '200px',
    width: '100%',
    background: githubGreen
  },
  info: {
    width: '100%',
    padding: '30px'
  },
  blueFont: {
    color: githubBlue
  }
};

export default connect(mapStateToProps)(Profile);
