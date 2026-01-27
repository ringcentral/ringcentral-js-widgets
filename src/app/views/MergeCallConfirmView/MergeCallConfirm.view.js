"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MergeCallConfirmView = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireWildcard(require("react"));
var _MergeCallConfirmation = require("../../components/MergeCallConfirmation");
var _services = require("../../services");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var MergeCallConfirmView = exports.MergeCallConfirmView = (_dec = (0, _nextCore.injectable)({
  name: 'MergeCallConfirmView'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _services.CallMonitor === "undefined" ? Object : _services.CallMonitor, typeof _services.ActiveCallControl === "undefined" ? Object : _services.ActiveCallControl]), _dec4 = Reflect.metadata("design:type", typeof ConfirmContextData === "undefined" ? Object : ConfirmContextData), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof ConfirmContextData === "undefined" ? Object : ConfirmContextData]), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [Boolean]), _dec9 = (0, _nextCore.delegate)('server'), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [Boolean]), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [Boolean]), _dec12 = (0, _nextCore.delegate)('server'), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [Boolean]), _dec15 = (0, _nextCore.delegate)('server'), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [typeof ConfirmContextData === "undefined" ? Object : ConfirmContextData]), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", []), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", []), _dec22 = (0, _nextCore.delegate)('server'), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", []), _dec25 = (0, _nextCore.delegate)('server'), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [Boolean]), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function MergeCallConfirmView(_storage, _callMonitor, _activeCallControl) {
    var _this;
    _classCallCheck(this, MergeCallConfirmView);
    _this = _callSuper(this, MergeCallConfirmView);
    _this._storage = _storage;
    _this._callMonitor = _callMonitor;
    _this._activeCallControl = _activeCallControl;
    _this._resolve = void 0;
    _initializerDefineProperty(_this, "contextData", _descriptor, _this);
    _initializerDefineProperty(_this, "doNotAskAgain", _descriptor2, _this);
    _initializerDefineProperty(_this, "isOpen", _descriptor3, _this);
    _this._storage.enable(_this, {
      whitelist: ['doNotAskAgain']
    });
    return _this;
  }
  _inherits(MergeCallConfirmView, _RcViewModule);
  return _createClass(MergeCallConfirmView, [{
    key: "_setContextData",
    value: function _setContextData(val) {
      this.contextData = val;
    }
  }, {
    key: "_setDoNotAskAgain",
    value: function _setDoNotAskAgain(value) {
      this.doNotAskAgain = value;
    }
  }, {
    key: "setDoNotAskAgain",
    value: function () {
      var _setDoNotAskAgain2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(value) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setDoNotAskAgain(value);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setDoNotAskAgain(_x) {
        return _setDoNotAskAgain2.apply(this, arguments);
      }
      return setDoNotAskAgain;
    }()
  }, {
    key: "_setIsOpen",
    value: function _setIsOpen(value) {
      this.isOpen = value;
    }
  }, {
    key: "setIsOpen",
    value: function () {
      var _setIsOpen2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(value) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._setIsOpen(value);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setIsOpen(_x2) {
        return _setIsOpen2.apply(this, arguments);
      }
      return setIsOpen;
    }()
  }, {
    key: "confirm",
    value: function () {
      var _confirm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(contextData) {
        var _this2 = this;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!this.doNotAskAgain) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2, true);
            case 1:
              this._setContextData(contextData);
              _context3.n = 2;
              return this.setIsOpen(true);
            case 2:
              return _context3.a(2, new Promise(function (resolve) {
                _this2._resolve = resolve;
              })["finally"](function () {
                _this2._resolve = undefined;
                _this2._setContextData(null);
              }));
          }
        }, _callee3, this);
      }));
      function confirm(_x3) {
        return _confirm.apply(this, arguments);
      }
      return confirm;
    }()
  }, {
    key: "contactName",
    get: function get() {
      var _call$fromName, _call$from, _call$toName, _call$to;
      var contextData = this.contextData;
      if (!contextData) return;
      var call = this._callMonitor.allCalls.find(function (x) {
        var _x$webphoneSession;
        return contextData.telephonySessionId && contextData.telephonySessionId === x.telephonySessionId || contextData.webphoneSessionId && contextData.webphoneSessionId === ((_x$webphoneSession = x.webphoneSession) === null || _x$webphoneSession === void 0 ? void 0 : _x$webphoneSession.id);
      });
      if (!call) return;
      var contactName = (0, _callLogHelpers.isInbound)(call) ? (_call$fromName = call.fromName) !== null && _call$fromName !== void 0 ? _call$fromName : (_call$from = call.from) === null || _call$from === void 0 ? void 0 : _call$from.phoneNumber : (_call$toName = call.toName) !== null && _call$toName !== void 0 ? _call$toName : (_call$to = call.to) === null || _call$to === void 0 ? void 0 : _call$to.phoneNumber;
      return contactName;
    }
  }, {
    key: "isConferenceCall",
    get: function get() {
      var contextData = this.contextData;
      if (!contextData) return false;
      var session = this._activeCallControl.getSession(contextData.telephonySessionId);
      return !!(session === null || session === void 0 ? void 0 : session.isConferenceCall);
    }
  }, {
    key: "onClose",
    value: function () {
      var _onClose = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _this$_resolve;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this.setIsOpen(false);
            case 1:
              (_this$_resolve = this._resolve) === null || _this$_resolve === void 0 ? void 0 : _this$_resolve.call(this, false);
            case 2:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function onClose() {
        return _onClose.apply(this, arguments);
      }
      return onClose;
    }()
  }, {
    key: "onMerge",
    value: function () {
      var _onMerge = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(doNotAskAgain) {
        var _this$_resolve2;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this.setDoNotAskAgain(doNotAskAgain);
            case 1:
              _context5.n = 2;
              return this.setIsOpen(false);
            case 2:
              (_this$_resolve2 = this._resolve) === null || _this$_resolve2 === void 0 ? void 0 : _this$_resolve2.call(this, true);
            case 3:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function onMerge(_x4) {
        return _onMerge.apply(this, arguments);
      }
      return onMerge;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps(_props) {
      return {
        isOpen: this.isOpen,
        contactName: this.contactName || '',
        isConferenceCall: this.isConferenceCall
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_props) {
      var _this3 = this;
      return {
        onClose: function () {
          var _onClose2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
            return _regenerator().w(function (_context6) {
              while (1) switch (_context6.n) {
                case 0:
                  _context6.n = 1;
                  return _this3.onClose();
                case 1:
                  return _context6.a(2, _context6.v);
              }
            }, _callee6);
          }));
          function onClose() {
            return _onClose2.apply(this, arguments);
          }
          return onClose;
        }(),
        onCancel: function () {
          var _onCancel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
            return _regenerator().w(function (_context7) {
              while (1) switch (_context7.n) {
                case 0:
                  _context7.n = 1;
                  return _this3.onClose();
                case 1:
                  return _context7.a(2, _context7.v);
              }
            }, _callee7);
          }));
          function onCancel() {
            return _onCancel.apply(this, arguments);
          }
          return onCancel;
        }(),
        onMerge: function () {
          var _onMerge2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(doNotAskAgain) {
            return _regenerator().w(function (_context8) {
              while (1) switch (_context8.n) {
                case 0:
                  _context8.n = 1;
                  return _this3.onMerge(doNotAskAgain);
                case 1:
                  return _context8.a(2, _context8.v);
              }
            }, _callee8);
          }));
          function onMerge(_x5) {
            return _onMerge2.apply(this, arguments);
          }
          return onMerge;
        }()
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this4 = this;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this4.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      return /*#__PURE__*/_react["default"].createElement(_MergeCallConfirmation.MergeCallConfirmation, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "contextData", [_nextCore.state, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setContextData", [_nextCore.action, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "_setContextData"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "doNotAskAgain", [_nextCore.userStorage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setDoNotAskAgain", [_nextCore.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "_setDoNotAskAgain"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDoNotAskAgain", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "setDoNotAskAgain"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isOpen", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setIsOpen", [_nextCore.action, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "_setIsOpen"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIsOpen", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsOpen"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "confirm", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "confirm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "contactName", [_nextCore.computed, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "contactName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isConferenceCall", [_nextCore.computed, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "isConferenceCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClose", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "onClose"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onMerge", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "onMerge"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=MergeCallConfirm.view.js.map
