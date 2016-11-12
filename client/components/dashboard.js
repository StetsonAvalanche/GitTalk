import React from 'react';
import {Link} from 'react-router';
import RepoList from './repoList.js';
import $ from 'jquery';

class Dashboard extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			repos: []
		}
	}

	componentDidMount(){
		$.ajax({
			url:'auth/user',
			method: 'GET',
			dataType: 'JSON'
		}).done((data) => {
			let repos_url = JSON.parse(data)._json.repos_url;
			$.ajax({
				url: repos_url,
				method: 'GET',
				dataType: 'JSON'
			}).done((repos) => {
			    this.setState({
				    repos: repos
			    });
			});
		});
	}

	render () {
		return (
			<div>
		      <h1>You are in Dashboard View</h1>
		      <RepoList repos={this.state.repos}/>
		      <br />
		      <Link to="rooms/anicknam/hello">Chatroom FIXME</Link>
		    </div>
			)
	}
}

const styles = {
};

export default Dashboard;