import React from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChatIcon from 'material-ui/svg-icons/communication/chat';

import { githubBlue } from './../util/colorScheme.js';

class RepoList extends React.Component {

	createListItems() {
		return this.props.repos.map((repo) => {
			return (
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
		});
	}

	render() {
		return (
		  <div>
		    {this.props.repos.map((repo) => {
		      return <RepoListEntry key={repo.id} repo={repo} navToChatroom={this.props.navToChatroom}/>
		    })}
		  </div>
		)
	}

}



const styles = {
};

// container "glue"
function mapStatetoProps(state) {
	return {
		repos: state.repos,
		navToChatroom: state.navToChatroom
	};
}
export default RepoList;
