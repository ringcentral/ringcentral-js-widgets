// import chai, { expect } from 'chai';
// import chaiAsPromised from 'chai-as-promised';
// import dirtyChai from 'dirty-chai';
// import sinon from 'sinon';
// import CallLogger, {
//   callIdentityFunction,
// } from './index';
// import LoggerBase from '../../lib/LoggerBase';
// import telephonyStatuses from '../../enums/telephonyStatuses';
// import { isRinging } from '../../lib/callLogHelpers';
// import sleep from '../../lib/sleep';

// chai.use(chaiAsPromised);
// chai.use(dirtyChai);

// describe('callIdentityFunction', () => {
//   it('should be a function', () => {
//     expect(callIdentityFunction).to.be.a('function');
//   });
//   it('should return sessionId from call object', () => {
//     const call = {
//       sessionId: {},
//     };
//     expect(callIdentityFunction(call)).to.equal(call.sessionId);
//   });
// });

// describe('CallLogger', () => {
//   describe('constructor', () => {
//     it('should be a function', () => {
//       expect(CallLogger).to.be.a('function');
//     });
//     it('should throw if option.storage is not defined', () => {
//       const callMonitor = {};
//       const contactMatcher = {};
//       const activityMatcher = {};
//       expect(() => new CallLogger({
//         callMonitor,
//         contactMatcher,
//         activityMatcher,
//       })).to.throw();
//     });
//     it('should throw if option.callMonitor is not defined', () => {
//       const storage = {
//         registerReducer: sinon.stub(),
//       };
//       const contactMatcher = {};
//       const activityMatcher = {};
//       expect(() => new CallLogger({
//         storage,
//         contactMatcher,
//         activityMatcher,
//       })).to.throw();
//     });
//     it('should throw if option.contactMatcher is not defined', () => {
//       const storage = {
//         registerReducer: sinon.stub(),
//       };
//       const callMonitor = {};
//       const activityMatcher = {};
//       expect(() => new CallLogger({
//         storage,
//         callMonitor,
//         activityMatcher,
//       })).to.throw();
//     });
//     it('should throw if option.activityMatcher is not defined', () => {
//       const storage = {
//         registerReducer: sinon.stub(),
//       };
//       const callMonitor = {};
//       const contactMatcher = {};
//       expect(() => new CallLogger({
//         storage,
//         callMonitor,
//         contactMatcher,
//       })).to.throw();
//     });
//     it('should register a reducer to storage', () => {
//       const storage = {
//         registerReducer: sinon.stub(),
//       };
//       const callMonitor = {};
//       const contactMatcher = {};
//       const activityMatcher = {};
//       const instance = new CallLogger({
//         storage,
//         callMonitor,
//         contactMatcher,
//         activityMatcher,
//       });
//       sinon.assert.calledOnce(storage.registerReducer);
//       expect(storage.registerReducer.args[0][0].key).to.equal(instance._storageKey);
//     });
//   });
//   describe('addLogProvider', () => {
//     it('should call the addLogProvider from LoggerBase', () => {
//       sinon.spy(LoggerBase.prototype, 'addLogProvider');
//       const storage = {
//         registerReducer: sinon.stub(),
//       };
//       const callMonitor = {};
//       const contactMatcher = {};
//       const activityMatcher = {};
//       const instance = new CallLogger({
//         storage,
//         callMonitor,
//         contactMatcher,
//         activityMatcher,
//       });
//       instance.addLogProvider({
//         name: 'bar',
//         logFn: async () => { },
//         readyCheckFn: () => true,
//       });
//       sinon.assert.calledOnce(LoggerBase.prototype.addLogProvider);
//       LoggerBase.prototype.addLogProvider.restore();
//     });
//     it('should default options.allowAutoLog to true', () => {
//       sinon.spy(LoggerBase.prototype, 'addLogProvider');
//       const storage = {
//         registerReducer: sinon.stub(),
//       };
//       const callMonitor = {};
//       const contactMatcher = {};
//       const activityMatcher = {};
//       const instance = new CallLogger({
//         storage,
//         callMonitor,
//         contactMatcher,
//         activityMatcher,
//       });
//       instance.addLogProvider({
//         name: 'bar',
//         logFn: async () => { },
//         readyCheckFn: () => true,
//       });
//       sinon.assert.calledOnce(LoggerBase.prototype.addLogProvider);
//       expect(LoggerBase.prototype.addLogProvider.args[0][0].allowAutoLog).to.equal(true);
//       LoggerBase.prototype.addLogProvider.restore();
//     });
//     it('should convert options.allowAutoLog to boolean', () => {
//       sinon.spy(LoggerBase.prototype, 'addLogProvider');
//       const storage = {
//         registerReducer: sinon.stub(),
//       };
//       const callMonitor = {};
//       const contactMatcher = {};
//       const activityMatcher = {};
//       const instance = new CallLogger({
//         storage,
//         callMonitor,
//         contactMatcher,
//         activityMatcher,
//       });
//       instance.addLogProvider({
//         name: 'bar',
//         logFn: async () => { },
//         allowAutoLog: {},
//         readyCheckFn: () => true,
//       });
//       sinon.assert.calledOnce(LoggerBase.prototype.addLogProvider);
//       expect(LoggerBase.prototype.addLogProvider.args[0][0].allowAutoLog).to.equal(true);
//       LoggerBase.prototype.addLogProvider.restore();
//     });
//   });
//   function runOnAllStates(fn) {
//     const booleanValues = [true, false];
//     booleanValues.forEach((pending) => {
//       booleanValues.forEach((callMonitorReady) => {
//         booleanValues.forEach((contactMatcherReady) => {
//           booleanValues.forEach((activityMatcherReady) => {
//             booleanValues.forEach((storageReady) => {
//               booleanValues.forEach((logProvidersReady) => {
//                 booleanValues.forEach((callHistoryReady) => {
//                   fn({
//                     pending,
//                     ready: pending,
//                     callMonitorReady,
//                     callHistoryReady,
//                     contactMatcherReady,
//                     activityMatcherReady,
//                     storageReady,
//                     logProvidersReady,
//                   });
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   }
//   describe('_shouldInit', () => {
//     runOnAllStates(({
//       pending,
//       callMonitorReady,
//       callHistoryReady,
//       contactMatcherReady,
//       activityMatcherReady,
//       storageReady,
//       logProvidersReady,
//     }) => {
//       const result = pending &&
//         callMonitorReady &&
//         callHistoryReady &&
//         contactMatcherReady &&
//         activityMatcherReady &&
//         storageReady &&
//         logProvidersReady;
//       it(`should return ${result} when this.pending === ${pending},
//       and this._callMonitor.ready === ${callMonitorReady},
//       and this._callHistory.ready === ${callHistoryReady},
//       and this._contactMatcher.ready === ${contactMatcherReady},
//       and this._activityMatcher.ready === ${activityMatcherReady},
//       and this._storage.ready === ${storageReady},
//       and this.logProvidersReady === ${logProvidersReady}`,
//         () => {
//           const storage = {
//             registerReducer: sinon.stub(),
//             get ready() {
//               return storageReady;
//             },
//           };
//           const callMonitor = {
//             get ready() {
//               return callMonitorReady;
//             },
//           };
//           const callHistory = {
//             get ready() {
//               return callHistoryReady;
//             },
//           };
//           const contactMatcher = {
//             get ready() {
//               return contactMatcherReady;
//             },
//           };
//           const activityMatcher = {
//             get ready() {
//               return activityMatcherReady;
//             },
//           };
//           const instance = new CallLogger({
//             storage,
//             callMonitor,
//             callHistory,
//             contactMatcher,
//             activityMatcher,
//           });
//           sinon.stub(instance, 'logProvidersReady', {
//             get() {
//               return logProvidersReady;
//             },
//           });
//           sinon.stub(instance, 'pending', {
//             get() {
//               return pending;
//             },
//           });
//           expect(instance._shouldInit()).to.equal(result);
//         },
//       );
//     });
//   });
//   describe('_shouldReset', () => {
//     runOnAllStates(({
//       ready,
//       callMonitorReady,
//       callHistoryReady,
//       contactMatcherReady,
//       activityMatcherReady,
//       storageReady,
//       logProvidersReady,
//     }) => {
//       const result = ready &&
//         (
//           !callMonitorReady ||
//           !callHistoryReady ||
//           !contactMatcherReady ||
//           !activityMatcherReady ||
//           !storageReady ||
//           !logProvidersReady
//         );
//       it(`should return ${result} when this.ready === ${ready},
//       and this._callMonitor.ready === ${callMonitorReady},
//       and this._callHistory.ready === ${callHistoryReady},
//       and this._contactMatcher.ready === ${contactMatcherReady},
//       and this._activityMatcher.ready === ${activityMatcherReady},
//       and this._storage.ready === ${storageReady},
//       and this.logProvidersReady === ${logProvidersReady}`,
//         () => {
//           const storage = {
//             registerReducer: sinon.stub(),
//             get ready() {
//               return storageReady;
//             },
//           };
//           const callMonitor = {
//             get ready() {
//               return callMonitorReady;
//             },
//           };
//           const callHistory = {
//             get ready() {
//               return callHistoryReady;
//             },
//           };
//           const contactMatcher = {
//             get ready() {
//               return contactMatcherReady;
//             },
//           };
//           const activityMatcher = {
//             get ready() {
//               return activityMatcherReady;
//             },
//           };
//           const instance = new CallLogger({
//             storage,
//             callMonitor,
//             callHistory,
//             contactMatcher,
//             activityMatcher,
//           });
//           sinon.stub(instance, 'logProvidersReady', {
//             get() {
//               return logProvidersReady;
//             },
//           });
//           sinon.stub(instance, 'ready', {
//             get() {
//               return ready;
//             },
//           });
//           expect(instance._shouldReset()).to.equal(result);
//         },
//       );
//     });
//   });
//   describe('_shouldLogNewCall', () => {
//     const booleanValues = [true, false];
//     booleanValues.forEach((autoLog) => {
//       booleanValues.forEach((logOnRinging) => {
//         Object.keys(telephonyStatuses).forEach((key) => {
//           const status = telephonyStatuses[key];
//           const call = {
//             sessionId: 'foo',
//             telephonyStatus: status,
//           };
//           const result = autoLog &&
//             (logOnRinging || !isRinging(call));
//           it(`should return ${result} when this.autoLog === ${autoLog},
//           and this.logOnRinging === ${logOnRinging},
//           and call.telephonyStatus === ${status}`,
//             () => {
//               const storage = {
//                 registerReducer: sinon.stub()
//               };
//               const callMonitor = {};
//               const contactMatcher = {};
//               const activityMatcher = {};
//               const instance = new CallLogger({
//                 storage,
//                 callMonitor,
//                 contactMatcher,
//                 activityMatcher,
//               });
//               sinon.stub(instance, 'autoLog', {
//                 get() {
//                   return autoLog;
//                 },
//               });
//               sinon.stub(instance, 'logOnRinging', {
//                 get() {
//                   return logOnRinging;
//                 },
//               });
//               expect(instance._shouldLogNewCall(call)).to.equal(result);
//             },
//           );
//         });
//       });
//     });
//   });
//   describe('_shouldLogUpdatedCall', () => {
//     const booleanValues = [true, false];
//     booleanValues.forEach((autoLog) => {
//       booleanValues.forEach((logOnRinging) => {
//         Object.keys(telephonyStatuses).forEach((key) => {
//           const status = telephonyStatuses[key];
//           booleanValues.forEach((hasActivityMatches) => {
//             const call = {
//               sessionId: 'foo',
//               telephonyStatus: status,
//             };
//             const result = (autoLog || hasActivityMatches) &&
//               (logOnRinging || !isRinging(call));
//             it(`should return ${result} when this.autoLog === ${autoLog},
//             and this.logOnRinging === ${logOnRinging},
//             and call.telephonyStatus === ${status},
//             and the call ${hasActivityMatches ? 'has' : 'has not'} been logged`,
//               () => {
//                 const storage = {
//                   registerReducer: sinon.stub()
//                 };
//                 const callMonitor = {};
//                 const contactMatcher = {};
//                 const activityMatcher = {
//                   async triggerMatch() { await sleep(10); },
//                   get dataMapping() {
//                     return {
//                       foo: hasActivityMatches ?
//                         [{}] :
//                         null,
//                     };
//                   },
//                 };
//                 const instance = new CallLogger({
//                   storage,
//                   callMonitor,
//                   contactMatcher,
//                   activityMatcher,
//                 });
//                 sinon.stub(instance, 'autoLog', {
//                   get() {
//                     return autoLog;
//                   },
//                 });
//                 sinon.stub(instance, 'logOnRinging', {
//                   get() {
//                     return logOnRinging;
//                   },
//                 });
//                 return expect(instance._shouldLogUpdatedCall(call)).to.eventually.equal(result);
//               },
//             );
//           });
//         });
//       });
//     });
//   });
//   describe('_onStateChange', () => {
//     it('should call LoggerBase.prototype._onStateChange', async () => {
//       const storage = {
//         registerReducer: sinon.stub()
//       };
//       const callMonitor = {};
//       const contactMatcher = {};
//       const activityMatcher = {};
//       sinon.stub(LoggerBase.prototype, '_onStateChange');
//       const instance = new CallLogger({
//         storage,
//         callMonitor,
//         contactMatcher,
//         activityMatcher,
//       });
//       sinon.stub(instance, '_processCalls');
//       await instance._onStateChange();
//       sinon.assert.calledOnce(LoggerBase.prototype._onStateChange);
//       LoggerBase.prototype._onStateChange.restore();
//     });
//     it('should call _processCalls', async () => {
//       const storage = {
//         registerReducer: sinon.stub()
//       };
//       const callMonitor = {};
//       const contactMatcher = {};
//       const activityMatcher = {};
//       sinon.stub(LoggerBase.prototype, '_onStateChange');
//       const instance = new CallLogger({
//         storage,
//         callMonitor,
//         contactMatcher,
//         activityMatcher,
//       });
//       sinon.stub(instance, '_processCalls');
//       await instance._onStateChange();
//       LoggerBase.prototype._onStateChange.restore();
//       sinon.assert.calledOnce(instance._processCalls);
//     });
//   });
//   describe('_processCalls', () => {
//     it('should call _onNewCall for each new call from callMonitor', async () => {
//       const storage = {
//         registerReducer: sinon.stub()
//       };
//       const calls = Array.from(new Array(5)).map((_, idx) => ({
//         sessionId: `session-${idx}`,
//       }));
//       const callMonitor = {
//         calls,
//       };
//       const contactMatcher = {};
//       const activityMatcher = {};
//       const instance = new CallLogger({
//         storage,
//         callMonitor,
//         contactMatcher,
//         activityMatcher,
//       });
//       sinon.stub(instance, 'ready', {
//         get() {
//           return true;
//         },
//       });
//       sinon.stub(instance, '_onNewCall');
//       instance._processCalls();
//       sinon.assert.callCount(instance._onNewCall, 5);
//       calls.forEach(({ sessionId }, idx) => {
//         expect(instance._onNewCall.args[idx][0].sessionId).to.equal(sessionId);
//       });
//     });
//     it('should call _onCallUpdated for each updated call from callMonitor', async () => {
//       const storage = {
//         registerReducer: sinon.stub()
//       };
//       const calls = Array.from(new Array(5)).map((_, idx) => ({
//         sessionId: `session-${idx}`,
//         telephonyStatus: telephonyStatuses.ringing,
//       }));
//       const updatedCalls = Array.from(new Array(5)).map((_, idx) => ({
//         sessionId: `session-${idx}`,
//         telephonyStatus: telephonyStatuses.callConnected,
//       }));
//       const callMonitor = {
//         calls: updatedCalls,
//       };
//       const contactMatcher = {};
//       const activityMatcher = {};
//       const instance = new CallLogger({
//         storage,
//         callMonitor,
//         contactMatcher,
//         activityMatcher,
//       });
//       sinon.stub(instance, 'ready', {
//         get() {
//           return true;
//         },
//       });
//       sinon.stub(instance, '_onCallUpdated');
//       instance._lastProcessedCalls = calls;
//       instance._processCalls();
//       sinon.assert.callCount(instance._onCallUpdated, 5);
//       calls.forEach(({ sessionId }, idx) => {
//         expect(instance._onCallUpdated.args[idx][0].sessionId).to.equal(sessionId);
//       });
//     });
//     it('should call _onCallUpdated for each ended call from callMonitor', async () => {
//       const storage = {
//         registerReducer: sinon.stub()
//       };
//       const calls = Array.from(new Array(5)).map((_, idx) => ({
//         sessionId: `session-${idx}`,
//         telephonyStatus: telephonyStatuses.ringing,
//       }));
//       const callMonitor = {
//         calls: [],
//       };
//       const contactMatcher = {};
//       const activityMatcher = {};
//       const instance = new CallLogger({
//         storage,
//         callMonitor,
//         contactMatcher,
//         activityMatcher,
//       });
//       sinon.stub(instance, 'ready', {
//         get() {
//           return true;
//         },
//       });
//       sinon.stub(instance, '_onCallUpdated');
//       instance._lastProcessedCalls = calls;
//       instance._processCalls();
//       sinon.assert.callCount(instance._onCallUpdated, 5);
//       calls.forEach(({ sessionId }, idx) => {
//         expect(instance._onCallUpdated.args[idx][0].sessionId).to.equal(sessionId);
//       });
//     });
//     it(`should call _onCallUpdated for each entry that is dismissed from
//     recentlyEndedCall that has callLog entry from callHistory`,
//       async () => {
//         const storage = {
//           registerReducer: sinon.stub()
//         };
//         const recentlyEndedCalls = Array.from(new Array(5)).map((_, idx) => ({
//           sessionId: `session-${idx}`,
//           telephonyStatus: telephonyStatuses.ringing,
//         }));
//         const calls = Array.from(new Array(3)).map((_, idx) => ({
//           sessionId: `session-${idx}`,
//           telephonyStatus: telephonyStatuses.callConnected,
//         }));
//         const callMonitor = {
//           calls: [],
//         };
//         const callHistory = {
//           calls,
//           recentlyEndedCalls: [],
//         };
//         const contactMatcher = {};
//         const activityMatcher = {};
//         const instance = new CallLogger({
//           storage,
//           callMonitor,
//           callHistory,
//           contactMatcher,
//           activityMatcher,
//         });
//         sinon.stub(instance, 'ready', {
//           get() {
//             return true;
//           },
//         });
//         sinon.stub(instance, '_onCallUpdated');
//         instance._lastProcessedEndedCalls = recentlyEndedCalls;
//         instance._processCalls();
//         sinon.assert.callCount(instance._onCallUpdated, 3);
//         calls.forEach(({ sessionId }, idx) => {
//           expect(instance._onCallUpdated.args[idx][0].sessionId).to.equal(sessionId);
//         });
//       },
//     );
//     it(`should not call _onCallUpdated if entry is not dismissed from
//     recentlyEndedCall in callHistory`,
//       async () => {
//         const storage = {
//           registerReducer: sinon.stub()
//         };
//         const recentlyEndedCalls = Array.from(new Array(5)).map((_, idx) => ({
//           sessionId: `session-${idx}`,
//           telephonyStatus: telephonyStatuses.ringing,
//         }));
//         const callMonitor = {
//           calls: [],
//         };
//         const callHistory = {
//           calls: [],
//           recentlyEndedCalls,
//         };
//         const contactMatcher = {};
//         const activityMatcher = {};
//         const instance = new CallLogger({
//           storage,
//           callMonitor,
//           callHistory,
//           contactMatcher,
//           activityMatcher,
//         });
//         sinon.stub(instance, 'ready', {
//           get() {
//             return true;
//           },
//         });
//         sinon.stub(instance, '_onCallUpdated');
//         instance._lastProcessedEndedCalls = recentlyEndedCalls.slice();
//         instance._processCalls();
//         sinon.assert.notCalled(instance._onCallUpdated);
//       },
//     );
//     it('should call only _onCallUpdated for call.telephonyStatus has changes', async () => {
//       const storage = {
//         registerReducer: sinon.stub()
//       };
//       const calls = Array.from(new Array(5)).map((_, idx) => ({
//         sessionId: `session-${idx}`,
//         telephonyStatus: telephonyStatuses.ringing,
//       }));
//       const updatedCalls = Array.from(new Array(5)).map((_, idx) => ({
//         sessionId: `session-${idx}`,
//         telephonyStatus: telephonyStatuses.ringing,
//       }));
//       const callMonitor = {
//         calls: updatedCalls,
//       };
//       const contactMatcher = {};
//       const activityMatcher = {};
//       const instance = new CallLogger({
//         storage,
//         callMonitor,
//         contactMatcher,
//         activityMatcher,
//       });
//       sinon.stub(instance, 'ready', {
//         get() {
//           return true;
//         },
//       });
//       sinon.stub(instance, '_onCallUpdated');
//       instance._lastProcessedCalls = calls;
//       instance._processCalls();
//       sinon.assert.notCalled(instance._onCallUpdated);
//     });
//     it('should do nothing if module is not ready', async () => {
//       const storage = {
//         registerReducer: sinon.stub()
//       };
//       const calls = Array.from(new Array(5)).map((_, idx) => ({
//         sessionId: `session-${idx}`,
//         telephonyStatus: telephonyStatuses.ringing,
//       }));
//       const updatedCalls = Array.from(new Array(5)).map((_, idx) => ({
//         sessionId: `session-${idx}`,
//         telephonyStatus: telephonyStatuses.callCOnnected,
//       }));
//       const callMonitor = {
//         calls: updatedCalls,
//       };
//       const contactMatcher = {};
//       const activityMatcher = {};
//       const instance = new CallLogger({
//         storage,
//         callMonitor,
//         contactMatcher,
//         activityMatcher,
//       });
//       sinon.stub(instance, 'ready', {
//         get() {
//           return false;
//         },
//       });
//       sinon.stub(instance, '_onCallUpdated');
//       instance._lastProcessedCalls = calls;
//       instance._processCalls();
//       sinon.assert.notCalled(instance._onCallUpdated);
//     });
//     it('should do nothing if calls is the same', async () => {
//       const storage = {
//         registerReducer: sinon.stub()
//       };
//       const calls = Array.from(new Array(5)).map((_, idx) => ({
//         sessionId: `session-${idx}`,
//         telephonyStatus: telephonyStatuses.ringing,
//       }));
//       const callMonitor = {
//         calls,
//       };
//       const contactMatcher = {};
//       const activityMatcher = {};
//       const instance = new CallLogger({
//         storage,
//         callMonitor,
//         contactMatcher,
//         activityMatcher,
//       });
//       sinon.stub(instance, 'ready', {
//         get() {
//           return true;
//         },
//       });
//       sinon.stub(instance, '_onCallUpdated');
//       instance._lastProcessedCalls = calls;
//       instance._processCalls();
//       sinon.assert.notCalled(instance._onCallUpdated);
//     });
//   });
//   describe('_onNewCall', () => {
//     it('should call _autoLogCall if _shouldLogNewCall() === true',
//       async () => {
//         const storage = {
//           registerReducer: sinon.stub()
//         };
//         const callMonitor = {};
//         const contactMatcher = {
//           triggerMatch: async () => { },
//           dataMapping: {},
//         };
//         const activityMatcher = {
//           triggerMatch: async () => { },
//           dataMapping: {},
//         };
//         const instance = new CallLogger({
//           storage,
//           callMonitor,
//           contactMatcher,
//           activityMatcher,
//         });
//         const call = {};
//         sinon.stub(instance, '_shouldLogNewCall').callsFake(() => true);
//         sinon.stub(instance, '_autoLogCall');
//         await instance._onNewCall(call);
//         sinon.assert.calledOnce(instance._autoLogCall);
//         expect(instance._autoLogCall.args[0][0].call).to.equal(call);
//       },
//     );
//     it('should not call _autoLogCall if _shouldLogNewCall() === false',
//       async () => {
//         const storage = {
//           registerReducer: sinon.stub()
//         };
//         const callMonitor = {};
//         const contactMatcher = {};
//         const activityMatcher = {};
//         const instance = new CallLogger({
//           storage,
//           callMonitor,
//           contactMatcher,
//           activityMatcher,
//         });
//         const call = {};
//         sinon.stub(instance, '_shouldLogNewCall').callsFake(() => false);
//         sinon.stub(instance, '_autoLogCall');
//         await instance._onNewCall(call);
//         sinon.assert.notCalled(instance._autoLogCall);
//       },
//     );
//     it('should call _autoLogCall with entities if call has not been logged',
//       async () => {
//         const sessionId = 'rogue';
//         const fromEntity = { phoneNumber: 'foo' };
//         const toEntity = { phoneNumber: 'bar' };
//         const storage = {
//           registerReducer: sinon.stub()
//         };
//         const callMonitor = {};
//         const contactMatcher = {
//           triggerMatch: async () => { },
//           dataMapping: {
//             [fromEntity.phoneNumber]: [fromEntity],
//             [toEntity.phoneNumber]: [toEntity],
//           },
//         };
//         const activityMatcher = {
//           triggerMatch: async () => { },
//           dataMapping: {},
//         };
//         const instance = new CallLogger({
//           storage,
//           callMonitor,
//           contactMatcher,
//           activityMatcher,
//         });
//         const call = { sessionId, from: fromEntity, to: toEntity };
//         sinon.stub(instance, '_shouldLogNewCall').callsFake(() => true);
//         sinon.stub(instance, '_autoLogCall');
//         await instance._onNewCall(call);
//         sinon.assert.calledOnce(instance._autoLogCall);
//         expect(instance._autoLogCall.args[0][0].call).to.equal(call);
//         expect(instance._autoLogCall.args[0][0].fromEntity).to.equal(fromEntity);
//         expect(instance._autoLogCall.args[0][0].toEntity).to.equal(toEntity);
//       },
//     );
//     it('should call _autoLogCall without entities if call has been logged',
//       async () => {
//         const sessionId = 'rogue';
//         const fromEntity = { phoneNumber: 'foo' };
//         const toEntity = { phoneNumber: 'bar' };
//         const storage = {
//           registerReducer: sinon.stub()
//         };
//         const callMonitor = {};
//         const contactMatcher = {
//           triggerMatch: async () => { },
//           dataMapping: {
//             [fromEntity.phoneNumber]: [fromEntity],
//             [toEntity.phoneNumber]: [toEntity],
//           },
//         };
//         const activityMatcher = {
//           triggerMatch: async () => { },
//           dataMapping: {
//             [sessionId]: [{ sessionId }],
//           },
//         };
//         const instance = new CallLogger({
//           storage,
//           callMonitor,
//           contactMatcher,
//           activityMatcher,
//         });
//         const call = { sessionId, from: fromEntity, to: toEntity };
//         sinon.stub(instance, '_shouldLogNewCall').callsFake(() => true);
//         sinon.stub(instance, '_autoLogCall');
//         await instance._onNewCall(call);
//         sinon.assert.calledOnce(instance._autoLogCall);
//         expect(instance._autoLogCall.args[0][0].call).to.equal(call);
//         expect(instance._autoLogCall.args[0][0].fromEntity).to.be.undefined();
//         expect(instance._autoLogCall.args[0][0].toEntity).to.be.undefined();
//       },
//     );
//   });
//   describe('_onCallUpdated', () => {
//     it('should call _autoLogCall if _shouldLogUpdatedCall() === true',
//       async () => {
//         const storage = {
//           registerReducer: sinon.stub()
//         };
//         const callMonitor = {};
//         const contactMatcher = {};
//         const activityMatcher = {
//           triggerMatch: async () => { },
//         };
//         const instance = new CallLogger({
//           storage,
//           callMonitor,
//           contactMatcher,
//           activityMatcher,
//         });
//         const call = {};
//         sinon.stub(instance, '_shouldLogUpdatedCall').callsFake(() => true);
//         sinon.stub(instance, '_autoLogCall');
//         await instance._onCallUpdated(call);
//         sinon.assert.calledOnce(instance._autoLogCall);
//         expect(instance._autoLogCall.args[0][0].call).to.equal(call);
//       },
//     );
//     it('should not call _autoLogCall if _shouldLogUpdatedCall() === false',
//       async () => {
//         const storage = {
//           registerReducer: sinon.stub()
//         };
//         const callMonitor = {};
//         const contactMatcher = {};
//         const activityMatcher = {};
//         const instance = new CallLogger({
//           storage,
//           callMonitor,
//           contactMatcher,
//           activityMatcher,
//         });
//         const call = {};
//         sinon.stub(instance, '_shouldLogUpdatedCall').callsFake(() => false);
//         sinon.stub(instance, '_autoLogCall');
//         await instance._onCallUpdated(call);
//         sinon.assert.notCalled(instance._autoLogCall);
//       },
//     );
//   });
// });
