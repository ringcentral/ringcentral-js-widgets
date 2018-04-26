import { expect } from 'chai';
import getTabManagerReducer, {
  getEventReducer,
  getActiveReducer,
} from './getTabManagerReducer';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import actionTypes from './actionTypes';
import moduleStatuses from '../../enums/moduleStatuses';


describe('getEventReducer', () => {
  it('should be a function', () => {
    expect(getEventReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getEventReducer(actionTypes)).to.be.a('function');
  });
  describe('eventReducer', () => {
    const reducer = getEventReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return null for all actions except for event', () => {
      expect(reducer('foo', { type: 'foo' }))
        .to.equal(null);
    });
    it('should return { name, args } on event action type', () => {
      expect(reducer(null, {
        type: actionTypes.event,
        event: 'foo',
        args: ['bar'],
      })).to.deep.equal({
        name: 'foo',
        args: ['bar'],
      });
    });
  });
});

describe('getActiveReducer', () => {
  it('should be a function', () => {
    expect(getActiveReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getActiveReducer(actionTypes)).to.be.a('function');
  });
  describe('activeReducer', () => {
    const reducer = getActiveReducer(actionTypes);
    it('should have initial state of false', () => {
      expect(reducer(undefined, {})).to.be.false;
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.active on initSuccess action type', () => {
      expect(reducer(null, {
        type: actionTypes.initSuccess,
        active: true,
      })).to.be.true;
      expect(reducer(null, {
        type: actionTypes.initSuccess,
        active: false,
      })).to.be.false;
    });
    it('should return action.active on mainTabIdChanged action type', () => {
      expect(reducer(null, {
        type: actionTypes.mainTabIdChanged,
        active: true,
      })).to.be.true;
      expect(reducer(null, {
        type: actionTypes.mainTabIdChanged,
        active: false,
      })).to.be.false;
    });
  });
});

describe('getTabManagerReducer', () => {
  it('should be a function', () => {
    expect(getTabManagerReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getTabManagerReducer(actionTypes)).to.be.a('function');
  });
  it('should return a combined reducer', () => {
    const reducer = getTabManagerReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const activeReducer = getActiveReducer(actionTypes);
    const eventReducer = getEventReducer(actionTypes);
    expect(reducer(undefined, {})).to.deep.equal({
      status: statusReducer(undefined, {}),
      active: activeReducer(undefined, {}),
      event: eventReducer(undefined, {}),
    });
  });
});
