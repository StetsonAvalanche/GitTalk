export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_REPOS':
      const newState = state.concat(action.repos)
      return newState;
    default:
      return state;
  }
}