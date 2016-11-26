import React from 'react';
import { browserHistory } from 'react-router';
import { init } from '../api/chatroom/chatroomRequest.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectChatroom } from '../actions/actions';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChatIcon from 'material-ui/svg-icons/communication/chat';

import { githubBlue } from './../util/colorScheme.js';


class RepoList extends React.Component {

	navToChatroom(repo) {
    // Initiate chatroom
    init(repo).then(() => {
      browserHistory.push(`/rooms/${repo.path}`);
    }).catch(err => { 
      console.log(err); 
    });
  }

	createListItems() {
		return this.props.repos.map((repo) => {
			return (
				<div>
			    <ListItem
			      onClick={this.navToChatroom.bind(this, repo)}
			      primaryText={ <span style={styles.primaryLink} >{repo.name}</span> }
			      secondaryText={ repo.description }
			      secondaryTextLines={ 1 }
			      leftIcon={<ChatIcon />}
			    />
			    <Divider />
  			</div>
  		)
		});
	}

	render() {
		return (
		  <div>
				{this.createListItems()}
		  </div>
		)
	}
}

const styles = {
  primaryLink: {
    color: githubBlue
  }
};

// container "glue"
function mapStateToProps(state) {
	return {
		repos: state.repos,
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({selectChatroom: selectChatroom}, dispatch)
}

// exporting container
export default connect(mapStateToProps, matchDispatchToProps)(RepoList);

