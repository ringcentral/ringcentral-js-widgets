"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
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
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalView = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _DialogContentText = require("@ringcentral/juno/es6/components/Dialog/DialogContentText/DialogContentText.js");
var _DialogTitle = require("@ringcentral/juno/es6/components/Dialog/DialogTitle/DialogTitle.js");
var _ramda = require("ramda");
var _react = _interopRequireWildcard(require("react"));
var _ModalItemView = require("./ModalItemView");
var _excluded = ["modal", "payload"],
  _excluded2 = ["TitleProps", "header", "content", "footer"],
  _excluded3 = ["open", "id"];
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _class, _class2, _descriptor;
/* eslint-disable @typescript-eslint/no-explicit-any */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t4 in e) "default" !== _t4 && {}.hasOwnProperty.call(e, _t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t4)) && (i.get || i.set) ? o(f, _t4, i) : f[_t4] = e[_t4]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var DEFAULT_EXIT_TIMEOUT = 195;
var ModalView = exports.ModalView = (_dec = (0, _nextCore.injectable)({
  name: 'ModalView'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _nextCore.PortalHost === "undefined" ? Object : _nextCore.PortalHost]), _dec4 = Reflect.metadata("design:type", Array), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", []), _dec7 = (0, _nextCore.delegate)('server'), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [String, typeof ModalOnCloseType === "undefined" ? Object : ModalOnCloseType]), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [typeof Record === "undefined" ? Object : Record]), _dec10 = (0, _nextCore.delegate)('server'), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [String, String, typeof Record === "undefined" ? Object : Record]), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [typeof Record === "undefined" ? Object : Record]), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [String]), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [String, Boolean]), _dec19 = (0, _nextCore.delegate)('server'), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", [String, typeof Record === "undefined" ? Object : Record]), _dec22 = (0, _nextCore.delegate)('server'), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [String, String]), _dec25 = (0, _nextCore.delegate)('server'), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [String, String, void 0]), _dec28 = (0, _nextCore.delegate)('server'), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [String, String, typeof ModalOnCancelType === "undefined" ? Object : ModalOnCancelType]), _dec31 = (0, _nextCore.delegate)('server'), _dec32 = Reflect.metadata("design:type", Function), _dec33 = Reflect.metadata("design:paramtypes", [String, typeof ModalOnCloseType === "undefined" ? Object : ModalOnCloseType]), _dec34 = (0, _nextCore.delegate)('server'), _dec35 = Reflect.metadata("design:type", Function), _dec36 = Reflect.metadata("design:paramtypes", [String]), _dec37 = (0, _nextCore.computed)(function (that) {
  return [that._modals];
}), _dec38 = Reflect.metadata("design:type", Function), _dec39 = Reflect.metadata("design:paramtypes", []), _dec40 = Reflect.metadata("design:type", Function), _dec41 = Reflect.metadata("design:paramtypes", [typeof ModalItemViewProps === "undefined" ? Object : ModalItemViewProps]), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function ModalView(_portalHost) {
    var _this;
    _classCallCheck(this, ModalView);
    _this = _callSuper(this, ModalView);
    _this._portalHost = _portalHost;
    _initializerDefineProperty(_this, "_modals", _descriptor, _this);
    return _this;
  }

  /**
   * create a modal instance for using in multiple tab.
   *
   * @param options target view and props
   * @returns modal instance
   *
   * @example
   * ```tsx
   * modal = this._modalView.create({
   *  view: this._homeView, // view with ModalRef implement
   *  props: () => ({
   *    disableBackdropClick: false,
   *    onClose: (e, reason) => {
   *      console.log('onClose', reason);
   *    },
   *    onCancel: (e, reason) => {
   *      console.log('onCancel', reason);
   *    },
   *    onConfirm: () => {
   *      console.log('onConfirm');
   *    },
   *    onExited: () => {
   *      console.log('onExited');
   *    },
   *  }),
   *});
   * ```
   * ## that must be done before or inside constructor, we must keep that instance otherwise when in multiple tab mode can't find target modal anymore.
   *
   */
  _inherits(ModalView, _RcViewModule);
  return _createClass(ModalView, [{
    key: "create",
    value: function create(options) {
      var modalInstance = new _nextCore.DehydratedPortal(options, {
        autoDisableBackdropClick: true,
        disableBackdropClick: true,
        fullScreen: false
      });
      return modalInstance;
    }

    /**
     * open target modal cross multiple tabs
     *
     * ```ts
     * this._modalView.open(modalInstance, {
     *    value: 'some value you want to pass once, those once pass will never be update during this modal open'
     * })
     * ```
     * @param modalInstance host modal instance
     * @param payload JSON data pass to modal, data must be `serializable`.
     */
  }, {
    key: "open",
    value: function open(modalInstance, payload) {
      var _this2 = this;
      var instance = this._portalHost.open(modalInstance, payload, function () {
        return _this2._addModal.apply(_this2, arguments);
      });
      return _objectSpread(_objectSpread({}, instance), {}, {
        close: function close() {
          _this2.close(instance.id);
        }
      });
    }
    /**
     * close target modal cross multiple tabs
     *
     * ```ts
     * // remove target id modal
     * this._ModalView.close(id)
     * // remove all target modal type modals
     * this._ModalView.close(modalInstance)
     * ```
     */
  }, {
    key: "close",
    value: (function () {
      var _close2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(value) {
        var _this3 = this;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return this._portalHost.close(this._modals, value, function (id, reason) {
                return _this3._close(id, reason);
              });
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function close(_x) {
        return _close2.apply(this, arguments);
      }
      return close;
    }())
  }, {
    key: "closeAll",
    value: function closeAll() {
      this._modals = [];
    }
  }, {
    key: "_close",
    value: function () {
      var _close3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id, reason) {
        var dehydratedState, updatedState;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!reason) {
                _context2.n = 1;
                break;
              }
              _context2.n = 1;
              return this._emitClose(id, reason);
            case 1:
              dehydratedState = (0, _ramda.find)(function (item) {
                return item.id === id;
              }, this._modals);
              if (dehydratedState) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, false);
            case 2:
              updatedState = _objectSpread(_objectSpread({}, dehydratedState), {}, {
                open: false
              });
              this._updateModal(updatedState);
              return _context2.a(2, true);
          }
        }, _callee2, this);
      }));
      function _close(_x2, _x3) {
        return _close3.apply(this, arguments);
      }
      return _close;
    }()
  }, {
    key: "_innerAddModal",
    value: function _innerAddModal(modalState) {
      this._modals.push(modalState);
    }
  }, {
    key: "_addModal",
    value: function () {
      var _addModal2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id, type, payload) {
        var modalInstance, dehydratedState;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this._portalHost.setIdTypeMap(id, type);
              modalInstance = this.getMap(id);
              dehydratedState = modalInstance === null || modalInstance === void 0 ? void 0 : modalInstance.getDehydrateState(id, payload);
              this._innerAddModal(_objectSpread(_objectSpread({}, dehydratedState), {}, {
                open: true,
                payload: payload
              }));
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _addModal(_x4, _x5, _x6) {
        return _addModal2.apply(this, arguments);
      }
      return _addModal;
    }()
  }, {
    key: "_updateModal",
    value: function _updateModal(modalState) {
      var idx = (0, _ramda.findIndex)(function (item) {
        return item.id === modalState.id;
      }, this._modals);
      if (idx === -1) {
        throw new Error("modal id \"".concat(modalState.id, " not found"));
      }
      this._modals[idx] = Object.assign(this._modals[idx], modalState);
    }
  }, {
    key: "_removeModal",
    value: function _removeModal(id) {
      var index = (0, _ramda.findIndex)(function (item) {
        return item.id === id;
      }, this._modals);
      if (index !== -1) {
        this._modals.splice(index, 1);
      }
    }
  }, {
    key: "_setLoading",
    value: function _setLoading(id, loading) {
      var modalState = (0, _ramda.find)(function (item) {
        return item.id === id;
      }, this._modals);
      if (!modalState) return;
      var loadingMode = modalState.loadingMode;
      if (loadingMode === 'none') return;
      var idx = (0, _ramda.findIndex)(function (item) {
        return item.id === id;
      }, this._modals);
      switch (loadingMode) {
        case 'overlap':
          this._modals[idx].loadingOverlay = loading;
          return;
        case 'button':
        default:
          this._modals[idx].loading = loading;
          break;
      }
    }
  }, {
    key: "_onConfirm",
    value: function () {
      var _onConfirm2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id, data) {
        var modalInstance, handler, _t, _t2;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              modalInstance = this.getMap(id); // here we assume the handler is async and set the loading status
              // detecting whether the handler is async or not is unreliable and can be dangerous
              // for most non-async functions the loading status will occur too briefly
              // so that the UI will not really render the loading status at all
              this._setLoading(id, true);
              handler = modalInstance === null || modalInstance === void 0 ? void 0 : modalInstance.handlerRegister.get('onConfirm');
              if (!handler) {
                _context4.n = 5;
                break;
              }
              _context4.p = 1;
              _context4.n = 2;
              return handler();
            case 2:
              _t = _context4.v;
              if (!(_t === false)) {
                _context4.n = 3;
                break;
              }
              this._setLoading(id, false);
              return _context4.a(2);
            case 3:
              _context4.n = 5;
              break;
            case 4:
              _context4.p = 4;
              _t2 = _context4.v;
              // if handler has unhandled error, at least remove the loading state so the modal could
              // still be closed by the user if cancel button is provided.
              this._setLoading(id, false);
              throw _t2;
            case 5:
              this._close(id, 'confirmClick');
              _context4.n = 6;
              return this._portalHost.resolveFn(id, data !== null && data !== void 0 ? data : true);
            case 6:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 4]]);
      }));
      function _onConfirm(_x7, _x8) {
        return _onConfirm2.apply(this, arguments);
      }
      return _onConfirm;
    }()
  }, {
    key: "_onExited",
    value: function () {
      var _onExited2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(id, onExited) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this._callOnEvent(id, onExited);
            case 1:
              this._removeModal(id);
              this._portalHost.clearTimer(id);
            case 2:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _onExited(_x9, _x0) {
        return _onExited2.apply(this, arguments);
      }
      return _onExited;
    }()
  }, {
    key: "_callOnEvent",
    value: function () {
      var _callOnEvent2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(id, eventName) {
        var _modal$handlerRegiste;
        var modal,
          _len,
          args,
          _key,
          _args6 = arguments;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              modal = this.getMap(id);
              for (_len = _args6.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = _args6[_key];
              }
              modal === null || modal === void 0 ? void 0 : (_modal$handlerRegiste = modal.handlerRegister.get(eventName)) === null || _modal$handlerRegiste === void 0 ? void 0 : _modal$handlerRegiste.apply(void 0, args);
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function _callOnEvent(_x1, _x10) {
        return _callOnEvent2.apply(this, arguments);
      }
      return _callOnEvent;
    }()
  }, {
    key: "_onCancel",
    value: function () {
      var _onCancel2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(id, onCancel, reason) {
        var _modal$handlerRegiste2;
        var modal;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              modal = this.getMap(id);
              modal === null || modal === void 0 ? void 0 : (_modal$handlerRegiste2 = modal.handlerRegister.get(onCancel)) === null || _modal$handlerRegiste2 === void 0 ? void 0 : _modal$handlerRegiste2({}, reason);

              // when trigger by escapeKeyDown or backdropClick will auto trigger onClose event, that handler in there.
              if (reason !== 'escapeKeyDown' && reason !== 'backdropClick') {
                this._close(id, reason);
              }
              _context7.n = 1;
              return this._portalHost.resolveFn(id, false);
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function _onCancel(_x11, _x12, _x13) {
        return _onCancel2.apply(this, arguments);
      }
      return _onCancel;
    }()
  }, {
    key: "_onClose",
    value: function () {
      var _onClose2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(id, reason) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              this._emitClose(id, reason);
              _context8.n = 1;
              return this._portalHost.resolveFn(id, null);
            case 1:
              this._close(id);
            case 2:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function _onClose(_x14, _x15) {
        return _onClose2.apply(this, arguments);
      }
      return _onClose;
    }()
  }, {
    key: "_emitClose",
    value: function () {
      var _emitClose2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(id, reason) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              _context9.n = 1;
              return this._callOnEvent(id, 'onClose', {}, reason);
            case 1:
              this.waitModalExist(id);
            case 2:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function _emitClose(_x16, _x17) {
        return _emitClose2.apply(this, arguments);
      }
      return _emitClose;
    }()
  }, {
    key: "waitModalExist",
    value: function () {
      var _waitModalExist = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(id) {
        var _dehydratedState$Tran, _timeout$exit;
        var dehydratedState, timeout, exitTimeout, _t3;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              dehydratedState = (0, _ramda.find)(function (item) {
                return item.id === id;
              }, this._modals);
              if (dehydratedState) {
                _context0.n = 1;
                break;
              }
              return _context0.a(2);
            case 1:
              timeout = (_dehydratedState$Tran = dehydratedState.TransitionProps) === null || _dehydratedState$Tran === void 0 ? void 0 : _dehydratedState$Tran.timeout;
              exitTimeout = typeof timeout === 'number' ? timeout : (_timeout$exit = timeout === null || timeout === void 0 ? void 0 : timeout.exit) !== null && _timeout$exit !== void 0 ? _timeout$exit : DEFAULT_EXIT_TIMEOUT; // not using onExited, just using timeout for run that timer only inside worker
              _context0.p = 2;
              _context0.n = 3;
              return this._portalHost.startTimer(id, exitTimeout);
            case 3:
              this._onExited(id, 'onExited');
              _context0.n = 5;
              break;
            case 4:
              _context0.p = 4;
              _t3 = _context0.v;
            case 5:
              return _context0.a(2);
          }
        }, _callee0, this, [[2, 4]]);
      }));
      function waitModalExist(_x18) {
        return _waitModalExist.apply(this, arguments);
      }
      return waitModalExist;
    }()
  }, {
    key: "getMap",
    value: function getMap(id) {
      return this._portalHost.getMap(id);
    }
  }, {
    key: "modals",
    get: function get() {
      var _this4 = this;
      return (0, _ramda.map)(function (_ref) {
        var id = _ref.id,
          open = _ref.open,
          _onCancel3 = _ref.onCancel,
          loadingOverlay = _ref.loadingOverlay,
          loading = _ref.loading,
          payload = _ref.payload;
        var uiProps = {
          id: id,
          open: open,
          loadingOverlay: loadingOverlay,
          loading: loading,
          payload: payload,
          onConfirm: function onConfirm(e) {
            var notSerializable = e instanceof Event ||
            // spring-ui is not pass the nativeEvent, so we need to check that
            (e === null || e === void 0 ? void 0 : e.nativeEvent) instanceof Event || _typeof(e) !== 'object';
            _this4._onConfirm(id,
            // only allow to pass event object, if that is event object, should not pass that to modal handler, that need serializable data.
            notSerializable ? undefined : e);
          },
          onCancel: function onCancel(e, reason) {
            _this4._onCancel(id, _onCancel3, reason);
          },
          onClose: function onClose(e, reason) {
            _this4._onClose(id, reason);
          }
        };
        return uiProps;
      }, this._modals);
    }
  }, {
    key: "Item",
    value: function Item(_ref2) {
      var modal = _ref2.modal,
        payload = _ref2.payload,
        props = _objectWithoutProperties(_ref2, _excluded);
      var ViewModule = modal.options.view;
      var isComponent = typeof ViewModule === 'function';
      var _useConnector = (0, _nextCore.useConnector)(function () {
          return modal.getPureProps(payload || {});
        }),
        TitleProps = _useConnector.TitleProps,
        headerText = _useConnector.header,
        content = _useConnector.content,
        footer = _useConnector.footer,
        modalProps = _objectWithoutProperties(_useConnector, _excluded2);
      // footer
      // content
      var DefaultHeader = (0, _react.useCallback)(function () {
        return /*#__PURE__*/_react["default"].createElement(_DialogTitle.RcDialogTitle, TitleProps, headerText);
      }, [TitleProps, headerText]);
      var _ref3 = (isComponent ? undefined : ViewModule) || {},
        header = _ref3.header;
      var nonHeaderText = headerText === null;
      var nonHeader = nonHeaderText || (isComponent ? undefined : ViewModule === null || ViewModule === void 0 ? void 0 : ViewModule.header) === null;
      var Header = header !== null && header !== void 0 ? header : DefaultHeader;
      var nonFooter = footer === null || (isComponent ? undefined : ViewModule === null || ViewModule === void 0 ? void 0 : ViewModule.footer) === null;
      var footerNode = !nonFooter && !isComponent && (ViewModule === null || ViewModule === void 0 ? void 0 : ViewModule.footer) ? /*#__PURE__*/_react["default"].createElement(ViewModule.footer, null) : null;
      return /*#__PURE__*/_react["default"].createElement(_ModalItemView.ModalItemPanel, _extends({}, props, modalProps, {
        payload: payload,
        headerText: headerText,
        footerText: footer,
        header: nonHeader ? null : nonHeaderText ? undefined : /*#__PURE__*/_react["default"].createElement(Header, null),
        footer: nonFooter ? null : nonFooter ? undefined : footerNode
      }), ViewModule ? isComponent ? /*#__PURE__*/_react["default"].createElement(ViewModule, null) : /*#__PURE__*/_react["default"].createElement(ViewModule.component, null) : /*#__PURE__*/_react["default"].createElement(_DialogContentText.RcDialogContentText, null, content));
    }
  }, {
    key: "component",
    value: function component(inputProps) {
      var _this5 = this;
      var modals = (0, _nextCore.useConnector)(function () {
        return _this5.modals;
      });
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, modals.map(function (_ref4) {
        var open = _ref4.open,
          id = _ref4.id,
          props = _objectWithoutProperties(_ref4, _excluded3);
        var modal = _this5.getMap(id);

        // deprecated props throw error directly
        if (process.env.NODE_ENV !== 'production' && props.size) {
          throw new Error('[ModalPanel] that size props are be deprecated, please use maxWidth');
        }
        return /*#__PURE__*/_react["default"].createElement(_this5.Item, _extends({
          id: id
        }, inputProps, {
          key: id
        }, props, {
          open: open,
          modal: modal
        }));
      }));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_modals", [_nextCore.state, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "closeAll", [_nextCore.action, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "closeAll"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_close", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "_close"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_innerAddModal", [_nextCore.action, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "_innerAddModal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addModal", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "_addModal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateModal", [_nextCore.action, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateModal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeModal", [_nextCore.action, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeModal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setLoading", [_nextCore.action, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLoading"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onConfirm", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "_onConfirm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onExited", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "_onExited"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_callOnEvent", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "_callOnEvent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCancel", [_dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCancel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onClose", [_dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "_onClose"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "waitModalExist", [_dec34, _dec35, _dec36], Object.getOwnPropertyDescriptor(_class2.prototype, "waitModalExist"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "modals", [_dec37, _dec38, _dec39], Object.getOwnPropertyDescriptor(_class2.prototype, "modals"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "Item", [_nextCore.autobind, _dec40, _dec41], Object.getOwnPropertyDescriptor(_class2.prototype, "Item"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=Modal.view.js.map
