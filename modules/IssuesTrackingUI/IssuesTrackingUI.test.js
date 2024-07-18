"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("regenerator-runtime/runtime");
var _IssuesTrackingUI = require("./IssuesTrackingUI");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
jest.mock('@ringcentral-integration/core', function () {
  return _objectSpread(_objectSpread({
    __esModule: true
  }, jest.requireActual('@ringcentral-integration/core')), {}, {
    action: jest.fn()
  });
});
describe('IssuesTrackingUI', function () {
  var issuesTrackingUI;
  beforeEach(function () {
    issuesTrackingUI = new _IssuesTrackingUI.IssuesTrackingUI({
      routerInteraction: {
        push: jest.fn()
      },
      locale: {
        currentLocale: 'en-US'
      },
      alert: {
        success: jest.fn(),
        danger: jest.fn()
      },
      browserLogger: {
        enable: jest.fn(),
        disable: jest.fn(),
        saveLog: jest.fn(),
        enabled: true,
        downloading: false
      }
    });
  });
  afterEach(function () {
    jest.clearAllMocks();
  });
  describe('setOpen', function () {
    it('should set the open state', function () {
      issuesTrackingUI.setOpen(true);
      expect(issuesTrackingUI.open).toBe(true);
      issuesTrackingUI.setOpen(false);
      expect(issuesTrackingUI.open).toBe(false);
    });
  });
  describe('goBack', function () {
    it('should navigate to the settings page', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var props, uiFunctions;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              props = {};
              uiFunctions = issuesTrackingUI.getUIFunctions(props);
              expect(uiFunctions.goBack).toEqual(expect.any(Function));
              uiFunctions.goBack();
              expect(issuesTrackingUI._deps.routerInteraction.push).toHaveBeenCalledWith('/settings');
            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('toggleEnable', function () {
    it('should enable browser logger when checked is true', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var props, uiFunctions;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              props = {};
              uiFunctions = issuesTrackingUI.getUIFunctions(props);
              uiFunctions.toggleEnable(true);
              expect(issuesTrackingUI._deps.browserLogger.enable).toHaveBeenCalled();
            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should set the open state to true when checked is false', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var props, uiFunctions;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              props = {};
              uiFunctions = issuesTrackingUI.getUIFunctions(props);
              uiFunctions.toggleEnable(false);
              expect(issuesTrackingUI.open).toBe(true);
            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('downloadLog', function () {
    it('should save the log and show success message', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var uiFunctions;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              uiFunctions = issuesTrackingUI.getUIFunctions({});
              _context4.next = 3;
              return uiFunctions.downloadLog();
            case 3:
              expect(issuesTrackingUI._deps.browserLogger.saveLog).toHaveBeenCalled();
              expect(issuesTrackingUI._deps.alert.success).toHaveBeenCalledWith({
                message: 'issueTracking-downloadSuccess'
              });
              expect(issuesTrackingUI._deps.browserLogger.disable).toHaveBeenCalled();
            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should show error message when log download fails', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              issuesTrackingUI._deps.browserLogger.saveLog.mockRejectedValueOnce(new Error('Download failed'));
              _context5.next = 3;
              return issuesTrackingUI.downloadLog();
            case 3:
              expect(issuesTrackingUI._deps.alert.danger).toHaveBeenCalledWith({
                message: 'issueTracking-downloadFail'
              });
            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe('getUIProps', function () {
    it('should return the UI props', function () {
      var props = {};
      var uiProps = issuesTrackingUI.getUIProps(props);
      expect(uiProps.enabled).toBe(true);
      expect(uiProps.downloading).toBe(false);
      expect(uiProps.currentLocale).toBe('en-US');
      expect(uiProps.ConfirmPanelProps).toEqual({
        open: false,
        onCancel: expect.any(Function),
        onClose: expect.any(Function),
        onConfirm: expect.any(Function)
      });
      issuesTrackingUI.setOpen(true);
      expect(issuesTrackingUI.open).toBe(true);
      uiProps.ConfirmPanelProps.onCancel();
      expect(issuesTrackingUI.open).toBe(false);
      issuesTrackingUI.setOpen(true);
      expect(issuesTrackingUI.open).toBe(true);
      uiProps.ConfirmPanelProps.onClose();
      expect(issuesTrackingUI.open).toBe(false);
      issuesTrackingUI.setOpen(true);
      expect(issuesTrackingUI.open).toBe(true);
      uiProps.ConfirmPanelProps.onConfirm();
      expect(issuesTrackingUI.open).toBe(false);
    });
  });
  describe('getUIFunctions', function () {
    it('should return the UI functions', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var props, uiFunctions;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              props = {};
              uiFunctions = issuesTrackingUI.getUIFunctions(props);
              expect(uiFunctions.downloadLog).toEqual(expect.any(Function));
              expect(uiFunctions.toggleEnable).toEqual(expect.any(Function));
              uiFunctions.toggleEnable(true);
            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
});
//# sourceMappingURL=IssuesTrackingUI.test.js.map
