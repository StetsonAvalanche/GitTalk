import React from 'react';

const RepoListEntry = (props) => (
   <div>
     <span onClick={props.navToChatroom.bind(this, props.repo.full_name)}>{props.repo.name}</span>
     <p>{props.repo.description}</p>
     <p>{props.repo.html_url}</p>
   </div>
	)

const styles = {
};

export default RepoListEntry;
