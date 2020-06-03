"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvSessionConfig = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.array.map");

var _core = require("@ringcentral-integration/core");

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _di = require("ringcentral-integration/lib/di");

var _enums = require("../../enums");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var ACCEPTABLE_LOGIN_TYPES = [_enums.loginTypes.RC_PHONE, _enums.loginTypes.externalPhone // TODO: Temporarily remove
// loginTypes.integratedSoftphone,
];
var DEFAULT_LOGIN_TYPE = _enums.loginTypes.RC_PHONE;
var NONE = _enums.dropDownOptions.None;
var AGENT_CONFIG_SUCCESS_EVENT = 'AgentConfigSuccess';
var EvSessionConfig = (_dec = (0, _di.Module)({
  name: 'EvSessionConfig',
  deps: ['EvClient', 'Auth', 'EvAuth', 'Storage', 'Alert', 'Auth', 'Locale', 'RegionSettings', 'Modal', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'SessionConfigOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvSessionConfig, _RcModuleV);

  var _super = _createSuper(EvSessionConfig);

  // for multiple tab using
  function EvSessionConfig(_ref) {
    var _this;

    var evClient = _ref.evClient,
        evAuth = _ref.evAuth,
        storage = _ref.storage,
        alert = _ref.alert,
        auth = _ref.auth,
        locale = _ref.locale,
        modal = _ref.modal,
        regionSettings = _ref.regionSettings,
        tabManager = _ref.tabManager,
        _ref$heartBeatInterva = _ref.heartBeatInterval,
        heartBeatInterval = _ref$heartBeatInterva === void 0 ? 1000 : _ref$heartBeatInterva,
        _ref$enableCache = _ref.enableCache,
        enableCache = _ref$enableCache === void 0 ? true : _ref$enableCache;

    _classCallCheck(this, EvSessionConfig);

    _this = _super.call(this, {
      modules: {
        evClient: evClient,
        evAuth: evAuth,
        storage: storage,
        auth: auth,
        alert: alert,
        locale: locale,
        modal: modal,
        regionSettings: regionSettings,
        tabManager: tabManager
      },
      enableCache: enableCache,
      storageKey: 'EvSessionConfig'
    });
    _this.onConfigSuccess = [];
    _this.onTriggerConfig = [];
    _this._lastConfigSuccess = false;
    _this._configSuccessKey = void 0;
    _this._configuringKey = void 0;
    _this._heartBeatIntervalTime = void 0;
    _this._heartBeatIntervalId = {
      success: null,
      configuring: null
    };
    _this._configureAgentPromise = void 0;

    _initializerDefineProperty(_this, "selectedSkillProfileId", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "selectedInboundQueueIds", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "loginType", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "extensionNumber", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "takingCall", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "autoAnswer", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "configured", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "configSuccess", _descriptor8, _assertThisInitialized(_this));

    _this.getLoginTypeList = (0, _core.createSelector)(function () {
      return _this._modules.locale.currentLocale;
    }, function (currentLocale) {
      return ACCEPTABLE_LOGIN_TYPES.map(function (type) {
        return {
          id: type,
          label: _i18n["default"].getString(type, currentLocale)
        };
      });
    });
    _this.getInboundQueues = (0, _core.createSelector)(function () {
      return _this._modules.evAuth.agent.agentConfig;
    }, function (agentConfig) {
      if (!agentConfig || !agentConfig.inboundSettings) {
        return [];
      }

      var _agentConfig$inboundS = agentConfig.inboundSettings.availableQueues,
          availableQueues = _agentConfig$inboundS === void 0 ? [] : _agentConfig$inboundS;
      var isFreshLogin = _this._modules.auth.isFreshLogin;
      return availableQueues.map(function (queue) {
        return {
          gateId: queue.gateId,
          gateName: queue.gateName,
          checked: isFreshLogin
        };
      });
    });
    _this.getDefaultSkillProfile = (0, _core.createSelector)(function () {
      return _this.getSkillProfileList();
    }, function (skillProfileList) {
      var defaultSkill = _this.pickSkillProfile(skillProfileList);

      return defaultSkill ? defaultSkill.profileId : NONE;
    });
    _this.getSkillProfileList = (0, _core.createSelector)(function () {
      return _this._modules.evAuth.agent.agentConfig;
    }, function (agentConfig) {
      if (!agentConfig || !agentConfig.inboundSettings) {
        return [];
      }

      var _agentConfig$inboundS2 = agentConfig.inboundSettings.availableSkillProfiles,
          availableSkillProfiles = _agentConfig$inboundS2 === void 0 ? [] : _agentConfig$inboundS2;

      var defaultSkill = _this.pickSkillProfile(availableSkillProfiles);

      if (!defaultSkill && availableSkillProfiles.length > 0) {
        availableSkillProfiles.unshift({
          profileId: NONE,
          profileName: _i18n["default"].getString(NONE, _this._modules.locale.currentLocale)
        });
      }

      return availableSkillProfiles;
    });

    _this._modules.auth.addBeforeLogoutHandler(function () {
      _this.resetAllConfig();
    });

    if (_this.tabManagerEnabled) {
      _this._configSuccessKey = "".concat(_this._modules.tabManager._tabbie._prefix, "configSuccess");
      _this._configuringKey = "".concat(_this._modules.tabManager._tabbie._prefix, "configuring");
      _this._heartBeatIntervalTime = heartBeatInterval;
    }

    return _this;
  }

  _createClass(EvSessionConfig, [{
    key: "resetAllConfig",
    value: function resetAllConfig() {
      this.state.selectedInboundQueueIds = [];
      this.state.selectedSkillProfileId = NONE;
      this.state.loginType = DEFAULT_LOGIN_TYPE;
      this.state.extensionNumber = '';
      this.state.takingCall = true;
      this.state.autoAnswer = false;
      this.state.configSuccess = false;
      this.state.configured = false;
      this._lastConfigSuccess = false;
    }
  }, {
    key: "setConfigSuccess",
    value: function setConfigSuccess(status) {
      this.state.configSuccess = status;
      this.state.configured = status;
    }
  }, {
    key: "setLoginType",
    value: function setLoginType(type) {
      this.state.loginType = type;
    }
  }, {
    key: "setSkillProfileId",
    value: function setSkillProfileId(skillProfileId) {
      this.state.selectedSkillProfileId = skillProfileId;
    }
  }, {
    key: "setInboundQueueIds",
    value: function setInboundQueueIds(ids) {
      this.state.selectedInboundQueueIds = ids;
    }
  }, {
    key: "setExtensionNumber",
    value: function setExtensionNumber(extensionNumber) {
      this.state.extensionNumber = extensionNumber;
    }
  }, {
    key: "setTakingCall",
    value: function setTakingCall(takingCall) {
      this.state.takingCall = takingCall;
    }
  }, {
    key: "setAutoAnswer",
    value: function setAutoAnswer(autoAnswer) {
      this.state.autoAnswer = autoAnswer;
    }
  }, {
    key: "setConfig",
    value: function setConfig(skillProfileId, selectedInboundQueueIds) {
      this.state.loginType = DEFAULT_LOGIN_TYPE;
      this.state.extensionNumber = '';
      this.state.takingCall = true;
      this.state.autoAnswer = false;
      this.state.configSuccess = false;
      this.state.configured = false;
      this._lastConfigSuccess = false;
      this.state.selectedSkillProfileId = skillProfileId;
      this.state.selectedInboundQueueIds = selectedInboundQueueIds;
    }
  }, {
    key: "setFreshConfig",
    value: function setFreshConfig() {
      this.setConfig(this.getDefaultSkillProfile(), this.getInboundQueues().map(function (inboundQueue) {
        return inboundQueue.gateId;
      }));
    }
  }, {
    key: "afterLogin",
    value: function afterLogin() {
      var _this2 = this;

      // handle setting
      if (this._modules.auth.isFreshLogin) {
        this.setFreshConfig();
      } else {
        // check current skill is in list of skillList
        var checkSelectIsInList = this.getSkillProfileList().some(function (profile) {
          return profile.profileId === _this2.selectedSkillProfileId;
        });

        if (!checkSelectIsInList) {
          this.setSkillProfileId(this.getDefaultSkillProfile());
        } // check all selected queue is in inboundQueue list


        var checkedInboundQueues = this.selectedInboundQueueIds.reduce(function (result, inboundQueueId) {
          if (_this2.getInboundQueues().some(function (inboundQueue) {
            return inboundQueue.gateId === inboundQueueId;
          })) {
            result.push(inboundQueueId);
          }

          return result;
        }, []);
        this.setInboundQueueIds(checkedInboundQueues);
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return _get(_getPrototypeOf(EvSessionConfig.prototype), "_shouldInit", this).call(this) && this._modules.auth.loggedIn && this._modules.evAuth.connected;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _get(_getPrototypeOf(EvSessionConfig.prototype), "_shouldReset", this).call(this) && !this._modules.auth.loggedIn;
    }
  }, {
    key: "getSessionConfig",
    value: function () {
      var _getSessionConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._modules.evClient.getAgentConfig();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getSessionConfig() {
        return _getSessionConfig.apply(this, arguments);
      }

      return getSessionConfig;
    }()
  }, {
    key: "pickSkillProfile",
    value: function pickSkillProfile(skillProfileList) {
      return skillProfileList.find(function (item) {
        return item.isDefault === '1';
      });
    }
  }, {
    key: "autoConfigureAgent",
    value: function () {
      var _autoConfigureAgent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var isConfiguringByLocal;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                isConfiguringByLocal = this.isConfiguringByLocal;

                if (this.tabManagerEnabled && !isConfiguringByLocal) {
                  this._heartBeatOnConfiguring();
                }

                if (!this.isConfigSuccessByLocal) {
                  _context2.next = 16;
                  break;
                }

                _context2.prev = 3;
                _context2.next = 6;
                return this._modules.evClient.multiLoginRequest();

              case 6:
                this.setConfigSuccess(true);

                if (this.tabManagerEnabled) {
                  this._heartBeatOnConfigSuccess();
                }

                return _context2.abrupt("return");

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](3);
                console.log(_context2.t0);

              case 14:
                _context2.next = 19;
                break;

              case 16:
                if (!(!this.tabManagerEnabled || !isConfiguringByLocal)) {
                  _context2.next = 19;
                  break;
                }

                _context2.next = 19;
                return this.configureAgent();

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 11]]);
      }));

      function autoConfigureAgent() {
        return _autoConfigureAgent.apply(this, arguments);
      }

      return autoConfigureAgent;
    }()
  }, {
    key: "configureAgent",
    value: function () {
      var _configureAgent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var config, result, _result, _result$data, message, status;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                config = this._checkFieldsResult();
                _context3.next = 3;
                return this._connectEvServer(config);

              case 3:
                result = _context3.sent;

                if (!result) {
                  _context3.next = 19;
                  break;
                }

                if (!(result.data.status !== 'SUCCESS')) {
                  _context3.next = 13;
                  break;
                }

                this._modules.evClient.closeSocket();

                this._modules.evClient.onInit();

                _context3.next = 10;
                return this._modules.evAuth.loginAgent();

              case 10:
                _context3.next = 12;
                return this._connectEvServer(config);

              case 12:
                result = _context3.sent;

              case 13:
                _result = result, _result$data = _result.data, message = _result$data.message, status = _result$data.status;

                if (!(status !== 'SUCCESS')) {
                  _context3.next = 17;
                  break;
                }

                if (typeof message === 'string') {
                  this._modules.alert.danger({
                    message: _enums.messageTypes.AGENT_CONFIG_DETAIL_ERROR,
                    ttl: 0,
                    payload: message
                  });
                } else {
                  this._modules.alert.danger({
                    message: _enums.messageTypes.AGENT_CONFIG_ERROR,
                    ttl: 0
                  });
                }

                throw new Error(message);

              case 17:
                this._onTriggerAgentConfig();

                if (this.hasMultipleTabs) {
                  this._modules.tabManager.send(AGENT_CONFIG_SUCCESS_EVENT, true);
                }

              case 19:
                this.setConfigSuccess(true);

                if (this.tabManagerEnabled) {
                  this._heartBeatOnConfigSuccess();
                }

              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function configureAgent() {
        return _configureAgent.apply(this, arguments);
      }

      return configureAgent;
    }()
  }, {
    key: "_heartBeatOnConfigSuccess",
    value: function _heartBeatOnConfigSuccess() {
      var _this3 = this;

      if (typeof this._heartBeatIntervalId.success === 'number') return;
      this._heartBeatIntervalId.success = setInterval(function () {
        _this3.localStorage.setItem(_this3._configSuccessKey, Date.now().toString());
      }, this._heartBeatIntervalTime);
    }
  }, {
    key: "_heartBeatOnConfiguring",
    value: function _heartBeatOnConfiguring() {
      var _this4 = this;

      if (typeof this._heartBeatIntervalId.configuring === 'number') return;
      this.localStorage.setItem(this._configuringKey, Date.now().toString());
      this._heartBeatIntervalId.configuring = setInterval(function () {
        _this4.localStorage.setItem(_this4._configuringKey, Date.now().toString());
      }, this._heartBeatIntervalTime);
    }
  }, {
    key: "_getConfigStatusByLocal",
    value: function _getConfigStatusByLocal(statusKey) {
      return this.localStorage && Date.now() - Number(this.localStorage.getItem(statusKey)) < this._heartBeatIntervalTime * 2 - 100;
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this._lastConfigSuccess = false;
      this.setConfigSuccess(false);
      clearInterval(this._heartBeatIntervalId.success);
      this._heartBeatIntervalId.success = null;
      clearInterval(this._heartBeatIntervalId.configuring);
      this._heartBeatIntervalId.configuring = null;
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this.configSuccess && this._lastConfigSuccess !== this.configSuccess) {
                  this._lastConfigSuccess = this.configSuccess;

                  this._onConfigureAgentSuccess();
                }

                if (!(this.ready && this.tabManagerEnabled && this._modules.tabManager.ready && this._modules.tabManager.event && this._modules.tabManager.event.name === AGENT_CONFIG_SUCCESS_EVENT && this._modules.tabManager.event.args[0])) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 4;
                return this._configureAgentPromise;

              case 4:
                _context4.next = 6;
                return this._modules.evClient.multiLoginRequest();

              case 6:
                this.setConfigSuccess(true);

                this._heartBeatOnConfigSuccess();

                this._closeModal();

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }

      return onStateChange;
    }()
  }, {
    key: "_closeModal",
    value: function _closeModal() {
      var _this5 = this;

      this._modules.modal.modalIds.forEach(function (id) {
        _this5._modules.modal.close(id);
      });
    }
  }, {
    key: "_onConfigureAgentSuccess",
    value: function _onConfigureAgentSuccess() {
      this.onConfigSuccess.forEach(function (hook) {
        try {
          hook();
        } catch (e) {
          console.error(e);
        }
      });
    }
  }, {
    key: "_onTriggerAgentConfig",
    value: function _onTriggerAgentConfig() {
      this.onTriggerConfig.forEach(function (hook) {
        try {
          hook();
        } catch (e) {
          console.error(e);
        }
      });
    }
  }, {
    key: "_connectEvServer",
    value: function () {
      var _connectEvServer2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(config) {
        var _this6 = this;

        var result, currentLocale, modalId;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this._configureAgentPromise = this._modules.evClient.configureAgent(config);
                _context6.next = 3;
                return this._configureAgentPromise;

              case 3:
                result = _context6.sent;

                if (!(result.data.status === _enums.messageTypes.EXISTING_LOGIN_FOUND)) {
                  _context6.next = 13;
                  break;
                }

                currentLocale = this._modules.locale.currentLocale; // TODO: think about sync up in all tabs?

                _context6.next = 8;
                return this._modules.modal.confirmSync({
                  title: _i18n["default"].getString('multipleLoginsTitle', currentLocale),
                  content: _i18n["default"].getString('multipleLoginsContent', currentLocale),
                  okText: _i18n["default"].getString('multipleLoginsConfirm', currentLocale),
                  cancelText: _i18n["default"].getString('multipleLoginsCancel', currentLocale),
                  onOK: function () {
                    var _onOK = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                      return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              _context5.next = 2;
                              return _this6._modules.evClient.configureAgent(_objectSpread(_objectSpread({}, config), {}, {
                                isForce: true
                              }));

                            case 2:
                              result = _context5.sent;

                            case 3:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5);
                    }));

                    function onOK() {
                      return _onOK.apply(this, arguments);
                    }

                    return onOK;
                  }()
                });

              case 8:
                modalId = _context6.sent;

                if (modalId) {
                  _context6.next = 11;
                  break;
                }

                throw new Error(result.data.status);

              case 11:
                _context6.next = 16;
                break;

              case 13:
                if (!(result.data.status === _enums.messageTypes.EXISTING_LOGIN_ENGAGED)) {
                  _context6.next = 16;
                  break;
                }

                this._modules.alert.danger({
                  message: _enums.messageTypes.EXISTING_LOGIN_ENGAGED,
                  ttl: 0
                });

                throw new Error(_enums.messageTypes.EXISTING_LOGIN_ENGAGED);

              case 16:
                return _context6.abrupt("return", result);

              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _connectEvServer(_x) {
        return _connectEvServer2.apply(this, arguments);
      }

      return _connectEvServer;
    }()
  }, {
    key: "_checkFieldsResult",
    value: function _checkFieldsResult() {
      if (this.selectedInboundQueueIds.length === 0) {
        this._modules.alert.danger({
          message: _enums.messageTypes.NO_AGENT_SELECTED,
          ttl: 0
        });

        throw new Error("'queueIds' is an empty array.");
      }

      return {
        dialDest: this._getDialDest(),
        queueIds: this.selectedInboundQueueIds,
        skillProfileId: this.selectedSkillProfileId === NONE ? '' : this.selectedSkillProfileId
      };
    }
  }, {
    key: "_getDialDest",
    value: function _getDialDest() {
      // Only external phone has number input
      switch (this.loginType) {
        case _enums.loginTypes.externalPhone:
          {
            if (!this.extensionNumber) {
              this._modules.alert.danger({
                message: _enums.messageTypes.EMPTY_PHONE_NUMBER,
                ttl: 0
              });

              throw new Error("'extensionNumber' is an empty number.");
            }

            var formattedNumber = (0, _phoneNumber.format)({
              phoneNumber: this.extensionNumber,
              areaCode: this._modules.regionSettings.areaCode
            });

            var _parse = (0, _phoneNumber.parse)({
              input: formattedNumber
            }),
                parsedNumber = _parse.parsedNumber,
                isValid = _parse.isValid;

            if (!isValid || !parsedNumber || parsedNumber === '') {
              this._modules.alert.danger({
                message: _enums.messageTypes.INVALID_PHONE_NUMBER,
                ttl: 0
              });

              throw new Error("'extensionNumber' is not a valid number.");
            }

            this.setExtensionNumber(parsedNumber);
            return this.extensionNumber;
          }

        case _enums.loginTypes.integratedSoftphone:
          return 'integrated';

        case _enums.loginTypes.RC_PHONE:
        default:
          return 'RC_PHONE';
      }
    }
  }, {
    key: "isExternalPhone",
    get: function get() {
      return this.loginType === _enums.loginTypes.externalPhone;
    }
  }, {
    key: "isIntegrated",
    get: function get() {
      return this.loginType === _enums.loginTypes.integratedSoftphone;
    }
  }, {
    key: "isConfigSuccessByLocal",
    get: function get() {
      return this._getConfigStatusByLocal(this._configSuccessKey);
    }
  }, {
    key: "isConfiguringByLocal",
    get: function get() {
      return this._getConfigStatusByLocal(this._configuringKey);
    }
  }, {
    key: "localStorage",
    get: function get() {
      var _window;

      return (_window = window) === null || _window === void 0 ? void 0 : _window.localStorage;
    }
  }, {
    key: "hasMultipleTabs",
    get: function get() {
      return this.tabManagerEnabled && this._modules.tabManager.hasMultipleTabs;
    }
  }, {
    key: "tabManagerEnabled",
    get: function get() {
      var _this$_modules$tabMan;

      return (_this$_modules$tabMan = this._modules.tabManager) === null || _this$_modules$tabMan === void 0 ? void 0 : _this$_modules$tabMan._tabbie.enabled;
    }
  }]);

  return EvSessionConfig;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectedSkillProfileId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return NONE;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "selectedInboundQueueIds", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "loginType", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DEFAULT_LOGIN_TYPE;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "extensionNumber", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "takingCall", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "autoAnswer", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "configured", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "configSuccess", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "resetAllConfig", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetAllConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConfigSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConfigSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLoginType", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLoginType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSkillProfileId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSkillProfileId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setInboundQueueIds", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setInboundQueueIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setExtensionNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setExtensionNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTakingCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTakingCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoAnswer", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoAnswer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConfig", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConfig"), _class2.prototype)), _class2)) || _class);
exports.EvSessionConfig = EvSessionConfig;
//# sourceMappingURL=EvSessionConfig.js.map
