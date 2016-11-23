import React from 'react';
import { ListItem } from 'material-ui/List';

import Toggle from 'material-ui/Toggle';

import { githubGreen, githubBlue, githubBrown } from './../util/colorScheme.js';

import { subscribeApp, unsubscribeApp } from './../api/app/appRequest.js';

class AddAppItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      added: props.app.added
    };

    this.addApp = this.addApp.bind(this);
    this.removeApp = this.removeApp.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  
  addApp() {
    this.setState({ added: true });

    subscribeApp(this.props.app, this.props.reponame)
    .then((response) => {
      this.props.updateSubscriptions();
    })
    .catch((err) => console.log(err));
  }

  removeApp() {
    this.setState({ added: false });

    unsubscribeApp(this.props.app, this.props.reponame)
    .then((response) => {
      this.props.updateSubscriptions();
    })
    .catch((err) => console.log(err));
  }

  toggle() {
    if (!this.state.added) {
      this.addApp();
    } else {
      this.removeApp();
    }
  }

  render() {
    const { app } = this.props;
    const status = app.added ? 'subscribed' : 'unsubscribed';
    const subsToggle = <Toggle toggled={this.state.added} onToggle={this.toggle} />;

    return (
      <ListItem primaryText={app.name} secondaryText={status} rightToggle={subsToggle} />
    );
  }
}

export default AddAppItem;