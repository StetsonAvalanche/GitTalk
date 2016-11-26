import React from 'react';
import { browserHistory } from 'react-router';
import { init } from '../api/chatroom/chatroomRequest.js';
import { getUserRepos, getRepoInfo } from './../api/user/userRequest.js';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChatIcon from 'material-ui/svg-icons/communication/chat';
import * as actions from '../actions/actions';

import { githubBlue } from './../util/colorScheme.js';


class RepoList extends React.Component {

  componentWillMount() {
		getRepoInfo().then(reposPaths => {
		  this.reposPaths = reposPaths;
		  getUserRepos().then(repos => {
		    this.props.dispatch(actions.updateRepos(repos.map(repo => ({ path: this.reposPaths[repo.id], ...repo }))))
		  }).catch(err => console.log(err));        
		}).catch(err => console.log(err));
  }

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

// exporting container
export default connect(mapStateToProps)(RepoList);

