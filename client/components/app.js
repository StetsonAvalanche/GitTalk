import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Login from './login.js';
import Chatroom from './chatroom.js';
import Dashboard from './dashboard.js';
import { getUser } from './../api/user/userRequest.js';

import {
  githubLightGreen,
  githubGreen,
  githubBrown,
  githubBlue,
  fullWhite,
  grey200,
} from './../util/colorScheme.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loggedIn: null
    };
  }

  componentDidMount(){
    getUser().then(() => {
      this.setState({ loggedIn: true });
    }).catch(err => console.log(err));
  }

  render(){
    // if user is authenticated
    if (this.state.loggedIn) {
      document.body.style.backgroundColor = fullWhite;
      return (
        <MuiThemeProvider>
          <Router history={browserHistory}>
            <Route path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/rooms/:username/:reponame" component={Chatroom} />
          </Router>
        </MuiThemeProvider>
      )	
    } else {
      document.body.style.backgroundColor = fullWhite;
      return (
        <MuiThemeProvider>
          <Login />
        </MuiThemeProvider>
      )
    }
  }

}

const styles = {
};


export default App;
