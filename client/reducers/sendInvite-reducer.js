export default function (state = false, action) {
  switch (action.type) {
    case 'SEND_INVITE':
      return action.sentInvite;
    default:
      return state;
  }
}