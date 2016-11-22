import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import AddAppItem from './addAppItem.js';

import { githubGreen, githubBlue } from './../util/colorScheme.js';

import { getAllApps } from './../api/app/appRequest.js';

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
  }

  componentDidMount() {
    getAllApps()
    .then(data => 
      this.setState({
        apps: JSON.parse(data) 
      }))
    .catch(err => console.log(err));
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
                          return (<AddAppItem app={app} reponame={this.props.reponame}/>);
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
