"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _IssuesTrackingUI = require("./IssuesTrackingUI");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
    it('should navigate to the settings page', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var props, uiFunctions;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            props = {};
            uiFunctions = issuesTrackingUI.getUIFunctions(props);
            expect(uiFunctions.goBack).toEqual(expect.any(Function));
            uiFunctions.goBack();
            expect(issuesTrackingUI._deps.routerInteraction.push).toHaveBeenCalledWith('/settings');
          case 1:
            return _context.a(2);
        }
      }, _callee);
    })));
  });
  describe('toggleEnable', function () {
    it('should enable browser logger when checked is true', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var props, uiFunctions;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            props = {};
            uiFunctions = issuesTrackingUI.getUIFunctions(props);
            uiFunctions.toggleEnable(true);
            expect(issuesTrackingUI._deps.browserLogger.enable).toHaveBeenCalled();
          case 1:
            return _context2.a(2);
        }
      }, _callee2);
    })));
    it('should set the open state to true when checked is false', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var props, uiFunctions;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            props = {};
            uiFunctions = issuesTrackingUI.getUIFunctions(props);
            uiFunctions.toggleEnable(false);
            expect(issuesTrackingUI.open).toBe(true);
          case 1:
            return _context3.a(2);
        }
      }, _callee3);
    })));
  });
  describe('downloadLog', function () {
    it('should save the log and show success message', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var uiFunctions;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            uiFunctions = issuesTrackingUI.getUIFunctions({});
            _context4.n = 1;
            return uiFunctions.downloadLog();
          case 1:
            expect(issuesTrackingUI._deps.browserLogger.saveLog).toHaveBeenCalled();
            expect(issuesTrackingUI._deps.alert.success).toHaveBeenCalledWith({
              message: 'issueTracking-downloadSuccess'
            });
            expect(issuesTrackingUI._deps.browserLogger.disable).toHaveBeenCalled();
          case 2:
            return _context4.a(2);
        }
      }, _callee4);
    })));
    it('should show error message when log download fails', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            issuesTrackingUI._deps.browserLogger.saveLog.mockRejectedValueOnce(new Error('Download failed'));
            _context5.n = 1;
            return issuesTrackingUI.downloadLog();
          case 1:
            expect(issuesTrackingUI._deps.alert.danger).toHaveBeenCalledWith({
              message: 'issueTracking-downloadFail'
            });
          case 2:
            return _context5.a(2);
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
    it('should return the UI functions', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var props, uiFunctions;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            props = {};
            uiFunctions = issuesTrackingUI.getUIFunctions(props);
            expect(uiFunctions.downloadLog).toEqual(expect.any(Function));
            expect(uiFunctions.toggleEnable).toEqual(expect.any(Function));
            uiFunctions.toggleEnable(true);
          case 1:
            return _context6.a(2);
        }
      }, _callee6);
    })));
  });
});
//# sourceMappingURL=IssuesTrackingUI.test.js.map
