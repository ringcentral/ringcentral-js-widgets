import { expect } from 'chai';
import actionTypes from './actionTypes';
import getEnvironmentReducer, {
  getChangeCounterReducer,
  getServerReducer,
  getRecordingHostReducer,
  getEnabledReducer,
} from './getEnvironmentReducer';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

describe('getChangeCounter', () => {
  it('should be a function', () => {
    expect(getChangeCounterReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getChangeCounterReducer()).to.be.a('function');
  });
  describe('changeCounterReducer', () => {
    const reducer = getChangeCounterReducer(actionTypes);
    it('should have initial state of 0', () => {
      expect(reducer(undefined, {})).to.equal(0);
    });
    it('should increment state when type === setData and enviromentChanged === true', () => {
      [0, 1, 2, 3, 4].forEach((state) => {
        expect(reducer(state, {
          type: actionTypes.setData,
          environmentChanged: true
        })).to.equal(state + 1);
      });
    });
    it('should return originalState when type === setData and environmentChanged === false', () => {
      const originalState = {};
      expect(reducer(originalState, {
        type: actionTypes.setData,
        environmentChanged: false,
      })).to.equal(originalState);
    });
    it('should return originalState for all other action types', () => {
      const originalState = {};
      expect(reducer(originalState, {
        type: 'foo',
      })).to.equal(originalState);
    });
  });
});

describe('getServerReducer', () => {
  it('should be a function', () => {
    expect(getServerReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getServerReducer({ types: actionTypes, defaultServer: 'foo' })).to.be.a('function');
  });
  describe('serverReducer', () => {
    const reducer = getServerReducer({ types: actionTypes, defaultServer: 'foo' });
    it('should have initial state of defaultServer', () => {
      expect(reducer(undefined, {})).to.equal('foo');
    });
    it('should return originalState if type is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.server on setData', () => {
      expect(reducer(null, {
        type: actionTypes.setData,
        server: 'bar',
      })).to.equal('bar');
    });
  });
});

describe('getRecordingHostReducer', () => {
  it('should be a function', () => {
    expect(getRecordingHostReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getRecordingHostReducer({ types: actionTypes, defaultRecordingHost: 'foo' })).to.be.a('function');
  });
  describe('serverReducer', () => {
    const reducer = getRecordingHostReducer({ types: actionTypes, defaultRecordingHost: 'foo' });
    it('should have initial state of defaultRecordingHost', () => {
      expect(reducer(undefined, {})).to.equal('foo');
    });
    it('should return originalState if type is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.recordingHost on setData', () => {
      expect(reducer(null, {
        type: actionTypes.setData,
        recordingHost: 'bar',
      })).to.equal('bar');
    });
  });
});


describe('getEnabledReducer', () => {
  it('should be a function', () => {
    expect(getEnabledReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getEnabledReducer(actionTypes)).to.be.a('function');
  });
  describe('enabledReducer', () => {
    const reducer = getEnabledReducer(actionTypes);
    it('should have initial state of false', () => {
      expect(reducer(undefined, {})).to.be.false;
    });
    it('should return originalState if type is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.enabled on setData', () => {
      expect(reducer(null, {
        type: actionTypes.setData,
        enabled: true,
      })).to.be.true;
      expect(reducer(null, {
        type: actionTypes.setData,
        enabled: false,
      })).to.be.false;
    });
  });
});

describe('getEnvironmentReducer', () => {
  it('should be a function', () => {
    expect(getEnvironmentReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getEnvironmentReducer(actionTypes)).to.be.a('function');
  });
  describe('serverReducer', () => {
    const reducer = getEnvironmentReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const changeCounterReducer = getChangeCounterReducer(actionTypes);
    it('should return the combined initialState', () => {
      expect(reducer(undefined, {})).to.deep.equal({
        status: statusReducer(undefined, {}),
        changeCounter: changeCounterReducer(undefined, {}),
      });
    });
  });
});
