import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import AddAppItem from './addAppItem.js';

import { githubGreen, githubBlue } from './../util/colorScheme.js';

import { getAllApps, getSubscriptions } from './../api/app/appRequest.js';

import { init, getChatroom } from './../api/chatroom/chatroomRequest.js';

import { connect } from 'react-redux';

import * as actions from '../actions/actions';

class AddApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateSubscriptions = this.updateSubscriptions.bind(this);
  }

  updateSubscriptions() {
    getChatroom(this.props.reponame) // check if chatroom exists
    .then(chatroom => {
      if (chatroom === null) {
        return init(this.props.reponame); // if not, initialize chatroom
      } else {
        return 'chatroom exists';
      }
    })
    .then(() => getAllApps())
    .then(appdata => {
      getSubscriptions(this.props.reponame)
      .then(subsdata => {
        subsdata = JSON.parse(subsdata);
        appdata = JSON.parse(appdata);
        for (var i = 0; i < appdata.length; i++) {
          if (subsdata.write[appdata[i].apiKey]) {
            appdata[i].added = true;
          } else {
            appdata[i].added = false;
          }
        }
        this.props.dispatch(actions.updateSubscriptions(appdata));
      })
      .catch(err => console.log('subscriptions not merging with apps data', err));
    })
    .catch(err => console.log(err));
  }

  componentWillMount() {
    this.updateSubscriptions();
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const style = { position: 'absolute', right: 0, top: 0, zIndex: 10 };

    const actions = <FlatButton
                      label='Done'
                      primary={true}
                      onClick={ this.handleClose }
                    />;

    const dialog =  <Dialog
                      title='Developer Apps'
                      actions={ actions }
                      modal={ false }
                      open={ this.state.open }
                      onRequestClose={ this.handleClose }
                      autoScrollBodyContent={ true }
                    >
                      {  
                        this.props.subscriptions.map((app) => {
                          return (<AddAppItem key={app.name} app={app} reponame={this.props.reponame} updateSubscriptions={this.updateSubscriptions} />);
                        })
                      }
                    </Dialog>;

    return (
      <IconButton tooltip='Settings' onTouchTap={this.handleOpen} style={style}>
        <SettingsIcon />
        {dialog}
      </IconButton>
    );
  }
}

function mapStateToProps(state) {
  return {
    subscriptions: state.subscriptions
  };
}


// exporting container
export default connect(mapStateToProps)(AddApp);
