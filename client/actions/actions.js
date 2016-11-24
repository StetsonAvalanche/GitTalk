export function getAuthUser(user) {
  return {
    type: 'GET_AUTH_USER',
    user
  }
}

export function setActiveChatroom(chatroomId) {
  return {
    type: 'SET_ACTIVE_CHATROOM',
    chatroomId
  }
}

export function updateRepos(repos) {
  return {
    type: 'UPDATE_REPOS',
    repos
  }
}

export function updateMessages(messages) {
  return {
    type: 'UPDATE_MESSAGES',
    messages
  }
}

export function selectChatroom(chatroomId) {
  return {
  	type: 'SET_ACTIVE_CHATROOM',
  	chatroomId
  }
}
