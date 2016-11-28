import React from 'react';
import chai from 'chai';
const expect = chai.expect;
import * as actions from '../../../client/actions/actions';

describe('actions', () => {
  it('should add a message', () => {
    const message = 'Test';
    const expectedAction = {
      type: 'ADD_MESSAGE',
      message
    }

    expect(actions.addMessages(message)).to.eql(expectedAction);
  });

  // it('should receive a channel', () => {
  //   const channel = 'Test';
  //   const expectedAction = {
  //     type: types.RECEIVE_CHANNEL,
  //     channel
  //   }

  //   expect(actions.receiveRawChannel(channel)).toEqual(expectedAction);
  // });
});
