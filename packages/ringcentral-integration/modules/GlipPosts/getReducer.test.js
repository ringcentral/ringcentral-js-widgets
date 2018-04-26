import { expect } from 'chai';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import getReducer, {
  getGlipPostsStatusReducer,
  getGlipPostsCreateStatusReducer,
  getGlipPostsStoreReducer,
  getGlipPostsInputsReducer
} from './getReducer';

import actionTypes from './actionTypes';
import status from './status';

describe('GlipPosts :: getGlipPostsStatusReducer', () => {
  it('getGlipPostsStatusReducer should be a function', () => {
    expect(getGlipPostsStatusReducer).to.be.a('function');
  });
  it('getGlipPostsStatusReducer should return a reducer', () => {
    expect(getGlipPostsStatusReducer()).to.be.a('function');
  });
  describe('glipPostsStatusReducer', () => {
    const reducer = getGlipPostsStatusReducer(actionTypes);
    it('should have initial state of status.idle', () => {
      expect(reducer(undefined, {})).to.equal(status.idle);
    });

    it('should return fetching status on fetch', () => {
      expect(reducer('foo', {
        type: actionTypes.fetch,
      })).to.equal(status.fetching);
    });

    it('should return idle status on fetchSuccess or fetchError', () => {
      [
        actionTypes.fetchSuccess,
        actionTypes.fetchError,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(status.idle);
      });
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
  });
});

describe('GlipPosts :: getGlipPostsCreateStatusReducer', () => {
  it('getGlipPostsCreateStatusReducer should be a function', () => {
    expect(getGlipPostsCreateStatusReducer).to.be.a('function');
  });
  it('getGlipPostsCreateStatusReducer should return a reducer', () => {
    expect(getGlipPostsCreateStatusReducer()).to.be.a('function');
  });
  describe('glipPostsCreateStatusReducer', () => {
    const reducer = getGlipPostsCreateStatusReducer(actionTypes);
    it('should have initial state of status.idle', () => {
      expect(reducer(undefined, {})).to.deep.equal(status.idle);
    });

    it('should return creating status on create', () => {
      expect(reducer('foo', {
        type: actionTypes.create,
      })).to.equal(status.creating);
    });

    it('should return idle status on createError or createSuccess', () => {
      [
        actionTypes.createSuccess,
        actionTypes.createError,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(status.idle);
      });
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
  });
});

describe('GlipPosts :: getGlipPostsStoreReducer', () => {
  it('getGlipPostsStoreReducer should be a function', () => {
    expect(getGlipPostsStoreReducer).to.be.a('function');
  });
  it('getGlipPostsStoreReducer should return a reducer', () => {
    expect(getGlipPostsStoreReducer()).to.be.a('function');
  });
  describe('glipPostsStoreReducer', () => {
    const reducer = getGlipPostsStoreReducer(actionTypes);
    it('should have initial state of empty object', () => {
      expect(reducer(undefined, {})).to.deep.equal({});
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should have empty object of resetSuccess', () => {
      expect(reducer({ test: 'aaa' }, {
        type: actionTypes.resetSuccess
      })).to.deep.equal({});
    });

    it('should return object with new records when fetch successfully', () => {
      expect(reducer({}, {
        type: actionTypes.fetchSuccess,
        groupId: '1234',
        records: [{ id: '1' }]
      })).to.deep.equal({
        1234: [{ id: '1' }]
      });
    });

    it('should return record on create or createSuccess or createError', () => {
      [
        actionTypes.create,
        actionTypes.createSuccess,
        actionTypes.createError,
      ].forEach((type) => {
        expect(reducer({
          1234: [{ id: '1' }]
        }, {
          type,
          record: { id: '2' },
          groupId: '1234'
        })).to.deep.equal({
          1234: [{ id: '2' }, { id: '1' }]
        });
      });
    });

    it(`should do nothing when is created by me and existing
        when create or createSuccess or createError`, () => {
        [
          actionTypes.create,
          actionTypes.createSuccess,
          actionTypes.createError,
        ].forEach((type) => {
          expect(reducer({
            1234: [{
              id: '2', creatorId: '123', text: '111', sendStatus: status.creating
            }]
          }, {
            type,
            record: {
              id: '2', creatorId: '123', text: '111', sendStatus: status.creating
            },
            groupId: '1234',
            isSendByMe: true,
          })).to.deep.equal({
            1234: [{
              id: '2', creatorId: '123', text: '111', sendStatus: status.creating
            }]
          });
        });
      });
  });
});

describe('GlipPosts :: getGlipPostsInputsReducer', () => {
  it('getGlipPostsInputsReducer should be a function', () => {
    expect(getGlipPostsInputsReducer).to.be.a('function');
  });
  it('getGlipPostsInputsReducer should return a reducer', () => {
    expect(getGlipPostsInputsReducer()).to.be.a('function');
  });
  describe('glipPostsInputsReducer', () => {
    const reducer = getGlipPostsInputsReducer(actionTypes);
    it('should have initial state of empty object', () => {
      expect(reducer(undefined, {})).to.deep.equal({});
    });

    it('should return new input map on updatePostInput', () => {
      expect(reducer({
        1234: {
          text: 'aaa'
        }
      }, {
        type: actionTypes.updatePostInput,
        groupId: '2222',
        textValue: 'xxx'
      })).to.deep.equal({
        1234: {
          text: 'aaa'
        },
        2222: {
          text: 'xxx'
        }
      });
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
  });
});

describe('GlipPosts :: getReducer', () => {
  it('should be a function', () => {
    expect(getReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getReducer(actionTypes)).to.be.a('function');
  });
  it('should return a combined reducer', () => {
    const reducer = getReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const glipPostsStatusReducer = getGlipPostsStatusReducer(actionTypes);
    const glipPostsStoreReducer = getGlipPostsStoreReducer(actionTypes);
    const glipPostsCreateStatusReducer = getGlipPostsCreateStatusReducer(actionTypes);
    const glipPostsInputsReducer = getGlipPostsInputsReducer(actionTypes);
    expect(reducer(undefined, {})).to.deep.equal({
      status: statusReducer(undefined, {}),
      fetchStatus: glipPostsStatusReducer(undefined, {}),
      glipPostsStore: glipPostsStoreReducer(undefined, {}),
      createStatus: glipPostsCreateStatusReducer(undefined, {}),
      postInputs: glipPostsInputsReducer(undefined, {}),
    });
  });
});
