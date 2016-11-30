import React from 'react';
import { browserHistory } from 'react-router';
import { init, getChatroom } from '../api/chatroom/chatroomRequest.js';
import { getUserRepos, getRepoInfo } from './../api/user/userRequest.js';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

/* Material-UI components */
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChatIcon from 'material-ui/svg-icons/communication/chat';
import AddApp from './addApp.js';

/* Color Scheme */
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

  navToChatroom(repoName) {
    // Initiate chatroom
    getChatroom(repoName) // check if chatroom exists
      .then(chatroom => {
        if (chatroom === null) {
          console.log('chatroom is null');
          return init(repoName);
        }
      })
      .then(() => {
        browserHistory.push(`/rooms/${repoName}`);
      }).catch(err => { 
        console.log(err); 
      });
  }

  createListItems() {
    return this.props.repos.map((repo) => {
      return (
        <div>
          <ListItem
            primaryText={ <span style={styles.primaryLink} onTouchTap={this.navToChatroom.bind(this, repo.path)}>{repo.name}</span> }
            secondaryText={ repo.description }
            secondaryTextLines={ 1 }
            leftIcon={<ChatIcon onTouchTap={this.navToChatroom.bind(this, repo.path)}/>}
            rightIcon={<AddApp reponame={repo.path} />}
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


function mapStateToProps(state) {
  return {
    repos: state.repos,
  };
}

const styles = {
  primaryLink: {
    color: githubBlue
  }
};


// exporting container
export default connect(mapStateToProps)(RepoList);

