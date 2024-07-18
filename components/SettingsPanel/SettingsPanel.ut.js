"use strict";

require("core-js/modules/es.array.find");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UTRenderSessionInfo = exports.UTCheckOptionsRender = void 0;
require("regenerator-runtime/runtime");
var _ = require(".");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var wrapper;
var defaultSessionInfo = [{
  label: 'Phone',
  value: '6508498195'
}, {
  label: 'Login style',
  value: 'INBOUND'
}, {
  label: 'Login time',
  value: '7/20/20 9:20 AM'
}, {
  label: 'Skill profile',
  value: 'bella'
}];
var defaultAgentName = 'Kiwi Lin';
var defaultUserName = 'kiwi.lin+11564+15240001_1364338@ringcentral.com';
function setup(_ref) {
  var _ref$currentLocale = _ref.currentLocale,
    currentLocale = _ref$currentLocale === void 0 ? 'en-US' : _ref$currentLocale,
    _ref$onLogout = _ref.onLogout,
    onLogout = _ref$onLogout === void 0 ? function () {
      return new Promise(function (resolve) {
        return resolve();
      });
    } : _ref$onLogout,
    _ref$version = _ref.version,
    version = _ref$version === void 0 ? '' : _ref$version,
    _ref$goToSessionUpdat = _ref.goToSessionUpdatePage,
    goToSessionUpdatePage = _ref$goToSessionUpdat === void 0 ? function () {} : _ref$goToSessionUpdat,
    _ref$sessionInfo = _ref.sessionInfo,
    sessionInfo = _ref$sessionInfo === void 0 ? defaultSessionInfo : _ref$sessionInfo,
    _ref$agentName = _ref.agentName,
    agentName = _ref$agentName === void 0 ? defaultAgentName : _ref$agentName,
    _ref$userName = _ref.userName,
    userName = _ref$userName === void 0 ? defaultUserName : _ref$userName,
    _ref$disableEditSessi = _ref.disableEditSessionButton,
    disableEditSessionButton = _ref$disableEditSessi === void 0 ? false : _ref$disableEditSessi,
    _ref$showEditSessionI = _ref.showEditSessionIcon,
    showEditSessionIcon = _ref$showEditSessionI === void 0 ? true : _ref$showEditSessionI;
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_.SettingsPanel, {
    currentLocale: currentLocale,
    onLogout: onLogout,
    version: version,
    goToSessionUpdatePage: goToSessionUpdatePage,
    sessionInfo: sessionInfo,
    agentName: agentName,
    userName: userName,
    disableEditSessionButton: disableEditSessionButton,
    showEditSessionIcon: showEditSessionIcon
  })));
}
var UTCheckOptionsRender = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = setup({});
            expect(wrapper.find('[data-sign="editSession"]').exists()).toBeTruthy();
            expect(wrapper.find('[title="Edit"]').exists()).toBeTruthy();
            expect(wrapper.find('[data-sign="logout"]').exists()).toBeTruthy();
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function UTCheckOptionsRender() {
    return _ref2.apply(this, arguments);
  };
}();
exports.UTCheckOptionsRender = UTCheckOptionsRender;
var UTRenderSessionInfo = function UTRenderSessionInfo() {
  wrapper = setup({});
  expect(wrapper.find('.agentName').text()).toBe(defaultAgentName);
  expect(wrapper.find('.userName').text()).toBe(defaultUserName);
  var infoItem = wrapper.find('.infoItem');
  for (var i = 0; i < defaultSessionInfo.length; i++) {
    expect(infoItem.at(i).find('.label').first().text()).toBe(defaultSessionInfo[i].label);
    expect(infoItem.at(i).find('.value').first().text()).toBe(defaultSessionInfo[i].value);
  }
};
exports.UTRenderSessionInfo = UTRenderSessionInfo;
//# sourceMappingURL=SettingsPanel.ut.js.map
