"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UTRenderSessionInfo = exports.UTCheckOptionsRender = void 0;

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _juno = require("@ringcentral/juno");

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
