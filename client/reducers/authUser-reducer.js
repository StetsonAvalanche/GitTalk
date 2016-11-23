export default function (state = null, action) {
  switch (action.type) {
    case 'GET_AUTH_USER':
      return action.user;
    default:
      return state;
  }
}