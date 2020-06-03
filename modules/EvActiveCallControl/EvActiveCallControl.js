"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvActiveCallControl = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

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

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _enums = require("../../enums");

var _dec, _class;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
  deps: ['EvClient', 'EvSettings', 'Presence', 'EvIntegratedSoftphone', {
    dep: 'EvActiveCallControlOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvActiveCallControl, _RcModuleV);

  var _super = _createSuper(EvActiveCallControl);

  _createClass(EvActiveCallControl, [{
    key: "isIntegratedSoftphone",
    get: function get() {
      return this._modules.evSettings.loginType === _enums.loginTypes.integratedSoftphone;
    }
  }]);

  function EvActiveCallControl(_ref) {
    var evClient = _ref.evClient,
        presence = _ref.presence,
        evSettings = _ref.evSettings,
        evIntegratedSoftphone = _ref.evIntegratedSoftphone,
        options = _objectWithoutProperties(_ref, ["evClient", "presence", "evSettings", "evIntegratedSoftphone"]);

    _classCallCheck(this, EvActiveCallControl);

    return _super.call(this, _objectSpread({
      modules: {
        evClient: evClient,
        evSettings: evSettings,
        presence: presence,
        evIntegratedSoftphone: evIntegratedSoftphone
      }
    }, options));
  }

  _createClass(EvActiveCallControl, [{
    key: "mute",
    value: function mute() {
      console.log('mute');

      if (this.isIntegratedSoftphone) {
        this._modules.evIntegratedSoftphone.sipToggleMute(true);
      }
    }
  }, {
    key: "unmute",
    value: function unmute() {
      console.log('unmute');

      if (this.isIntegratedSoftphone) {
        this._modules.evIntegratedSoftphone.sipToggleMute(false);
      }
    }
  }, {
    key: "hangUp",
    value: function hangUp(sessionId) {
      this._modules.evClient.hangup({
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
      this.changeOnHoldState(true);
    }
  }, {
    key: "unhold",
    value: function unhold() {
      this.changeOnHoldState(false);
    }
  }, {
    key: "hangupSession",
    value: function hangupSession(_ref2) {
      var sessionId = _ref2.sessionId;

      this._modules.evClient.hangup({
        sessionId: sessionId
      });
    }
  }, {
    key: "holdSession",
    value: function holdSession(_ref3) {
      var sessionId = _ref3.sessionId,
          state = _ref3.state;

      this._modules.evClient.holdSession({
        state: state,
        sessionId: sessionId
      });
    }
  }, {
    key: "getMainCall",
    value: function getMainCall(uii) {
      var id = this._modules.evClient.getMainId(uii);

      return this._modules.presence.callsMapping[id];
    }
  }, {
    key: "changeOnHoldState",
    value: function changeOnHoldState(state) {
      this._modules.evClient.hold(state);
    }
  }]);

  return EvActiveCallControl;
}(_core.RcModuleV2)) || _class);
exports.EvActiveCallControl = EvActiveCallControl;
//# sourceMappingURL=EvActiveCallControl.js.map
