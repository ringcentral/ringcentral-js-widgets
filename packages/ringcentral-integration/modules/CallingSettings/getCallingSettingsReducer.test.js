import { expect } from 'chai';
import getCallingSettingsReducer, {
  getCallWithReducer,
  getMyLocationReducer,
  getRingoutPromptReducer,
  getTimestampReducer,
} from './getCallingSettingsReducer';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import actionTypes from './actionTypes';

describe('getCallWithReducer', () => {
  it('should be a function', () => {
    expect(getCallWithReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getCallWithReducer(actionTypes)).to.be.a('function');
  });
  describe('callWithReducer', () => {
    const reducer = getCallWithReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.callWith on setData', () => {
      const callWith = 'foo';
      expect(reducer(null, {
        type: actionTypes.setData,
        callWith,
      })).to.equal(callWith);
    });
    it('should return originalState on setData if action.callWith is undefined', () => {
      expect(reducer('foo', {
        type: actionTypes.setData,
      })).to.equal('foo');
    });
  });
});

describe('getMyLocationReducer', () => {
  it('should be a function', () => {
    expect(getMyLocationReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getMyLocationReducer(actionTypes)).to.be.a('function');
  });
  describe('myLocationReducer', () => {
    const reducer = getMyLocationReducer(actionTypes);
    it('should have initial state of ""', () => {
      expect(reducer(undefined, {})).to.equal('');
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.myLocation on setData', () => {
      const myLocation = 'foo';
      expect(reducer(null, {
        type: actionTypes.setData,
        myLocation,
      })).to.equal(myLocation);
    });
    it('should return originalState on setData if action.myLocation is undefined', () => {
      expect(reducer('foo', {
        type: actionTypes.setData,
      })).to.equal('foo');
    });
  });
});

describe('getRingoutPromptReducer', () => {
  it('should be a function', () => {
    expect(getRingoutPromptReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getRingoutPromptReducer(actionTypes)).to.be.a('function');
  });
  describe('ringoutPromptReducer', () => {
    const reducer = getRingoutPromptReducer(actionTypes);
    it('should have initial state of true', () => {
      expect(reducer(undefined, {})).to.be.true;
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.ringoutPrompt on setData', () => {
      const ringoutPrompt = 'foo';
      expect(reducer(null, {
        type: actionTypes.setData,
        ringoutPrompt,
      })).to.equal(ringoutPrompt);
    });
    it('should return originalState on setData if action.ringoutPrompt is undefined', () => {
      expect(reducer('foo', {
        type: actionTypes.setData,
      })).to.equal('foo');
    });
  });
});

describe('getTimestampReducer', () => {
  it('should be a function', () => {
    expect(getTimestampReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getTimestampReducer(actionTypes)).to.be.a('function');
  });
  describe('timestampReducer', () => {
    const reducer = getTimestampReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.timestamp on setData', () => {
      const timestamp = 'foo';
      expect(reducer(null, {
        type: actionTypes.setData,
        timestamp,
      })).to.equal(timestamp);
    });
    it('should return originalState on setData if action.timestamp is undefined', () => {
      expect(reducer('foo', {
        type: actionTypes.setData,
      })).to.equal('foo');
    });
  });
});

 describe('getCallingSettingsReducer', () => {
   it('should be a function', () => {
     expect(getCallingSettingsReducer).to.be.a('function');
   });
   it('should return a reducer', () => {
     const reducer = getCallingSettingsReducer(actionTypes);
     const statusReducer = getModuleStatusReducer(actionTypes);
     it('should return combined state', () => {
       expect(reducer(undefined, {}))
        .to.deep.equal({
          status: statusReducer(undefined, {}),
        });
     });
   })
 });
