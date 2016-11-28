import React from 'react';
import chai from 'chai';
const expect = chai.expect;
import MessagesReducer from '../../../client/reducers/messages-reducer';
// import * as actions from '../../../client/reducers/messages-reducer';


describe('Messages reducer', () => {
  // const initialState = { loaded: false, data: [] };

  it('should return the initial state', () => {
    expect(MessagesReducer(undefined, {})
    ).to.eql([])
  })

  // it('should handle ADD_MESSAGE', () => {
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
