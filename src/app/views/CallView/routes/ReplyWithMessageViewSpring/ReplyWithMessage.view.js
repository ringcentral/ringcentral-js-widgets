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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplyWithMessageView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _services = require("../../../../services");
var _services2 = require("../../services");
var _ReplyWithMessageView2 = require("./ReplyWithMessage.view.interface");
var _ReplyWithMessagePanel = require("./ReplyWithMessagePanel");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
var ReplyWithMessageView = exports.ReplyWithMessageView = (_dec = (0, _nextCore.injectable)({
  name: 'ReplyWithMessageView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('ReplyWithMessageViewOptions')(target, undefined, 4);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _views.ModalView === "undefined" ? Object : _views.ModalView, typeof _services.CallAction === "undefined" ? Object : _services.CallAction, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _services2.CallViewState === "undefined" ? Object : _services2.CallViewState, typeof ReplyWithMessageViewOptions === "undefined" ? Object : ReplyWithMessageViewOptions]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function ReplyWithMessageView(_modalView, _callAction, _portManager, _callViewState, _replyWithMessageViewOptions) {
    var _this;
    _classCallCheck(this, ReplyWithMessageView);
    _this = _callSuper(this, ReplyWithMessageView);
    _this._modalView = _modalView;
    _this._callAction = _callAction;
    _this._portManager = _portManager;
    _this._callViewState = _callViewState;
    _this._replyWithMessageViewOptions = _replyWithMessageViewOptions;
    _initializerDefineProperty(_this, "replyDrawer", _descriptor, _this);
    if (_this._portManager.shared) {
      _this._portManager.onServer(function () {
        _this.bindClearListener();
      });
    } else {
      _this.bindClearListener();
    }
    return _this;
  }
  _inherits(ReplyWithMessageView, _RcViewModule);
  return _createClass(ReplyWithMessageView, [{
    key: "options",
    get: function get() {
      var minString = (0, _i18n.t)('min');
      var hourString = (0, _i18n.t)('hour');
      return [{
        pattern: _ReplyWithMessageView2.ReplyWithPattern.inAMeeting,
        text: (0, _i18n.t)('inAMeeting')
      }, {
        pattern: _ReplyWithMessageView2.ReplyWithPattern.onMyWay,
        text: (0, _i18n.t)('onMyWay')
      }, {
        pattern: _ReplyWithMessageView2.ReplyWithPattern.callMeBack,
        text: (0, _i18n.t)('callMeBackIn'),
        options: [{
          text: "5 ".concat(minString),
          timeValue: 5,
          timeUnits: 'Minute'
        }, {
          text: "10 ".concat(minString),
          timeValue: 10,
          timeUnits: 'Minute'
        }, {
          text: "30 ".concat(minString),
          timeValue: 30,
          timeUnits: 'Minute'
        }, {
          text: "1 ".concat(hourString),
          timeValue: 1,
          timeUnits: 'Hour'
        }]
      }, {
        pattern: _ReplyWithMessageView2.ReplyWithPattern.willCallYouBack,
        text: (0, _i18n.t)('willCallYouBackIn'),
        options: [{
          text: "5 ".concat(minString),
          timeValue: 5,
          timeUnits: 'Minute'
        }, {
          text: "10 ".concat(minString),
          timeValue: 10,
          timeUnits: 'Minute'
        }, {
          text: "30 ".concat(minString),
          timeValue: 30,
          timeUnits: 'Minute'
        }, {
          text: "1 ".concat(hourString),
          timeValue: 1,
          timeUnits: 'Hour'
        }]
      }];
    }
  }, {
    key: "bindClearListener",
    value: function bindClearListener() {
      var _this2 = this;
      // when call ended, or change to another call, clear the replay message drawer
      this._callAction.displayCallTelephonyIdChange$.pipe((0, _rxjs.tap)(function () {
        _this2._modalView.close(_this2.replyDrawer);
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var call = _ref.call;
      var callViewState = this._callViewState.getCallViewState(call.telephonySessionId);
      return {
        call: call,
        options: this.options,
        replayMessage: callViewState.replayMessage
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this3 = this;
      var call = _ref2.call;
      return {
        onReplayMessageChange: function onReplayMessageChange(val) {
          _this3._callViewState.setCallViewState(call.telephonySessionId, {
            replayMessage: val
          });
        },
        onOptionClick: function onOptionClick(option) {
          var telephonySessionId = call.telephonySessionId;
          var handlers = _this3._callAction.createActionsHandler(telephonySessionId);
          if (!option.options) {
            return handlers('startReply', {
              replyWithPattern: {
                pattern: option.pattern
              }
            });
          }
          _this3._modalView.open(_this3.replyDrawer, {
            option: option,
            call: call
          });
        },
        onAction: function onAction() {
          var telephonySessionId = call.telephonySessionId;
          var handlers = _this3._callAction.createActionsHandler(telephonySessionId);
          return handlers.apply(void 0, arguments);
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this4 = this,
        _this$_replyWithMessa;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this4.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_replyWithMessa = this._replyWithMessageViewOptions) === null || _this$_replyWithMessa === void 0 ? void 0 : _this$_replyWithMessa.component) || _ReplyWithMessagePanel.ReplyWithMessagePanel;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "replyDrawer", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;
    return this._modalView.create({
      view: function view() {
        var _useModalItemView = (0, _views.useModalItemView)(),
          props = _useModalItemView.props,
          action = _useModalItemView.action;
        var payload = props.payload;
        if (!payload || !action) return null;
        var call = payload.call,
          option = payload.option;
        var options = (option === null || option === void 0 ? void 0 : option.options) || [];
        return /*#__PURE__*/_react["default"].createElement(_springUi.List, {
          className: "my-2"
        }, options.map(function (item, index) {
          return /*#__PURE__*/_react["default"].createElement(_springUi.ListItem, {
            divider: false,
            className: "group",
            onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
              var telephonySessionId, handlers;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    telephonySessionId = call.telephonySessionId;
                    handlers = _this5._callAction.createActionsHandler(telephonySessionId);
                    _context.n = 1;
                    return handlers('startReply', {
                      replyWithPattern: {
                        pattern: option.pattern,
                        time: item.timeValue,
                        timeUnit: item.timeUnits
                      }
                    });
                  case 1:
                    action.close();
                  case 2:
                    return _context.a(2);
                }
              }, _callee);
            })),
            key: "time-".concat(item.timeValue, "-").concat(index)
          }, /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
            primary: item.text
          }), /*#__PURE__*/_react["default"].createElement("i", {
            className: "flex-auto"
          }), /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
            color: "action.grayLight",
            className: "hidden group-hover:block",
            size: "small",
            symbol: _springIcon.SendMd
          }));
        }));
      },
      props: function props() {
        return {
          header: null,
          type: 'drawer',
          disableBackdropClick: false
        };
      }
    });
  }
}), _applyDecoratedDescriptor(_class2.prototype, "options", [_nextCore.computed, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "options"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ReplyWithMessage.view.js.map
