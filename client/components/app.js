import React from 'react';
import ChatRoom from './chatroom.js';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';


class App extends React.Component {

  render(){
  	return (
      <Router history={browserHistory}>
        {//<Route path="/" component>
        }
      </Router>
  		)
  }

}

const styles = {
};


export default App;
