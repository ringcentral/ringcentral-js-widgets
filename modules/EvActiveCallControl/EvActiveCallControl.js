"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvActiveCallControl = void 0;

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

var _enums = require("../../enums");

var _dec, _class;

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

var EvActiveCallControl = (_dec = (0, _di.Module)({
  name: 'EvActiveCallControl',
  deps: ['EvClient', 'EvSettings', 'Presence', 'EvIntegratedSoftphone', 'EvAgentSession', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvActiveCallControlOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvActiveCallControl, _RcModuleV);

  var _super = _createSuper(EvActiveCallControl);

  _createClass(EvActiveCallControl, [{
    key: "tabManagerEnabled",
    get: function get() {
      var _this$_deps$tabManage;

      return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.enable;
    }
  }]);

  function EvActiveCallControl(deps) {
    _classCallCheck(this, EvActiveCallControl);

    return _super.call(this, {
      deps: deps
    });
  }

  _createClass(EvActiveCallControl, [{
    key: "mute",
    value: function mute() {
      this._sipToggleMute(true);
    }
  }, {
    key: "unmute",
    value: function unmute() {
      this._sipToggleMute(false);
    }
  }, {
    key: "hangUp",
    value: function hangUp(sessionId) {
      this._deps.evClient.hangup({
        sessionId: sessionId
      });
    }
  }, {
    key: "reject",
    value: function reject() {
      console.log('reject');
    }
  }, {
    key: "hold",
    value: function hold() {
      this._changeOnHoldState(true);
    }
  }, {
    key: "unhold",
    value: function unhold() {
      this._changeOnHoldState(false);
    }
  }, {
    key: "hangupSession",
    value: function hangupSession(_ref) {
      var sessionId = _ref.sessionId;

      this._deps.evClient.hangup({
        sessionId: sessionId
      });
    }
  }, {
    key: "holdSession",
    value: function holdSession(_ref2) {
      var sessionId = _ref2.sessionId,
          state = _ref2.state;

      this._deps.evClient.holdSession({
        state: state,
        sessionId: sessionId
      });
    }
  }, {
    key: "getMainCall",
    value: function getMainCall(uii) {
      var id = this._deps.evClient.getMainId(uii);

      return this._deps.presence.callsMapping[id];
    }
  }, {
    key: "_changeOnHoldState",
    value: function _changeOnHoldState(state) {
      this._deps.evClient.hold(state);
    }
  }, {
    key: "_sipToggleMute",
    value: function _sipToggleMute(state) {
      if (this._deps.evAgentSession.isIntegratedSoftphone) {
        if (this.tabManagerEnabled) {
          this._deps.tabManager.send(_enums.tabManagerEvents.MUTE, state);
        }

        this._deps.evIntegratedSoftphone.sipToggleMute(state);
      }
    }
  }]);

  return EvActiveCallControl;
}(_core.RcModuleV2)) || _class);
exports.EvActiveCallControl = EvActiveCallControl;
//# sourceMappingURL=EvActiveCallControl.js.map
