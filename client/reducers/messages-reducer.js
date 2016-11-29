export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_MESSAGES':
      const newState = Object.assign({}, state, {
      	messages: action.messages
      })
      return newState.messages;
    case 'ADD_MESSAGE':
      return state.concat(action.message);  
    default:
      return state;
  }
}
