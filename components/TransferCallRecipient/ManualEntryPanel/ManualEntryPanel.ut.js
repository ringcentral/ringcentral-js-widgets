"use strict";

require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UTManualEntryInternationalTransferRender = exports.UTManualEntryInternationalTransferForbid = exports.UTManualEntryInternationalTransferAllowed = exports.UTCheckManualEntryRender = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _juno = require("@ringcentral/juno");
var _ManualEntryPanel = require("./ManualEntryPanel");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var wrapper;
var currentLocale = 'en-US';
var defaultTransferCountryOptions = [{
  countryId: 'CAN',
  countryName: 'Canada'
}, {
  countryId: 'FRA',
  countryName: 'France'
}, {
  countryId: 'GER',
  countryName: 'Germany'
}, {
  countryId: 'MEX',
  countryName: 'Mexico'
}, {
  countryId: 'MTQ',
  countryName: 'Martinique'
}, {
  countryId: 'USA',
  countryName: 'US'
}, {
  countryId: 'USX',
  countryName: 'US Extended'
}];
function setup(_ref) {
  var _ref$goBack = _ref.goBack,
    goBack = _ref$goBack === void 0 ? function () {} : _ref$goBack,
    _ref$transferRecipien = _ref.transferRecipientCountryId,
    transferRecipientCountryId = _ref$transferRecipien === void 0 ? 'USA' : _ref$transferRecipien,
    _ref$changeRecipientN = _ref.changeRecipientNumber,
    changeRecipientNumber = _ref$changeRecipientN === void 0 ? function () {} : _ref$changeRecipientN,
    _ref$changeRecipientC = _ref.changeRecipientCountryId,
    changeRecipientCountryId = _ref$changeRecipientC === void 0 ? function () {} : _ref$changeRecipientC,
    _ref$transferRecipien2 = _ref.transferRecipientNumber,
    transferRecipientNumber = _ref$transferRecipien2 === void 0 ? '6508653454' : _ref$transferRecipien2,
    _ref$allowManualInter = _ref.allowManualInternationalTransfer,
    allowManualInternationalTransfer = _ref$allowManualInter === void 0 ? false : _ref$allowManualInter;
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_ManualEntryPanel.ManualEntryPanel, {
    currentLocale: currentLocale,
    goBack: goBack,
    transferRecipientCountryId: transferRecipientCountryId,
    changeRecipientNumber: changeRecipientNumber,
    changeRecipientCountryId: changeRecipientCountryId,
    transferCountryOptions: defaultTransferCountryOptions,
    transferRecipientNumber: transferRecipientNumber,
    allowManualInternationalTransfer: allowManualInternationalTransfer
  })));
}
var UTCheckManualEntryRender = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var internalOptions, wrapper, dataSign;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            internalOptions = _ref2.internalOptions;
            wrapper = setup({});
            dataSign = {
              'Enter number field': 'transferRecipientNumber',
              Dialpad: 'dialPad'
            };
            expect(wrapper.find("[data-sign=\"".concat(dataSign[internalOptions], "\"]"))).not.toBeUndefined();
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function UTCheckManualEntryRender(_x) {
    return _ref3.apply(this, arguments);
  };
}();
exports.UTCheckManualEntryRender = UTCheckManualEntryRender;
var UTManualEntryInternationalTransferForbid = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var transferRecipientCountryId, allowManualInternationalTransfer;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            transferRecipientCountryId = 'FRA';
            allowManualInternationalTransfer = false;
            wrapper = setup({
              allowManualInternationalTransfer: allowManualInternationalTransfer,
              transferRecipientCountryId: transferRecipientCountryId
            });
            expect(wrapper.find('PickList[data-sign="transferCountry"]')).toHaveLength(0);
          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function UTManualEntryInternationalTransferForbid() {
    return _ref4.apply(this, arguments);
  };
}();
exports.UTManualEntryInternationalTransferForbid = UTManualEntryInternationalTransferForbid;
var UTManualEntryInternationalTransferAllowed = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var changeRecipientCountryId, allowManualInternationalTransfer, countryId, transferCountry;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            changeRecipientCountryId = jest.fn(function () {});
            allowManualInternationalTransfer = true;
            countryId = 'GER';
            wrapper = setup({
              allowManualInternationalTransfer: allowManualInternationalTransfer,
              changeRecipientCountryId: changeRecipientCountryId
            });
            transferCountry = wrapper.find('PickList[data-sign="transferCountry"]').at(0);
            transferCountry.find('[role="button"]').simulate('click');
            document.body.querySelector("li[data-value=\"".concat(countryId, "\"]")).click();
            expect(changeRecipientCountryId).toBeCalledWith(countryId);
          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function UTManualEntryInternationalTransferAllowed() {
    return _ref5.apply(this, arguments);
  };
}();
exports.UTManualEntryInternationalTransferAllowed = UTManualEntryInternationalTransferAllowed;
var UTManualEntryInternationalTransferRender = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var transferRecipientCountryId, transferRecipientNumber, allowManualInternationalTransfer, transferCountry;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            transferRecipientCountryId = 'FRA';
            transferRecipientNumber = '6508653454';
            allowManualInternationalTransfer = true;
            wrapper = setup({
              allowManualInternationalTransfer: allowManualInternationalTransfer,
              transferRecipientCountryId: transferRecipientCountryId,
              transferRecipientNumber: transferRecipientNumber
            });
            transferCountry = wrapper.find('PickList[data-sign="transferCountry"]');
            expect(transferCountry.prop('value')).toBe(transferRecipientCountryId);
            expect(transferCountry.find('[role="button"]').text()).toBe(defaultTransferCountryOptions.filter(function (x) {
              return x.countryId === transferRecipientCountryId;
            })[0].countryName);
            expect(wrapper.find('RecipientsInput[data-sign="transferRecipientNumber"]').prop('value')).toBe(transferRecipientNumber);
          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function UTManualEntryInternationalTransferRender() {
    return _ref6.apply(this, arguments);
  };
}();
exports.UTManualEntryInternationalTransferRender = UTManualEntryInternationalTransferRender;
//# sourceMappingURL=ManualEntryPanel.ut.js.map
