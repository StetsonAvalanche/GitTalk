import React from 'react';
import chai from 'chai';
const expect = chai.expect;
import MessagesReducer from '../../../client/reducers/messages-reducer';
// import * as actions from '../../../client/reducers/messages-reducer';

const fetchedMessages = [ { "type" : "text", 
				  	  "user" : "anicknam", 
				  	  "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
				  	  "chatroom" : "StetsonAvalanche/GitTalk", 
				  	  "image" : null, 
				  	  "text" : "Hi" }
					    , 
					    { "type" : "text", 
					    "user" : "anicknam", 
					    "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
					    "chatroom" : "StetsonAvalanche/GitTalk", 
					    "image" : null, 
					    "text" : "Testing" } ];

describe('Messages reducer', () => {

  it('should return the initial state', () => {
    expect(MessagesReducer(undefined, {})
    ).to.eql([])
  });

  it('should handle UPDATE_MESSAGES', () => {

    let initialState = [];

    expect(MessagesReducer(initialState, {
      type: 'UPDATE_MESSAGES',
      messages: fetchedMessages
      }
    )).to.eql([ { "type" : "text", 
		  	   "user" : "anicknam", 
		  	   "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
		  	   "chatroom" : "StetsonAvalanche/GitTalk", 
		  	   "image" : null, 
		  	   "text" : "Hi" }
			     , 
			     { "type" : "text", 
			     "user" : "anicknam", 
		  	   "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
		  	   "chatroom" : "StetsonAvalanche/GitTalk", 
			     "image" : null, 
			     "text" : "Testing" } ]);
  });


  it('should handle ADD_MESSAGE', () => {

  	let initialState = fetchedMessages;

  	const newMessage = { "type" : "text", 
						  	         "user" : "f-fong", 
						  	         "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
						  	         "chatroom" : "StetsonAvalanche/GitTalk", 
						  	         "image" : null, 
						  	         "text" : "pull request made" };
  	
    expect(MessagesReducer(initialState, {
      type: 'ADD_MESSAGE',
      message: newMessage
    }
  )).to.eql([ { "type" : "text", 
		  	   "user" : "anicknam", 
		  	   "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
		  	   "chatroom" : "StetsonAvalanche/GitTalk", 
		  	   "image" : null, 
		  	   "text" : "Hi" }
			     , 
			     { "type" : "text", 
			     "user" : "anicknam", 
		  	   "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
		  	   "chatroom" : "StetsonAvalanche/GitTalk", 
			     "image" : null, 
			     "text" : "Testing" } 
			     ,
			     { "type" : "text", 
			     "user" : "f-fong", 
			     "userAvatarUrl" : "https://avatars.githubusercontent.com/u/16872422?v=3", 
			     "chatroom" : "StetsonAvalanche/GitTalk", 
			     "image" : null, 
			     "text" : "pull request made" }
			     ]);
  });

});
