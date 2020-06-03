"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCallHistory = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _directTransferNotificationTypes = require("../../enums/directTransferNotificationTypes");

var _callUniqueIdentifies = require("../../lib/callUniqueIdentifies");

var _contactMatchIdentify = require("../../lib/contactMatchIdentify");

var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");

var _dec, _class, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var EvCallHistory = (_dec = (0, _di.Module)({
  name: 'EvCallHistory',
  deps: ['EvCallMonitor', 'EvSubscription', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ActivityMatcher',
    optional: true
  }]
}), _dec(_class = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvCallHistory, _RcModuleV);

  var _super = _createSuper(EvCallHistory);

  function EvCallHistory(_ref) {
    var _this;

    var evCallMonitor = _ref.evCallMonitor,
        evSubscription = _ref.evSubscription,
        contactMatcher = _ref.contactMatcher,
        activityMatcher = _ref.activityMatcher;

    _classCallCheck(this, EvCallHistory);

    _this = _super.call(this, {
      modules: {
        evCallMonitor: evCallMonitor,
        evSubscription: evSubscription,
        contactMatcher: contactMatcher,
        activityMatcher: activityMatcher
      }
    });
    _this.getCalls = (0, _core.createSelector)(function () {
      return _this.rawCalls;
    }, function () {
      return _this.contactMatches;
    }, function () {
      return _this.activityMatches;
    }, function (calls, contactMatches, activityMatches) {
      return calls.map(function (call) {
        var contactMatchIdentify = (0, _contactMatchIdentify.contactMatchIdentifyEncode)({
          phoneNumber: call.ani,
          callType: call.callType.toLowerCase()
        });

        var id = _this._modules.evCallMonitor.getCallId(call.session);

        return _objectSpread(_objectSpread({}, call), {}, {
          // TODO confirm about using `toMatches` & `fromMatches`?
          contactMatches: contactMatches[contactMatchIdentify] || [],
          activityMatches: activityMatches[id] || []
        });
      });
    });
    _this.getLastEndedCall = (0, _core.createSelector)(function () {
      return _this.getCalls();
    }, function (calls) {
      return calls.length > 0 ? calls[0] : null;
    });
    _this.getUniqueIdentifies = (0, _core.createSelector)(function () {
      return _this.rawCalls;
    }, function (calls) {
      return (0, _callUniqueIdentifies.makeCallsUniqueIdentifies)(calls);
    });

    if (_this._modules.contactMatcher) {
      _this._modules.contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.getUniqueIdentifies();
        },
        readyCheckFn: function readyCheckFn() {
          return _this._modules.evCallMonitor.ready;
        }
      });
    }

    if (_this._modules.activityMatcher) {
      _this._modules.activityMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.callLogsIds;
        },
        readyCheckFn: function readyCheckFn() {
          return _this._modules.evCallMonitor.ready;
        }
      });
    }

    return _this;
  }

  _createClass(EvCallHistory, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      this._modules.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.DIRECT_AGENT_TRANSFER_NOTIF, function (data) {
        if (data.status === _directTransferNotificationTypes.directTransferNotificationTypes.VOICEMAIL) {// TODO add `data` for list and alert message about 'Direct Transfer: data.ani, Click to view call detail.'
        }
      });
    }
  }, {
    key: "contactMatches",
    get: function get() {
      return this._modules.contactMatcher.dataMapping || {};
    }
  }, {
    key: "activityMatches",
    get: function get() {
      return this._modules.activityMatcher.dataMapping || {};
    }
  }, {
    key: "rawCalls",
    get: function get() {
      return this._modules.evCallMonitor.callLogs;
    }
  }, {
    key: "callLogsIds",
    get: function get() {
      return this._modules.evCallMonitor.callLogsIds;
    }
  }, {
    key: "callsMapping",
    get: function get() {
      return this._modules.evCallMonitor.getCallsMapping();
    }
  }]);

  return EvCallHistory;
}(_core.RcModuleV2), _temp)) || _class);
exports.EvCallHistory = EvCallHistory;
//# sourceMappingURL=EvCallHistory.js.map
