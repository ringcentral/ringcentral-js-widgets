"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvActiveCallListUI = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _dec, _class, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var EvActiveCallListUI = (_dec = (0, _di.Module)({
  name: 'EvActiveCallListUI',
  deps: ['Locale', 'RouterInteraction', 'EvCall', 'ActiveCallControl', 'EvCallMonitor', {
    dep: 'EvActiveCallListUIOptions',
    optional: true
  }]
}), _dec(_class = (_temp = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(EvActiveCallListUI, _RcUIModuleV);

  var _super = _createSuper(EvActiveCallListUI);

  _createClass(EvActiveCallListUI, [{
    key: "callId",
    get: function get() {
      return this._modules.evCall.activityCallId;
    }
  }]);

  function EvActiveCallListUI(_ref) {
    var _this;

    var locale = _ref.locale,
        routerInteraction = _ref.routerInteraction,
        evCall = _ref.evCall,
        activeCallControl = _ref.activeCallControl,
        evCallMonitor = _ref.evCallMonitor;

    _classCallCheck(this, EvActiveCallListUI);

    _this = _super.call(this, {
      modules: {
        locale: locale,
        routerInteraction: routerInteraction,
        evCall: evCall,
        activeCallControl: activeCallControl,
        evCallMonitor: evCallMonitor
      }
    });
    _this.getCallList = (0, _core.createSelector)(function () {
      return _this.callId;
    }, function () {
      return _this._modules.evCallMonitor.callIds;
    }, function () {
      return _this._modules.evCallMonitor.otherCallIds;
    }, function () {
      return _this._modules.evCallMonitor.getCallsMapping();
    }, function (callId, callIds, otherCallIds, callsMapping) {
      return _this._modules.evCallMonitor.getActiveCallList(callIds, otherCallIds, callsMapping, callId);
    });
    return _this;
  }

  _createClass(EvActiveCallListUI, [{
    key: "onHangup",
    value: function onHangup(call) {
      this._modules.activeCallControl.hangupSession({
        sessionId: call.session.sessionId
      });
    }
  }, {
    key: "onHold",
    value: function onHold(call) {
      this._modules.activeCallControl.holdSession({
        sessionId: call.session.sessionId,
        state: true
      });
    }
  }, {
    key: "onUnHold",
    value: function onUnHold(call) {
      this._modules.activeCallControl.holdSession({
        sessionId: call.session.sessionId,
        state: false
      });
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var id = _ref2.id;
      this._modules.evCall.activityCallId = id;
      return {
        currentLocale: this._modules.locale.currentLocale,
        callList: this.getCallList()
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;

      return {
        goBack: function goBack() {
          _this2._modules.routerInteraction.goBack();
        },
        onHangup: function onHangup(call) {
          return _this2.onHangup(call);
        },
        onHold: function onHold(call) {
          return _this2.onHold(call);
        },
        onUnHold: function onUnHold(call) {
          return _this2.onUnHold(call);
        }
      };
    }
  }]);

  return EvActiveCallListUI;
}(_core.RcUIModuleV2), _temp)) || _class);
exports.EvActiveCallListUI = EvActiveCallListUI;
//# sourceMappingURL=EvActiveCallListUI.js.map
