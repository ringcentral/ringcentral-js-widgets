"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _ComposeTextUI = require("./ComposeTextUI");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('detectPhoneNumbers', function () {
  var phone = {
    composeText: {
      validatePhoneNumber: function validatePhoneNumber(string) {
        return /^\d*$/.test(string);
      },
      addToNumber: jest.fn().mockResolvedValue(true)
    }
  };
  beforeEach(function () {
    jest.clearAllMocks();
  });
  test('when text is a plain text without valid phone number', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var funcs, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            funcs = new _ComposeTextUI.ComposeTextUI(phone).getUIFunctions({
              phone: phone
            });
            _context.next = 3;
            return funcs.detectPhoneNumbers('sabasdf, qwerrrr');

          case 3:
            result = _context.sent;
            expect(result).toBe(false);
            expect(phone.composeText.addToNumber).not.toBeCalled();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('when text is a valid phone number', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var funcs, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            funcs = new _ComposeTextUI.ComposeTextUI(phone).getUIFunctions({
              phone: phone
            });
            _context2.next = 3;
            return funcs.detectPhoneNumbers('123444');

          case 3:
            result = _context2.sent;
            expect(result).toBe(true);
            expect(phone.composeText.addToNumber).toBeCalledTimes(1);
            expect(phone.composeText.addToNumber).toBeCalledWith({
              phoneNumber: '123444'
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test('when text is "sabasdf, 1234"', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var funcs, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            funcs = new _ComposeTextUI.ComposeTextUI(phone).getUIFunctions({
              phone: phone
            });
            _context3.next = 3;
            return funcs.detectPhoneNumbers('sabasdf, 1234');

          case 3:
            result = _context3.sent;
            expect(result).toBe(true);
            expect(phone.composeText.addToNumber).toBeCalledTimes(1);
            expect(phone.composeText.addToNumber).toBeCalledWith({
              phoneNumber: '1234'
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test('when text is "1234,5555"', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var funcs, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            funcs = new _ComposeTextUI.ComposeTextUI(phone).getUIFunctions({
              phone: phone
            });
            _context4.next = 3;
            return funcs.detectPhoneNumbers('1234,5555');

          case 3:
            result = _context4.sent;
            expect(result).toBe(true);
            expect(phone.composeText.addToNumber).toBeCalledTimes(2);
            expect(phone.composeText.addToNumber).toHaveBeenNthCalledWith(1, {
              phoneNumber: '1234'
            });
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
