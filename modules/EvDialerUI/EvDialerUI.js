"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvDialerUI = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _EvActivityCallUI = require("../../interfaces/EvActivityCallUI.interface");
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var EvDialerUI = exports.EvDialerUI = (_dec = (0, _di.Module)({
  name: 'EvDialerUI',
  deps: ['EvCall', 'Locale', 'Storage', 'EvAuth', 'RouterInteraction', 'EvSettings', 'EvClient', 'EvCallMonitor', 'EvWorkingState', 'EvAgentSession', 'EvIntegratedSoftphone', 'Environment', 'EvActivityCallUI', {
    dep: 'EvDialerUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.evIntegratedSoftphone.connectingAlertId];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  function EvDialerUI(deps) {
    var _this;
    _classCallCheck(this, EvDialerUI);
    _this = _callSuper(this, EvDialerUI, [{
      deps: deps,
      enableCache: true,
      storageKey: 'EvDialerUI'
    }]);
    _initializerDefineProperty(_this, "toNumber", _descriptor, _this);
    _initializerDefineProperty(_this, "latestDialoutNumber", _descriptor2, _this);
    return _this;
  }
  _inherits(EvDialerUI, _RcUIModuleV);
  return _createClass(EvDialerUI, [{
    key: "reset",
    value: function reset() {
      this.toNumber = '';
      this.latestDialoutNumber = '';
    }
  }, {
    key: "setToNumber",
    value: function setToNumber(value) {
      this.toNumber = value;
    }
  }, {
    key: "setLatestDialoutNumber",
    value: function setLatestDialoutNumber() {
      this.latestDialoutNumber = this.toNumber;
    }
  }, {
    key: "dialButtonDisabled",
    get: function get() {
      return !!this._deps.evIntegratedSoftphone.connectingAlertId;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this._deps.evAuth.beforeAgentLogout(function () {
        // * if that logout is not from update session
        if (!_this2._deps.evAgentSession.isAgentUpdating) {
          _this2.reset();
        }
      });
      (0, _core.watch)(this, function () {
        return _this2._deps.routerInteraction.currentPath;
      }, function (newValue) {
        if (newValue === '/dialer') {
          _this2.checkOnCall();
        }
      });
    }
  }, {
    key: "checkOnCall",
    value: function checkOnCall() {
      // onCall or not yet disposed call, it should navigate to the `activityCallLog/:id` router.
      var _this$_deps$evCallMon = _slicedToArray(this._deps.evCallMonitor.calls, 1),
        call = _this$_deps$evCallMon[0];
      var isPendingDisposition = this._deps.evWorkingState.isPendingDisposition;
      var id;
      if (isPendingDisposition) {
        id = this._deps.evCallMonitor.callLogsIds[0];
      }
      if (call) {
        id = this._deps.evClient.encodeUii(call.session);
      }
      if (id) {
        this._deps.evActivityCallUI.changeSavingStatus(_EvActivityCallUI.saveStatus.submit);
        this._deps.routerInteraction.push("/activityCallLog/".concat(id));
      }
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      return {
        toNumber: this.toNumber,
        currentLocale: this._deps.locale.currentLocale,
        size: this._deps.environment.isWide ? 'medium' : 'small',
        dialoutStatus: this._deps.evCall.dialoutStatus,
        hasDialer: this._deps.evAuth.agentPermissions.allowManualCalls,
        dialButtonDisabled: this.dialButtonDisabled
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this3 = this;
      return {
        setToNumber: function setToNumber(value) {
          return _this3.setToNumber(value);
        },
        dialout: function dialout() {
          if (_this3.toNumber) {
            _this3.setLatestDialoutNumber();
          } else if (_this3.latestDialoutNumber) {
            _this3.setToNumber(_this3.latestDialoutNumber);
            return;
          }
          _this3._deps.evCall.dialout(_this3.toNumber);
        },
        goToManualDialSettings: function goToManualDialSettings() {
          _this3._deps.routerInteraction.push('/manualDialSettings');
        },
        hangup: function hangup() {
          _this3._deps.evCall.outdialCancel();
          if (!_this3._deps.evSettings.isManualOffhook) {
            _this3._deps.evClient.offhookTerm();
          }
        }
      };
    }
  }]);
}(_core.RcUIModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "toNumber", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "latestDialoutNumber", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "reset", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "reset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setToNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLatestDialoutNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLatestDialoutNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialButtonDisabled", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "dialButtonDisabled"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvDialerUI.js.map
