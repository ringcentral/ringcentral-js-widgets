"use strict";

require("core-js/modules/es.array.find");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("regenerator-runtime/runtime");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _ManualEntryPanel = require("./ManualEntryPanel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
describe('<ManualEntryPanel />', function () {
  it('Display Back Button and when user click it, function goBack will be called', function () {
    var goBack = jest.fn(function () {});
    wrapper = setup({
      goBack: goBack
    });
    wrapper.find('[data-sign="backButton"]').at(0).find('button').simulate('click');
    expect(goBack).toHaveBeenCalled();
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
    wrapper.find('RcDialTextField').at(0).find('input').simulate('change', eventObj);
    wrapper.find('[data-sign="nextButton"]').at(0).find('button').simulate('click');
    expect(changeRecipientNumber).toHaveBeenCalledWith(userInput);
  });
});
//# sourceMappingURL=ManualEntryPanel.spec.js.map
