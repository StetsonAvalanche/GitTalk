import React from 'react';

import Dialog from 'material-ui/Dialog';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ExtensionIcon from 'material-ui/svg-icons/action/extension';

class MyAppsItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    console.log('handleopen myAppsItem');
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {

    const { app, key } = this.props;

    const listItemStyle = { position: 'relative', left: 0, };

    const actions = <FlatButton
                      label='Done'
                      primary={true}
                      onClick={ this.handleClose }
                    />;

    const appSettings =  <Dialog
                  title='App Details'
                  actions={ actions }
                  modal={ false }
                  open={ this.state.open }
                  onRequestClose={ this.handleClose }
                  autoScrollBodyContent={ true }
                >
                  {
                    Object.keys(app).map((item) => {
                      return (<p key={item}>{item}: {app[item]}</p>);
                    })
                  }
                </Dialog>;

    return (<ListItem
              key={key}
              leftIcon={<ExtensionIcon />}
              primaryText={app.name}
              onClick={this.handleOpen}
              style={listItemStyle}
            >
              {appSettings}
            </ListItem>);
  }
}

export default MyAppsItem;




