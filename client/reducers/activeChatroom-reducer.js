export default function (state = null, action) {
  switch (action.type) {
    case 'SET_ACTIVE_CHATROOM':
      return action.chatroomId;
    default:
      return state;
  }
}