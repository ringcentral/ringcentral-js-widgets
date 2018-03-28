// import { expect } from 'chai';
// import {
//   getAutoLogReducer,
//   getLogOnRingingReducer,
// } from './getDataReducer';
// import actionTypes from './actionTypes';

// describe('getAutoLogReducer', () => {
//   it('should be a function', () => {
//     expect(getAutoLogReducer).to.be.a('function');
//   });
//   it('should return a function', () => {
//     expect(getAutoLogReducer(actionTypes)).to.be.a('function');
//   });
//   describe('autoLogReducer', () => {
//     const reducer = getAutoLogReducer(actionTypes);
//     it('should have initial state of true', () => {
//       expect(reducer(undefined, {})).to.equal(true);
//     });
//     it('should return true when type === setAutoLog and action.autoLog is true', () => {
//       expect(reducer(true, {
//         type: actionTypes.setAutoLog,
//         autoLog: true,
//       })).to.equal(true);
//       expect(reducer(false, {
//         type: actionTypes.setAutoLog,
//         autoLog: true,
//       })).to.equal(true);
//     });
//     it('should return true when type === setAutoLog and action.autoLog is false', () => {
//       expect(reducer(true, {
//         type: actionTypes.setAutoLog,
//         autoLog: false,
//       })).to.equal(false);
//       expect(reducer(false, {
//         type: actionTypes.setAutoLog,
//         autoLog: false,
//       })).to.equal(false);
//     });
//     it('should return originalState for other actionTypes', () => {
//       const originalState = {};
//       expect(reducer(originalState, {
//         type: 'foo',
//       })).to.equal(originalState);
//     });
//   });
// });

// describe('getLogOnRingingReducer', () => {
//   it('should be a function', () => {
//     expect(getLogOnRingingReducer).to.be.a('function');
//   });
//   it('should return a function', () => {
//     expect(getLogOnRingingReducer(actionTypes)).to.be.a('function');
//   });
//   describe('logOnRingingReducer', () => {
//     const reducer = getLogOnRingingReducer(actionTypes);
//     it('should have initial state of true', () => {
//       expect(reducer(undefined, {})).to.equal(true);
//     });
//     it('should return true when type === setLogOnRinging and action.logOnRinging is true',
//       () => {
//         expect(reducer(true, {
//           type: actionTypes.setLogOnRinging,
//           logOnRinging: true,
//         })).to.equal(true);
//         expect(reducer(false, {
//           type: actionTypes.setLogOnRinging,
//           logOnRinging: true,
//         })).to.equal(true);
//       },
//     );
//     it('should return true when type === setLogOnRinging and action.logOnRinging is false',
//       () => {
//         expect(reducer(true, {
//           type: actionTypes.setLogOnRinging,
//           logOnRinging: false,
//         })).to.equal(false);
//         expect(reducer(false, {
//           type: actionTypes.setLogOnRinging,
//           logOnRinging: false,
//         })).to.equal(false);
//       },
//     );
//     it('should return originalState for other actionTypes', () => {
//       const originalState = {};
//       expect(reducer(originalState, {
//         type: 'foo',
//       })).to.equal(originalState);
//     });
//   });
// });
