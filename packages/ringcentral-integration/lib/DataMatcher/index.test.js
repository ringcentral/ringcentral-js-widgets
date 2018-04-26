import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { createStore } from 'redux';
import DataMatcher from './index';
import { prefixEnum } from '../Enum';
import baseActionTypes from './baseActionTypes';
import moduleStatuses from '../../enums/moduleStatuses';
import sleep from '../sleep';

chai.use(chaiAsPromised);

describe('DataMatcher', async () => {
  describe('constructor', () => {
    it('should throw if instancized without a "name" property', () => {
      expect(() => (
        new DataMatcher()
      )).to.throw();
      expect(() => (
        new DataMatcher({
          name: 'test',
        })
      )).to.not.throw();
    });
    it('should throw if "name" property is not a string', () => {
      [{}, [], null, undefined, 123].forEach((name) => {
        expect(() => (
          new DataMatcher({
            name,
          })
        )).to.throw();
      });
    });
    it('should prefix baseActionTypes according to "name"', () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      expect(instance.actionTypes)
        .to.equal(prefixEnum({
          base: baseActionTypes,
          prefix: 'foo',
        }));
    });
    it('should prefix baseActionTypes according to "name" and prefix', () => {
      const instance = new DataMatcher({
        name: 'foo',
        prefix: 'bar',
      });
      expect(instance.actionTypes)
        .to.equal(prefixEnum({
          base: prefixEnum({
            base: baseActionTypes,
            prefix: 'foo',
          }),
          prefix: 'bar'
        }));
    });
    it('should register dataReducer to storage if storage is found', () => {
      const storage = {
        registerReducer: sinon.stub(),
      };
      const instance = new DataMatcher({
        name: 'foo',
        storage,
      });
      expect(instance._storage).to.equal(storage);
      sinon.assert.calledOnce(storage.registerReducer);
    });
  });

  describe('addQuerySource', () => {
    const instance = new DataMatcher({
      name: 'foo',
    });
    it('should be a function', () => {
      expect(instance.addQuerySource).to.be.a('function');
    });
    it('should add getQueriesFn and readyCheckFn to instance._querySources', () => {
      const getQueriesFn = () => [];
      const readyCheckFn = () => true;
      instance.addQuerySource({
        getQueriesFn,
        readyCheckFn,
      });
      expect(instance._querySources.has(getQueriesFn)).to.equal(true);
      expect(instance._querySources.get(getQueriesFn)).to.equal(readyCheckFn);
    });
    it('should throw when getQueriesFn is not a function', () => {
      [{}, [], 123, undefined, null, 'foo'].forEach((getQueriesFn) => {
        expect(() => {
          instance.addQuerySource({
            getQueriesFn,
            readyCheckFn: () => true,
          });
        }).to.throw();
      });
    });
    it('should throw when readyCheckFn is not a function', () => {
      [{}, [], 123, undefined, null, 'foo'].forEach((readyCheckFn) => {
        expect(() => {
          instance.addQuerySource({
            getQueriesFn: () => true,
            readyCheckFn,
          });
        }).to.throw();
      });
    });
    it('should throw when the same getQueriesFn is added twice', () => {
      const getQueriesFn = () => [];
      const readyCheckFn = () => true;
      instance.addQuerySource({
        getQueriesFn,
        readyCheckFn,
      });
      expect(() => {
        instance.addQuerySource({
          getQueriesFn,
          readyCheckFn,
        });
      }).to.throw();
    });
  });

  describe('addSearchProvider', () => {
    const instance = new DataMatcher({
      name: 'foo',
    });
    it('should be a function', () => {
      expect(instance.addSearchProvider).to.be.a('function');
    });
    it('should add getQueriesFn and readyCheckFn to instance._querySources', () => {
      const searchFn = () => { };
      const readyCheckFn = () => true;
      const name = 'bar';
      instance.addSearchProvider({
        name,
        searchFn,
        readyCheckFn,
      });
      expect(instance._searchProviders.has(name)).to.equal(true);
      expect(instance._searchProviders.get(name)).to.deep.equal({
        searchFn,
        readyCheckFn,
      });
    });
    it('should throw when name is not defined', () => {
      const searchFn = () => { };
      const readyCheckFn = () => true;
      expect(() => {
        instance.addSearchProvider({
          searchFn,
          readyCheckFn,
        });
      }).to.throw();
    });
    it('should throw when a provider of the same name was already added', () => {
      const searchFn = () => { };
      const readyCheckFn = () => true;
      const name = 'rogue';
      instance.addSearchProvider({
        name,
        searchFn,
        readyCheckFn,
      });
      expect(() => {
        instance.addSearchProvider({
          name,
          searchFn,
          readyCheckFn,
        });
      }).to.throw();
    });
    it('should throw when searchFn is not a function', () => {
      const readyCheckFn = () => true;
      const name = 'rogue2';
      [null, undefined, {}, [], 123, '123'].forEach((searchFn) => {
        expect(() => {
          instance.addSearchProvider({
            name,
            searchFn,
            readyCheckFn,
          });
        }).to.throw();
      });
    });
    it('should throw when readyCheckFn is not a function', () => {
      const searchFn = () => { };
      const name = 'rogue2';
      [null, undefined, {}, [], 123, '123'].forEach((readyCheckFn) => {
        expect(() => {
          instance.addSearchProvider({
            name,
            searchFn,
            readyCheckFn,
          });
        }).to.throw();
      });
    });
  });

  describe('_shouldInit', () => {
    const options = [true, false];
    options.forEach((modulePending) => {
      options.forEach((searchProvidersReady) => {
        const result = modulePending && searchProvidersReady;
        it(`should return ${result} when this.pending === ${modulePending},
          this.searchProvidersReady === ${searchProvidersReady}}`,
          () => {
            const instance = new DataMatcher({
              name: 'foo',
            });
            sinon.stub(instance, 'pending', {
              get: () => modulePending,
            });
            sinon.stub(instance, 'searchProvidersReady', {
              get: () => searchProvidersReady,
            });
            expect(instance._shouldInit()).to.equal(result);
          });

        options.forEach((storageReady) => {
          const sResult = modulePending && searchProvidersReady && storageReady;
          it(`should return ${sResult} when this.pending === ${modulePending},
          this.searchProvidersReady === ${searchProvidersReady},
          and this._storage.ready === ${storageReady}`,
            () => {
              const sInstance = new DataMatcher({
                name: 'foo',
                storage: {
                  ready: storageReady,
                  registerReducer: () => { },
                },
              });
              sinon.stub(sInstance, 'pending', {
                get: () => modulePending,
              });
              sinon.stub(sInstance, 'searchProvidersReady', {
                get: () => searchProvidersReady,
              });
              expect(sInstance._shouldInit()).to.equal(sResult);
            });
        });
      });
    });
  });

  describe('_shouldReset', () => {
    const options = [true, false];
    options.forEach((moduleReady) => {
      options.forEach((searchProvidersReady) => {
        const result = moduleReady && !searchProvidersReady;
        it(`should return ${result} when this.ready === ${moduleReady},
        this.searchProvidersReady === ${searchProvidersReady}`,
          () => {
            const instance = new DataMatcher({
              name: 'foo',
            });
            sinon.stub(instance, 'ready', {
              get: () => moduleReady,
            });
            sinon.stub(instance, 'searchProvidersReady', {
              get: () => searchProvidersReady,
            });
            expect(instance._shouldReset()).to.equal(result);
          });

        options.forEach((storageReady) => {
          const sResult = moduleReady &&
            (
              !searchProvidersReady ||
              !storageReady)
            ;
          it(`should return ${sResult} when this.ready === ${moduleReady},
          this.searchProvidersReady === ${searchProvidersReady},
          and this._storage.ready === ${storageReady}`,
            () => {
              const sInstance = new DataMatcher({
                name: 'foo',
                storage: {
                  ready: storageReady,
                  registerReducer: () => { },
                },
              });
              sinon.stub(sInstance, 'ready', {
                get: () => moduleReady,
              });
              sinon.stub(sInstance, 'searchProvidersReady', {
                get: () => searchProvidersReady,
              });
              expect(sInstance._shouldReset()).to.equal(sResult);
            });
        });
      });
    });
  });

  describe('_onStateChange', () => {
    it('should initialize when _shouldInit returns true', () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance._store = createStore(instance.reducer);
      sinon.stub(instance, '_shouldInit').callsFake(() => true);
      sinon.stub(instance, '_shouldReset').callsFake(() => false);
      sinon.stub(instance, '_cleanUp');
      instance._onStateChange();
      sinon.assert.calledOnce(instance._cleanUp);
      expect(instance._store.getState().status === moduleStatuses.ready);
    });
    it('should reset when _shouldReset returns true', () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance._store = createStore(instance.reducer);
      sinon.stub(instance, '_shouldInit').callsFake(() => false);
      sinon.stub(instance, '_shouldReset').callsFake(() => true);
      sinon.stub(instance, '_cleanUp');
      instance._onStateChange();
      sinon.assert.notCalled(instance._cleanUp);
      expect(instance._store.getState().status === moduleStatuses.pending);
    });
    it('should do nothing when both _shouldInit and _shouldReset return false', () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance._store = createStore(instance.reducer);
      instance._store.dispatch({
        type: instance.actionTypes.init,
      });
      sinon.stub(instance, '_shouldInit').callsFake(() => false);
      sinon.stub(instance, '_shouldReset').callsFake(() => false);
      sinon.stub(instance, '_cleanUp');
      instance._onStateChange();
      sinon.assert.notCalled(instance._cleanUp);
      expect(instance._store.getState().status === moduleStatuses.initializing);
    });
  });

  describe('searchProvidersReady', () => {
    it('should return true if there are no searchProviders', () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      expect(instance.searchProvidersReady).to.equal(true);
    });
    it('should return false if any one of the searchProviders is not ready', () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance.addSearchProvider({
        name: 'search1',
        searchFn: () => { },
        readyCheckFn: () => false,
      });
      instance.addSearchProvider({
        name: 'search2',
        searchFn: () => { },
        readyCheckFn: () => true,
      });
      expect(instance.searchProvidersReady).to.equal(false);
    });
    it('should return true if all of the searchProviders are ready', () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance.addSearchProvider({
        name: 'search1',
        searchFn: () => { },
        readyCheckFn: () => true,
      });
      instance.addSearchProvider({
        name: 'search2',
        searchFn: () => { },
        readyCheckFn: () => true,
      });
      expect(instance.searchProvidersReady).to.equal(true);
    });
  });

  describe('_getQueries', () => {
    it('should return empty array if no querySources is present', () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      expect(instance._getQueries()).to.deep.equal([]);
    });
    it('should return empty array if no querySources are ready', () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance.addQuerySource({
        getQueriesFn: () => [1, 2, 3],
        readyCheckFn: () => false,
      });
      expect(instance._getQueries()).to.deep.equal([]);
    });
    it('should return an array of all the unique queries from sources that are ready', () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance.addQuerySource({
        getQueriesFn: () => [1, 2, 3],
        readyCheckFn: () => true,
      });
      instance.addQuerySource({
        getQueriesFn: () => [3, 4, 5, 6],
        readyCheckFn: () => true,
      });
      instance.addQuerySource({
        getQueriesFn: () => [7, 8, 9],
        readyCheckFn: () => false,
      });
      expect(instance._getQueries()).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('data', () => {
    it('should return data from state if storage is not available', () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance._store = createStore(instance.reducer);
      expect(instance.data).to.be.a('object');
      expect(instance.data).to.equal(instance._store.getState().data);
    });
    it('should return data from storage if storage is available', () => {
      const data = {};
      const storage = {
        registerReducer: () => { },
        getItem: sinon.stub().callsFake(() => data),
      };
      const instance = new DataMatcher({
        name: 'foo',
        storage,
      });
      expect(instance.data).to.equal(data);
      sinon.assert.calledOnce(storage.getItem);
    });
    it('should return empty object if storage has no data', () => {
      const instance = new DataMatcher({
        name: 'foo',
        storage: {
          registerReducer: () => { },
          getItem: sinon.stub(),
        },
      });
      expect(instance.data).to.deep.equal({});
      sinon.assert.calledOnce(instance._storage.getItem);
    });
  });

  describe('_fetchMatchResult', async () => {
    it('should return a promise', async () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance._store = createStore(instance.reducer);
      instance.addSearchProvider({
        name: 'bar',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(20);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          return output;
        },
        readyCheckFn: () => true,
      });
      instance._onStateChange();
      sinon.spy(instance._store, 'dispatch');
      expect(instance.ready).to.equal(true);
      const queries = [0, 1, 2, 3, 4];
      const promise = instance._fetchMatchResult({
        name: 'bar',
        queries,
      });
      expect(promise).to.be.a.instanceOf(Promise);
      await promise;
      expect(instance._store.dispatch.args[0][0].type)
        .to.equal(instance.actionTypes.match);
      expect(instance._store.dispatch.args[1][0].type)
        .to.equal(instance.actionTypes.matchSuccess);
    });
    it('should throw if provider does not exist', async () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance._store = createStore(instance.reducer);
      instance.addSearchProvider({
        name: 'bar',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(20);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          return output;
        },
        readyCheckFn: () => true,
      });
      instance._onStateChange();
      sinon.spy(instance._store, 'dispatch');
      const queries = [0, 1, 2, 3, 4];
      await expect(instance._fetchMatchResult({
        name: 'bad',
        queries,
      })).to.be.rejected;
    });
    it('should clear promise cache if fetch is successful', async () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance._store = createStore(instance.reducer);
      instance.addSearchProvider({
        name: 'bar',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(20);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          return output;
        },
        readyCheckFn: () => true,
      });
      instance._onStateChange();
      sinon.spy(instance._store, 'dispatch');
      const queries = [0, 1, 2, 3, 4];
      await instance._fetchMatchResult({
        name: 'bar',
        queries,
      });
      queries.forEach((query) => {
        expect(instance._matchPromises.has('bar')).to.equal(false);
      });
    });
    it('should clear promises if fetch fails', async () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance._store = createStore(instance.reducer);
      instance.addSearchProvider({
        name: 'bar',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(20);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          throw new Error('some error');
        },
        readyCheckFn: () => true,
      });
      instance._onStateChange();
      sinon.spy(instance._store, 'dispatch');
      const queries = [0, 1, 2, 3, 4];
      try {
        await instance._fetchMatchResult({
          name: 'bar',
          queries,
        });
      } catch (error) {
        /* falls through */
      }
      queries.forEach((query) => {
        expect(instance._matchPromises.has('bar')).to.equal(false);
      });
    });
  });

  describe('_matchSource', async () => {
    it('should return a promise', async () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance._store = createStore(instance.reducer);
      instance.addSearchProvider({
        name: 'bar',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(20);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          return output;
        },
        readyCheckFn: () => true,
      });
      instance._onStateChange();
      sinon.spy(instance._store, 'dispatch');
      const queries = [0, 1, 2, 3, 4];
      const promise = instance._matchSource({
        name: 'bar',
        queries,
      });
      expect(promise).to.be.a.instanceOf(Promise);
      await promise;
    });
    it('should call _fetchMatchResult when querying new items', async () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance._store = createStore(instance.reducer);
      instance.addSearchProvider({
        name: 'bar',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(20);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          return output;
        },
        readyCheckFn: () => true,
      });
      instance._onStateChange();
      sinon.spy(instance, '_fetchMatchResult');
      const queries = [0, 1, 2, 3, 4];
      await instance._matchSource({
        name: 'bar',
        queries,
      });
      sinon.assert.calledOnce(instance._fetchMatchResult);
    });
    it('should not call _fetchMatchResult if the queries are already fetching', async () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance._store = createStore(instance.reducer);
      instance.addSearchProvider({
        name: 'bar',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(20);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          return output;
        },
        readyCheckFn: () => true,
      });
      instance._onStateChange();
      sinon.spy(instance, '_fetchMatchResult');
      const queries = [0, 1, 2, 3, 4];
      await Promise.all([
        instance._matchSource({
          name: 'bar',
          queries,
        }),
        instance._matchSource({
          name: 'bar',
          queries,
        }),
      ]);
      sinon.assert.calledOnce(instance._fetchMatchResult);
    });
    it('should not call _fetchMatchResult if the queries are already fetched', async () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance._store = createStore(instance.reducer);
      instance.addSearchProvider({
        name: 'bar',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(20);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          return output;
        },
        readyCheckFn: () => true,
      });
      instance._onStateChange();
      sinon.spy(instance, '_fetchMatchResult');
      const queries = [0, 1, 2, 3, 4];
      await instance._matchSource({
        name: 'bar',
        queries,
      });
      await instance._matchSource({
        name: 'bar',
        queries,
      });
      sinon.assert.calledOnce(instance._fetchMatchResult);
    });
    it('should call _fetchMatchResult if the queries are already fetched and ignoreCache is true', async () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      instance._store = createStore(instance.reducer);
      instance.addSearchProvider({
        name: 'bar',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(20);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          return output;
        },
        readyCheckFn: () => true,
      });
      instance._onStateChange();
      sinon.spy(instance, '_fetchMatchResult');
      const queries = [0, 1, 2, 3, 4];
      await instance._matchSource({
        name: 'bar',
        queries,
      });
      await instance._matchSource({
        name: 'bar',
        queries,
        ignoreCache: true,
      });
      sinon.assert.calledTwice(instance._fetchMatchResult);
    });
    it('should call _fetchMatchResult if the queries are already fetched but non-matches are expired', async () => {
      const instance = new DataMatcher({
        name: 'foo',
        noMatchTtl: 20,
      });
      instance._store = createStore(instance.reducer);
      instance.addSearchProvider({
        name: 'bar',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(20);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          return output;
        },
        readyCheckFn: () => true,
      });
      instance._onStateChange();
      sinon.spy(instance, '_fetchMatchResult');
      const queries = [0, 1, 2, 3, 4];
      await instance._matchSource({
        name: 'bar',
        queries,
      });
      await sleep(30);
      await instance._matchSource({
        name: 'bar',
        queries,
      });
      sinon.assert.calledTwice(instance._fetchMatchResult);
    });
    it('should queue queries when a query is already occuring', async () => {
      const instance = new DataMatcher({
        name: 'foo',
        noMatchTtl: 20,
      });
      instance._store = createStore(instance.reducer);
      instance.addSearchProvider({
        name: 'bar',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(30);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          return output;
        },
        readyCheckFn: () => true,
      });
      instance._onStateChange();
      sinon.spy(instance, '_fetchMatchResult');
      instance._matchSource({
        name: 'bar',
        queries: [0, 1, 2, 3, 4],
      });
      await sleep(10);
      const secondPromise = instance._matchSource({
        name: 'bar',
        queries: [5, 6, 7, 8, 9],
      });
      expect(instance._matchQueues.has('bar')).to.equal(true);
      await sleep(20);
      expect(instance._matchQueues.has('bar')).to.equal(false);
      await secondPromise;
      sinon.assert.calledTwice(instance._fetchMatchResult);
      expect(instance._matchPromises.has('bar')).to.equal(false);
    });
    it('should add queries to queue when a queue exists', async () => {
      const instance = new DataMatcher({
        name: 'foo',
        noMatchTtl: 20,
      });
      instance._store = createStore(instance.reducer);
      instance.addSearchProvider({
        name: 'bar',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(30);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          return output;
        },
        readyCheckFn: () => true,
      });
      instance._onStateChange();
      sinon.spy(instance, '_fetchMatchResult');
      instance._matchSource({
        name: 'bar',
        queries: [0, 1, 2, 3, 4],
      });
      await sleep(10);
      const secondPromise = instance._matchSource({
        name: 'bar',
        queries: [5, 6, 7, 8, 9],
      });
      instance._matchSource({
        name: 'bar',
        queries: [10, 11, 12, 13, 14],
      });
      expect(instance._matchQueues.has('bar')).to.equal(true);
      expect(instance._matchQueues.get('bar').queries)
        .to.deep.equal([5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
      await sleep(30);
      expect(instance._matchQueues.has('bar')).to.equal(false);
      await secondPromise;
      sinon.assert.calledTwice(instance._fetchMatchResult);
      expect(instance._matchPromises.has('bar')).to.equal(false);
    });
  });
  describe('match', async () => {
    it('should call _matchSource for each provider', async () => {
      const instance = new DataMatcher({
        name: 'foo',
        noMatchTtl: 20,
      });
      instance._store = createStore(instance.reducer);
      instance.addSearchProvider({
        name: 'bar',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(20);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          return output;
        },
        readyCheckFn: () => true,
      });
      instance.addSearchProvider({
        name: 'baz',
        searchFn: async ({ queries }) => {
          const output = {};
          await Promise.all(queries.map(async (query, idx) => {
            await sleep(20);
            output[query] = (idx % 2 === 1) ?
              [] :
              ['rogue'];
          }));
          return output;
        },
        readyCheckFn: () => true,
      });
      instance._onStateChange();
      sinon.stub(instance, '_matchSource').callsFake(async () => { });
      const queries = [0, 1, 2, 3, 4];
      await instance.match({
        queries,
      });
      let idx = 0;
      await instance.match({
        queries,
        ignoreCache: true,
      });
      [false, true].forEach((ignoreCache) => {
        instance._searchProviders.forEach((_, name) => {
          expect(instance._matchSource.args[idx][0])
            .to.deep.equal({
              queries,
              name,
              ignoreCache,
            });
          idx += 1;
        });
      });
    });
  });

  describe('triggerMatch', () => {
    it('should call _cleanUp and match if module is ready', () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      sinon.stub(instance, 'ready', {
        get() {
          return true;
        },
      });
      sinon.stub(instance, '_cleanUp');
      sinon.stub(instance, 'match').callsFake(async () => { });
      instance.triggerMatch();
      sinon.assert.calledOnce(instance._cleanUp);
      sinon.assert.calledOnce(instance.match);
    });
    it('should not do anything if module is not ready', () => {
      const instance = new DataMatcher({
        name: 'foo',
      });
      sinon.stub(instance, 'ready', {
        get() {
          return false;
        },
      });
      sinon.stub(instance, '_cleanUp');
      sinon.stub(instance, 'match').callsFake(async () => { });
      instance.triggerMatch();
      sinon.assert.notCalled(instance._cleanUp);
      sinon.assert.notCalled(instance.match);
    });
  });
});
