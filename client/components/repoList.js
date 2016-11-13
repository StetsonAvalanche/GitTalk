import React from 'react';
import RepoListEntry from './repoListEntry.js';

const RepoList = (props) => (
  <div>
    {props.repos.map((repo) => {
      return <RepoListEntry key={repo.id} repo={repo}/>
    })}
  </div>
)

const styles = {
};

export default RepoList;
