import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { createApp } from './../api/app/appRequest.js';

import { githubGreen, githubBlue } from './../util/colorScheme.js';

class CreateApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      name: '',
      category: '',
      endpoint: ''
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (param, event) => {
    console.log(this.state);
    this.setState({ [param]: event.target.value });
  }

  saveApp = () => {
    createApp({
      name: this.state.name,
      category: this.state.category,
      endpoint: this.state.endpoint,
      owner: this.props.login
    });
    this.setState({
      name: '',
      category: '',
      endpoint: ''
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={ this.saveApp.bind(this) }
        onClick={ this.handleClose }
      />,
    ];

    return (
      <div>
        <RaisedButton label="Create New App" onClick={this.handleOpen} />
        <Dialog
          title='Create New App'
          actions={ actions }
          modal={ false }
          open={ this.state.open }
          onRequestClose={ this.handleClose }
          autoScrollBodyContent={ true }
        >
          <TextField
            floatingLabelText="App Name"
            floatingLabelFixed={true}
            onChange={ this.handleChange.bind(this, 'name')}
          /><br />
          <TextField
            floatingLabelText="Category"
            floatingLabelFixed={true}
            onChange={ this.handleChange.bind(this, 'category')}
          /><br />
          <TextField
            floatingLabelText="Endpoint"
            floatingLabelFixed={true}
            onChange={ this.handleChange.bind(this, 'endpoint')}
          /><br />
      </Dialog>
    </div>
    );
  }
}

export default CreateApp;
