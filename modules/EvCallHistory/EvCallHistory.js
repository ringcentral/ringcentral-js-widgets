"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCallHistory = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _callDirections = require("@ringcentral-integration/commons/enums/callDirections");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _directTransferNotificationTypes = require("../../enums/directTransferNotificationTypes");
var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");
var _FormatPhoneNumber = require("../../lib/FormatPhoneNumber");
var _callUniqueIdentifies = require("../../lib/callUniqueIdentifies");
var _contactMatchIdentify = require("../../lib/contactMatchIdentify");
var _dec, _dec2, _dec3, _dec4, _class, _class2;
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
var EvCallHistory = exports.EvCallHistory = (_dec = (0, _di.Module)({
  name: 'EvCallHistory',
  deps: ['EvCallMonitor', 'EvSubscription', 'Locale', 'EvAgentSession', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ActivityMatcher',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.rawCalls, that.contactMatches, that.activityMatches];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.formattedCalls];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.rawCalls];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function EvCallHistory(deps) {
    var _this$_deps$contactMa, _this$_deps$activityM;
    var _this;
    _classCallCheck(this, EvCallHistory);
    _this = _callSuper(this, EvCallHistory, [{
      deps: deps
    }]);
    (_this$_deps$contactMa = _this._deps.contactMatcher) === null || _this$_deps$contactMa === void 0 ? void 0 : _this$_deps$contactMa.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.uniqueIdentifies;
      },
      readyCheckFn: function readyCheckFn() {
        return _this._deps.evCallMonitor.ready;
      }
    });
    (_this$_deps$activityM = _this._deps.activityMatcher) === null || _this$_deps$activityM === void 0 ? void 0 : _this$_deps$activityM.addQuerySource({
      getQueriesFn: function getQueriesFn() {
        return _this.callLogsIds;
      },
      readyCheckFn: function readyCheckFn() {
        return _this._deps.evCallMonitor.ready;
      }
    });
    return _this;
  }
  _inherits(EvCallHistory, _RcModuleV);
  return _createClass(EvCallHistory, [{
    key: "contactMatches",
    get: function get() {
      // TODO: create EvContactMatcher with specific entity type instead of ContactMatcher in Phone DI
      return this._deps.contactMatcher.dataMapping || {};
    }
  }, {
    key: "activityMatches",
    get: function get() {
      return this._deps.activityMatcher.dataMapping || {};
    }
  }, {
    key: "rawCalls",
    get: function get() {
      return this._deps.evCallMonitor.callLogs;
    }
  }, {
    key: "callLogsIds",
    get: function get() {
      return this._deps.evCallMonitor.callLogsIds;
    }
  }, {
    key: "callsMapping",
    get: function get() {
      return this._deps.evCallMonitor.callsMapping;
    }
  }, {
    key: "formattedCalls",
    get: function get() {
      var _this2 = this;
      return this.rawCalls.slice(0, 250).map(function (call) {
        var contactMatchIdentify = (0, _contactMatchIdentify.contactMatchIdentifyEncode)({
          phoneNumber: call.ani,
          callType: call.callType
        });
        var id = _this2._deps.evCallMonitor.getCallId(call.session);
        var direction = call.callType.toLowerCase() === 'outbound' ? _callDirections.callDirection.outbound : _callDirections.callDirection.inbound;
        var contactMatches = _this2.contactMatches[contactMatchIdentify] || [];
        var activityMatches = _this2.activityMatches[id] || [];
        var agent = {
          name: call.agentId,
          phoneNumber: _this2._formatPhoneNumber(call.agentId)
        };
        var contact = {
          name: _this2._formatPhoneNumber(call.ani),
          phoneNumber: _this2._formatPhoneNumber(call.ani)
        };
        var from = direction === _callDirections.callDirection.outbound ? agent : contact;
        var to = direction === _callDirections.callDirection.outbound ? contact : agent;
        return {
          id: id,
          direction: direction,
          agent: agent,
          contact: contact,
          from: from,
          to: to,
          fromName: from.name,
          toName: to.name,
          fromMatches: contactMatches,
          toMatches: contactMatches,
          activityMatches: activityMatches,
          startTime: call.timestamp,
          isDisposed: false
        };
      });
    }
  }, {
    key: "_formatPhoneNumber",
    value: function _formatPhoneNumber(phoneNumber) {
      // TODO: support countryCode
      return (0, _FormatPhoneNumber.formatPhoneNumber)({
        phoneNumber: phoneNumber,
        countryCode: 'US',
        currentLocale: this._deps.locale.currentLocale
      });
    }
  }, {
    key: "lastEndedCall",
    get: function get() {
      return this.formattedCalls.length > 0 ? this.formattedCalls[0] : null;
    }
  }, {
    key: "uniqueIdentifies",
    get: function get() {
      return (0, _callUniqueIdentifies.makeCallsUniqueIdentifies)(this.rawCalls);
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this3 = this;
      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.DIRECT_AGENT_TRANSFER_NOTIF, function (data) {
        if (data.status === _directTransferNotificationTypes.directTransferNotificationTypes.VOICEMAIL) {
          // TODO: add `data` for list and alert message about 'Direct Transfer: data.ani, Click to view call detail.'
        }
      });
      (0, _core.watch)(this, function () {
        return _this3._deps.evAgentSession.configSuccess;
      }, function (configSuccess) {
        if (configSuccess && !_this3._deps.evCallMonitor.callsLimited && !_this3._deps.evCallMonitor.calls.length) {
          _this3._deps.evCallMonitor.limitCalls();
        }
      });
    }
  }]);
}(_core.RcModuleV2), _applyDecoratedDescriptor(_class2.prototype, "formattedCalls", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "formattedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lastEndedCall", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "lastEndedCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueIdentifies", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueIdentifies"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvCallHistory.js.map
