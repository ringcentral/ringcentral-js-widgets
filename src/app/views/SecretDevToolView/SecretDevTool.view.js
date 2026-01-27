"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecretDevToolView = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _services = require("../../services");
var _HiddenMagic = require("./HiddenMagic");
var _excluded = ["show"];
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
var SecretDevToolView = exports.SecretDevToolView = (_dec = (0, _nextCore.injectable)({
  name: 'SecretDevToolView'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _services.Locale === "undefined" ? Object : _services.Locale]), _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [Boolean]), _dec6 = (0, _nextCore.delegate)('server'), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [Boolean]), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [Boolean]), _dec1 = (0, _nextCore.delegate)('server'), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [Boolean]), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [typeof SecretDevToolProps === "undefined" ? Object : SecretDevToolProps]), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function SecretDevToolView(_storage, _locale) {
    var _this;
    _classCallCheck(this, SecretDevToolView);
    _this = _callSuper(this, SecretDevToolView);
    _this._storage = _storage;
    _this._locale = _locale;
    _initializerDefineProperty(_this, "show", _descriptor, _this);
    _initializerDefineProperty(_this, "expanded", _descriptor2, _this);
    _this._storage.enable(_this);
    return _this;
  }
  _inherits(SecretDevToolView, _RcViewModule);
  return _createClass(SecretDevToolView, [{
    key: "_setShow",
    value: function _setShow(val) {
      this.show = val;
    }
  }, {
    key: "setShow",
    value: function () {
      var _setShow2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(val) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setShow(val);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setShow(_x) {
        return _setShow2.apply(this, arguments);
      }
      return setShow;
    }()
  }, {
    key: "_setExpanded",
    value: function _setExpanded(val) {
      this.expanded = val;
    }
  }, {
    key: "setExpanded",
    value: function () {
      var _setExpanded2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(val) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._setExpanded(val);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setExpanded(_x2) {
        return _setExpanded2.apply(this, arguments);
      }
      return setExpanded;
    }()
  }, {
    key: "FloatPanel",
    value: function FloatPanel(_ref) {
      var _this2 = this;
      var className = _ref.className,
        useRenderProps = _ref.useRenderProps;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          return {
            currentLocale: _this2._locale.currentLocale,
            expanded: _this2.expanded
          };
        }),
        currentLocale = _useConnector.currentLocale,
        expanded = _useConnector.expanded;
      var _ref2 = (useRenderProps === null || useRenderProps === void 0 ? void 0 : useRenderProps()) || {},
        online = _ref2.online,
        action = _ref2.action,
        header = _ref2.header,
        details = _ref2.details;
      var summaryRef = (0, _react.useRef)(null);
      var detailsRef = (0, _react.useRef)(null);
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "magic-float-panel",
        className: (0, _clsx["default"])('fixed bottom-0 right-0 z-tooltip w-full max-w-[400px] shadow-lg border border-neutral-b2 bg-neutral-b5', 'translate-x-[calc(100%-16px)] transition-transform ease-in-out', expanded ? '!translate-x-0' : 'hover:!translate-x-0', '[&_button]:bg-neutral-b4 [&_button:active]:bg-neutral-b4/70 [&_button:hover]:bg-neutral-b4 [&_button:hover]:text-neutral-b1', className)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex max-h-screen flex-col"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])('flex border-b border-l-[16px]', online === undefined && 'border-neutral-b4', online ? 'text-success-f border-success-f' : 'text-danger-f border-danger-f'),
        onClick: function onClick() {
          return _this2.setExpanded(!expanded);
        },
        ref: summaryRef,
        role: "button",
        tabIndex: 0,
        onKeyDown: function onKeyDown(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            _this2.setExpanded(!expanded);
          }
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex flex-col gap-2"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        tabIndex: -1,
        onClick: function onClick(e) {
          e.stopPropagation();
          _this2.setShow(false);
        }
      }, "hide"), action), /*#__PURE__*/_react["default"].createElement("i", {
        className: "flex-auto"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "w-[185px]"
      }, /*#__PURE__*/_react["default"].createElement("div", null, "\xB7 Current locale: ", currentLocale), header)), expanded && /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex flex-col overflow-auto p-4",
        ref: detailsRef
      }, details)));
    }
  }, {
    key: "component",
    value: function component(_ref3) {
      var _this3 = this;
      var show = _ref3.show,
        rest = _objectWithoutProperties(_ref3, _excluded);
      var showState = (0, _nextCore.useConnector)(function () {
        return _this3.show;
      });
      return /*#__PURE__*/_react["default"].createElement(_springUi.Portal, null, show || showState ? /*#__PURE__*/_react["default"].createElement(this.FloatPanel, rest) : /*#__PURE__*/_react["default"].createElement(_HiddenMagic.HiddenMagic, {
        "data-sign": "magic-hidden",
        onShowChange: function onShowChange() {
          return _this3.setShow(true);
        }
      }));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "show", [_nextCore.globalStorage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setShow", [_nextCore.action, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "_setShow"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setShow", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "setShow"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "expanded", [_nextCore.globalStorage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setExpanded", [_nextCore.action, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "_setExpanded"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setExpanded", [_dec1, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "setExpanded"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "FloatPanel", [_nextCore.autobind, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "FloatPanel"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=SecretDevTool.view.js.map
