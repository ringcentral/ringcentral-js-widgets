import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import ContactSearch from './index';
import getContactSearchReducer from './getContactSearchReducer';
import getCacheReducer from './getCacheReducer';
import actionTypes from './actionTypes';
import loginStatus from '../../modules/Auth/loginStatus';

describe('ContactSearch Unit Test', () => {
  let contactSearch;
  let store;

  beforeEach(() => {
    contactSearch = sinon.createStubInstance(ContactSearch);
    store = createStore(getContactSearchReducer(actionTypes, {
      cache: getCacheReducer(actionTypes),
    }));
    contactSearch._store = store;
    contactSearch._prefixedActionTypes = actionTypes;
    contactSearch._minimalSearchLength = 3;
    [
      '_onStateChange',
      '_shouldInit',
      '_shouldReset',
      '_initModuleStatus',
      '_resetModuleStatus',
      'addSearchSource',
      'search',
      '_searchSource',
      '_readyCheck',
      '_loadSearching',
      '_saveSearching',
      '_searchFromCache',
      '_onSearchError',
    ].forEach((key) => {
      contactSearch[key].restore();
    });
  });

  describe('_onStateChange', () => {
    it('_initModuleStatus should be called once when _shouldInit is true', () => {
      sinon.stub(contactSearch, '_shouldInit').callsFake(() => true);
      sinon.stub(contactSearch, '_shouldReset').callsFake(() => false);
      sinon.stub(contactSearch, '_initModuleStatus');
      sinon.stub(contactSearch, '_resetModuleStatus');
      contactSearch._onStateChange();
      sinon.assert.calledOnce(contactSearch._initModuleStatus);
      sinon.assert.notCalled(contactSearch._resetModuleStatus);
    });

    it('_resetModuleStatus should be called once when _shouldReset is true', () => {
      sinon.stub(contactSearch, '_shouldInit').callsFake(() => false);
      sinon.stub(contactSearch, '_shouldReset').callsFake(() => true);
      sinon.stub(contactSearch, '_resetModuleStatus');
      sinon.stub(contactSearch, '_initModuleStatus');
      contactSearch._onStateChange();
      sinon.assert.notCalled(contactSearch._initModuleStatus);
      sinon.assert.calledOnce(contactSearch._resetModuleStatus);
    });

    it('_initModuleStatus and _resetModuleStatus should Not be called', () => {
      sinon.stub(contactSearch, '_shouldInit').callsFake(() => false);
      sinon.stub(contactSearch, '_shouldReset').callsFake(() => false);
      sinon.stub(contactSearch, '_resetModuleStatus');
      sinon.stub(contactSearch, '_initModuleStatus');
      contactSearch._onStateChange();
      sinon.assert.notCalled(contactSearch._resetModuleStatus);
      sinon.assert.notCalled(contactSearch._initModuleStatus);
    });
  });

  describe('_shouldInit', () => {
    describe('when contactSearch is not ready', () => {
      beforeEach(() => {
        sinon.stub(contactSearch, 'ready', { get: () => false });
      });

      describe('when _readyCheck is true', () => {
        beforeEach(() => {
          sinon.stub(contactSearch, '_readyCheck').callsFake(() => true);
        });

        it('Should return true when _auth is loggedIn,  _storage is ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
          contactSearch._storage = {
            ready: true
          };
          expect(contactSearch._shouldInit()).to.equal(true);
        });

        it('Should return false when _auth is notLoggedIn and _storage is ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
          contactSearch._storage = {
            ready: true
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is loggedIn and _storage is not ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
          contactSearch._storage = {
            ready: false
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is notLoggedIn and _storage is not ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
          contactSearch._storage = {
            ready: false
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return true when _auth is loggedIn and _storage is undefined', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
          contactSearch._storage = undefined;
          expect(contactSearch._shouldInit()).to.equal(true);
        });

        it('Should return false when _auth is not loggedIn and _storage is undefined', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
          contactSearch._storage = undefined;
          expect(contactSearch._shouldInit()).to.equal(false);
        });
      });

      describe('when _readyCheck is false', () => {
        beforeEach(() => {
          sinon.stub(contactSearch, '_readyCheck').callsFake(() => false);
        });

        it('Should return false when _auth is loggedIn,  _storage is ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
          contactSearch._storage = {
            ready: true
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is notLoggedIn,  _storage is ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
          contactSearch._storage = {
            ready: true
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is loggedIn,  _storage is not ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
          contactSearch._storage = {
            ready: false
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is notLoggedIn,  _storage is not ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
          contactSearch._storage = {
            ready: false
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is loggedIn and _storage is undefined', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
          contactSearch._storage = undefined;
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is not loggedIn and _storage is undefined', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
          contactSearch._storage = undefined;
          expect(contactSearch._shouldInit()).to.equal(false);
        });
      });
    });

    describe('when contactSearch is ready', () => {
      beforeEach(() => {
        sinon.stub(contactSearch, 'ready', { get: () => true });
      });

      describe('when _readyCheck is true', () => {
        beforeEach(() => {
          sinon.stub(contactSearch, '_readyCheck').callsFake(() => true);
        });

        it('Should return false when _auth is loggedIn,  _storage is ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
          contactSearch._storage = {
            ready: true
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is notLoggedIn,  _storage is ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
          contactSearch._storage = {
            ready: true
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is loggedIn,  _storage is not ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
          contactSearch._storage = {
            ready: false
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is notLoggedIn,  _storage is not ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
          contactSearch._storage = {
            ready: false
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is loggedIn and _storage is undefined', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
          contactSearch._storage = undefined;
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is not loggedIn and _storage is undefined', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
          contactSearch._storage = undefined;
          expect(contactSearch._shouldInit()).to.equal(false);
        });
      });

      describe('when _readyCheck is false', () => {
        beforeEach(() => {
          sinon.stub(contactSearch, '_readyCheck').callsFake(() => false);
        });

        it('Should return false when _auth is loggedIn,  _storage is ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
          contactSearch._storage = {
            ready: true
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is notLoggedIn,  _storage is ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
          contactSearch._storage = {
            ready: true
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is loggedIn,  _storage is not ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
          contactSearch._storage = {
            ready: false
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is notLoggedIn,  _storage is not ready', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
          contactSearch._storage = {
            ready: false
          };
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is loggedIn and _storage is undefined', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
          contactSearch._storage = undefined;
          expect(contactSearch._shouldInit()).to.equal(false);
        });

        it('Should return false when _auth is not loggedIn and _storage is undefined', () => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
          contactSearch._storage = undefined;
          expect(contactSearch._shouldInit()).to.equal(false);
        });
      });
    });
  });

  describe('_shouldReset', () => {
    describe('when contactSearch is ready', () => {
      beforeEach(() => {
        sinon.stub(contactSearch, 'ready', { get: () => true });
      });

      describe('when _auth is notLoggedIn', () => {
        beforeEach(() => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
        });

        it('Should return true when _storage is not ready', () => {
          contactSearch._storage = {
            ready: false
          };
          expect(contactSearch._shouldReset()).to.equal(true);
        });

        it('Should return true when _storage is ready', () => {
          contactSearch._storage = {
            ready: true
          };
          expect(contactSearch._shouldReset()).to.equal(true);
        });

        it('Should return true when _storage is undefined', () => {
          contactSearch._storage = undefined;
          expect(contactSearch._shouldReset()).to.equal(true);
        });
      });

      describe('when _auth is loggedIn', () => {
        beforeEach(() => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
        });

        it('Should return true when _storage is not ready', () => {
          contactSearch._storage = {
            ready: false
          };
          expect(contactSearch._shouldReset()).to.equal(true);
        });

        it('Should return false when _storage is ready', () => {
          contactSearch._storage = {
            ready: true
          };
          expect(contactSearch._shouldReset()).to.equal(false);
        });

        it('Should return false when _storage is undefined', () => {
          contactSearch._storage = undefined;
          expect(contactSearch._shouldReset()).to.not.be.ok;
        });
      });
    });

    describe('when contactSearch is not ready', () => {
      beforeEach(() => {
        sinon.stub(contactSearch, 'ready', { get: () => false });
      });

      describe('when _auth is notLoggedIn', () => {
        beforeEach(() => {
          contactSearch._auth = {
            loginStatus: loginStatus.notLoggedIn,
          };
        });

        it('Should return false when _storage is not ready', () => {
          contactSearch._storage = {
            ready: false
          };
          expect(contactSearch._shouldReset()).to.equal(false);
        });

        it('Should return false when _storage is ready', () => {
          contactSearch._storage = {
            ready: true
          };
          expect(contactSearch._shouldReset()).to.equal(false);
        });

        it('Should return false when _storage is undefined', () => {
          contactSearch._storage = undefined;
          expect(contactSearch._shouldReset()).to.equal(false);
        });
      });

      describe('when _auth is loggedIn', () => {
        beforeEach(() => {
          contactSearch._auth = {
            loginStatus: loginStatus.loggedIn,
          };
        });

        it('Should return false when _storage is not ready', () => {
          contactSearch._storage = {
            ready: false
          };
          expect(contactSearch._shouldReset()).to.equal(false);
        });

        it('Should return false when _storage is ready', () => {
          contactSearch._storage = {
            ready: true
          };
          expect(contactSearch._shouldReset()).to.equal(false);
        });

        it('Should return false when _storage is undefined', () => {
          contactSearch._storage = undefined;
          expect(contactSearch._shouldReset()).to.not.be.ok;
        });
      });
    });
  });

  describe('addSearchSource', () => {
    it('Should raise source name is required', () => {
      const searchFn = () => null;
      const readyCheckFn = () => null;
      const formatFn = () => null;
      let error = null;
      try {
        contactSearch.addSearchSource({ searchFn, readyCheckFn, formatFn });
      } catch (e) {
        error = e;
      }
      expect(error.message).to.equal('ContactSearch: "sourceName" is required.');
    });

    it('Should raise source name already exists error', () => {
      contactSearch._searchSources = new Map();
      const searchFn = () => null;
      const readyCheckFn = () => null;
      const formatFn = () => null;
      contactSearch._searchSources.set('test', searchFn);
      let error = null;
      try {
        contactSearch.addSearchSource({ sourceName: 'test', searchFn, readyCheckFn, formatFn });
      } catch (e) {
        error = e;
      }
      expect(error.message).to.equal('ContactSearch: A search source named "test" already exists');
    });

    it('Should raise a search source check name already exists error', () => {
      contactSearch._searchSources = new Map();
      contactSearch._searchSourcesCheck = new Map();
      const searchFn = () => null;
      const readyCheckFn = () => null;
      const formatFn = () => null;
      contactSearch._searchSourcesCheck.set('test', readyCheckFn);
      let error = null;
      try {
        contactSearch.addSearchSource({ sourceName: 'test', searchFn, readyCheckFn, formatFn });
      } catch (e) {
        error = e;
      }
      expect(error.message).to.equal('ContactSearch: A search source check named "test" already exists');
    });

    it('Should raise a search source check name already exists error', () => {
      contactSearch._searchSources = new Map();
      contactSearch._searchSourcesCheck = new Map();
      const searchFn = () => null;
      const readyCheckFn = () => null;
      const formatFn = () => null;
      contactSearch._searchSourcesCheck.set('test', readyCheckFn);
      let error = null;
      try {
        contactSearch.addSearchSource({ sourceName: 'test', searchFn, readyCheckFn, formatFn });
      } catch (e) {
        error = e;
      }
      expect(error.message).to.equal('ContactSearch: A search source check named "test" already exists');
    });

    it('Should raise a search source format name already exists error', () => {
      contactSearch._searchSources = new Map();
      contactSearch._searchSourcesCheck = new Map();
      contactSearch._searchSourcesFormat = new Map();
      const searchFn = () => null;
      const readyCheckFn = () => null;
      const formatFn = () => null;
      contactSearch._searchSourcesFormat.set('test', readyCheckFn);
      let error = null;
      try {
        contactSearch.addSearchSource({ sourceName: 'test', searchFn, readyCheckFn, formatFn });
      } catch (e) {
        error = e;
      }
      expect(error.message).to.equal('ContactSearch: A search source format named "test" already exists');
    });

    it('Should raise searchFn must be a function error', () => {
      contactSearch._searchSources = new Map();
      contactSearch._searchSourcesCheck = new Map();
      contactSearch._searchSourcesFormat = new Map();
      const searchFn = 'a';
      const readyCheckFn = () => null;
      const formatFn = () => null;
      let error = null;
      try {
        contactSearch.addSearchSource({ sourceName: 'test', searchFn, readyCheckFn, formatFn });
      } catch (e) {
        error = e;
      }
      expect(error.message).to.equal('ContactSearch: searchFn must be a function');
    });

    it('Should raise readyCheckFn must be a function error', () => {
      contactSearch._searchSources = new Map();
      contactSearch._searchSourcesCheck = new Map();
      contactSearch._searchSourcesFormat = new Map();
      const searchFn = () => null;
      const readyCheckFn = 'a';
      const formatFn = () => null;
      let error = null;
      try {
        contactSearch.addSearchSource({ sourceName: 'test', searchFn, readyCheckFn, formatFn });
      } catch (e) {
        error = e;
      }
      expect(error.message).to.equal('ContactSearch: readyCheckFn must be a function');
    });

    it('Should raise formatFn must be a function error', () => {
      contactSearch._searchSources = new Map();
      contactSearch._searchSourcesCheck = new Map();
      contactSearch._searchSourcesFormat = new Map();
      const searchFn = () => null;
      const readyCheckFn = () => null;
      const formatFn = 'a';
      let error = null;
      try {
        contactSearch.addSearchSource({ sourceName: 'test', searchFn, readyCheckFn, formatFn });
      } catch (e) {
        error = e;
      }
      expect(error.message).to.equal('ContactSearch: formatFn must be a function');
    });

    it('Should add SearchSource successfully', () => {
      contactSearch._searchSources = new Map();
      contactSearch._searchSourcesCheck = new Map();
      contactSearch._searchSourcesFormat = new Map();
      const searchFn = () => null;
      const readyCheckFn = () => null;
      const formatFn = () => null;
      contactSearch.addSearchSource({ sourceName: 'test', searchFn, readyCheckFn, formatFn });
      expect(contactSearch._searchSources.has('test')).to.equal(true);
      expect(contactSearch._searchSourcesCheck.has('test')).to.equal(true);
      expect(contactSearch._searchSourcesFormat.has('test')).to.equal(true);
    });
  });

  describe('search', () => {
    it('should not call _searchSource if contactSearch is not ready', async () => {
      sinon.stub(contactSearch, 'ready', { get: () => false });
      sinon.stub(contactSearch, '_searchSource');
      await contactSearch.search({ searchString: '123' });
      sinon.assert.notCalled(contactSearch._searchSource);
    });

    it('should not call _searchSource if searchString length is less than 3', async () => {
      sinon.stub(contactSearch, 'ready', { get: () => true });
      sinon.stub(contactSearch, '_searchSource');
      await contactSearch.search({ searchString: '12' });
      sinon.assert.notCalled(contactSearch._searchSource);
    });

    // it('should not call _searchSource if searchString is same as searching string', async () => {
    //   sinon.stub(contactSearch, 'ready', { get: () => true });
    //   sinon.stub(contactSearch, 'searching', { get: () => ({ searchString: '123' }) });
    //   sinon.stub(contactSearch, '_searchSource');
    //   await contactSearch.search({ searchString: '123' });
    //   sinon.assert.notCalled(contactSearch._searchSource);
    // });

    it('should call _searchSource once if there are one source', async () => {
      sinon.stub(contactSearch, 'ready', { get: () => true });
      sinon.stub(contactSearch, 'searching', { get: () => ({ searchString: '' }) });
      sinon.stub(contactSearch, '_searchSource');
      contactSearch._searchSources = new Map();
      contactSearch._searchSources.set('test', () => null);
      await contactSearch.search({ searchString: '123' });
      sinon.assert.calledOnce(contactSearch._searchSource);
    });

    it('should call _searchSource twice if there are two source', async () => {
      sinon.stub(contactSearch, 'ready', { get: () => true });
      sinon.stub(contactSearch, 'searching', { get: () => ({ searchString: '' }) });
      sinon.stub(contactSearch, '_searchSource');
      contactSearch._searchSources = new Map();
      contactSearch._searchSources.set('test', () => null);
      contactSearch._searchSources.set('test2', () => null);
      await contactSearch.search({ searchString: '123' });
      sinon.assert.callCount(contactSearch._searchSource, 2);
    });
  });

  describe('_searchSource', () => {
    it('should call _loadSearching and not call _saveSearching if searchFromCache return result', async () => {
      contactSearch._searchIds = new Map();
      sinon.stub(contactSearch, '_searchFromCache').callsFake(() => ['123']);
      sinon.stub(contactSearch, '_loadSearching');
      sinon.stub(contactSearch, '_saveSearching');
      sinon.stub(contactSearch, '_onSearchError');
      await contactSearch._searchSource({ sourceName: 'test', searchString: '123' });
      sinon.assert.calledOnce(contactSearch._loadSearching);
      sinon.assert.notCalled(contactSearch._saveSearching);
      sinon.assert.notCalled(contactSearch._onSearchError);
    });

    it('should call _loadSearching and call _saveSearching if searchFromCache return null', async () => {
      contactSearch._searchIds = new Map();
      contactSearch._searchSources = new Map();
      contactSearch._searchSourcesFormat = new Map();
      contactSearch._searchSources.set('test', () => ['123']);
      contactSearch._searchSourcesFormat.set('test', entities => entities);
      sinon.stub(contactSearch, '_searchFromCache').callsFake(() => null);
      sinon.stub(contactSearch, '_loadSearching');
      sinon.stub(contactSearch, '_saveSearching');
      sinon.stub(contactSearch, '_onSearchError');
      await contactSearch._searchSource({ sourceName: 'test', searchString: '123' });
      sinon.assert.calledOnce(contactSearch._loadSearching);
      sinon.assert.calledOnce(contactSearch._saveSearching);
      sinon.assert.notCalled(contactSearch._onSearchError);
    });

    it('should call _onSearchError when _searchFromCache throw error', async () => {
      contactSearch._searchIds = new Map();
      contactSearch._searchSources = new Map();
      contactSearch._searchSourcesFormat = new Map();
      contactSearch._searchSources.set('test', () => ['123']);
      contactSearch._searchSourcesFormat.set('test', entities => entities);
      sinon.stub(contactSearch, '_searchFromCache').throws(new Error('error'));
      sinon.stub(contactSearch, '_loadSearching');
      sinon.stub(contactSearch, '_saveSearching');
      sinon.stub(contactSearch, '_onSearchError');
      await contactSearch._searchSource({ sourceName: 'test', searchString: '123' });
      sinon.assert.calledOnce(contactSearch._onSearchError);
    });
  });

  describe('_searchFromCache', () => {
    it('should return null if contactSearch in cache is undefined', () => {
      contactSearch._ttl = 30 * 60 * 1000;
      sinon.stub(contactSearch, 'cache', { get: () => ({}) });
      const result = contactSearch._searchFromCache({ sourceName: 'test', searchString: '123' });
      expect(result).to.equal(null);
    });

    it('should return null if cache is null', () => {
      contactSearch._ttl = 30 * 60 * 1000;
      sinon.stub(contactSearch, 'cache', { get: () => null });
      const result = contactSearch._searchFromCache({ sourceName: 'test', searchString: '123' });
      expect(result).to.equal(null);
    });

    it('should return null if searching key in cache is undefined', () => {
      contactSearch._ttl = 30 * 60 * 1000;
      sinon.stub(contactSearch, 'cache', { get: () => ({ contactSearch: {} }) });
      const result = contactSearch._searchFromCache({ sourceName: 'test', searchString: '123' });
      expect(result).to.equal(null);
    });

    it('should return null if searching in cache is expired', () => {
      contactSearch._ttl = 30 * 60 * 1000;
      sinon.stub(contactSearch, 'cache', {
        get: () => ({ contactSearch: { 'test-123': { timestamp: 0, entities: [] } } })
      });
      const result = contactSearch._searchFromCache({ sourceName: 'test', searchString: '123' });
      expect(result).to.equal(null);
    });

    it('should return entities successfully', () => {
      contactSearch._ttl = 30 * 60 * 1000;
      sinon.stub(contactSearch, 'cache', {
        get: () => ({ contactSearch: { 'test-123': { timestamp: Date.now(), entities: ['321'] } } })
      });
      const result = contactSearch._searchFromCache({ sourceName: 'test', searchString: '123' });
      expect(result).to.deep.equal(['321']);
    });
  });

  describe('_readyCheck', () => {
    it('should return true if _searchSourcesCheck is empty', () => {
      contactSearch._searchSourcesCheck = new Map();
      const result = contactSearch._readyCheck();
      expect(result).to.deep.equal(true);
    });

    it('should return false if _searchSourcesCheck number return false', () => {
      contactSearch._searchSourcesCheck = new Map();
      contactSearch._searchSourcesCheck.set('test', () => false);
      const result = contactSearch._readyCheck();
      expect(result).to.deep.equal(false);
    });

    it('should return false if on number of _searchSourcesCheck return false', () => {
      contactSearch._searchSourcesCheck = new Map();
      contactSearch._searchSourcesCheck.set('test', () => true);
      contactSearch._searchSourcesCheck.set('test1', () => false);
      const result = contactSearch._readyCheck();
      expect(result).to.deep.equal(false);
    });
  });
});
