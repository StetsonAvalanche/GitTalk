import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { githubGreen, githubBlue } from './../util/colorScheme.js';

class CreateApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleClose}
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
          <p>This is in the Dialog</p>
        </Dialog>
      </div>
    );
  }
}

export default CreateApp;
