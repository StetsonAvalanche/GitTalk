import chai from 'chai';
const expect = chai.expect;

import * as actions from '../../../client/actions/actions';

describe('actions', () => {
  it('should receive a message', () => {
    const message = 'Test';
    const expectedAction = {
      type: types.RECEIVE_MESSAGE,
      message
    }

    expect(actions.receiveRawMessage(message)).toEqual(expectedAction);
  });

  it('should receive a channel', () => {
    const channel = 'Test';
    const expectedAction = {
      type: types.RECEIVE_CHANNEL,
      channel
    }

    expect(actions.receiveRawChannel(channel)).toEqual(expectedAction);
  });
});
