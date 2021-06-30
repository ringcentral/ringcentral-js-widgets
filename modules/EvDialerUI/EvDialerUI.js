"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

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
exports.EvDialerUI = void 0;

var _core = require("@ringcentral-integration/core");

var _di = require("@ringcentral-integration/commons/lib/di");

var _EvActivityCallUI = require("../../interfaces/EvActivityCallUI.interface");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var EvDialerUI = (_dec = (0, _di.Module)({
  name: 'EvDialerUI',
  deps: ['EvCall', 'Locale', 'Storage', 'EvAuth', 'RouterInteraction', 'EvSettings', 'EvClient', 'EvCallMonitor', 'EvWorkingState', 'EvAgentSession', 'EvIntegratedSoftphone', 'Environment', 'EvActivityCallUI', {
    dep: 'EvDialerUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.evIntegratedSoftphone.connectingAlertId];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(EvDialerUI, _RcUIModuleV);

  var _super = _createSuper(EvDialerUI);

  function EvDialerUI(deps) {
    var _this;

    _classCallCheck(this, EvDialerUI);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvDialerUI'
    });

    _initializerDefineProperty(_this, "toNumber", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "latestDialoutNumber", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(EvDialerUI, [{
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
  }, {
    key: "dialButtonDisabled",
    get: function get() {
      return !!this._deps.evIntegratedSoftphone.connectingAlertId;
    }
  }]);

  return EvDialerUI;
}(_core.RcUIModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "toNumber", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "reset", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "reset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setToNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLatestDialoutNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLatestDialoutNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialButtonDisabled", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "dialButtonDisabled"), _class2.prototype)), _class2)) || _class);
exports.EvDialerUI = EvDialerUI;
//# sourceMappingURL=EvDialerUI.js.map
