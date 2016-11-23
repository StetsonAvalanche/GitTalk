export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_MESSAGES':
      const newState = state.concat(action.messages)
      return newState;
    default:
      return state;
  }
}