import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import AddAppItem from './addAppItem.js';

import { githubGreen, githubBlue } from './../util/colorScheme.js';

import { getAllApps, getSubscriptions } from './../api/app/appRequest.js';

class AddApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      apps: [ 
        { name: 'Giffy', 
          category: 'utility',
          endpoint: 'giffy.herokuapp.com', 
          owner: 'gifcat', 
          apiKey: '345catcat9dd053f663b8ed496d2a'
        },
        { name: 'Weather', 
          category: 'utility',
          endpoint: 'weather.herokuapp.com', 
          owner: 'weatherChannel', 
          apiKey: '34567rainrain5c99dd053f663b8ed496d2a'
        },
        { name: 'OlegBot', 
          category: 'chatbot',
          endpoint: 'olegbot.herokuapp.com', 
          owner: 'tankwan', 
          apiKey: '3456olegoleg95c99dd053f663b8ed496d2a'
        }
      ]
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateSubscriptions = this.updateSubscriptions.bind(this);
  }

  updateSubscriptions() {
    getAllApps()
    .then(appdata => {
      if (this.props.reponame === 'tankwan/GitTalk') {
        console.log('update subscriptions', this.props.reponame);
      }
      getSubscriptions(this.props.reponame)
      .then(subsdata => {
        if (this.props.reponame === 'tankwan/GitTalk') {
          console.log('update subscriptions - get subsdata', this.props.reponame);
        }
        subsdata = JSON.parse(subsdata);
        appdata = JSON.parse(appdata);
        for (var i = 0; i < appdata.length; i++) {
          if (subsdata.write[appdata[i].apiKey]) {
            appdata[i].added = true;
          } else {
            appdata[i].added = false;
          }
        }
        this.setState({
          apps: appdata 
        });
      })
      .catch(err => console.log('subscriptions not merging with apps data', err));
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.updateSubscriptions();
  }

  handleOpen() {
    console.log('handleopen addApp');
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const style = { position: 'absolute', right: 0, top: 0, };

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
                        this.state.apps.map((app) => {
                          return (<AddAppItem app={app} reponame={this.props.reponame} updateSubscriptions={this.updateSubscriptions} />);
                        })
                      }
                    </Dialog>;

    return (
      <IconButton tooltip='SVG Icon' onClick={this.handleOpen} style={style}>
        <SettingsIcon />
        {dialog}
      </IconButton>
    );
  }
}

export default AddApp;
