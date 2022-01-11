"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _chai = require("chai");

var _validateNumbers = require("./validateNumbers");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('validateNumbers', function () {
  it('should return result numbers if phoneNumbers is valid', function () {
    var result = (0, _validateNumbers.validateNumbers)({
      phoneNumbers: ['8370000'],
      countryCode: 'US',
      areaCode: '666',
      allowRegionSettings: true
    });
    (0, _chai.expect)(result).to.deep.equal(['+16668370000']);
  });
  it('should return result true if one number is special number', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = (0, _validateNumbers.validateNumbers)({
              phoneNumbers: ['911'],
              countryCode: 'US',
              areaCode: '666',
              allowRegionSettings: true
            });
            (0, _chai.expect)(result).to.deep.equal(['911']);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('should return result true if one number is not an extension number', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = (0, _validateNumbers.validateNumbers)({
              phoneNumbers: ['999'],
              countryCode: 'US',
              areaCode: '666',
              allowRegionSettings: true
            });
            (0, _chai.expect)(result).to.deep.equal(['999']);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('should throw error if one number is not an valid number', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            (0, _chai.expect)(function () {
              (0, _validateNumbers.validateNumbers)({
                phoneNumbers: ['*&%^&%'],
                countryCode: 'US',
                areaCode: '666',
                allowRegionSettings: true
              });
            }).to["throw"](); //   const result = validateNumbers(['*&%^&%'], validateNumbersOptions, brandId);
            //   expect(result).to.deep.equal(['*&%^&%'], {
            //     phoneNumber: '*&%^&%',
            //     type: 'noToNumber'
            //   });

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});
//# sourceMappingURL=validateNumbers.test.js.map
