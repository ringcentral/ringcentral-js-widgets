"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvStorage = void 0;

var _di = require("ringcentral-integration/lib/di");

var _StorageV = require("ringcentral-integration/modules/StorageV2");

var _loginStatus = _interopRequireDefault(require("ringcentral-integration/modules/Auth/loginStatus"));

var _loginStatus2 = require("../../enums/loginStatus");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var EvStorage = (_dec = (0, _di.Module)({
  name: 'Storage',
  deps: ['Auth', 'EvAuth', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'StorageOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_Storage) {
  _inherits(EvStorage, _Storage);

  var _super = _createSuper(EvStorage);

  function EvStorage(deps) {
    var _this$_deps$storageOp, _this$_deps$storageOp2;

    var _this;

    _classCallCheck(this, EvStorage);

    _this = _super.call(this, deps);
    _this._disableInactiveTabsWrite = (_this$_deps$storageOp = (_this$_deps$storageOp2 = _this._deps.storageOptions) === null || _this$_deps$storageOp2 === void 0 ? void 0 : _this$_deps$storageOp2.disableInactiveTabsWrite) !== null && _this$_deps$storageOp !== void 0 ? _this$_deps$storageOp : true;
    return _this;
  }

  _createClass(EvStorage, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.auth.loginStatus === _loginStatus["default"].loggedIn && (!this._deps.tabManager || this._deps.tabManager.ready) && this._deps.evAuth.loginStatus === _loginStatus2.loginStatus.LOGIN_SUCCESS && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _get(_getPrototypeOf(EvStorage.prototype), "_shouldReset", this).call(this) || this.ready && this._deps.evAuth.loginStatus === _loginStatus2.loginStatus.NOT_AUTH;
    }
  }, {
    key: "storageKey",
    get: function get() {
      var agentId = this._deps.evAuth.agentId;
      return "".concat(this.prefix ? "".concat(this.prefix, "-") : '', "storage-").concat(this._deps.auth.ownerId).concat(agentId ? "-".concat(agentId) : '');
    }
  }]);

  return EvStorage;
}(_StorageV.Storage)) || _class);
exports.EvStorage = EvStorage;
//# sourceMappingURL=EvStorage.js.map
