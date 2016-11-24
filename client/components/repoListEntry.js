import React from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChatIcon from 'material-ui/svg-icons/communication/chat';

import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import { githubBlue } from './../util/colorScheme.js';

import AddApp from './addApp.js';

const RepoListEntry = (props) => (
  <div>
    <ListItem
      primaryText={ <span style={styles.primaryLink} onTouchTap={props.navToChatroom.bind(this, props.repo.full_name)}>{props.repo.name}</span> }
      secondaryText={ props.repo.description }
      secondaryTextLines={ 1 }
      leftIcon={<ChatIcon onTouchTap={props.navToChatroom.bind(this, props.repo.full_name)}/>}
      rightIcon={<AddApp reponame={props.repo.full_name} />}
    />
    <Divider />
  </div>
)

const styles = {
  primaryLink: {
    color: githubBlue
  }
};


export default RepoListEntry;
