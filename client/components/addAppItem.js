import React from 'react';
import { ListItem } from 'material-ui/List';

import AddIcon from 'material-ui/svg-icons/content/add-circle';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import CheckIcon from 'material-ui/svg-icons/action/check-circle';

import Toggle from 'material-ui/Toggle';

import { githubGreen, githubBlue, githubBrown } from './../util/colorScheme.js';

import { subscribeApp, unsubscribeApp } from './../api/app/appRequest.js';

class AddAppItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };

    this.addApp = this.addApp.bind(this);
    this.removeApp = this.removeApp.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  addApp() {
    console.log('add app to repo', this.props.reponame);
    subscribeApp(this.props.app, this.props.reponame)
    .then((response) => console.log('subscribed app to repo', response))
    .catch((err) => console.log(err));
  }

  removeApp() {
    console.log('remove app', this.props.app, 'from repo', this.props.reponame);
    unsubscribeApp(this.props.app, this.props.reponame)
    .then((response) => console.log('unsubscribed app from repo', response))
    .catch((err) => console.log(err));
  }

  mouseOver() {
    this.setState({hover: true});
  }

  mouseOut() {
    this.setState({hover: false});
  }

  toggle() {
    if (!this.props.app.added) {
      console.log('toggle to subscribe app');
      this.addApp();
    } else {
      console.log('toggle to unsubscribe');
      this.removeApp();
    }
  }

  render() {
    const { app } = this.props;
    const status = app.added ? 'subscribed' : 'unsubscribed';
    const subsToggle = <Toggle toggled={app.added} onToggle={this.toggle} />

    return (
      <ListItem primaryText={app.name} secondaryText={status} rightToggle={subsToggle} />
    );
  }
}

export default AddAppItem;