"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAgentSession = void 0;

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _events = require("events");

var _ramda = require("ramda");

var _di = require("@ringcentral-integration/commons/lib/di");

var _sleep = _interopRequireDefault(require("@ringcentral-integration/commons/lib/sleep"));

var _enums = require("../../enums");

var _enums2 = require("../../lib/EvClient/enums");

var _tabLife = require("../../lib/tabLife");

var _trackEvents = require("../../lib/trackEvents");

var _i18n = _interopRequireDefault(require("./i18n"));

var _tabManagerEnabled = require("./tabManagerEnabled.decorator");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var ACCEPTABLE_LOGIN_TYPES = [_enums.loginTypes.integratedSoftphone, _enums.loginTypes.RC_PHONE, _enums.loginTypes.externalPhone];
var DEFAULT_LOGIN_TYPE = _enums.loginTypes.integratedSoftphone;
var NONE = _enums.dropDownOptions.None; // ! wait all tab is logout complete, server has some delay after logout

var WAIT_EV_SERVER_ROLLBACK_DELAY = 2000;
var DEFAULT_FORM_GROUP = {
  selectedInboundQueueIds: [],
  loginType: DEFAULT_LOGIN_TYPE,
  selectedSkillProfileId: NONE,
  extensionNumber: '',
  autoAnswer: false
};
var EvAgentSession = (_dec = (0, _di.Module)({
  name: 'EvAgentSession',
  deps: ['EvClient', 'Auth', 'EvAuth', 'EvCallDataSource', 'Alert', 'Auth', 'Locale', 'Presence', 'RouterInteraction', 'ModalUI', 'Block', 'Beforeunload', 'Storage', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvAgentSessionOptions',
    optional: true
  }]
}), _dec2 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec3 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec4 = (0, _core.computed)(function (that) {
  return [that._deps.locale.currentLocale];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.agentConfig, that._deps.auth.isFreshLogin];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that.skillProfileList];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.agent, that._deps.locale.currentLocale];
}), _dec8 = (0, _core.computed)(function (that) {
  return [that.skillProfileList, that.selectedSkillProfileId];
}), _dec9 = (0, _core.computed)(function (that) {
  return [that.inboundQueues, that.selectedInboundQueueIds];
}), _dec10 = (0, _core.track)(function (_, type) {
  return [_trackEvents.trackEvents.agentSessionSetLoginType, {
    value: type
  }];
}), _dec11 = (0, _core.track)(function (_, skillProfileId) {
  return [_trackEvents.trackEvents.agentSessionSetSkillProfileId, {
    value: skillProfileId
  }];
}), _dec12 = (0, _core.track)(function (_, ids) {
  return [_trackEvents.trackEvents.agentSessionSetInboundQueueIds, {
    value: ids
  }];
}), _dec13 = (0, _core.track)(function (_, takingCall) {
  return [_trackEvents.trackEvents.agentSessionSetTakingCall, {
    value: takingCall
  }];
}), _dec14 = (0, _core.track)(function (_, autoAnswer) {
  return [_trackEvents.trackEvents.agentSessionSetAutoAnswer, {
    value: autoAnswer
  }];
}), _dec15 = (0, _core.computed)(function (that) {
  return [that.selectedInboundQueueIds, that.selectedSkillProfileId, that.loginType, that.extensionNumber, that.formGroup];
}), _dec16 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec17 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec18 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.isEvLogged, that.ready];
}), _dec19 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec20 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec21 = (0, _core.track)(function (that) {
  return [_trackEvents.trackEvents.agentSessionConfigureAgent, {
    'Voice Connection': that.loginType,
    'Persistent Voice Connection': that.takingCall,
    'Skill Profile': that.selectedSkillProfile,
    'Inbound Queues': that.selectedInboundQueues,
    'Auto Answer': that.autoAnswer
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvAgentSession, _RcModuleV);

  var _super = _createSuper(EvAgentSession);

  _createClass(EvAgentSession, [{
    key: "_configSuccessAlive",
    value: function _configSuccessAlive() {
      this._tabConfigSuccess.alive();
    }
  }, {
    key: "_configWorkingAlive",
    value: function _configWorkingAlive() {
      this._tabConfigWorking.alive();
    }
  }, {
    key: "isConfigTabAlive",
    value: function () {
      var _isConfigTabAlive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$_tabConfigSucce;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", !this.tabManagerEnabled || ((_this$_tabConfigSucce = this._tabConfigSuccess) === null || _this$_tabConfigSucce === void 0 ? void 0 : _this$_tabConfigSucce.isAlive()));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function isConfigTabAlive() {
        return _isConfigTabAlive.apply(this, arguments);
      }

      return isConfigTabAlive;
    }()
  }, {
    key: "shouldBlockBrowser",
    get: function get() {
      // when there is not integrated softphone and not has multiple tabs
      return !this.isIntegratedSoftphone && !this.hasMultipleTabs;
    }
  }]);

  function EvAgentSession(deps) {
    var _this;

    _classCallCheck(this, EvAgentSession);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvAgentSession'
    }); // ! that onceLoginSuccess for get event before onInitOnce.

    _this.isForceLogin = false;
    _this.isReconnected = false;
    _this.isAgentUpdating = false;
    _this._isReConfiguring = false;
    _this._autoConfigureRetryTimes = 0;
    _this._eventEmitter = new _events.EventEmitter();
    _this._loginPromise = void 0;
    _this._updateSessionBlockId = void 0;
    _this._isLogin = false;
    _this._tabConfigWorking = new _tabLife.TabLife("".concat(_this._deps.tabManager.prefix, "sessionConfig_working"));
    _this._tabConfigSuccess = new _tabLife.TabLife("".concat(_this._deps.tabManager.prefix, "sessionConfig_success"));

    _initializerDefineProperty(_this, "selectedSkillProfileId", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "selectedInboundQueueIds", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "loginType", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "extensionNumber", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "takingCall", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "autoAnswer", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "configured", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "configSuccess", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "formGroup", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "accessToken", _descriptor10, _assertThisInitialized(_this));

    _this._mainTabBeforeunloadHandler = function () {
      console.log('_mainTabBeforeunloadHandler~~', _this._deps.tabManager.hasMultipleTabs, _this.isMainTab, _this._deps.tabManager.firstTabIdExcludeMainTab);

      if (_this._deps.tabManager.hasMultipleTabs && _this.isMainTab && _this._deps.tabManager.firstTabIdExcludeMainTab) {
        return true;
      }

      return false;
    };

    _this._mainTabAfterUnloadHandler = function () {
      console.log('_mainTabAfterUnloadHandler~~', _this._deps.tabManager.firstTabIdExcludeMainTab);

      _this._deps.evCallDataSource.changeCallsLimited(false);

      if (!_this.isMainTab) return;
      var firstTabIdExcludeMainTab = _this._deps.tabManager.firstTabIdExcludeMainTab;

      _this._deps.tabManager.setMainTabId(firstTabIdExcludeMainTab);

      _this._sendTabManager(_enums.tabManagerEvents.MAIN_TAB_WILL_UNLOAD, firstTabIdExcludeMainTab);
    };

    _this._deps.evAuth.onceLoginSuccess(function () {
      // when that is seconds time get onLoginSuccess
      console.log('----------onLoginSuccess1');
      _this._isLogin = true;
    }); // ! logout event should in constructor, when logout that will not call init.


    _this._deps.evAuth.beforeAgentLogout(function () {
      _this._resetAllState();
    });

    _this._deps.presence.beforeunloadHandler = function () {
      return _this.shouldBlockBrowser;
    };

    (0, _core.watch)(_assertThisInitialized(_this), function () {
      return _this.configSuccess;
    }, function (configSuccess) {
      if (configSuccess) {
        _this._emitConfigSuccess();
      }
    });
    return _this;
  }

  _createClass(EvAgentSession, [{
    key: "resetAllConfig",
    value: function resetAllConfig() {
      this.selectedInboundQueueIds = [];
      this.selectedSkillProfileId = NONE;
      this.loginType = DEFAULT_LOGIN_TYPE;
      this.extensionNumber = '';
      this.takingCall = true;
      this.autoAnswer = false;
      this.configSuccess = false;
      this.configured = false;
    }
  }, {
    key: "setAccessToken",
    value: function setAccessToken(token) {
      this.accessToken = token;
    }
  }, {
    key: "_setConfigSuccess",
    value: function _setConfigSuccess(status) {
      this.configSuccess = status;
    }
  }, {
    key: "setConfigSuccess",
    value: function setConfigSuccess(status) {
      console.log('setConfigSuccess~', status);
      this.configSuccess = status;
      this.configured = status;
    }
  }, {
    key: "setLoginType",
    value: function setLoginType(type) {
      this.loginType = type;
    }
  }, {
    key: "setSkillProfileId",
    value: function setSkillProfileId(skillProfileId) {
      this.selectedSkillProfileId = skillProfileId;
    }
  }, {
    key: "setInboundQueueIds",
    value: function setInboundQueueIds(ids) {
      this.selectedInboundQueueIds = ids;
    }
  }, {
    key: "setExtensionNumber",
    value: function setExtensionNumber(extensionNumber) {
      this.extensionNumber = extensionNumber;
    }
  }, {
    key: "setTakingCall",
    value: function setTakingCall(takingCall) {
      this.takingCall = takingCall;
    }
  }, {
    key: "setAutoAnswer",
    value: function setAutoAnswer(autoAnswer) {
      this.autoAnswer = autoAnswer;
    }
  }, {
    key: "setFreshConfig",
    value: function setFreshConfig() {
      this._clearCalls();

      this.loginType = DEFAULT_LOGIN_TYPE;
      this.extensionNumber = '';
      this.takingCall = true;
      this.autoAnswer = this.defaultAutoAnswerOn;
      this.configSuccess = false;
      this.configured = false;
      this.selectedSkillProfileId = this.defaultSkillProfileId;

      if (this._deps.evAuth.agentPermissions.allowInbound) {
        this.selectedInboundQueueIds = this.inboundQueues.map(function (inboundQueue) {
          return inboundQueue.gateId;
        });
      }
    }
  }, {
    key: "assignFormGroupValue",
    value: function assignFormGroupValue() {
      var _this$formGroup = this.formGroup,
          selectedInboundQueueIds = _this$formGroup.selectedInboundQueueIds,
          extensionNumber = _this$formGroup.extensionNumber,
          loginType = _this$formGroup.loginType,
          selectedSkillProfileId = _this$formGroup.selectedSkillProfileId,
          autoAnswer = _this$formGroup.autoAnswer;
      this.selectedInboundQueueIds = selectedInboundQueueIds;
      this.extensionNumber = extensionNumber;
      this.loginType = loginType;
      this.selectedSkillProfileId = selectedSkillProfileId;
      this.autoAnswer = autoAnswer;
    }
  }, {
    key: "setFormGroup",
    value: function setFormGroup(data) {
      this.formGroup = _objectSpread(_objectSpread({}, this.formGroup), data);
    }
  }, {
    key: "resetFormGroup",
    value: function resetFormGroup() {
      this.setFormGroup({
        selectedInboundQueueIds: this.selectedInboundQueueIds,
        selectedSkillProfileId: this.selectedSkillProfileId,
        loginType: this.loginType,
        extensionNumber: this.extensionNumber,
        autoAnswer: this.autoAnswer
      });
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _get(_getPrototypeOf(EvAgentSession.prototype), "_shouldReset", this).call(this) && !this._deps.auth.loggedIn;
    }
  }, {
    key: "checkIsMainTabAlive",
    value: function () {
      var _checkIsMainTabAlive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this._deps.tabManager.checkIsMainTabAlive());

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkIsMainTabAlive() {
        return _checkIsMainTabAlive.apply(this, arguments);
      }

      return checkIsMainTabAlive;
    }()
  }, {
    key: "_setMainTabId",
    value: function _setMainTabId() {
      console.log('_setMainTabId~~~');
      var id = this._deps.tabManager.id;

      this._deps.tabManager.setMainTabId(id);

      this._deps.beforeunload.add(this._mainTabBeforeunloadHandler);

      this._deps.beforeunload.onAfterUnload(this._mainTabAfterUnloadHandler, true);
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      this._init();

      this.onConfigSuccess(function () {
        if (_this2._deps.presence.calls.length === 0) {
          _this2._deps.presence.setDialoutStatus(_enums.dialoutStatuses.idle);
        }

        if (_this2.isAgentUpdating) {
          _this2.isAgentUpdating = false;
        } else {
          console.log('!!!!to Dialer');

          _this2._deps.routerInteraction.push('/dialer');
        }
      });
    }
  }, {
    key: "_tabReConfig",
    value: function () {
      var _tabReConfig2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log('_tabReConfig~~~', this._isReConfiguring);

                if (!this._isReConfiguring) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return");

              case 3:
                this._isReConfiguring = true;

                if (!this.isIntegratedSoftphone) {
                  _context4.next = 17;
                  break;
                }

                _context4.prev = 5;
                _context4.next = 8;
                return this._deps.block.next( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _this3.configureAgent({
                            triggerEvent: false
                          });

                        case 2:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                })));

              case 8:
                _context4.next = 15;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](5);
                console.error('re config fail', _context4.t0);

                this._emitReConfigFail();

                return _context4.abrupt("return");

              case 15:
                _context4.next = 18;
                break;

              case 17:
                this._configWorkingAlive();

              case 18:
                this.isReconnected = true;

                this._mainTabHandle();

                this._configSuccessAlive();

                this._isReConfiguring = false;

              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 10]]);
      }));

      function _tabReConfig() {
        return _tabReConfig2.apply(this, arguments);
      }

      return _tabReConfig;
    }() // _newMainTabReConfig and _pollAskIfCanBeNewMainTab are all for handle new main tab

  }, {
    key: "_newMainTabReConfig",
    value: function () {
      var _newMainTabReConfig2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log('_newMainTabReConfig~', !this.isReconnected, this._deps.evAuth.connected, this.configSuccess, this.isMainTab);

                if (!(!this.isReconnected && this._deps.evAuth.connected && this.configSuccess && this.isMainTab)) {
                  _context5.next = 5;
                  break;
                }

                console.log('_newMainTabReConfig success~');
                _context5.next = 5;
                return this._tabReConfig();

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _newMainTabReConfig() {
        return _newMainTabReConfig2.apply(this, arguments);
      }

      return _newMainTabReConfig;
    }()
  }, {
    key: "_pollAskIfCanBeNewMainTab",
    value: function _pollAskIfCanBeNewMainTab() {
      var _this4 = this;

      console.log('_pollAskIfCanBeNewMainTab~~');

      this._tabConfigSuccess.onLeave( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.log('_tabReConfig in _pollAskIfCanBeNewMainTab~', _this4._deps.tabManager.isFirstTab, _this4._deps.evAuth.connected, _this4.configSuccess, !_this4._isReConfiguring);
                _context6.t0 = _this4._deps.tabManager.isFirstTab && _this4._deps.evAuth.connected && _this4.configSuccess && !_this4._isReConfiguring;

                if (!_context6.t0) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 5;
                return _this4._tabConfigWorking.isLeave();

              case 5:
                _context6.t0 = _context6.sent;

              case 6:
                if (!_context6.t0) {
                  _context6.next = 11;
                  break;
                }

                _context6.next = 9;
                return _this4._tabReConfig();

              case 9:
                _context6.next = 12;
                break;

              case 11:
                if (!_this4.isMainTab) {
                  _this4._pollAskIfCanBeNewMainTab();
                }

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      })), 3000);
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _this5 = this;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this._isLogin) {
                  _context8.next = 3;
                  break;
                }

                _context8.next = 3;
                return this.initAgentSession();

              case 3:
                // ! that must call after onInitOnce, because when that is not in init once,
                // ! that configured will some times to be false because storage block
                (0, _core.watch)(this, function () {
                  return _this5.isOnLoginSuccess;
                }, /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(isOnLoginSuccess) {
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            if (!isOnLoginSuccess) {
                              _context7.next = 4;
                              break;
                            }

                            // when that is seconds time get onLoginSuccess
                            console.log('----------onLoginSuccess2');
                            _context7.next = 4;
                            return _this5.initAgentSession();

                          case 4:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x) {
                    return _ref3.apply(this, arguments);
                  };
                }());

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _init() {
        return _init2.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: "initAgentSession",
    value: function () {
      var _initAgentSession2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var _this6 = this;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._deps.block.next( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                  return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _this6._initTabLife();

                          _context9.next = 3;
                          return _this6._initAgentSession();

                        case 3:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                })));

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function initAgentSession() {
        return _initAgentSession2.apply(this, arguments);
      }

      return initAgentSession;
    }()
  }, {
    key: "_initAgentSession",
    value: function () {
      var _initAgentSession3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                console.log('_initAgentSession~', this.isAgentUpdating);

                if (!this.isAgentUpdating) {
                  _context11.next = 3;
                  break;
                }

                return _context11.abrupt("return");

              case 3:
                this._afterLogin();

                console.log('autoconfig~', !this._deps.auth.isFreshLogin, this.configured);

                if (!(this._deps.auth.isFreshLogin === false && this.configured)) {
                  _context11.next = 13;
                  break;
                }

                _context11.prev = 6;
                return _context11.abrupt("return", this._autoConfigureAgent());

              case 10:
                _context11.prev = 10;
                _context11.t0 = _context11["catch"](6);
                console.error(_context11.t0);

              case 13:
                this.setFreshConfig();
                this.resetFormGroup();

                this._navigateToSessionConfigPage();

              case 16:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[6, 10]]);
      }));

      function _initAgentSession() {
        return _initAgentSession3.apply(this, arguments);
      }

      return _initAgentSession;
    }()
  }, {
    key: "_navigateToSessionConfigPage",
    value: function _navigateToSessionConfigPage() {
      this._deps.routerInteraction.push('/sessionConfig');

      console.log('to sessionConfig~~');
    } // ! also reset in onReset for auth logout by rc

  }, {
    key: "onReset",
    value: function onReset() {
      console.log('onReset in EvAgentSession~~');

      try {
        this._resetAllState();

        this.isAgentUpdating = false;
      } catch (error) {// ignore error
      }
    }
  }, {
    key: "_resetAllState",
    value: function _resetAllState() {
      console.log('_resetAllState~~', this.isMainTab);

      if (!this.isAgentUpdating) {
        this.resetAllConfig();
      }

      if (this.isMainTab) {
        this._deps.tabManager.setMainTabId(null);
      }

      this.setConfigSuccess(false);
      this.isReconnected = false;

      this._destroyTabLife();

      this._deps.evCallDataSource.changeCallsLimited(false);

      this._deps.beforeunload.clear();

      this._deps.beforeunload.removeAfterUnloadListener(this._mainTabAfterUnloadHandler);
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(this.ready && this.tabManagerEnabled && this._deps.tabManager.ready)) {
                  _context12.next = 3;
                  break;
                }

                _context12.next = 3;
                return this._checkTabManagerEvent();

              case 3:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }

      return onStateChange;
    }()
  }, {
    key: "_checkTabManagerEvent",
    value: function () {
      var _checkTabManagerEvent2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var _this7 = this;

        var event, data;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                event = this._deps.tabManager.event;
                data = event === null || event === void 0 ? void 0 : event.args[0];

                if (!event) {
                  _context13.next = 59;
                  break;
                }

                _context13.t0 = event.name;
                _context13.next = _context13.t0 === _enums.tabManagerEvents.AGENT_CONFIG_SUCCESS ? 6 : _context13.t0 === _enums.tabManagerEvents.UPDATE_SESSION ? 16 : _context13.t0 === _enums.tabManagerEvents.MAIN_TAB_WILL_UNLOAD ? 20 : _context13.t0 === _enums.tabManagerEvents.SET_MIAN_TAB_ID ? 25 : _context13.t0 === _enums.tabManagerEvents.UPDATE_SESSION_SUCCESS ? 27 : _context13.t0 === _enums.tabManagerEvents.UPDATE_SESSION_SUCCESS_ALERT ? 48 : _context13.t0 === _enums.tabManagerEvents.UPDATE_SESSION_FAIL ? 50 : _context13.t0 === _enums.tabManagerEvents.RELOGIN ? 52 : _context13.t0 === _enums.tabManagerEvents.CONFIGURE_FAIL ? 55 : 58;
                break;

              case 6:
                console.log('_othersTabConfigureAgent from tabManagerEvents.AGENT_CONFIG_SUCCESS~~');
                _context13.prev = 7;
                _context13.next = 10;
                return this._othersTabConfigureAgent();

              case 10:
                _context13.next = 15;
                break;

              case 12:
                _context13.prev = 12;
                _context13.t1 = _context13["catch"](7);

                this._configureFail();

              case 15:
                return _context13.abrupt("break", 59);

              case 16:
                this._updateSessionBlockId = this._deps.block.block();
                this.isAgentUpdating = true; // if voiceConnectionChanged

                if (data) {
                  this.onceLogoutThenLogin().then(function (loginPromise) {
                    _this7._loginPromise = loginPromise;
                  });
                }

                return _context13.abrupt("break", 59);

              case 20:
                console.log('MAIN_TAB_WILL_UNLOAD~~', data === this._deps.tabManager.tabbie.id, this.isMainTab);

                if (!(data === this._deps.tabManager.tabbie.id || this.isMainTab)) {
                  _context13.next = 24;
                  break;
                }

                _context13.next = 24;
                return this._newMainTabReConfig();

              case 24:
                return _context13.abrupt("break", 59);

              case 25:
                if (this._deps.tabManager.mainTabId !== data) {
                  console.log('SET_MIAN_TAB_ID in this tab~');

                  this._deps.tabManager.setMainTabIdInThisTab(data);
                }

                return _context13.abrupt("break", 59);

              case 27:
                _context13.prev = 27;
                console.log('UPDATE_SESSION_SUCCESS~~', data); // if voiceConnectionChanged

                if (!data) {
                  _context13.next = 38;
                  break;
                }

                this._destroyTabLife();

                this._initTabLife();

                _context13.next = 34;
                return this._loginPromise;

              case 34:
                _context13.next = 36;
                return this._othersTabConfigureAgent();

              case 36:
                _context13.next = 39;
                break;

              case 38:
                this.setConfigSuccess(true);

              case 39:
                this._unblockUpdateSession();

                this.isAgentUpdating = false;
                _context13.next = 47;
                break;

              case 43:
                _context13.prev = 43;
                _context13.t2 = _context13["catch"](27);
                // when that auto config fail, just reload that tab
                console.log(_context13.t2);
                window.location.reload();

              case 47:
                return _context13.abrupt("break", 59);

              case 48:
                this._showUpdateSuccessAlert();

                return _context13.abrupt("break", 59);

              case 50:
                this._unblockUpdateSession();

                return _context13.abrupt("break", 59);

              case 52:
                _context13.next = 54;
                return this.reLoginAgent({
                  isBlock: true,
                  alertMessage: _enums.messageTypes.NOT_INBOUND_QUEUE_SELECTED
                });

              case 54:
                return _context13.abrupt("break", 59);

              case 55:
                console.log('other tab be called to invoke _configureFail~~');

                this._configureFail();

                return _context13.abrupt("break", 59);

              case 58:
                return _context13.abrupt("break", 59);

              case 59:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[7, 12], [27, 43]]);
      }));

      function _checkTabManagerEvent() {
        return _checkTabManagerEvent2.apply(this, arguments);
      }

      return _checkTabManagerEvent;
    }()
  }, {
    key: "_unblockUpdateSession",
    value: function _unblockUpdateSession() {
      this._deps.block.unblock(this._updateSessionBlockId);
    }
  }, {
    key: "_initTabLife",
    value: function _initTabLife() {
      console.log('initTabLife~');

      this._tabConfigWorking.init();

      this._tabConfigSuccess.init();
    }
  }, {
    key: "_destroyTabLife",
    value: function _destroyTabLife() {
      var _this$_tabConfigWorki, _this$_tabConfigSucce2;

      (_this$_tabConfigWorki = this._tabConfigWorking) === null || _this$_tabConfigWorki === void 0 ? void 0 : _this$_tabConfigWorki.destroy();
      (_this$_tabConfigSucce2 = this._tabConfigSuccess) === null || _this$_tabConfigSucce2 === void 0 ? void 0 : _this$_tabConfigSucce2.destroy();
    }
  }, {
    key: "_afterLogin",
    value: function _afterLogin() {
      var _this8 = this;

      // if that is not first login set SessionConfig data again
      if (!this._deps.auth.isFreshLogin) {
        var checkSelectIsInList = this.skillProfileList.some(function (profile) {
          return profile.profileId === _this8.selectedSkillProfileId;
        });

        if (!checkSelectIsInList) {
          this.setSkillProfileId(this.defaultSkillProfileId);
        } // check all selected queue is in inboundQueue list


        var checkedInboundQueues = this.selectedInboundQueueIds.reduce(function (result, inboundQueueId) {
          if (_this8.inboundQueues.some(function (inboundQueue) {
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
    key: "_emitTriggerConfig",
    value: function _emitTriggerConfig() {
      this._eventEmitter.emit(_enums.agentSessionEvents.TRIGGER_CONFIG);
    }
  }, {
    key: "onTriggerConfig",
    value: function onTriggerConfig(callback) {
      this._eventEmitter.on(_enums.agentSessionEvents.TRIGGER_CONFIG, callback);

      return this;
    }
  }, {
    key: "_emitConfigSuccess",
    value: function _emitConfigSuccess() {
      this._eventEmitter.emit(_enums.agentSessionEvents.CONFIG_SUCCESS);
    }
  }, {
    key: "onConfigSuccess",
    value: function onConfigSuccess(callback) {
      this._eventEmitter.on(_enums.agentSessionEvents.CONFIG_SUCCESS, callback);

      return this;
    }
  }, {
    key: "_emitReConfigFail",
    value: function _emitReConfigFail() {
      this._eventEmitter.emit(_enums.agentSessionEvents.RECONFIG_FAIL);
    }
  }, {
    key: "onReConfigFail",
    value: function onReConfigFail(callback) {
      this._eventEmitter.on(_enums.agentSessionEvents.RECONFIG_FAIL, callback);

      return this;
    }
  }, {
    key: "_mainTabHandle",
    value: function _mainTabHandle() {
      console.log('_mainTabHandle~~');

      this._setMainTabId(); // refresh token prevent get token fail to get sip_info


      this._deps.evClient.getRefreshedToken();

      this._deps.tabManager.emitSetMainTabComplete();
    }
  }, {
    key: "updateAgentConfigs",
    value: function () {
      var _updateAgentConfigs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var agentConfig, agent;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this._deps.evClient.getAgentConfig();

              case 2:
                agentConfig = _context14.sent;
                agent = _objectSpread(_objectSpread({}, this._deps.evAuth.agent), {}, {
                  agentConfig: agentConfig
                });

                this._deps.evAuth.setAgent(agent); // !! update agentConfig need before set config success.


                this.setConfigSuccess(true);

              case 6:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function updateAgentConfigs() {
        return _updateAgentConfigs.apply(this, arguments);
      }

      return updateAgentConfigs;
    }()
    /**
     * config agent in session config page
     * @param triggerEvent is that should trigger event, default is true
     */

  }, {
    key: "configureAgent",
    value: function () {
      var _configureAgent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var _ref5,
            _ref5$config,
            config,
            _ref5$triggerEvent,
            triggerEvent,
            _ref5$needAssignFormG,
            needAssignFormGroupValue,
            connectResult,
            result,
            existingLoginFound,
            _args15 = arguments;

        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _ref5 = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : {}, _ref5$config = _ref5.config, config = _ref5$config === void 0 ? this._checkFieldsResult(this.formGroup) : _ref5$config, _ref5$triggerEvent = _ref5.triggerEvent, triggerEvent = _ref5$triggerEvent === void 0 ? true : _ref5$triggerEvent, _ref5$needAssignFormG = _ref5.needAssignFormGroupValue, needAssignFormGroupValue = _ref5$needAssignFormG === void 0 ? false : _ref5$needAssignFormG;

                this._configWorkingAlive();

                console.log('configureAgent~~', triggerEvent);

                this._clearCalls();

                _context15.next = 6;
                return this._connectEvServer(config);

              case 6:
                connectResult = _context15.sent;
                result = connectResult.result;
                existingLoginFound = connectResult.existingLoginFound; // Session timeout
                // this will occur when stay in session config page for long time

                if (!(result.data.status !== 'SUCCESS')) {
                  _context15.next = 17;
                  break;
                }

                this._navigateToSessionConfigPage();

                _context15.next = 13;
                return this._deps.evAuth.newReconnect(false);

              case 13:
                if (existingLoginFound) {
                  config.isForce = true;
                }

                _context15.next = 16;
                return this._connectEvServer(config);

              case 16:
                result = _context15.sent.result;

              case 17:
                this._handleAgentResult({
                  config: result.data,
                  needAssignFormGroupValue: needAssignFormGroupValue
                });

                if (triggerEvent) {
                  this._mainTabHandle();

                  this._emitTriggerConfig();

                  this._configSuccessAlive();

                  this._sendTabManager(_enums.tabManagerEvents.AGENT_CONFIG_SUCCESS);

                  this.setConfigSuccess(true);
                }

              case 19:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function configureAgent() {
        return _configureAgent.apply(this, arguments);
      }

      return configureAgent;
    }()
  }, {
    key: "updateAgent",
    value: function () {
      var _updateAgent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(voiceConnectionChanged) {
        var _this9 = this;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.prev = 0;
                _context17.next = 3;
                return this._deps.block.next( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
                  var config, extensionNumberChanged, _yield$_this9$_connec, result;

                  return regeneratorRuntime.wrap(function _callee16$(_context16) {
                    while (1) {
                      switch (_context16.prev = _context16.next) {
                        case 0:
                          if (voiceConnectionChanged) _this9._configWorkingAlive();
                          config = _this9._checkFieldsResult(_this9.formGroup);

                          _this9._clearCalls();

                          _this9.isAgentUpdating = true;

                          _this9._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION, voiceConnectionChanged);

                          extensionNumberChanged = _this9.extensionNumber !== _this9.formGroup.extensionNumber;

                          if (!(voiceConnectionChanged || extensionNumberChanged)) {
                            _context16.next = 9;
                            break;
                          }

                          _context16.next = 9;
                          return _this9.reLoginAgent();

                        case 9:
                          config.isForce = true;
                          _context16.next = 12;
                          return _this9._connectEvServer(config);

                        case 12:
                          _yield$_this9$_connec = _context16.sent;
                          result = _yield$_this9$_connec.result;

                          _this9._handleAgentResult({
                            config: result.data,
                            isAgentUpdating: true,
                            needAssignFormGroupValue: true
                          });

                          if (voiceConnectionChanged) {
                            _this9._mainTabHandle();

                            _this9._emitTriggerConfig();
                          }

                          _context16.next = 18;
                          return _this9.updateAgentConfigs();

                        case 18:
                          if (voiceConnectionChanged) _this9._configSuccessAlive(); // * update session complete, and config ready

                          // * update session complete, and config ready
                          _this9._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION_SUCCESS, voiceConnectionChanged);

                          _this9.goToSettingsPage();

                          _this9._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION_SUCCESS_ALERT);

                          _this9._showUpdateSuccessAlert();

                        case 23:
                        case "end":
                          return _context16.stop();
                      }
                    }
                  }, _callee16);
                })));

              case 3:
                _context17.next = 10;
                break;

              case 5:
                _context17.prev = 5;
                _context17.t0 = _context17["catch"](0);

                this._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION_FAIL);

                this._unblockUpdateSession();

                console.error('error', _context17.t0);

              case 10:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[0, 5]]);
      }));

      function updateAgent(_x2) {
        return _updateAgent.apply(this, arguments);
      }

      return updateAgent;
    }()
  }, {
    key: "reLoginAgent",
    value: function () {
      var _reLoginAgent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        var _this10 = this;

        var _ref7,
            isBlock,
            alertMessage,
            fn,
            _args19 = arguments;

        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _ref7 = _args19.length > 0 && _args19[0] !== undefined ? _args19[0] : {}, isBlock = _ref7.isBlock, alertMessage = _ref7.alertMessage;

                fn = /*#__PURE__*/function () {
                  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
                    var _yield$_this10$_deps$, access_token;

                    return regeneratorRuntime.wrap(function _callee18$(_context18) {
                      while (1) {
                        switch (_context18.prev = _context18.next) {
                          case 0:
                            if (alertMessage) {
                              _this10._deps.alert.danger({
                                message: alertMessage,
                                ttl: 0
                              });
                            }

                            _this10._deps.evAuth.sendLogoutTabEvent();

                            _context18.next = 4;
                            return _this10._deps.auth.refreshToken();

                          case 4:
                            _yield$_this10$_deps$ = _context18.sent;
                            access_token = _yield$_this10$_deps$.access_token;

                            _this10.setAccessToken(access_token); // * then do logout send to every tab


                            _context18.next = 9;
                            return _this10._deps.evAuth.logoutAgent();

                          case 9:
                            _context18.next = 11;
                            return (0, _sleep["default"])(WAIT_EV_SERVER_ROLLBACK_DELAY);

                          case 11:
                            _context18.next = 13;
                            return _this10._deps.evAuth.loginAgent(_this10.accessToken);

                          case 13:
                          case "end":
                            return _context18.stop();
                        }
                      }
                    }, _callee18);
                  }));

                  return function fn() {
                    return _ref8.apply(this, arguments);
                  };
                }();

                return _context19.abrupt("return", isBlock ? this._deps.block.next(fn) : fn());

              case 3:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function reLoginAgent() {
        return _reLoginAgent.apply(this, arguments);
      }

      return reLoginAgent;
    }()
  }, {
    key: "onceLogoutThenLogin",
    value: function onceLogoutThenLogin() {
      var _this11 = this;

      return new Promise(function (resolve) {
        _this11._deps.evAuth.onceLogout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
          return regeneratorRuntime.wrap(function _callee20$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  _context20.next = 2;
                  return (0, _sleep["default"])(WAIT_EV_SERVER_ROLLBACK_DELAY);

                case 2:
                  resolve(_this11._deps.evAuth.loginAgent(_this11.accessToken));

                case 3:
                case "end":
                  return _context20.stop();
              }
            }
          }, _callee20);
        })));
      });
    }
  }, {
    key: "goToSettingsPage",
    value: function goToSettingsPage() {
      this._deps.routerInteraction.push('/settings');
    }
  }, {
    key: "_showUpdateSuccessAlert",
    value: function _showUpdateSuccessAlert() {
      this._deps.alert.success({
        message: _enums.messageTypes.UPDATE_AGENT_SUCCESS
      });
    }
  }, {
    key: "_handleAgentResult",
    value: function _handleAgentResult(_ref10) {
      var _ref10$config = _ref10.config,
          message = _ref10$config.message,
          status = _ref10$config.status,
          isAgentUpdating = _ref10.isAgentUpdating,
          needAssignFormGroupValue = _ref10.needAssignFormGroupValue;

      if (status !== 'SUCCESS') {
        if (typeof message === 'string') {
          this._deps.alert.danger({
            message: _enums.messageTypes.AGENT_CONFIG_DETAIL_ERROR,
            ttl: 0,
            payload: message
          });
        } else {
          this._deps.alert.danger({
            message: isAgentUpdating ? _enums.messageTypes.UPDATE_AGENT_ERROR : _enums.messageTypes.AGENT_CONFIG_ERROR,
            ttl: 0
          });
        }

        throw new Error(message);
      }

      if (needAssignFormGroupValue) {
        this.assignFormGroupValue();
      }
    }
  }, {
    key: "_autoConfigureAgent",
    value: function () {
      var _autoConfigureAgent2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
        var _this12 = this;

        var isFirstTab, timeoutId, resolves;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                console.log('_autoConfigureAgent~', this.tabManagerEnabled);
                isFirstTab = this._deps.tabManager.isFirstTab;

                if (!(this._autoConfigureRetryTimes >= 5)) {
                  _context23.next = 6;
                  break;
                }

                console.log('stop autoConfigureRetry~~', this._autoConfigureRetryTimes);
                this._autoConfigureRetryTimes = 0;
                return _context23.abrupt("return", this._configureFail(isFirstTab));

              case 6:
                timeoutId = null;

                if (!this.tabManagerEnabled) {
                  _context23.next = 10;
                  break;
                }

                resolves = [null, null, null];
                return _context23.abrupt("return", Promise.race([new Promise(function (res) {
                  console.log('res already success~~');

                  resolves[0] = function () {
                    return res('already success');
                  };

                  _this12._eventEmitter.once(_enums.agentSessionEvents.CONFIG_SUCCESS, resolves[0]);
                }), new Promise(function (res) {
                  resolves[1] = res; // check isSuccess first

                  // check isSuccess first
                  if (_this12.isAgentUpdating || _this12._deps.tabManager.tabs.length !== 1) {
                    var checkIsAlive = function checkIsAlive() {
                      console.log('checkIsAlive~~');

                      _this12._tabConfigSuccess.isAlive().then( /*#__PURE__*/function () {
                        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(result) {
                          return regeneratorRuntime.wrap(function _callee21$(_context21) {
                            while (1) {
                              switch (_context21.prev = _context21.next) {
                                case 0:
                                  console.log('isAlive ?~', result);

                                  if (result) {
                                    console.log('res other tab config~~');
                                    res('other tab config');
                                  } else {
                                    checkIsAlive();
                                  }

                                case 2:
                                case "end":
                                  return _context21.stop();
                              }
                            }
                          }, _callee21);
                        }));

                        return function (_x3) {
                          return _ref11.apply(this, arguments);
                        };
                      }());
                    };

                    checkIsAlive();
                  }
                }), new Promise(function (res) {
                  resolves[2] = res; // when there is too many tab, that event will block
                  // then check local

                  // when there is too many tab, that event will block
                  // then check local
                  if (isFirstTab) {
                    _this12._tabConfigWorking.isLeave().then( /*#__PURE__*/function () {
                      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(result) {
                        return regeneratorRuntime.wrap(function _callee22$(_context22) {
                          while (1) {
                            switch (_context22.prev = _context22.next) {
                              case 0:
                                console.log('isLeave ?~', result);

                                if (result) {
                                  _this12._configWorkingAlive();

                                  console.log('res config~~');
                                  res('config');
                                }

                              case 2:
                              case "end":
                                return _context22.stop();
                            }
                          }
                        }, _callee22);
                      }));

                      return function (_x4) {
                        return _ref12.apply(this, arguments);
                      };
                    }());
                  }
                }), new Promise(function (res) {
                  timeoutId = setTimeout(function () {
                    res('retry');
                  }, 10000);
                })]).then(function (result) {
                  clearTimeout(timeoutId);

                  _this12._eventEmitter.off(_enums.agentSessionEvents.CONFIG_SUCCESS, resolves[0]);

                  console.log('clear all memory with promise~'); // clear all memory with promise

                  // clear all memory with promise
                  resolves.forEach(function (r) {
                    return r();
                  });
                  resolves.length = 0;
                  console.log('!!!!!', result);

                  switch (result) {
                    case 'retry':
                      console.log('retry auto config~');
                      _this12._autoConfigureRetryTimes++;
                      return _this12._autoConfigureAgent();

                    case 'other tab config':
                      console.log('_othersTabConfigureAgent in auto config~~');
                      return _this12._othersTabConfigureAgent();

                    case 'config':
                      {
                        console.log('configureAgent in auto config~~'); //! when reConfig, if that change queue or others field in ev admin, that will get error, should redirect to sessionPage

                        //! when reConfig, if that change queue or others field in ev admin, that will get error, should redirect to sessionPage
                        var config = _this12._checkFieldsResult({
                          selectedInboundQueueIds: _this12.selectedInboundQueueIds,
                          selectedSkillProfileId: _this12.selectedSkillProfileId,
                          loginType: _this12.loginType,
                          extensionNumber: _this12.extensionNumber
                        });

                        return _this12.configureAgent({
                          config: config
                        });
                      }

                    case 'already success':
                    default:
                      return Promise.resolve();
                  }
                })["catch"](function (e) {
                  console.log('_autoConfigureAgent error~~', e);

                  _this12._configureFail(isFirstTab);

                  return e;
                }));

              case 10:
                return _context23.abrupt("return", this.configureAgent());

              case 11:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function _autoConfigureAgent() {
        return _autoConfigureAgent2.apply(this, arguments);
      }

      return _autoConfigureAgent;
    }()
  }, {
    key: "_configureFail",
    value: function _configureFail() {
      var needAsyncAllTabs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      console.log('_configureFail~~', this._deps.tabManager.hasMultipleTabs, needAsyncAllTabs);

      if (this._deps.tabManager.hasMultipleTabs && needAsyncAllTabs) {
        this._sendTabManager(_enums.tabManagerEvents.CONFIGURE_FAIL);
      }

      this._navigateToSessionConfigPage();

      this._setConfigSuccess(false);
    }
  }, {
    key: "_othersTabConfigureAgent",
    value: function () {
      var _othersTabConfigureAgent2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                console.log('_othersTabConfigureAgent~~', this.configSuccess);

                if (!this.configSuccess) {
                  _context24.next = 3;
                  break;
                }

                return _context24.abrupt("return");

              case 3:
                _context24.next = 5;
                return this._deps.evClient.multiLoginRequest();

              case 5:
                _context24.next = 7;
                return this.updateAgentConfigs();

              case 7:
                if (!this.notInboundQueueSelected) {
                  _context24.next = 11;
                  break;
                }

                this._sendTabManager(_enums.tabManagerEvents.RELOGIN);

                _context24.next = 11;
                return this.reLoginAgent({
                  isBlock: true,
                  alertMessage: _enums.messageTypes.NOT_INBOUND_QUEUE_SELECTED
                });

              case 11:
                this._pollAskIfCanBeNewMainTab();

              case 12:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function _othersTabConfigureAgent() {
        return _othersTabConfigureAgent2.apply(this, arguments);
      }

      return _othersTabConfigureAgent;
    }()
  }, {
    key: "_pickSkillProfile",
    value: function _pickSkillProfile(skillProfileList) {
      return skillProfileList.find(function (item) {
        return item.isDefault === '1';
      });
    }
  }, {
    key: "_connectEvServer",
    value: function () {
      var _connectEvServer2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(config) {
        var _this13 = this;

        var result, status, existingLoginFound, currentLocale, confirmed;
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                console.log('configure ev agent in _connectEvServer~~', config);
                _context26.next = 3;
                return this._deps.evClient.configureAgent(config);

              case 3:
                result = _context26.sent;
                status = result.data.status;
                existingLoginFound = status === _enums.messageTypes.EXISTING_LOGIN_FOUND;

                if (!existingLoginFound) {
                  _context26.next = 16;
                  break;
                }

                currentLocale = this._deps.locale.currentLocale; // TODO: think about sync up in all tabs?

                _context26.next = 10;
                return this._deps.modalUI.confirm({
                  title: _i18n["default"].getString('multipleLoginsTitle', currentLocale),
                  content: _i18n["default"].getString('multipleLoginsContent', currentLocale),
                  confirmButtonText: _i18n["default"].getString('multipleLoginsConfirm', currentLocale),
                  cancelButtonText: _i18n["default"].getString('multipleLoginsCancel', currentLocale),
                  onConfirm: function () {
                    var _onConfirm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
                      return regeneratorRuntime.wrap(function _callee25$(_context25) {
                        while (1) {
                          switch (_context25.prev = _context25.next) {
                            case 0:
                              if (!(_this13._deps.evClient.appStatus === _enums2.evStatus.CLOSED)) {
                                _context25.next = 3;
                                break;
                              }

                              _context25.next = 3;
                              return _this13._deps.evAuth.loginAgent();

                            case 3:
                              _context25.next = 5;
                              return _this13._deps.evClient.configureAgent(_objectSpread(_objectSpread({}, config), {}, {
                                isForce: true
                              }));

                            case 5:
                              result = _context25.sent;
                              _this13.isForceLogin = true;

                            case 7:
                            case "end":
                              return _context25.stop();
                          }
                        }
                      }, _callee25);
                    }));

                    function onConfirm() {
                      return _onConfirm.apply(this, arguments);
                    }

                    return onConfirm;
                  }(),
                  size: 'xsmall'
                }, true);

              case 10:
                confirmed = _context26.sent;

                if (confirmed) {
                  _context26.next = 14;
                  break;
                }

                this.isForceLogin = false;
                throw new Error(status);

              case 14:
                _context26.next = 19;
                break;

              case 16:
                if (!(status === _enums.messageTypes.EXISTING_LOGIN_ENGAGED)) {
                  _context26.next = 19;
                  break;
                }

                this._deps.alert.danger({
                  message: _enums.messageTypes.EXISTING_LOGIN_ENGAGED,
                  ttl: 0
                });

                throw new Error(_enums.messageTypes.EXISTING_LOGIN_ENGAGED);

              case 19:
                return _context26.abrupt("return", {
                  result: result,
                  existingLoginFound: existingLoginFound
                });

              case 20:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function _connectEvServer(_x5) {
        return _connectEvServer2.apply(this, arguments);
      }

      return _connectEvServer;
    }()
  }, {
    key: "_checkFieldsResult",
    value: function _checkFieldsResult(formGroup) {
      var selectedInboundQueueIds = formGroup.selectedInboundQueueIds,
          selectedSkillProfileId = formGroup.selectedSkillProfileId;

      if (this.notInboundQueueSelected) {
        this._deps.alert.danger({
          message: _enums.messageTypes.NOT_INBOUND_QUEUE_SELECTED,
          ttl: 0
        });

        throw new Error("'queueIds' is an empty array.");
      }

      return {
        dialDest: this._getDialDest(formGroup),
        queueIds: selectedInboundQueueIds,
        skillProfileId: selectedSkillProfileId === NONE ? '' : selectedSkillProfileId
      };
    }
  }, {
    key: "_getDialDest",
    value: function _getDialDest(_ref13) {
      var loginType = _ref13.loginType,
          extensionNumber = _ref13.extensionNumber;

      // Only external phone has number input
      switch (loginType) {
        case _enums.loginTypes.externalPhone:
          {
            if (!extensionNumber) {
              this._deps.alert.danger({
                message: _enums.messageTypes.EMPTY_PHONE_NUMBER,
                ttl: 0
              });

              throw new Error("'extensionNumber' is an empty number.");
            }

            var formatPhoneNumber = (0, _phoneNumber.format)({
              phoneNumber: extensionNumber
            });

            var _parse = (0, _phoneNumber.parse)({
              input: formatPhoneNumber
            }),
                parsedNumber = _parse.parsedNumber,
                isValid = _parse.isValid;

            if (!isValid || !parsedNumber || parsedNumber === '') {
              this._deps.alert.danger({
                message: _enums.messageTypes.INVALID_PHONE_NUMBER,
                ttl: 0
              });

              throw new Error("'extensionNumber' is not a valid number.");
            }

            this.setFormGroup({
              extensionNumber: parsedNumber
            });
            return extensionNumber;
          }

        case _enums.loginTypes.integratedSoftphone:
          return 'integrated';

        case _enums.loginTypes.RC_PHONE:
        default:
          return 'RC_PHONE';
      }
    }
  }, {
    key: "_sendTabManager",
    value: function _sendTabManager(event, value) {
      var _this$_deps$tabManage;

      (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.send(event, value);
    }
  }, {
    key: "_clearCalls",
    value: function _clearCalls() {
      this._deps.presence.clearCalls();
    }
  }, {
    key: "isExternalPhone",
    get: function get() {
      return this.formGroup.loginType === _enums.loginTypes.externalPhone;
    }
  }, {
    key: "isIntegratedSoftphone",
    get: function get() {
      return this.loginType === _enums.loginTypes.integratedSoftphone;
    }
  }, {
    key: "localStorage",
    get: function get() {
      var _window;

      return (_window = window) === null || _window === void 0 ? void 0 : _window.localStorage;
    }
  }, {
    key: "tabManagerEnabled",
    get: function get() {
      var _this$_deps$tabManage2;

      return (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.enable;
    }
  }, {
    key: "hasMultipleTabs",
    get: function get() {
      var _this$_deps$tabManage3;

      return (_this$_deps$tabManage3 = this._deps.tabManager) === null || _this$_deps$tabManage3 === void 0 ? void 0 : _this$_deps$tabManage3.hasMultipleTabs;
    }
  }, {
    key: "loginTypeList",
    get: function get() {
      var currentLocale = this._deps.locale.currentLocale;
      return ACCEPTABLE_LOGIN_TYPES.map(function (type) {
        return {
          id: type,
          label: _i18n["default"].getString(type, currentLocale)
        };
      });
    }
  }, {
    key: "inboundQueues",
    get: function get() {
      var _this$_deps$evAuth = this._deps.evAuth,
          agentConfig = _this$_deps$evAuth.agentConfig,
          agentPermissions = _this$_deps$evAuth.agentPermissions;

      if (!agentConfig || !(agentConfig === null || agentConfig === void 0 ? void 0 : agentConfig.inboundSettings) || !(agentPermissions === null || agentPermissions === void 0 ? void 0 : agentPermissions.allowInbound)) {
        return [];
      }

      var _agentConfig$inboundS = agentConfig.inboundSettings.availableQueues,
          availableQueues = _agentConfig$inboundS === void 0 ? [] : _agentConfig$inboundS;
      var isFreshLogin = this._deps.auth.isFreshLogin;
      return availableQueues.map(function (queue) {
        return {
          gateId: queue.gateId,
          gateName: queue.gateName,
          checked: isFreshLogin
        };
      });
    }
  }, {
    key: "defaultSkillProfileId",
    get: function get() {
      var defaultSkill = this._pickSkillProfile(this.skillProfileList);

      return defaultSkill ? defaultSkill.profileId : NONE;
    }
  }, {
    key: "skillProfileList",
    get: function get() {
      var _ref14 = this._deps.evAuth.agent || {},
          agentConfig = _ref14.agentConfig;

      if (!agentConfig || !agentConfig.inboundSettings) {
        return [];
      }

      var _agentConfig$inboundS2 = agentConfig.inboundSettings.availableSkillProfiles,
          availableSkillProfiles = _agentConfig$inboundS2 === void 0 ? [] : _agentConfig$inboundS2;

      var defaultSkill = this._pickSkillProfile(availableSkillProfiles);

      if (!defaultSkill && availableSkillProfiles.length > 0) {
        return [{
          profileId: NONE,
          profileName: _i18n["default"].getString(NONE, this._deps.locale.currentLocale)
        }].concat(_toConsumableArray(availableSkillProfiles));
      }

      return availableSkillProfiles;
    }
  }, {
    key: "selectedSkillProfile",
    get: function get() {
      var _this14 = this;

      var selectedSkillProfile = this.skillProfileList.find(function (profile) {
        return profile.profileId === _this14.formGroup.selectedSkillProfileId;
      });
      return selectedSkillProfile === null || selectedSkillProfile === void 0 ? void 0 : selectedSkillProfile.profileName;
    }
  }, {
    key: "selectedInboundQueues",
    get: function get() {
      var _this15 = this;

      var results = this.formGroup.selectedInboundQueueIds.map(function (id) {
        return _this15.inboundQueues.find(function (queue) {
          return queue.gateId === id;
        });
      });
      return results.filter(function (result) {
        return result;
      }).map(function (result) {
        return result.gateName;
      });
    }
  }, {
    key: "defaultAutoAnswerOn",
    get: function get() {
      return this._deps.evAuth.agentPermissions.defaultAutoAnswerOn;
    }
  }, {
    key: "isSessionChanged",
    get: function get() {
      var sessionConfigs = {
        selectedInboundQueueIds: this.selectedInboundQueueIds,
        selectedSkillProfileId: this.selectedSkillProfileId,
        loginType: this.loginType,
        extensionNumber: this.extensionNumber,
        autoAnswer: this.autoAnswer
      };
      return !(0, _ramda.equals)(sessionConfigs, this.formGroup);
    }
  }, {
    key: "isOnLoginSuccess",
    get: function get() {
      return this.ready && this._deps.evAuth.isEvLogged;
    }
  }, {
    key: "isMainTab",
    get: function get() {
      return this._deps.tabManager.isMainTab;
    }
  }, {
    key: "notInboundQueueSelected",
    get: function get() {
      return !this._deps.evAuth.agentPermissions.allowInbound || this.formGroup.selectedInboundQueueIds.length === 0;
    }
  }]);

  return EvAgentSession;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "_configSuccessAlive", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_configSuccessAlive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_configWorkingAlive", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_configWorkingAlive"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectedSkillProfileId", [_core.storage, _core.state], {
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
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "formGroup", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DEFAULT_FORM_GROUP;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "accessToken", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "loginTypeList", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "loginTypeList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inboundQueues", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "inboundQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultSkillProfileId", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultSkillProfileId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "skillProfileList", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "skillProfileList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "selectedSkillProfile", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedSkillProfile"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "selectedInboundQueues", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedInboundQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetAllConfig", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetAllConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAccessToken", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAccessToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setConfigSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setConfigSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConfigSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConfigSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLoginType", [_dec10, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLoginType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSkillProfileId", [_dec11, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSkillProfileId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setInboundQueueIds", [_dec12, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setInboundQueueIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setExtensionNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setExtensionNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTakingCall", [_dec13, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTakingCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoAnswer", [_dec14, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoAnswer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFreshConfig", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFreshConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "assignFormGroupValue", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "assignFormGroupValue"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFormGroup", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFormGroup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isSessionChanged", [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "isSessionChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setMainTabId", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "_setMainTabId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_pollAskIfCanBeNewMainTab", [_dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "_pollAskIfCanBeNewMainTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isOnLoginSuccess", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "isOnLoginSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initTabLife", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "_initTabLife"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_destroyTabLife", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "_destroyTabLife"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "configureAgent", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "configureAgent"), _class2.prototype)), _class2)) || _class);
exports.EvAgentSession = EvAgentSession;
//# sourceMappingURL=EvAgentSession.js.map
