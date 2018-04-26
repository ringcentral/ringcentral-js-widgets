// import chai, { expect } from 'chai';
// import chaiAsPromised from 'chai-as-promised';
// import dirtyChai from 'dirty-chai';
// import sinon from 'sinon';
// import { createStore } from 'redux';
// import LoggerBase, {
//   defaultIdentityFunction,
//   convertListToMap,
// } from './index';
// import { prefixEnum } from '../Enum';
// import baseActionTypes from './baseActionTypes';
// import sleep from '../sleep';

// chai.use(chaiAsPromised);
// chai.use(dirtyChai);

// describe('defaultIdentityFunction', () => {
//   it('should be a function', () => {
//     expect(defaultIdentityFunction).to.be.a('function');
//   });
//   it('should accept an object and return object.id', () => {
//     const obj = {
//       id: 'foo',
//     };
//     expect(defaultIdentityFunction(obj)).to.equal(obj.id);
//   });
// });

// describe('convertListToMap', () => {
//   it('should be a function', () => {
//     expect(convertListToMap).to.be.a('function');
//   });
//   it('should convert loggingLists to loggingMaps', () => {
//     const loggingList = [];
//     const expectedResult = {};
//     Array.from(new Array(5)).forEach((_, idx) => {
//       loggingList.push({
//         name: 'foo',
//         id: `item-${idx}`,
//       });
//       loggingList.push({
//         name: 'bar',
//         id: `item-${idx}`,
//       });
//       expectedResult[`item-${idx}`] = {
//         foo: true,
//         bar: true,
//       };
//     });
//     expect(convertListToMap(loggingList))
//       .to.deep.equal(expectedResult);
//   });
// });


// describe('LoggerBase', () => {
//   describe('constructor', () => {
//     it('should be a function', () => {
//       expect(LoggerBase).to.be.a('function');
//     });
//     it('should throw if options.name is not defined', () => {
//       expect(() => new LoggerBase({})).to.throw();
//     });
//     it('should default options.actionTypes to prefixed baseActionTypes', () => {
//       const name = 'foo';
//       const instance = new LoggerBase({ name });
//       expect(instance.actionTypes)
//         .to.deep.equal(prefixEnum({ base: baseActionTypes, prefix: name }));
//     });
//     it('should allow options.actionTypes to be customized', () => {
//       const actionTypes = { bar: 'rogue' };
//       const name = 'foo';
//       const instance = new LoggerBase({ name, actionTypes });
//       expect(instance.actionTypes)
//         .to.deep.equal(actionTypes);
//     });
//   });
//   describe('instance of LoggerBase', () => {
//     describe('addLogProvider', () => {
//       it('should throw if options.name is undefined', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         expect(() => instance.addLogProvider({})).to.throw();
//       });
//       it('should throw if options.logFn is not a function', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         [undefined, 0, 'bar', {}, []].forEach((logFn) => {
//           expect(() => instance.addLogProvider({ name: 'bar', logFn }))
//             .to.throw();
//         });
//       });
//       it('should throw if options.readyCheckFn is not a function', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         const logFn = async () => { };
//         [undefined, 0, 'bar', {}, []].forEach((readyCheckFn) => {
//           expect(() => instance.addLogProvider({
//             name: 'bar',
//             logFn,
//             readyCheckFn,
//           })).to.throw();
//         });
//       });
//       it('should add named log provider to _logProviders', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         const logFn = async () => { };
//         const readyCheckFn = () => true;
//         const name = 'bar';
//         expect(() => instance.addLogProvider({
//           name,
//           logFn,
//           readyCheckFn,
//         })).to.not.throw();
//         expect(instance._logProviders.has(name)).to.equal(true);
//         expect(instance._logProviders.get(name))
//           .to.deep.equal({
//             logFn,
//             readyCheckFn,
//           });
//       });
//       it('should throw if called with the same name twice', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         const logFn = async () => { };
//         const readyCheckFn = () => true;
//         const name = 'bar';
//         instance.addLogProvider({
//           name,
//           logFn,
//           readyCheckFn,
//         });
//         expect(() => instance.addLogProvider({
//           name,
//           logFn,
//           readyCheckFn,
//         })).to.throw();
//       });
//       it('should pass the rest of options into providers', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         const logFn = async () => { };
//         const readyCheckFn = () => true;
//         const name = 'bar';
//         const otherOptions = {
//           rogue: 'one',
//           yoda: 'puppet',
//         };
//         instance.addLogProvider({
//           name,
//           logFn,
//           readyCheckFn,
//           ...otherOptions,
//         });
//         expect(instance._logProviders.get(name))
//           .to.deep.equal({
//             logFn,
//             readyCheckFn,
//             ...otherOptions,
//           });
//       });
//     });
//     describe('logProvidersReady', () => {
//       it('should return true when no providers are added', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         expect(instance.logProvidersReady).to.equal(true);
//       });
//       it('should return true when all providers are ready', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         instance.addLogProvider({
//           name: 'foo',
//           logFn: async () => { },
//           readyCheckFn: () => true,
//         });
//         instance.addLogProvider({
//           name: 'bar',
//           logFn: async () => { },
//           readyCheckFn: () => true,
//         });
//         expect(instance.logProvidersReady).to.equal(true);
//       });
//       it('should return false when some providers are not ready', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         instance.addLogProvider({
//           name: 'foo',
//           logFn: async () => { },
//           readyCheckFn: () => true,
//         });
//         instance.addLogProvider({
//           name: 'bar',
//           logFn: async () => { },
//           readyCheckFn: () => false,
//         });
//         expect(instance.logProvidersReady).to.equal(false);
//       });
//     });
//     describe('_shouldInit', () => {
//       [true, false].forEach((pending) => {
//         [true, false].forEach((providersReady) => {
//           const result = pending && providersReady;
//           it(`should return ${result} when this.pending === ${pending}
//           and this.logProvidersReady === ${providersReady}`,
//             () => {
//               const instance = new LoggerBase({ name: 'foo' });
//               sinon.stub(instance, 'pending', {
//                 get() {
//                   return pending;
//                 },
//               });
//               sinon.stub(instance, 'logProvidersReady', {
//                 get() {
//                   return providersReady;
//                 },
//               });
//               expect(instance._shouldInit()).to.equal(result);
//             },
//           );
//         });
//       });
//     });
//     describe('_shouldReset', () => {
//       [true, false].forEach((ready) => {
//         [true, false].forEach((providersReady) => {
//           const result = ready && !providersReady;
//           it(`should return ${result} when this.ready === ${ready}
//           and this.logProvidersReady === ${providersReady}`,
//             () => {
//               const instance = new LoggerBase({ name: 'foo' });
//               sinon.stub(instance, 'ready', {
//                 get() {
//                   return ready;
//                 },
//               });
//               sinon.stub(instance, 'logProvidersReady', {
//                 get() {
//                   return providersReady;
//                 },
//               });
//               expect(instance._shouldReset()).to.equal(result);
//             },
//           );
//         });
//       });
//     });
//     describe('_onStateChange', () => {
//       it('should initialize module when _shouldInit() === true', async () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         instance._store = {
//           dispatch: sinon.stub(),
//         };
//         sinon.stub(instance, '_shouldInit').callsFake(() => true);
//         sinon.stub(instance, '_shouldReset').callsFake(() => false);
//         await instance._onStateChange();
//         sinon.assert.calledTwice(instance._store.dispatch);
//         expect(instance._store.dispatch.args[0][0].type)
//           .to.equal(instance.actionTypes.init);
//         expect(instance._store.dispatch.args[1][0].type)
//           .to.equal(instance.actionTypes.initSuccess);
//       });
//       it('should call _onInit when _shouldInit() === true and _onInit is a function',
//         async () => {
//           const instance = new LoggerBase({ name: 'foo' });
//           instance._store = {
//             dispatch: sinon.stub(),
//           };
//           sinon.stub(instance, '_shouldInit').callsFake(() => true);
//           sinon.stub(instance, '_shouldReset').callsFake(() => false);
//           instance._onInit = sinon.stub();
//           await instance._onStateChange();
//           sinon.assert.calledTwice(instance._store.dispatch);
//           expect(instance._store.dispatch.args[0][0].type)
//             .to.equal(instance.actionTypes.init);
//           expect(instance._store.dispatch.args[1][0].type)
//             .to.equal(instance.actionTypes.initSuccess);
//           sinon.assert.calledOnce(instance._onInit);
//         },
//       );
//       it('should reset module when _shouldReset() === true', async () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         instance._store = {
//           dispatch: sinon.stub(),
//         };
//         sinon.stub(instance, '_shouldInit').callsFake(() => false);
//         sinon.stub(instance, '_shouldReset').callsFake(() => true);
//         await instance._onStateChange();
//         sinon.assert.calledTwice(instance._store.dispatch);
//         expect(instance._store.dispatch.args[0][0].type)
//           .to.equal(instance.actionTypes.reset);
//         expect(instance._store.dispatch.args[1][0].type)
//           .to.equal(instance.actionTypes.resetSuccess);
//       });
//       it('should call _onReset when _shouldReset() === true and _onReset is a function',
//         async () => {
//           const instance = new LoggerBase({ name: 'foo' });
//           instance._store = {
//             dispatch: sinon.stub(),
//           };
//           sinon.stub(instance, '_shouldInit').callsFake(() => false);
//           sinon.stub(instance, '_shouldReset').callsFake(() => true);
//           instance._onReset = sinon.stub();
//           await instance._onStateChange();
//           sinon.assert.calledTwice(instance._store.dispatch);
//           expect(instance._store.dispatch.args[0][0].type)
//             .to.equal(instance.actionTypes.reset);
//           expect(instance._store.dispatch.args[1][0].type)
//             .to.equal(instance.actionTypes.resetSuccess);
//           sinon.assert.calledOnce(instance._onReset);
//         },
//       );
//       it('should do nothing when _shouldReset() and _shouldInit() are false',
//         async () => {
//           const instance = new LoggerBase({ name: 'foo' });
//           instance._store = {
//             dispatch: sinon.stub(),
//           };
//           sinon.stub(instance, '_shouldInit').callsFake(() => false);
//           sinon.stub(instance, '_shouldReset').callsFake(() => false);
//           instance._onReset = sinon.stub();
//           instance._onInit = sinon.stub();
//           await instance._onStateChange();
//           sinon.assert.notCalled(instance._store.dispatch);
//           sinon.assert.notCalled(instance._onReset);
//           sinon.assert.notCalled(instance._onInit);
//         },
//       );
//     });
//     describe('_log', () => {
//       it('should throw if module is not ready', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         instance._store = createStore(instance.reducer);
//         const item = {
//           id: 'rogue',
//         };
//         return expect(instance._log({ name: 'bar', item }))
//           .to.be.rejectedWith(Error);
//       });
//       it('should throw if options.item is undefined', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         instance._store = createStore(instance.reducer);
//         instance._onStateChange();
//         return expect(instance._log({ name: 'bar' }))
//           .to.be.rejectedWith(Error);
//       });
//       it('should throw if options.name is undefined', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         instance._store = createStore(instance.reducer);
//         instance._onStateChange();
//         const item = {
//           id: 'rogue',
//         };
//         return expect(instance._log({ item }))
//           .to.be.rejectedWith(Error);
//       });
//       it('should call logFn of the provider and return a promise', async () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         const name = 'bar';
//         instance._store = createStore(instance.reducer);
//         instance.addLogProvider({
//           name,
//           logFn: sinon.stub().callsFake(async () => {
//             await sleep(50);
//           }),
//           readyCheckFn: () => true,
//         });
//         instance._onStateChange();
//         const item = {
//           id: 'rogue',
//         };
//         const promise = instance._log({
//           name,
//           item,
//         });
//         expect(promise).to.be.instanceOf(Promise);
//         await promise;
//         sinon.assert.calledOnce(instance._logProviders.get(name).logFn);
//       });
//       it('should dispatch log and logSuccess before and after successful log',
//         async () => {
//           const instance = new LoggerBase({ name: 'foo' });
//           const name = 'bar';
//           instance._store = createStore(instance.reducer);
//           instance.addLogProvider({
//             name,
//             logFn: sinon.stub().callsFake(async () => {
//               await sleep(50);
//             }),
//             readyCheckFn: () => true,
//           });
//           instance._onStateChange();
//           const item = {
//             id: 'rogue',
//           };
//           sinon.spy(instance._store, 'dispatch');
//           const promise = instance._log({
//             name,
//             item,
//           });
//           expect(instance._store.dispatch.args[0][0].type)
//             .to.equal(instance.actionTypes.log);
//           await promise;
//           sinon.assert.calledOnce(instance._logProviders.get(name).logFn);
//           expect(instance._store.dispatch.args[1][0].type)
//             .to.equal(instance.actionTypes.logSuccess);
//         },
//       );
//       it('should dispatch log and logError before and after failed log',
//         async () => {
//           const instance = new LoggerBase({ name: 'foo' });
//           const name = 'bar';
//           instance._store = createStore(instance.reducer);
//           instance.addLogProvider({
//             name,
//             logFn: sinon.stub().callsFake(async () => {
//               await sleep(50);
//               throw new Error();
//             }),
//             readyCheckFn: () => true,
//           });
//           instance._onStateChange();
//           const item = {
//             id: 'rogue',
//           };
//           sinon.spy(instance._store, 'dispatch');
//           const promise = instance._log({
//             name,
//             item,
//           });
//           expect(instance._store.dispatch.args[0][0].type)
//             .to.equal(instance.actionTypes.log);
//           try {
//             await promise;
//           } catch (error) {
//             /* ignores error */
//           }
//           sinon.assert.calledOnce(instance._logProviders.get(name).logFn);
//           expect(instance._store.dispatch.args[1][0].type)
//             .to.equal(instance.actionTypes.logError);
//         },
//       );
//       it('should wait for the last call to logFn of the provider', async () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         const name = 'bar';
//         instance._store = createStore(instance.reducer);
//         instance.addLogProvider({
//           name,
//           logFn: sinon.stub().callsFake(async () => {
//             await sleep(50);
//           }),
//           readyCheckFn: () => true,
//         });
//         instance._onStateChange();
//         const item = {
//           id: 'rogue',
//         };
//         instance._log({
//           name,
//           item,
//         });
//         await sleep(30);
//         sinon.assert.calledOnce(instance._logProviders.get(name).logFn);
//         instance._log({
//           name,
//           item,
//         });
//         sinon.assert.calledOnce(instance._logProviders.get(name).logFn);
//         await sleep(30);
//         sinon.assert.calledTwice(instance._logProviders.get(name).logFn);
//       });
//     });
//     describe('log', () => {
//       it('should throw if module is not ready', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         instance._store = createStore(instance.reducer);
//         const item = {
//           id: 'rogue',
//         };
//         return expect(instance.log({ item }))
//           .to.be.rejectedWith(Error);
//       });
//       it('should throw if options.item is undefined', () => {
//         const instance = new LoggerBase({ name: 'foo' });
//         instance._store = createStore(instance.reducer);
//         instance._onStateChange();
//         return expect(instance.log({}))
//           .to.be.rejectedWith(Error);
//       });
//       it('should call _log with all provider names if options.name is not specified',
//         async () => {
//           const instance = new LoggerBase({ name: 'foo' });
//           instance._store = createStore(instance.reducer);
//           instance.addLogProvider({
//             name: 'bar',
//             logFn: async () => {},
//             readyCheckFn: () => true,
//           });
//           instance.addLogProvider({
//             name: 'baz',
//             logFn: async () => {},
//             readyCheckFn: () => true,
//           });
//           instance._onStateChange();
//           const item = {
//             id: 'rogue',
//           };
//           sinon.stub(instance, '_log');
//           await instance.log({
//             item,
//           });
//           sinon.assert.calledTwice(instance._log);
//           expect(instance._log.args[0][0].name).to.equal('bar');
//           expect(instance._log.args[1][0].name).to.equal('baz');
//         },
//       );
//       it('should call _log options.name if specified',
//         async () => {
//           const instance = new LoggerBase({ name: 'foo' });
//           instance._store = createStore(instance.reducer);
//           instance.addLogProvider({
//             name: 'bar',
//             logFn: async () => {},
//             readyCheckFn: () => true,
//           });
//           instance.addLogProvider({
//             name: 'baz',
//             logFn: async () => {},
//             readyCheckFn: () => true,
//           });
//           instance._onStateChange();
//           const item = {
//             id: 'rogue',
//           };
//           sinon.stub(instance, '_log');
//           await instance.log({
//             name: 'bar',
//             item,
//           });
//           sinon.assert.calledOnce(instance._log);
//           expect(instance._log.args[0][0].name).to.equal('bar');
//         },
//       );
//       it('should throw if provider of options.name does not exist',
//         () => {
//           const instance = new LoggerBase({ name: 'foo' });
//           instance._store = createStore(instance.reducer);
//           instance._onStateChange();
//           const item = {
//             id: 'rogue',
//           };
//           return expect(instance.log({
//             name: 'bar',
//             item,
//           })).to.be.rejectedWith(Error);
//         },
//       );
//     });
//   });
// });
