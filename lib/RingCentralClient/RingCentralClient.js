"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingCentralClient = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _ringcentralClient = require("ringcentral-client");

var _Account = _interopRequireDefault(require("ringcentral-client/build/paths/Account"));

var _ClientInfo = _interopRequireDefault(require("ringcentral-client/build/paths/ClientInfo"));

var _Dictionary = _interopRequireDefault(require("ringcentral-client/build/paths/Dictionary"));

var _Glip = _interopRequireDefault(require("ringcentral-client/build/paths/Glip"));

var _NumberParser = _interopRequireDefault(require("ringcentral-client/build/paths/NumberParser"));

var _Subscription = _interopRequireDefault(require("ringcentral-client/build/paths/Subscription"));

var _PathSegment2 = _interopRequireDefault(require("ringcentral-client/build/PathSegment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// TODO: make 'ringcentral-client' support JS SDK v4 or replace it
var RestPrefix = /*#__PURE__*/function (_PathSegment) {
  _inherits(RestPrefix, _PathSegment);

  var _super = _createSuper(RestPrefix);

  function RestPrefix(service) {
    _classCallCheck(this, RestPrefix);

    return _super.call(this, 'restapi/v1.0', null, null, service);
  }

  return RestPrefix;
}(_PathSegment2["default"]);

var RingCentralClient = /*#__PURE__*/function (_Client) {
  _inherits(RingCentralClient, _Client);

  var _super2 = _createSuper(RingCentralClient);

  function RingCentralClient() {
    _classCallCheck(this, RingCentralClient);

    return _super2.apply(this, arguments);
  }

  _createClass(RingCentralClient, [{
    key: "restPrefix",
    value: function restPrefix() {
      return new RestPrefix(this.service.platform());
    }
  }, {
    key: "account",
    value: function account(id) {
      return new _Account["default"](this.restPrefix(), id, this.service.platform());
    }
  }, {
    key: "clientInfo",
    value: function clientInfo(id) {
      return new _ClientInfo["default"](this.restPrefix(), id, this.service.platform());
    }
  }, {
    key: "dictionary",
    value: function dictionary(id) {
      return new _Dictionary["default"](this.restPrefix(), id, this.service.platform());
    }
  }, {
    key: "numberParser",
    value: function numberParser(id) {
      return new _NumberParser["default"](this.restPrefix(), id, this.service.platform());
    }
  }, {
    key: "subscription",
    value: function subscription(id) {
      return new _Subscription["default"](this.restPrefix(), id, this.service.platform());
    }
  }, {
    key: "glip",
    value: function glip(id) {
      return new _Glip["default"](this.restPrefix(), id, this.service.platform());
    }
  }]);

  return RingCentralClient;
}(_ringcentralClient.Client);

exports.RingCentralClient = RingCentralClient;
//# sourceMappingURL=RingCentralClient.js.map
