"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAgentSession = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.keys");

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

var _di = require("ringcentral-integration/lib/di");

var _sleep = _interopRequireDefault(require("ringcentral-integration/lib/sleep"));

var _enums = require("../../enums");

var _tabLife = require("../../lib/tabLife");

var _trackEvents = require("../../lib/trackEvents");

var _i18n = _interopRequireDefault(require("./i18n"));

var _tabManagerEnabled = require("./tabManagerEnabled.decorator");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
  deps: ['EvClient', 'Auth', 'EvAuth', 'Storage', 'Alert', 'Auth', 'Locale', 'Presence', 'RouterInteraction', 'ModalUI', 'Block', 'Beforeunload', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvAgentSessionOptions',
    optional: true
  }]
}), _dec2 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec3 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec4 = (0, _core.computed)(function (that) {
  return [that._deps.locale.currentLocale];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.agent, that._deps.auth.isFreshLogin];
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
}), _dec16 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec17 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec18 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec19 = (0, _tabManagerEnabled.tabManagerEnabled)(), _dec20 = (0, _core.track)(function (that) {
  return [_trackEvents.trackEvents.agentSessionConfigureAgent, {
    'Voice Connection': that.loginType,
    'Persistent Voice Connection': that.takingCall,
    'Skill Profile': that.selectedSkillProfile,
    'Inbound Queues': that.selectedInboundQueues,
    'Auto Answer': that.autoAnswer
  }];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
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
    key: "setConfigSuccess",
    value: function setConfigSuccess(status) {
      console.log('setConfigSuccess~', status);

      if (status) {
        this._emitConfigSuccess();
      }

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

      if (this._modules.evAuth.agentPermissions.allowInbound) {
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
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this5 = this;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this._isLogin) {
                  _context7.next = 4;
                  break;
                }

                this._initTabLife();

                _context7.next = 4;
                return this._initAgentSession();

              case 4:
                // ! that must call after onInitOnce, because when that is not in init once,
                // ! that configured will some times to be false because storage block
                this._deps.evAuth.onLoginSuccess(function () {
                  // when that is seconds time get onLoginSuccess
                  console.log('----------onLoginSuccess2');

                  _this5._initTabLife();

                  _this5._initAgentSession();
                });

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _init() {
        return _init2.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: "_initAgentSession",
    value: function _initAgentSession() {
      console.log('_initAgentSession~', this.isAgentUpdating);

      if (this.isAgentUpdating) {
        return;
      }

      this._afterLogin();

      console.log('autoconfig~', !this._deps.auth.isFreshLogin, this.configured);

      if (this._deps.auth.isFreshLogin === false && this.configured) {
        try {
          return this._autoConfigureAgent();
        } catch (e) {
          console.error(e);
        }
      }

      this.setFreshConfig();
      this.resetFormGroup();

      this._navigateToSessionConfigPage();
    }
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

      this._deps.beforeunload.clear();

      this._deps.beforeunload.removeAfterUnloadListener(this._mainTabAfterUnloadHandler);
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(this.ready && this.tabManagerEnabled && this._deps.tabManager.ready)) {
                  _context8.next = 3;
                  break;
                }

                _context8.next = 3;
                return this._checkTabManagerEvent();

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }

      return onStateChange;
    }()
  }, {
    key: "_checkTabManagerEvent",
    value: function () {
      var _checkTabManagerEvent2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _this6 = this;

        var event, data;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                event = this._deps.tabManager.event;
                data = event === null || event === void 0 ? void 0 : event.args[0];

                if (!event) {
                  _context9.next = 59;
                  break;
                }

                _context9.t0 = event.name;
                _context9.next = _context9.t0 === _enums.tabManagerEvents.AGENT_CONFIG_SUCCESS ? 6 : _context9.t0 === _enums.tabManagerEvents.UPDATE_SESSION ? 16 : _context9.t0 === _enums.tabManagerEvents.MAIN_TAB_WILL_UNLOAD ? 20 : _context9.t0 === _enums.tabManagerEvents.SET_MIAN_TAB_ID ? 25 : _context9.t0 === _enums.tabManagerEvents.UPDATE_SESSION_SUCCESS ? 27 : _context9.t0 === _enums.tabManagerEvents.UPDATE_SESSION_SUCCESS_ALERT ? 48 : _context9.t0 === _enums.tabManagerEvents.UPDATE_SESSION_FAIL ? 50 : _context9.t0 === _enums.tabManagerEvents.RELOGIN ? 52 : _context9.t0 === _enums.tabManagerEvents.CONFIGURE_FAIL ? 55 : 58;
                break;

              case 6:
                console.log('_othersTabConfigureAgent from tabManagerEvents.AGENT_CONFIG_SUCCESS~~');
                _context9.prev = 7;
                _context9.next = 10;
                return this._othersTabConfigureAgent();

              case 10:
                _context9.next = 15;
                break;

              case 12:
                _context9.prev = 12;
                _context9.t1 = _context9["catch"](7);

                this._configureFail();

              case 15:
                return _context9.abrupt("break", 59);

              case 16:
                this._updateSessionBlockId = this._deps.block.block();
                this.isAgentUpdating = true; // if voiceConnectionChanged

                if (data) {
                  this.onceLogoutThenLogin().then(function (loginPromise) {
                    _this6._loginPromise = loginPromise;
                  });
                }

                return _context9.abrupt("break", 59);

              case 20:
                console.log('MAIN_TAB_WILL_UNLOAD~~', data === this._deps.tabManager.tabbie.id, this.isMainTab);

                if (!(data === this._deps.tabManager.tabbie.id || this.isMainTab)) {
                  _context9.next = 24;
                  break;
                }

                _context9.next = 24;
                return this._newMainTabReConfig();

              case 24:
                return _context9.abrupt("break", 59);

              case 25:
                if (this._deps.tabManager.mainTabId !== data) {
                  console.log('SET_MIAN_TAB_ID in this tab~');

                  this._deps.tabManager.setMainTabIdInThisTab(data);
                }

                return _context9.abrupt("break", 59);

              case 27:
                _context9.prev = 27;
                console.log('UPDATE_SESSION_SUCCESS~~', data); // if voiceConnectionChanged

                if (!data) {
                  _context9.next = 38;
                  break;
                }

                this._destroyTabLife();

                this._initTabLife();

                _context9.next = 34;
                return this._loginPromise;

              case 34:
                _context9.next = 36;
                return this._othersTabConfigureAgent();

              case 36:
                _context9.next = 39;
                break;

              case 38:
                this.setConfigSuccess(true);

              case 39:
                this._unblockUpdateSession();

                this.isAgentUpdating = false;
                _context9.next = 47;
                break;

              case 43:
                _context9.prev = 43;
                _context9.t2 = _context9["catch"](27);
                // when that auto config fail, just reload that tab
                console.log(_context9.t2);
                window.location.reload();

              case 47:
                return _context9.abrupt("break", 59);

              case 48:
                this._showUpdateSuccessAlert();

                return _context9.abrupt("break", 59);

              case 50:
                this._unblockUpdateSession();

                return _context9.abrupt("break", 59);

              case 52:
                _context9.next = 54;
                return this.reLoginAgent({
                  isBlock: true,
                  alertMessage: _enums.messageTypes.NOT_INBOUND_QUEUE_SELECTED
                });

              case 54:
                return _context9.abrupt("break", 59);

              case 55:
                console.log('other tab be called to invoke _configureFail~~');

                this._configureFail();

                return _context9.abrupt("break", 59);

              case 58:
                return _context9.abrupt("break", 59);

              case 59:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[7, 12], [27, 43]]);
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
      var _this7 = this;

      // if that is not first login set SessionConfig data again
      if (!this._deps.auth.isFreshLogin) {
        var checkSelectIsInList = this.skillProfileList.some(function (profile) {
          return profile.profileId === _this7.selectedSkillProfileId;
        });

        if (!checkSelectIsInList) {
          this.setSkillProfileId(this.defaultSkillProfileId);
        } // check all selected queue is in inboundQueue list


        var checkedInboundQueues = this.selectedInboundQueueIds.reduce(function (result, inboundQueueId) {
          if (_this7.inboundQueues.some(function (inboundQueue) {
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
      var _updateAgentConfigs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var agentConfig, agent;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._deps.evClient.getAgentConfig();

              case 2:
                agentConfig = _context10.sent;
                agent = _objectSpread(_objectSpread({}, this._deps.evAuth.agent), {}, {
                  agentConfig: agentConfig
                });

                this._deps.evAuth.setAgent(agent); // !! update agentConfig need before set config success.


                this.setConfigSuccess(true);

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
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
      var _configureAgent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var _ref3,
            _ref3$config,
            config,
            _ref3$triggerEvent,
            triggerEvent,
            _ref3$needAssignFormG,
            needAssignFormGroupValue,
            result,
            _args11 = arguments;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _ref3 = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {}, _ref3$config = _ref3.config, config = _ref3$config === void 0 ? this._checkFieldsResult(this.formGroup) : _ref3$config, _ref3$triggerEvent = _ref3.triggerEvent, triggerEvent = _ref3$triggerEvent === void 0 ? true : _ref3$triggerEvent, _ref3$needAssignFormG = _ref3.needAssignFormGroupValue, needAssignFormGroupValue = _ref3$needAssignFormG === void 0 ? false : _ref3$needAssignFormG;

                this._configWorkingAlive();

                console.log('configureAgent~~', triggerEvent);

                this._clearCalls();

                _context11.next = 6;
                return this._connectEvServer(config);

              case 6:
                result = _context11.sent;

                if (!(result.data.status !== 'SUCCESS')) {
                  _context11.next = 14;
                  break;
                }

                this._navigateToSessionConfigPage();

                _context11.next = 11;
                return this._deps.evAuth.newReconnect(false);

              case 11:
                _context11.next = 13;
                return this._connectEvServer(config);

              case 13:
                result = _context11.sent;

              case 14:
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

              case 16:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function configureAgent() {
        return _configureAgent.apply(this, arguments);
      }

      return configureAgent;
    }()
  }, {
    key: "updateAgent",
    value: function () {
      var _updateAgent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(voiceConnectionChanged) {
        var _this8 = this;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                _context13.next = 3;
                return this._deps.block.next( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                  var config, result;
                  return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                      switch (_context12.prev = _context12.next) {
                        case 0:
                          if (voiceConnectionChanged) _this8._configWorkingAlive();
                          config = _this8._checkFieldsResult(_this8.formGroup);

                          _this8._clearCalls();

                          _this8.isAgentUpdating = true;

                          _this8._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION, voiceConnectionChanged);

                          if (!voiceConnectionChanged) {
                            _context12.next = 8;
                            break;
                          }

                          _context12.next = 8;
                          return _this8.reLoginAgent();

                        case 8:
                          config.isForce = true;
                          _context12.next = 11;
                          return _this8._connectEvServer(config);

                        case 11:
                          result = _context12.sent;

                          _this8._handleAgentResult({
                            config: result.data,
                            isAgentUpdating: true,
                            needAssignFormGroupValue: true
                          });

                          if (voiceConnectionChanged) {
                            _this8._mainTabHandle();

                            _this8._emitTriggerConfig();
                          }

                          _context12.next = 16;
                          return _this8.updateAgentConfigs();

                        case 16:
                          if (voiceConnectionChanged) _this8._configSuccessAlive(); // * update session complete, and config ready

                          _this8._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION_SUCCESS, voiceConnectionChanged);

                          _this8.goToSettingsPage();

                          _this8._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION_SUCCESS_ALERT);

                          _this8._showUpdateSuccessAlert();

                        case 21:
                        case "end":
                          return _context12.stop();
                      }
                    }
                  }, _callee12);
                })));

              case 3:
                _context13.next = 10;
                break;

              case 5:
                _context13.prev = 5;
                _context13.t0 = _context13["catch"](0);

                this._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION_FAIL);

                this._unblockUpdateSession();

                console.error('error', _context13.t0);

              case 10:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[0, 5]]);
      }));

      function updateAgent(_x) {
        return _updateAgent.apply(this, arguments);
      }

      return updateAgent;
    }()
  }, {
    key: "reLoginAgent",
    value: function () {
      var _reLoginAgent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var _this9 = this;

        var _ref5,
            isBlock,
            alertMessage,
            fn,
            _args15 = arguments;

        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _ref5 = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : {}, isBlock = _ref5.isBlock, alertMessage = _ref5.alertMessage;

                fn = /*#__PURE__*/function () {
                  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
                    var _yield$_this9$_deps$a, access_token;

                    return regeneratorRuntime.wrap(function _callee14$(_context14) {
                      while (1) {
                        switch (_context14.prev = _context14.next) {
                          case 0:
                            if (alertMessage) {
                              _this9._deps.alert.danger({
                                message: alertMessage,
                                ttl: 0
                              });
                            }

                            _this9._deps.evAuth.sendLogoutTabEvent();

                            _context14.next = 4;
                            return _this9._deps.auth.refreshToken();

                          case 4:
                            _yield$_this9$_deps$a = _context14.sent;
                            access_token = _yield$_this9$_deps$a.access_token;

                            _this9.setAccessToken(access_token); // * then do logout send to every tab


                            _context14.next = 9;
                            return _this9._deps.evAuth.logoutAgent();

                          case 9:
                            _context14.next = 11;
                            return (0, _sleep["default"])(WAIT_EV_SERVER_ROLLBACK_DELAY);

                          case 11:
                            _context14.next = 13;
                            return _this9._deps.evAuth.loginAgent(_this9.accessToken);

                          case 13:
                          case "end":
                            return _context14.stop();
                        }
                      }
                    }, _callee14);
                  }));

                  return function fn() {
                    return _ref6.apply(this, arguments);
                  };
                }();

                return _context15.abrupt("return", isBlock ? this._deps.block.next(fn) : fn());

              case 3:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function reLoginAgent() {
        return _reLoginAgent.apply(this, arguments);
      }

      return reLoginAgent;
    }()
  }, {
    key: "onceLogoutThenLogin",
    value: function onceLogoutThenLogin() {
      var _this10 = this;

      return new Promise(function (resolve) {
        _this10._deps.evAuth.onceLogout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
          return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  _context16.next = 2;
                  return (0, _sleep["default"])(WAIT_EV_SERVER_ROLLBACK_DELAY);

                case 2:
                  resolve(_this10._deps.evAuth.loginAgent(_this10.accessToken));

                case 3:
                case "end":
                  return _context16.stop();
              }
            }
          }, _callee16);
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
    value: function _handleAgentResult(_ref8) {
      var _ref8$config = _ref8.config,
          message = _ref8$config.message,
          status = _ref8$config.status,
          isAgentUpdating = _ref8.isAgentUpdating,
          needAssignFormGroupValue = _ref8.needAssignFormGroupValue;

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
      var _autoConfigureAgent2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        var _this11 = this;

        var isFirstTab, timeoutId, resolves;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                console.log('_autoConfigureAgent~', this.tabManagerEnabled);
                isFirstTab = this._deps.tabManager.isFirstTab;

                if (!(this._autoConfigureRetryTimes >= 5)) {
                  _context19.next = 6;
                  break;
                }

                console.log('stop autoConfigureRetry~~', this._autoConfigureRetryTimes);
                this._autoConfigureRetryTimes = 0;
                return _context19.abrupt("return", this._configureFail(isFirstTab));

              case 6:
                timeoutId = null;

                if (!this.tabManagerEnabled) {
                  _context19.next = 10;
                  break;
                }

                resolves = [null, null, null];
                return _context19.abrupt("return", Promise.race([new Promise(function (res) {
                  console.log('res already success~~');

                  resolves[0] = function () {
                    return res('already success');
                  };

                  _this11._eventEmitter.once(_enums.agentSessionEvents.CONFIG_SUCCESS, resolves[0]);
                }), new Promise(function (res) {
                  resolves[1] = res; // check isSuccess first

                  if (_this11.isAgentUpdating || _this11._deps.tabManager.tabs.length !== 1) {
                    var checkIsAlive = function checkIsAlive() {
                      console.log('checkIsAlive~~');

                      _this11._tabConfigSuccess.isAlive().then( /*#__PURE__*/function () {
                        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(result) {
                          return regeneratorRuntime.wrap(function _callee17$(_context17) {
                            while (1) {
                              switch (_context17.prev = _context17.next) {
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
                                  return _context17.stop();
                              }
                            }
                          }, _callee17);
                        }));

                        return function (_x2) {
                          return _ref9.apply(this, arguments);
                        };
                      }());
                    };

                    checkIsAlive();
                  }
                }), new Promise(function (res) {
                  resolves[2] = res; // when there is too many tab, that event will block
                  // then check local

                  if (isFirstTab) {
                    _this11._tabConfigWorking.isLeave().then( /*#__PURE__*/function () {
                      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(result) {
                        return regeneratorRuntime.wrap(function _callee18$(_context18) {
                          while (1) {
                            switch (_context18.prev = _context18.next) {
                              case 0:
                                console.log('isLeave ?~', result);

                                if (result) {
                                  _this11._configWorkingAlive();

                                  console.log('res config~~');
                                  res('config');
                                }

                              case 2:
                              case "end":
                                return _context18.stop();
                            }
                          }
                        }, _callee18);
                      }));

                      return function (_x3) {
                        return _ref10.apply(this, arguments);
                      };
                    }());
                  }
                }), new Promise(function (res) {
                  timeoutId = setTimeout(function () {
                    res('retry');
                  }, 10000);
                })]).then(function (result) {
                  clearTimeout(timeoutId);

                  _this11._eventEmitter.off(_enums.agentSessionEvents.CONFIG_SUCCESS, resolves[0]);

                  console.log('clear all memory with promise~'); // clear all memory with promise

                  resolves.forEach(function (r) {
                    return r();
                  });
                  resolves.length = 0;
                  console.log('!!!!!', result);

                  switch (result) {
                    case 'retry':
                      console.log('retry auto config~');
                      _this11._autoConfigureRetryTimes++;
                      return _this11._autoConfigureAgent();

                    case 'other tab config':
                      console.log('_othersTabConfigureAgent in auto config~~');
                      return _this11._othersTabConfigureAgent();

                    case 'config':
                      {
                        console.log('configureAgent in auto config~~'); //! when reConfig, if that change queue or others field in ev admin, that will get error, should redirect to sessionPage

                        var config = _this11._checkFieldsResult({
                          selectedInboundQueueIds: _this11.selectedInboundQueueIds,
                          selectedSkillProfileId: _this11.selectedSkillProfileId,
                          loginType: _this11.loginType,
                          extensionNumber: _this11.extensionNumber
                        });

                        return _this11.configureAgent({
                          config: config
                        });
                      }

                    case 'already success':
                    default:
                      return Promise.resolve();
                  }
                })["catch"](function (e) {
                  console.log('_autoConfigureAgent error~~', e);

                  _this11._configureFail(isFirstTab);

                  return e;
                }));

              case 10:
                return _context19.abrupt("return", this.configureAgent());

              case 11:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
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

      this.setConfigSuccess(false);

      this._navigateToSessionConfigPage();
    }
  }, {
    key: "_othersTabConfigureAgent",
    value: function () {
      var _othersTabConfigureAgent2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                console.log('_othersTabConfigureAgent~~', this.configSuccess);

                if (!this.configSuccess) {
                  _context20.next = 3;
                  break;
                }

                return _context20.abrupt("return");

              case 3:
                _context20.next = 5;
                return this._deps.evClient.multiLoginRequest();

              case 5:
                _context20.next = 7;
                return this.updateAgentConfigs();

              case 7:
                if (!this.notInboundQueueSelected) {
                  _context20.next = 11;
                  break;
                }

                this._sendTabManager(_enums.tabManagerEvents.RELOGIN);

                _context20.next = 11;
                return this.reLoginAgent({
                  isBlock: true,
                  alertMessage: _enums.messageTypes.NOT_INBOUND_QUEUE_SELECTED
                });

              case 11:
                this._pollAskIfCanBeNewMainTab();

              case 12:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
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
      var _connectEvServer2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(config) {
        var _this12 = this;

        var result, status, currentLocale, confirmed;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                console.log('configure ev agent in _connectEvServer~~');
                _context22.next = 3;
                return this._deps.evClient.configureAgent(config);

              case 3:
                result = _context22.sent;
                status = result.data.status;

                if (!(status === _enums.messageTypes.EXISTING_LOGIN_FOUND)) {
                  _context22.next = 15;
                  break;
                }

                currentLocale = this._deps.locale.currentLocale; // TODO: think about sync up in all tabs?

                _context22.next = 9;
                return this._deps.modalUI.confirm({
                  title: _i18n["default"].getString('multipleLoginsTitle', currentLocale),
                  content: _i18n["default"].getString('multipleLoginsContent', currentLocale),
                  okText: _i18n["default"].getString('multipleLoginsConfirm', currentLocale),
                  cancelText: _i18n["default"].getString('multipleLoginsCancel', currentLocale),
                  onOK: function () {
                    var _onOK = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
                      return regeneratorRuntime.wrap(function _callee21$(_context21) {
                        while (1) {
                          switch (_context21.prev = _context21.next) {
                            case 0:
                              _context21.next = 2;
                              return _this12._deps.evClient.configureAgent(_objectSpread(_objectSpread({}, config), {}, {
                                isForce: true
                              }));

                            case 2:
                              result = _context21.sent;
                              _this12.isForceLogin = true;

                            case 4:
                            case "end":
                              return _context21.stop();
                          }
                        }
                      }, _callee21);
                    }));

                    function onOK() {
                      return _onOK.apply(this, arguments);
                    }

                    return onOK;
                  }(),
                  size: 'xsmall'
                }, true);

              case 9:
                confirmed = _context22.sent;

                if (confirmed) {
                  _context22.next = 13;
                  break;
                }

                this.isForceLogin = false;
                throw new Error(status);

              case 13:
                _context22.next = 18;
                break;

              case 15:
                if (!(status === _enums.messageTypes.EXISTING_LOGIN_ENGAGED)) {
                  _context22.next = 18;
                  break;
                }

                this._deps.alert.danger({
                  message: _enums.messageTypes.EXISTING_LOGIN_ENGAGED,
                  ttl: 0
                });

                throw new Error(_enums.messageTypes.EXISTING_LOGIN_ENGAGED);

              case 18:
                return _context22.abrupt("return", result);

              case 19:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function _connectEvServer(_x4) {
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
    value: function _getDialDest(_ref11) {
      var loginType = _ref11.loginType,
          extensionNumber = _ref11.extensionNumber;

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
      var _ref12 = this._deps.evAuth.agent || {},
          agentConfig = _ref12.agentConfig;

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
      var _this13 = this;

      var selectedSkillProfile = this.skillProfileList.find(function (profile) {
        return profile.profileId === _this13.formGroup.selectedSkillProfileId;
      });
      return selectedSkillProfile === null || selectedSkillProfile === void 0 ? void 0 : selectedSkillProfile.profileName;
    }
  }, {
    key: "selectedInboundQueues",
    get: function get() {
      var _this14 = this;

      var results = this.formGroup.selectedInboundQueueIds.map(function (id) {
        return _this14.inboundQueues.find(function (queue) {
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
}(_core.RcModuleV2), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_configSuccessAlive", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_configSuccessAlive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_configWorkingAlive", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_configWorkingAlive"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectedSkillProfileId", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "loginTypeList", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "loginTypeList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inboundQueues", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "inboundQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultSkillProfileId", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultSkillProfileId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "skillProfileList", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "skillProfileList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "selectedSkillProfile", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedSkillProfile"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "selectedInboundQueues", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedInboundQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetAllConfig", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetAllConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAccessToken", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAccessToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConfigSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConfigSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLoginType", [_dec10, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLoginType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSkillProfileId", [_dec11, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSkillProfileId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setInboundQueueIds", [_dec12, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setInboundQueueIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setExtensionNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setExtensionNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTakingCall", [_dec13, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTakingCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoAnswer", [_dec14, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoAnswer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFreshConfig", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFreshConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "assignFormGroupValue", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "assignFormGroupValue"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFormGroup", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFormGroup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isSessionChanged", [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "isSessionChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setMainTabId", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "_setMainTabId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_pollAskIfCanBeNewMainTab", [_dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "_pollAskIfCanBeNewMainTab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initTabLife", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "_initTabLife"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_destroyTabLife", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "_destroyTabLife"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "configureAgent", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "configureAgent"), _class2.prototype)), _class2)) || _class);
exports.EvAgentSession = EvAgentSession;
//# sourceMappingURL=EvAgentSession.js.map
