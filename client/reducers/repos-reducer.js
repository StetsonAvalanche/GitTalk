export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_REPOS':
      const newState = Object.assign({}, state, {
        repos: action.repos
      })
      return newState.repos;
    default:
      return state;
  }
}