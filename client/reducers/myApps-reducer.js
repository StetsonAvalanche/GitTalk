// const initialState = [
//   { name: 'Olegbot', apiKey: '4456789retyu' },
//   { name: 'Fredbot', apiKey: '4rtyuioetyuf' },
// ];

export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_MY_APPS':
      const newState = Object.assign({}, state, {
      	apps: action.apps
      })
      return newState.apps;
    // case 'ADD_MESSAGE':
    //   return state.concat(action.message);  
    default:
      return state;
  }
}