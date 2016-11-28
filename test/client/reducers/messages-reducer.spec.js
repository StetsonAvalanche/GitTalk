import React from 'react';
import chai from 'chai';
const expect = chai.expect;
import MessagesReducer from '../../../client/reducers/messages-reducer';
// import * as actions from '../../../client/reducers/messages-reducer';


describe('Messages reducer', () => {

  it('should return the initial state', () => {
    expect(MessagesReducer(undefined, {})
    ).to.eql([])
  })

  

  it('should handle UPDATE_MESSAGES', () => {

    const initialState = [];
  	const fetchedMessages = [ { "type" : "text", 
						  	  "user" : "anicknam", 
						  	  "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
						  	  "chatroom" : "anicknam/GitTalk", 
						  	  "image" : null, 
						  	  "text" : "Hi" }
							  , 
							  { "type" : "text", 
							  "user" : "anicknam", 
							  "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
							  "chatroom" : "anicknam/GitTalk", 
							  "image" : null, 
							  "text" : "Testing" } ];

    expect(MessagesReducer(initialState, {
      type: 'UPDATE_MESSAGES',
      messages: fetchedMessages
      }
    )).to.eql([ { "type" : "text", 
		  	   "user" : "anicknam", 
		  	   "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
		  	   "chatroom" : "anicknam/GitTalk", 
		  	   "image" : null, 
		  	   "text" : "Hi" }
			   , 
			   { "type" : "text", 
			   "user" : "anicknam", 
			   "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
			   "chatroom" : "anicknam/GitTalk", 
			   "image" : null, 
			   "text" : "Testing" } ]);
  });


  // it('should handle ADD_MESSAGE', () => {

  // 	const newMessage = ['pull request made'];
  	
  //   expect(reducer(initialState, {
  //     type: types.ADD_MESSAGE,
  //     message: {
  //       channelID: 0,
  //       text: 'testing 101',
  //       user: 'TestMan',
  //       time: 500
  //     }
  //   })
  // ).toEqual({
  //     data: [{
  //       id: 0,
  //       channelID: 0,
  //       text: 'testing 101',
  //       user: 'TestMan',
  //       time: 500
  //     }],
  //     loaded: false
  //   })
  // })

})
