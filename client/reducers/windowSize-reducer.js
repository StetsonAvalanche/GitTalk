export default function (state = {}, action) {
  switch (action.type) {
    case 'RESIZE_WINDOW':
      const newState = Object.assign({}, state, {
        width: action.windowWidth,
        height: action.windowHeight
      })
      return newState;
    default:
      return state;
  }
}