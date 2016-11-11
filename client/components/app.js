import React from 'react';
import Login from './login.js';
import Chatroom from './chatroom.js';
import Dashboard from './dashboard.js';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';


class App extends React.Component {

  render(){
  	// if user is authenticated
  	if (1 > 0) {
	  	return (
	      <Router history={browserHistory}>
	        <Route path="/dashboard" component={Dashboard} />
	        <Route path="/rooms/:username/:reponame" component={Chatroom} />
	      </Router>
	  		)
  	} else {
  		return (
  			<Login />
  			)
  	}
  }

}

const styles = {
};


export default App;
