import React from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChatIcon from 'material-ui/svg-icons/communication/chat';

import { githubBlue } from './../util/colorScheme.js';

const RepoListEntry = (props) => (
  <div>
    <ListItem
      onClick={props.navToChatroom.bind(this, props.repo)}
      primaryText={ <span style={styles.primaryLink} >{props.repo.name}</span> }
      secondaryText={ props.repo.description }
      secondaryTextLines={ 1 }
      leftIcon={<ChatIcon />}
    />
    <Divider />
  </div>
)

const styles = {
  primaryLink: {
    color: githubBlue
  }
};

// container "glue"
function mapStatetoProps(state) {
  return {
    repo: state.repo
  }
}

// exporting container
export default connect(mapStateToProps)(RepoListEntry);
