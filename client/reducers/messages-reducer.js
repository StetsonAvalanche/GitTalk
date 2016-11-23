export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_MESSAGES':
      const newState = state.concat(action.messages)
      return newState;
    default:
      return state;
  }
}


// export default function () {
//     return [ { "type" : "text", 
//                "user" : "anicknam", 
//                "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
//                "chatroom" : "anicknam/GitTalk", 
//                "image" : null, 
//                "text" : "hello" 
// 		      }, 
// 		      { "type" : "text", 
// 		      "user" : "anicknam", 
// 		      "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
// 		      "chatroom" : "anicknam/GitTalk", 
// 		      "image" : null, 
// 		      "text" : "this is a test" 
// 		      } ];
// }