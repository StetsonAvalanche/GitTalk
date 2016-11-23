export function getAuthUser(user) {
  return {
    type: 'GET_AUTH_USER',
    user
  }
}

export function updateRepos(repos) {
  return {
    type: 'UPDATE_REPOS',
    repos
  }
}

export function updateMessages(repos) {
  return {
    type: 'UPDATE_MESSAGES',
    repos
  }
}

