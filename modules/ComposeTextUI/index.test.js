"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("regenerator-runtime/runtime");
var _ComposeTextUI = require("./ComposeTextUI");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('detectPhoneNumbers', function () {
  var phone = {
    composeText: {
      validatePhoneNumber: function validatePhoneNumber(string) {
        return /^\d*$/.test(string);
      },
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      addToNumber: jest.fn().mockResolvedValue(true)
    }
  };

  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(function () {
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    jest.clearAllMocks();
  });

  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('when text is a plain text without valid phone number', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var funcs, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // @ts-expect-error TS(2345): Argument of type '{ composeText: { validatePhoneNu... Remove this comment to see the full error message
            funcs = new _ComposeTextUI.ComposeTextUI(phone).getUIFunctions({
              phone: phone
            });
            _context.next = 3;
            return funcs.detectPhoneNumbers('sabasdf, qwerrrr');
          case 3:
            result = _context.sent;
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(result).toBe(false);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(phone.composeText.addToNumber).not.toHaveBeenCalled();
          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));

  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('when text is a valid phone number', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var funcs, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // @ts-expect-error TS(2345): Argument of type '{ composeText: { validatePhoneNu... Remove this comment to see the full error message
            funcs = new _ComposeTextUI.ComposeTextUI(phone).getUIFunctions({
              phone: phone
            });
            _context2.next = 3;
            return funcs.detectPhoneNumbers('123444');
          case 3:
            result = _context2.sent;
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(result).toBe(true);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(phone.composeText.addToNumber).toHaveBeenCalledTimes(1);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(phone.composeText.addToNumber).toHaveBeenCalledWith({
              phoneNumber: '123444'
            });
          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));

  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('when text is "sabasdf, 1234"', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var funcs, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // @ts-expect-error TS(2345): Argument of type '{ composeText: { validatePhoneNu... Remove this comment to see the full error message
            funcs = new _ComposeTextUI.ComposeTextUI(phone).getUIFunctions({
              phone: phone
            });
            _context3.next = 3;
            return funcs.detectPhoneNumbers('sabasdf, 1234');
          case 3:
            result = _context3.sent;
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(result).toBe(true);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(phone.composeText.addToNumber).toHaveBeenCalledTimes(1);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(phone.composeText.addToNumber).toHaveBeenCalledWith({
              phoneNumber: '1234'
            });
          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));

  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('when text is "1234,5555"', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var funcs, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // @ts-expect-error TS(2345): Argument of type '{ composeText: { validatePhoneNu... Remove this comment to see the full error message
            funcs = new _ComposeTextUI.ComposeTextUI(phone).getUIFunctions({
              phone: phone
            });
            _context4.next = 3;
            return funcs.detectPhoneNumbers('1234,5555');
          case 3:
            result = _context4.sent;
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(result).toBe(true);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(phone.composeText.addToNumber).toHaveBeenCalledTimes(2);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(phone.composeText.addToNumber).toHaveBeenNthCalledWith(1, {
              phoneNumber: '1234'
            });
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(phone.composeText.addToNumber).toHaveBeenNthCalledWith(2, {
              phoneNumber: '5555'
            });
          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
});
//# sourceMappingURL=index.test.js.map
