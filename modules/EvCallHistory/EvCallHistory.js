"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCallHistory = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.map");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _callDirections = require("ringcentral-integration/enums/callDirections");

var _directTransferNotificationTypes = require("../../enums/directTransferNotificationTypes");

var _callUniqueIdentifies = require("../../lib/callUniqueIdentifies");

var _contactMatchIdentify = require("../../lib/contactMatchIdentify");

var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");

var _FormatPhoneNumber = require("../../lib/FormatPhoneNumber");

var _dec, _dec2, _dec3, _dec4, _class, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var EvCallHistory = (_dec = (0, _di.Module)({
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
  _inherits(EvCallHistory, _RcModuleV);

  var _super = _createSuper(EvCallHistory);

  function EvCallHistory(deps) {
    var _this$_deps$contactMa, _this$_deps$activityM;

    var _this;

    _classCallCheck(this, EvCallHistory);

    _this = _super.call(this, {
      deps: deps
    });
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

  _createClass(EvCallHistory, [{
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
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.DIRECT_AGENT_TRANSFER_NOTIF, function (data) {
        if (data.status === _directTransferNotificationTypes.directTransferNotificationTypes.VOICEMAIL) {// TODO add `data` for list and alert message about 'Direct Transfer: data.ani, Click to view call detail.'
        }
      });

      (0, _core.watch)(this, function () {
        return _this2._deps.evAgentSession.configSuccess;
      }, function (configSuccess) {
        if (configSuccess && !_this2._deps.evCallMonitor.callsLimited && !_this2._deps.evCallMonitor.calls.length) {
          _this2._deps.evCallMonitor.limitCalls();
        }
      });
    }
  }, {
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
      var _this3 = this;

      return this.rawCalls.slice(0, 250).map(function (call) {
        var contactMatchIdentify = (0, _contactMatchIdentify.contactMatchIdentifyEncode)({
          phoneNumber: call.ani,
          callType: call.callType
        });

        var id = _this3._deps.evCallMonitor.getCallId(call.session);

        var direction = call.callType.toLowerCase() === 'outbound' ? _callDirections.callDirection.outbound : _callDirections.callDirection.inbound;
        var contactMatches = _this3.contactMatches[contactMatchIdentify] || [];
        var activityMatches = _this3.activityMatches[id] || [];
        var agent = {
          name: call.agentId,
          phoneNumber: _this3._formatPhoneNumber(call.agentId)
        };
        var contact = {
          name: _this3._formatPhoneNumber(call.ani),
          phoneNumber: _this3._formatPhoneNumber(call.ani)
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
    key: "lastEndedCall",
    get: function get() {
      return this.formattedCalls.length > 0 ? this.formattedCalls[0] : null;
    }
  }, {
    key: "uniqueIdentifies",
    get: function get() {
      return (0, _callUniqueIdentifies.makeCallsUniqueIdentifies)(this.rawCalls);
    }
  }]);

  return EvCallHistory;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "formattedCalls", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "formattedCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lastEndedCall", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "lastEndedCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueIdentifies", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueIdentifies"), _class2.prototype)), _class2)) || _class);
exports.EvCallHistory = EvCallHistory;
//# sourceMappingURL=EvCallHistory.js.map
