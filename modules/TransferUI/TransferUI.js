"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferUI = void 0;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.regexp.replace");

var _di = require("@ringcentral-integration/commons/lib/di");

var _formatNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/formatNumber"));

var _core = require("@ringcentral-integration/core");

var _dec, _dec2, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var TransferUI = (_dec = (0, _di.Module)({
  name: 'TransferUI',
  deps: ['Locale', 'RegionSettings', 'RouterInteraction', {
    dep: 'ContactSearch',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'ActiveCallControl',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  var _that$_deps$activeCal, _that$_deps$webphone;

  return [that._params.sessionId, that._params.type, (_that$_deps$activeCal = that._deps.activeCallControl) === null || _that$_deps$activeCal === void 0 ? void 0 : _that$_deps$activeCal.activeSession, (_that$_deps$webphone = that._deps.webphone) === null || _that$_deps$webphone === void 0 ? void 0 : _that$_deps$webphone.sessions];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(TransferUI, _RcUIModuleV);

  var _super = _createSuper(TransferUI);

  function TransferUI(deps) {
    var _this;

    _classCallCheck(this, TransferUI);

    _this = _super.call(this, {
      deps: deps
    });
    _this._params = {};
    return _this;
  }

  _createClass(TransferUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_deps$contactSe, _this$_deps$activeCal;

      var _ref$params = _ref.params,
          params = _ref$params === void 0 ? {} : _ref$params,
          _ref$enableWarmTransf = _ref.enableWarmTransfer,
          enableWarmTransfer = _ref$enableWarmTransf === void 0 ? false : _ref$enableWarmTransf;
      this._params = params;
      var sessionId = params.sessionId,
          type = params.type;
      return {
        sessionId: sessionId,
        currentLocale: this._deps.locale.currentLocale,
        searchContactList: (_this$_deps$contactSe = this._deps.contactSearch) === null || _this$_deps$contactSe === void 0 ? void 0 : _this$_deps$contactSe.sortedResult,
        session: this.session,
        controlBusy: ((_this$_deps$activeCal = this._deps.activeCallControl) === null || _this$_deps$activeCal === void 0 ? void 0 : _this$_deps$activeCal.busy) || false,
        enableWarmTransfer: enableWarmTransfer && type === 'webphone' && !!this._deps.webphone
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this2 = this;

      var _ref2$params$type = _ref2.params.type,
          type = _ref2$params$type === void 0 ? 'active' : _ref2$params$type;
      return {
        setActiveSessionId: function setActiveSessionId(sessionId) {
          if (type === 'active') {
            var _this2$_deps$activeCa;

            (_this2$_deps$activeCa = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa === void 0 ? void 0 : _this2$_deps$activeCa.setActiveSessionId(sessionId);
          }
        },
        onTransfer: function onTransfer(transferNumber, sessionId) {
          if (type === 'active') {
            var _this2$_deps$activeCa2;

            (_this2$_deps$activeCa2 = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa2 === void 0 ? void 0 : _this2$_deps$activeCa2.transfer(transferNumber, sessionId);
            return;
          }

          if (type === 'webphone') {
            var _this2$_deps$webphone;

            (_this2$_deps$webphone = _this2._deps.webphone) === null || _this2$_deps$webphone === void 0 ? void 0 : _this2$_deps$webphone.transfer(transferNumber, sessionId);
          }
        },
        onWarmTransfer: function onWarmTransfer(transferNumber, sessionId) {
          var _this2$_deps$webphone2;

          (_this2$_deps$webphone2 = _this2._deps.webphone) === null || _this2$_deps$webphone2 === void 0 ? void 0 : _this2$_deps$webphone2.startWarmTransfer(transferNumber, sessionId);
        },
        onBack: function onBack() {
          _this2._deps.routerInteraction.goBack();
        },
        onCallEnd: function onCallEnd() {
          _this2._deps.routerInteraction.replace(type === 'active' ? '/calls' : '/dialer');
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber["default"])({
            phoneNumber: phoneNumber,
            areaCode: _this2._deps.regionSettings.areaCode,
            countryCode: _this2._deps.regionSettings.countryCode
          });
        },
        searchContact: function searchContact(searchString) {
          var _this2$_deps$contactS;

          (_this2$_deps$contactS = _this2._deps.contactSearch) === null || _this2$_deps$contactS === void 0 ? void 0 : _this2$_deps$contactS.debouncedSearch({
            searchString: searchString
          });
        }
      };
    }
  }, {
    key: "session",
    get: function get() {
      var _this$_params = this._params,
          sessionId = _this$_params.sessionId,
          type = _this$_params.type;

      if (type === 'active' && this._deps.activeCallControl) {
        return this._deps.activeCallControl.activeSession;
      }

      if (type === 'webphone' && this._deps.webphone) {
        return this._deps.webphone.sessions.find(function (session) {
          return session.id === sessionId;
        });
      }

      return null;
    }
  }]);

  return TransferUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "session", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "session"), _class2.prototype)), _class2)) || _class);
exports.TransferUI = TransferUI;
//# sourceMappingURL=TransferUI.js.map
