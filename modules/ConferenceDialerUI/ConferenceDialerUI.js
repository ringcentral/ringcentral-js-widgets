"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConferenceDialerUI = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _DialerUI2 = require("../DialerUI");
var _dec, _class, _class2, _descriptor;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var ConferenceDialerUI = (_dec = (0, _di.Module)({
  name: 'ConferenceDialerUI',
  deps: ['Locale', 'ConferenceCall', 'RouterInteraction', {
    dep: 'ConferenceDialerUIOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DialerUI) {
  _inherits(ConferenceDialerUI, _DialerUI);
  var _super = _createSuper(ConferenceDialerUI);
  function ConferenceDialerUI() {
    var _this;
    _classCallCheck(this, ConferenceDialerUI);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _initializerDefineProperty(_this, "lastSessionId", _descriptor, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(ConferenceDialerUI, [{
    key: "_setLastSessionId",
    value: function _setLastSessionId(val) {
      this.lastSessionId = val;
    }
  }, {
    key: "setLastSessionId",
    value: function () {
      var _setLastSessionId2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sessionId) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.lastSessionId !== sessionId) {
                  this.clearRecipient();
                  this.clearToNumberField();
                }
                this._setLastSessionId(sessionId);
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function setLastSessionId(_x) {
        return _setLastSessionId2.apply(this, arguments);
      }
      return setLastSessionId;
    }()
  }, {
    key: "_onBeforeCall",
    value: function _onBeforeCall(fromSessionId) {
      var _this$_deps$conferenc;
      if (this._deps.conferenceCall && fromSessionId && !((_this$_deps$conferenc = this._deps.conferenceCall.mergingPair) === null || _this$_deps$conferenc === void 0 ? void 0 : _this$_deps$conferenc.fromSessionId)) {
        // set mergingPair if has
        this._deps.conferenceCall.setMergeParty({
          fromSessionId: fromSessionId
        });
      }
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(ConferenceDialerUI.prototype), "getUIProps", this).call(this)), {}, {
        inConference: true,
        showFromField: false
      });
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
      var _this2 = this;
      var _props$params = props.params,
        fromNumber = _props$params.fromNumber,
        fromSessionId = _props$params.fromSessionId;
      return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(ConferenceDialerUI.prototype), "getUIFunctions", this).call(this, props)), {}, {
        onBack: function onBack() {
          return _this2._deps.routerInteraction.push(_this2._backURL);
        },
        setLastSessionId: function setLastSessionId() {
          return _this2.setLastSessionId(fromSessionId);
        },
        onCallButtonClick: function onCallButtonClick() {
          return _this2.onCallButtonClick({
            fromNumber: fromNumber,
            fromSessionId: fromSessionId
          });
        }
      });
    }
  }, {
    key: "_backURL",
    get: function get() {
      var _this$_deps$conferenc2;
      return ((_this$_deps$conferenc2 = this._deps.conferenceDialerUIOptions) === null || _this$_deps$conferenc2 === void 0 ? void 0 : _this$_deps$conferenc2.backURL) || '/calls/active';
    }
  }]);
  return ConferenceDialerUI;
}(_DialerUI2.DialerUI), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lastSessionId", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setLastSessionId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLastSessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLastSessionId", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setLastSessionId"), _class2.prototype)), _class2)) || _class);
exports.ConferenceDialerUI = ConferenceDialerUI;
//# sourceMappingURL=ConferenceDialerUI.js.map
