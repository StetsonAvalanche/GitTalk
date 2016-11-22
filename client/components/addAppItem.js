import React from 'react';
import { ListItem } from 'material-ui/List';

import AddIcon from 'material-ui/svg-icons/content/add-circle';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import CheckIcon from 'material-ui/svg-icons/action/check-circle';

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
  }

  addApp() {
    console.log('add app to repo', this.props.reponame);
    subscribeApp(this.props.app, this.props.reponame)
    .then((response) => console.log('added app to repo', response))
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

  render() {
    // const style = { position: 'absolute', right: 0, top: 0, };
    const { app } = this.props;
    const status = !app.added ?
                      <AddIcon color={githubBlue} onClick={this.addApp} />:
                    this.state.hover ?
                      <CancelIcon color={githubBrown} onClick={this.removeApp} onMouseOut={this.mouseOut} /> :
                      <CheckIcon color={githubGreen} onMouseOver={this.mouseOver} />;
    return (
      <ListItem primaryText={app.name} rightIcon={status} />
    );
  }
}

export default AddAppItem;

// touchup: Implement cancel when hover over checkIcon
// svg-icon for cancel: <CancelIcon onClick={this.removeApp} />