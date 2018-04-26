import { expect } from 'chai';
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
import RcModule from './';
import Enum, { prefixEnum } from '../Enum';

describe('RcModule', () => {
  it('should be a constructor function', () => {
    expect(RcModule).to.be.a('function');
  });
  it('should return a RcModule instance', () => {
    const module = new RcModule();
    expect(module).to.be.instanceof(RcModule);
  });

  describe('constructor parameters', () => {
    describe('getState', () => {
      it('should be a function', () => {
        expect(() => {
          const module = new RcModule({
            getState: {},
          });
        }).to.throw('The `getState` options property must be of type function');
      });
    });
  });
  describe('prefix', () => {
    it('should be null-like or string', () => {
      const prefixes = [{}, 3, true, []];
      prefixes.forEach(p => {
        expect(() => {
          const module = new RcModule({
            prefix: p,
          });
        }).to.throw('The `prefix` options property must be null, undefined, or a string');
      });
      expect(() => {
        const module = new RcModule({
          prefix: 'string',
        });
      }).to.not.throw();
    });
  });
  describe('actionType', () => {
    it('should be put to `actionTypes` instance property if present', () => {
      const actionTypes = new Enum([
        'actionTypeA',
        'actionTypeB',
      ]);
      const module = new RcModule({
        actionTypes,
      });
      expect(module.actionTypes).to.deep.equal(actionTypes);
    });
  });
  describe('RcModule instance', () => {
    describe('RcModule instance properties', () => {
      describe('actionTypes', () => {
        it('should be undefined if not set in options', () => {
          const module = new RcModule();
          expect(module.actionTypes).to.be.undefined;
        });
        it('should should be prefixed if prefix is set', () => {
          const prefix = uuid.v4();
          const actionTypes = new Enum([
            'action1',
            'action2',
          ]);
          const module = new RcModule({
            prefix,
            actionTypes,
          });
          expect(module.actionTypes).to.deep.equal(prefixEnum({ enumMap: actionTypes, prefix }));
        });
      });
      describe('reducer', () => {
        it('should have a default reducer', () => {
          const module = new RcModule();
          expect(module.reducer).to.be.a('function');
        });
        describe('default reducer', () => {
          it('should return null as initial state', () => {
            const module = new RcModule();
            module.setStore(createStore(module.reducer));
            expect(module.state).to.equal(null);
          });
          it('should ignore unknown actionTypes', () => {
            const module = new RcModule();
            module.setStore(createStore(module.reducer));
            module.store.dispatch({
              type: 'test',
            });
            expect(module.state).to.equal(null);
          });
        });
      });
      describe('store', () => {
        it('should throw error if trying to access before setStore', () => {
          const module = new RcModule();
          expect(() => module.store).to.be.throw();
        });
        it('should return a store object after setStore', () => {
          const module = new RcModule();
          module.setStore(createStore(module.reducer));
          expect(module.store).to.exist;
          expect(module.store.dispatch).to.be.a('function');
          expect(module.store.getState).to.be.a('function');
        });
      });
      describe('state', () => {
        const REDUCER = Symbol();
        class Test extends RcModule {
          constructor(options) {
            super(options);
            this[REDUCER] = (state, action) => {
              if (!state) return { value: 0 };
              if (!action) return state;
              switch (action) {
                default:
                  return {
                    value: state.value + 1,
                  };
              }
            };
          }
          get reducer() {
            return this[REDUCER];
          }
        }
        it('should return initial state after setStore with store', () => {
          const module = new Test();
          module.setStore(createStore(module.reducer));
          expect(module.state).to.deep.equal({
            value: 0,
          });
        });
        it('should return new state after action has been dispatched', () => {
          const module = new Test();
          module.setStore(createStore(module.reducer));
          expect(module.state).to.deep.equal({
            value: 0,
          });
          module.store.dispatch({ type: 'inc' });
          expect(module.state).to.deep.equal({
            value: 1,
          });
        });
      });
      describe('prefix', () => {
        it('should be undefined if not defined in options', () => {
          const module = new RcModule();
          expect(module.prefix).to.be.undefined;
        });
        it('should return prefix string if defined in options', () => {
          const prefix = uuid.v4();
          const module = new RcModule({
            prefix,
          });
          expect(module.prefix).to.equal(prefix);
        });
      });
      describe('modulePath', () => {
        const REDUCER = Symbol();
        class RootModule extends RcModule {
          constructor(options) {
            super(options);
            this.addModule('subModule', new RcModule({
              ...options,
              getState: () => this.state.sub,
            }));
            this[REDUCER] = combineReducers({
              sub: this.subModule.reducer,
            });
          }
          get reducer() {
            return this[REDUCER];
          }
        }
        const module = new RootModule();
        it('should be `root` for root modules', () => {
          expect(module.modulePath).to.equal('root');
        });
        it('should return `.` delimited module structure path', () => {
          expect(module.subModule.modulePath).to.equal('root.subModule');
        });
      });
    });
  });
  describe('RcModule instance methods', () => {
    describe('setStore', () => {
      it('should be a function', () => {
        const module = new RcModule();
        expect(module.setStore).to.be.a('function');
      });
      it('should accept a store object', () => {
        const module = new RcModule();
        expect(() => module.setStore()).to.throw('setStore must accept a store object');
        const store = createStore(module.reducer);
        expect(() => module.setStore(store)).to.not.throw;
      });
      it('should only be called on root module', () => {
        class TestModule extends RcModule {
          constructor(...args) {
            super(...args);
            this.addModule('sub', new RcModule());
          }
        }
        const test = new TestModule();
        const store = createStore(test.reducer);
        expect(() => test.sub.setStore(store))
          .to.throw('setStore should only be called on root module');
      });
      it('should set store to the subModules as well', () => {
        class TestModule extends RcModule {
          constructor(...args) {
            super(...args);
            this.addModule('sub', new RcModule());
          }
          hello() {
            console.log('check');
          }
        }
        const test = new TestModule();
        const store = createStore(test.reducer);
        test.setStore(store);
        expect(test.sub.store).to.equal(store);
      });
      it('should trigger initialize function if exists', () => {
        class TestModule extends RcModule {
          constructor(...args) {
            super(...args);
            this.addModule('sub', new RcModule());
          }
          hello() {
            console.log('check');
          }
        }
        const test = new TestModule();

        let rootInit = false;
        let subInit = false;
        test.initialize = () => { rootInit = true; };
        test.sub.initialize = () => { subInit = true; };

        const store = createStore(test.reducer);
        test.setStore(store);

        expect(rootInit).to.be.true;
        expect(subInit).to.be.true;
      });
      it('should only be called once', () => {
        const module = new RcModule();
        const store = createStore(module.reducer);
        module.setStore(store);
        expect(() => module.setStore(store))
          .to.throw('setStore should only be called once');
      });
    });
    describe('addModule', () => {
      it('should be a function', () => {
        const module = new RcModule();
        expect(module.addModule).to.be.a('function');
      });

      it('should throw if property of the same name exists', () => {
        const module = new RcModule();
        const foo = {};
        const bar = {};
        let isFooAdded = false;
        expect(() => {
          module.addModule('sub', foo);
          isFooAdded = true;
          module.addModule('sub', bar);
        }).to.throw();
        expect(isFooAdded).to.be.true;
      });

      it('should set modulePath for the subModule', () => {
        const module = new RcModule();
        const subModule = new RcModule();
        module.addModule('sub', subModule);
        expect(module.modulePath).to.equal('root');
        expect(subModule.modulePath).to.equal('root.sub');
      });
      it('subModule path should only be set once', () => {
        const module = new RcModule();
        const subModule = new RcModule();
        module.addModule('sub', subModule);
        expect(module.modulePath).to.equal('root');
        expect(subModule.modulePath).to.equal('root.sub');
        module.addModule('sub2', subModule);
        expect(module.sub2).to.equal(subModule);
        expect(module.sub2.modulePath).to.equal('root.sub');
      });
    });
    describe('selector', () => {
      it('should be a function', () => {
        const module = new RcModule();
        expect(module.addSelector).to.be.a('function');
      });
      it('add selector functions to selectors object', () => {
        const module = new RcModule();
        module.addSelector('test', () => 'test');
        expect(module.getSelector('test')).to.be.a('function');
      });
      it('throws when attempting to add selectors of the same name', () => {
        const module = new RcModule();
        module.addSelector('test', () => 'test');
        expect(() => module.addSelector('test', () => 'test2'))
          .to.throw("Selector 'test' already exists...");
      });
      it('should use reselect for output caching', () => {
        const module = new RcModule();
        module.addSelector('test', () => 'test');
        module.addSelector(
          'cachedMessage',
          module.getSelector('test'),
          message => ({ message }),
        );
        expect(module.getSelector('cachedMessage')())
          .to.equal(module.getSelector('cachedMessage')());
      });
    });
  });
});
