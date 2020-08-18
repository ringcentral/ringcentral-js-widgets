"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _rcui = require("@ringcentral-integration/rcui");

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
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_rcui.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_ManualEntryPanel.ManualEntryPanel, {
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

afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          wrapper.unmount();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
describe('<ManualEntryPanel />', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          it('Display Back Button and when user click it, function goBack will be called', function () {
            var goBack = jest.fn(function () {});
            wrapper = setup({
              goBack: goBack
            });
            wrapper.find('[data-sign="backButton"]').at(0).find('button').simulate('click');
            expect(goBack).toBeCalled();
          });
          it('Display Next Button and when user click it, function changeRecipientNumber will be called', function () {
            var changeRecipientNumber = jest.fn(function () {});
            wrapper = setup({
              changeRecipientNumber: changeRecipientNumber
            });
            var userInput = '343535435';
            var eventObj = {
              target: {
                value: userInput
              }
            };
            wrapper.find('RecipientsInput').at(0).find('input').simulate('change', eventObj);
            wrapper.find('[data-sign="nextButton"]').at(0).find('button').simulate('click');
            expect(changeRecipientNumber).toBeCalledWith(userInput);
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
//# sourceMappingURL=ManualEntryPanel.spec.js.map
