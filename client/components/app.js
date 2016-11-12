import React from 'react';
import Login from './login.js';
import Chatroom from './chatroom.js';
import Dashboard from './dashboard.js';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import $ from 'jquery';


class App extends React.Component {
  
  constructor(props){
    super(props)

    this.state = {
    	currUser: null
    }
  }

  componentDidMount(){
  	$.ajax({
  		url:'auth/user',
  		method: 'GET',
  		dataType: 'JSON'
  	}).done((data) => {
  		console.log('DATA', data)
  		this.setState({
  			currUser: data
  		})
  	});
  }

  render(){
  	// if user is authenticated
  	if (this.state.currUser) {
	  	return (
	      <Router history={browserHistory}>
	        <Route path="/" component = {Login} />
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
