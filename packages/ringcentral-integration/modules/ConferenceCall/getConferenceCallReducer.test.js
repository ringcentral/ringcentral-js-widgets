import { expect } from 'chai';
import actionTypes from './actionTypes';
import getConferenceCallReducer, {
  getConferenceCallStatusReducer,
  getMakeConferenceCallReducer,
  getMergingStatusReducer,
  getMergingPairReducer,
} from './getConferenceCallReducer';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import conferenceCallStatus from './conferenceCallStatus';

describe('ConferenceCall :: getConferenceCallReducer', () => {
  it('should be a function', () => {
    expect(getConferenceCallReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getConferenceCallReducer(actionTypes)).to.be.a('function');
  });

  describe('combined reducer', () => {
    const reducer = getConferenceCallReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const conferenceCallStatusReducer = getConferenceCallStatusReducer(actionTypes);
    const conferencesReducer = getMakeConferenceCallReducer(actionTypes);
    const mergingPairReducer = getMergingPairReducer(actionTypes);
    const isMergingReducer = getMergingStatusReducer(actionTypes);

    it('should return the combined initialState', () => {
      expect(reducer(undefined, {})).to.deep.equal({
        status: statusReducer(undefined, {}),
        conferences: conferencesReducer(undefined, {}),
        conferenceCallStatus: conferenceCallStatusReducer(undefined, {}),
        isMerging: isMergingReducer(undefined, {}),
        mergingPair: mergingPairReducer(undefined, {}),
      });
    });
  });
});

describe('ConferenceCall :: getMergingStatusReducer', () => {
  const reducer = getMergingStatusReducer(actionTypes);
  it('should have initial state of false', () => {
    expect(reducer(undefined, {})).to.equal(false);
  });
  it('should have state of false', () => {
    [
      'mergeSucceeded',
      'mergeFailed',
      'resetSuccess',
    ].forEach((type) => {
      expect(reducer(undefined, {
        type: actionTypes[type]
      })).to.equal(false);
    });
  });
  it('should have state of true', () => {
    [
      'mergeStart',
    ].forEach((type) => {
      expect(reducer(undefined, {
        type: actionTypes[type]
      })).to.equal(true);
    });
  });
});

describe('ConferenceCall :: getMergingPairReducer', () => {
  const reducer = getMergingPairReducer(actionTypes);
  it('should have initial state of empty', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(reducer(undefined, {})).to.be.an('object').that.is.empty;
  });
  it('should have the from field', () => {
    const from = {};

    expect(reducer(undefined, {
      type: actionTypes.updateFromSession,
      from,
    })).to.deep.equal({
      from
    });
  });

  it('should have the to field', () => {
    const to = {};

    expect(reducer(undefined, {
      type: actionTypes.updateToSession,
      to,
    })).to.deep.equal({
      to
    });
  });

  it('should reset to empty when reseting or merging successfully', () => {
    [
      'resetSuccess',
      'mergeSucceeded',
    ].forEach((type) => {
    // eslint-disable-next-line no-unused-expressions
      expect(reducer(undefined, {
        type: actionTypes[type]
      })).to.be.an('object').that.is.empty;
    });
  });
});

describe('ConferenceCall :: getConferenceCallStatusReducer', () => {
  const reducer = getConferenceCallStatusReducer(actionTypes);
  it('should have initial state of idle', () => {
    expect(reducer(undefined, {})).to.equal(conferenceCallStatus.idle);
  });
  it('should return state of requesting', () => {
    [
      'makeConference',
      'terminateConference',
      'updateConference',
      'bringInConference',
      'removeFromConference',
    ].forEach((type) => {
      expect(reducer(undefined, {
        type: actionTypes[type]
      })).to.equal(conferenceCallStatus.requesting);
    });
  });
  it('should return state of idle', () => {
    [
      'makeConferenceSucceeded',
      'makeConferenceFailed',
      'terminateConferenceSucceeded',
      'terminateConferenceFailed',
      'updateConferenceSucceeded',
      'updateConferenceFailed',
      'bringInConferenceSucceeded',
      'bringInConferenceFailed',
      'removeFromConferenceSucceeded',
      'removeFromConferenceFailed',
    ].forEach((type) => {
      expect(reducer(undefined, {
        type: actionTypes[type]
      })).to.equal(conferenceCallStatus.idle);
    });
  });
});

describe('ConferenceCall :: getMakeConferenceCallReducer', () => {
  const reducer = getMakeConferenceCallReducer(actionTypes);
  it('should have initial state of empty object', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(reducer(undefined, {})).to.be.an('object').that.is.empty;
  });
  it('should be empty object when reset', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(reducer(undefined, {
      type: actionTypes.reset
    })).to.be.an('object').that.is.empty;
  });
  it('should have a new record object when there is a new conference', () => {
    // eslint-disable-next-line no-unused-expressions
    const conference = {
      creationTime: '2018-05-28T09:21:20Z',
      id: 'Y3MxNjk4ODA3MzEyMDAwMTQwNjE3QDEwLjMyLjQ0LjE1NQ',
      origin: {
        type: 'Conference'
      },
      parties: [],
      voiceCallToken: 'conf_59334d784e6a6b344f4441334d7a45794d4441774d5451774e6a4533514445774c6a4d794c6a51304c6a45314e514031302e33322e34342e3135353a35303730'
    };

    expect(reducer({}, {
      type: actionTypes.makeConferenceSucceeded,
      conference,
      session: {}
    })).to.have.key(conference.id);
  });
  it('should delete a record when a conference is terminated', () => {
    const conference = {
      session: {
        creationTime: '2018-05-28T09:21:20Z',
        id: 'Y3MxNjk4ODA3MzEyMDAwMTQwNjE3QDEwLjMyLjQ0LjE1NQ',
        origin: {
          type: 'Conference'
        },
        parties: [],
        voiceCallToken: 'conf_59334d784e6a6b344f4441334d7a45794d4441774d5451774e6a4533514445774c6a4d794c6a51304c6a45314e514031302e33322e34342e3135353a35303730'
      }
    };
    const originalState = {};
    originalState[conference.id] = {};
    // eslint-disable-next-line no-unused-expressions
    expect(reducer(originalState, {
      type: actionTypes.terminateConferenceSucceeded,
      conference,
      session: {}
    })).to.not.have.keys(conference.id);
  });
  it('should update a record when getting new status', () => {
    const conference = {
      creationTime: '2018-05-28T09:21:20Z',
      id: 'Y3MxNjk4ODA3MzEyMDAwMTQwNjE3QDEwLjMyLjQ0LjE1NQ',
      origin: {
        type: 'Conference'
      },
      parties: [],
      voiceCallToken: 'conf_59334d784e6a6b344f4441334d7a45794d4441774d5451774e6a4533514445774c6a4d794c6a51304c6a45314e514031302e33322e34342e3135353a35303730'
    };
    const originalState = {};
    originalState[conference.id] = {};
    const testKey = `${conference.id}.conference.creationTime`;
    const testObj = {};
    testObj[testKey] = conference.creationTime;
    expect(reducer(originalState, {
      type: actionTypes.updateConferenceSucceeded,
      conference,
      session: {}
    })).to.have.key(conference.id);
    expect(reducer(originalState, {
      type: actionTypes.updateConferenceSucceeded,
      conference,
      session: {}
    })).to.nested.include(testObj);
  });
});
