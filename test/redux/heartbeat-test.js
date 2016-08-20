import { expect } from 'chai';
import reducer from '_reducers/heartbeat';

describe('heartbeat reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
    .to.deep.equal({
      isLoading: false,
      heartbeat: null,
      sort: 'timeStart'
    });
  });
});
