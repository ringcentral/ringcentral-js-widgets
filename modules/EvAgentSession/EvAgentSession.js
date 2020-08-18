"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAgentSession = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _ramda = require("ramda");

var _di = require("ringcentral-integration/lib/di");

var _sleep = _interopRequireDefault(require("ringcentral-integration/lib/sleep"));

var _enums = require("../../enums");

var _heartBeat = require("../../lib/heartBeat");

var _trackEvents = require("../../lib/trackEvents");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var ACCEPTABLE_LOGIN_TYPES = [_enums.loginTypes.integratedSoftphone, _enums.loginTypes.RC_PHONE, _enums.loginTypes.externalPhone];
var DEFAULT_LOGIN_TYPE = _enums.loginTypes.integratedSoftphone;
var NONE = _enums.dropDownOptions.None; // wait all tab is logout complete, server has some delay after logout

var WAIT_EV_SERVER_ROLLBACK_DELAY = 2000;
var DEFAULT_FORM_GROUP = {
  selectedInboundQueueIds: [],
  loginType: DEFAULT_LOGIN_TYPE,
  selectedSkillProfileId: NONE,
  extensionNumber: ''
};
var EvAgentSession = (_dec = (0, _di.Module)({
  name: 'EvAgentSession',
  deps: ['EvClient', 'Auth', 'EvAuth', 'Storage', 'Alert', 'Auth', 'Locale', 'RegionSettings', 'RouterInteraction', 'Modal', 'Block', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvAgentSessionOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.locale.currentLocale];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.agent.agentConfig, that._deps.auth.isFreshLogin];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.skillProfileList];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.agent.agentConfig, that._deps.locale.currentLocale];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that.skillProfileList, that.selectedSkillProfileId];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that.inboundQueues, that.selectedInboundQueueIds];
}), _dec8 = (0, _core.track)(function (_, type) {
  return [_trackEvents.trackEvents.agentSessionSetLoginType, {
    value: type
  }];
}), _dec9 = (0, _core.track)(function (_, skillProfileId) {
  return [_trackEvents.trackEvents.agentSessionSetSkillProfileId, {
    value: skillProfileId
  }];
}), _dec10 = (0, _core.track)(function (_, ids) {
  return [_trackEvents.trackEvents.agentSessionSetInboundQueueIds, {
    value: ids
  }];
}), _dec11 = (0, _core.track)(function (_, takingCall) {
  return [_trackEvents.trackEvents.agentSessionSetTakingCall, {
    value: takingCall
  }];
}), _dec12 = (0, _core.track)(function (_, autoAnswer) {
  return [_trackEvents.trackEvents.agentSessionSetAutoAnswer, {
    value: autoAnswer
  }];
}), _dec13 = (0, _core.computed)(function (that) {
  return [that.selectedInboundQueueIds, that.selectedSkillProfileId, that.loginType, that.extensionNumber, that.formGroup];
}), _dec14 = (0, _core.track)(function (that) {
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
    key: "isConfigTab",
    get: function get() {
      var _this$_heartBeat;

      return !this.tabManagerEnabled || ((_this$_heartBeat = this._heartBeat) === null || _this$_heartBeat === void 0 ? void 0 : _this$_heartBeat.isSuccessByLocal);
    }
  }, {
    key: "shouldBlockBrowser",
    get: function get() {
      // when there is not integrated softphone and not has multiple tabs
      return !this.isIntegratedSoftphone && !this.hasMultipleTabs;
    }
  }]);

  function EvAgentSession(deps) {
    var _this$_deps$evAgentSe, _this$_deps$evAgentSe2;

    var _this;

    _classCallCheck(this, EvAgentSession);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvAgentSession'
    });
    _this.isForceLogin = false;
    _this.onConfigSuccess = [];
    _this.onTriggerConfig = [];
    _this.clearCalls = void 0;
    _this._loginPromise = void 0;
    _this._heartBeat = void 0;
    _this._isAgentUpdating = false;
    _this._updateSessionBlockId = void 0;

    _initializerDefineProperty(_this, "selectedSkillProfileId", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "selectedInboundQueueIds", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "loginType", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "extensionNumber", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "takingCall", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "autoAnswer", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "configured", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "configSuccess", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "formGroup", _descriptor9, _assertThisInitialized(_this));

    var heartBeatInterval = (_this$_deps$evAgentSe = (_this$_deps$evAgentSe2 = _this._deps.evAgentSessionOptions) === null || _this$_deps$evAgentSe2 === void 0 ? void 0 : _this$_deps$evAgentSe2.heartBeatInterval) !== null && _this$_deps$evAgentSe !== void 0 ? _this$_deps$evAgentSe : 1000;

    if (_this.tabManagerEnabled) {
      _this._heartBeat = new _heartBeat.HeartBeat("".concat(_this._deps.tabManager._tabbie.prefix, "sessionConfig"), heartBeatInterval);
    } // #region those event should put in constructor, that _shouldInit will effect that binding timing.


    _this._deps.evAuth.onLoginSuccess( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this._isAgentUpdating) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _this._afterLogin();

              if (!(!_this._deps.auth.isFreshLogin && _this.configured)) {
                _context.next = 13;
                break;
              }

              _context.prev = 4;
              _context.next = 7;
              return _this._autoConfigureAgent();

            case 7:
              return _context.abrupt("return", _context.sent);

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](4);
              console.error(_context.t0);

            case 13:
              _this.setFreshConfig();

              _this._deps.routerInteraction.push('/sessionConfig');

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 10]]);
    })));

    _this.onConfigSuccess.push( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_this._isAgentUpdating) {
                _this._isAgentUpdating = false;
              } else {
                _this._deps.routerInteraction.push('/dialer');
              }

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _this._deps.evAuth.beforeAgentLogout(function () {
      var _this$_heartBeat2;

      if (!_this._isAgentUpdating) {
        _this.resetAllConfig();
      }

      _this.setConfigSuccess(false);

      (_this$_heartBeat2 = _this._heartBeat) === null || _this$_heartBeat2 === void 0 ? void 0 : _this$_heartBeat2.destroy();
    }); // #endregion


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
    key: "setConfigSuccess",
    value: function setConfigSuccess(status) {
      if (status) {
        this._onConfigureAgentSuccess();
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
      this.autoAnswer = false;
      this.configSuccess = false;
      this.configured = false;
      this.selectedSkillProfileId = this.defaultSkillProfile;
      this.selectedInboundQueueIds = this.inboundQueues.map(function (inboundQueue) {
        return inboundQueue.gateId;
      });
    }
  }, {
    key: "assignFormGroupValue",
    value: function assignFormGroupValue() {
      var _this$formGroup = this.formGroup,
          selectedInboundQueueIds = _this$formGroup.selectedInboundQueueIds,
          extensionNumber = _this$formGroup.extensionNumber,
          loginType = _this$formGroup.loginType,
          selectedSkillProfileId = _this$formGroup.selectedSkillProfileId;
      this.setInboundQueueIds(selectedInboundQueueIds);
      this.setExtensionNumber(extensionNumber);
      this.setLoginType(loginType);
      this.setSkillProfileId(selectedSkillProfileId);
      this.resetFormGroup();
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
        extensionNumber: this.extensionNumber
      });
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return _get(_getPrototypeOf(EvAgentSession.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn && this._deps.evAuth.connected;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _get(_getPrototypeOf(EvAgentSession.prototype), "_shouldReset", this).call(this) && !this._deps.auth.loggedIn;
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.ready && this.tabManagerEnabled && this._deps.tabManager.ready)) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this._checkTabManagerEvent();

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }

      return onStateChange;
    }()
  }, {
    key: "_checkTabManagerEvent",
    value: function () {
      var _checkTabManagerEvent2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this2 = this;

        var event;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                event = this._deps.tabManager.event;

                if (!event) {
                  _context5.next = 29;
                  break;
                }

                _context5.t0 = event.name;
                _context5.next = _context5.t0 === _enums.tabManagerEvents.AGENT_CONFIG_SUCCESS ? 5 : _context5.t0 === _enums.tabManagerEvents.UPDATE_SESSION ? 8 : _context5.t0 === _enums.tabManagerEvents.UPDATE_SESSION_SUCCESS ? 12 : _context5.t0 === _enums.tabManagerEvents.UPDATE_SESSION_SUCCESS_ALERT ? 26 : 28;
                break;

              case 5:
                _context5.next = 7;
                return this._othersTabConfigureAgent();

              case 7:
                return _context5.abrupt("break", 29);

              case 8:
                this._updateSessionBlockId = this._deps.block.block();
                this._isAgentUpdating = true;

                this._deps.evAuth.onceLogout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return (0, _sleep["default"])(WAIT_EV_SERVER_ROLLBACK_DELAY);

                        case 2:
                          _this2._loginPromise = _this2._deps.evAuth.loginAgent();

                        case 3:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                })));

                return _context5.abrupt("break", 29);

              case 12:
                _context5.prev = 12;
                _context5.next = 15;
                return this._loginPromise;

              case 15:
                _context5.next = 17;
                return this._autoConfigureAgent();

              case 17:
                this._deps.block.unblock(this._updateSessionBlockId);

                this._isAgentUpdating = false;
                _context5.next = 25;
                break;

              case 21:
                _context5.prev = 21;
                _context5.t1 = _context5["catch"](12);
                // when that auto config fail, just reload that tab
                console.log(_context5.t1);
                window.location.reload();

              case 25:
                return _context5.abrupt("break", 29);

              case 26:
                this._showUpdateSuccessAlert();

                return _context5.abrupt("break", 29);

              case 28:
                return _context5.abrupt("break", 29);

              case 29:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[12, 21]]);
      }));

      function _checkTabManagerEvent() {
        return _checkTabManagerEvent2.apply(this, arguments);
      }

      return _checkTabManagerEvent;
    }()
  }, {
    key: "_afterLogin",
    value: function _afterLogin() {
      var _this3 = this;

      // if that is not first login set SessionConfig data again
      if (!this._deps.auth.isFreshLogin) {
        var checkSelectIsInList = this.skillProfileList.some(function (profile) {
          return profile.profileId === _this3.selectedSkillProfileId;
        });

        if (!checkSelectIsInList) {
          this.setSkillProfileId(this.defaultSkillProfile);
        } // check all selected queue is in inboundQueue list


        var checkedInboundQueues = this.selectedInboundQueueIds.reduce(function (result, inboundQueueId) {
          if (_this3.inboundQueues.some(function (inboundQueue) {
            return inboundQueue.gateId === inboundQueueId;
          })) {
            result.push(inboundQueueId);
          }

          return result;
        }, []);
        this.setInboundQueueIds(checkedInboundQueues);
      }
    }
    /**
     * config agent in session config page
     * @param triggerEvent is that should trigger event, default is true
     */

  }, {
    key: "configureAgent",
    value: function () {
      var _configureAgent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var triggerEvent,
            config,
            result,
            _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                triggerEvent = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : true;
                config = this._checkFieldsResult();

                this._clearCalls();

                _context6.next = 5;
                return this._connectEvServer(config);

              case 5:
                result = _context6.sent;

                if (!(result.data.status !== 'SUCCESS')) {
                  _context6.next = 13;
                  break;
                }

                this._deps.routerInteraction.push('/sessionConfig');

                _context6.next = 10;
                return this._deps.evAuth.newReconnect(false);

              case 10:
                _context6.next = 12;
                return this._connectEvServer(config);

              case 12:
                result = _context6.sent;

              case 13:
                this._handleAgentResult(result.data);

                if (triggerEvent) {
                  this._onTriggerAgentConfig();

                  this._sendTabManager(_enums.tabManagerEvents.AGENT_CONFIG_SUCCESS);

                  this.setConfigSuccess(true);
                }

                if (this.tabManagerEnabled) {
                  this._heartBeat.heartBeatOnSuccess();
                }

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function configureAgent() {
        return _configureAgent.apply(this, arguments);
      }

      return configureAgent;
    }()
  }, {
    key: "updateAgent",
    value: function () {
      var _updateAgent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(voiceConnectionChanged) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._deps.block.next( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                  var config, result;
                  return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          config = _this4._checkFieldsResult();

                          _this4._clearCalls();

                          _this4._isAgentUpdating = true;

                          if (!voiceConnectionChanged) {
                            _context7.next = 13;
                            break;
                          }

                          _this4._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION);

                          _this4._deps.evAuth.sendLogoutTabEvent();

                          _context7.next = 8;
                          return _this4._deps.evAuth.logoutAgent();

                        case 8:
                          _context7.next = 10;
                          return (0, _sleep["default"])(WAIT_EV_SERVER_ROLLBACK_DELAY);

                        case 10:
                          _context7.next = 12;
                          return _this4._deps.evAuth.loginAgent();

                        case 12:
                          config.isForce = true;

                        case 13:
                          _context7.next = 15;
                          return _this4._connectEvServer(config);

                        case 15:
                          result = _context7.sent;

                          _this4._handleAgentResult(result.data);

                          _this4._onTriggerAgentConfig();

                          _this4.setConfigSuccess(true);

                          _context7.next = 21;
                          return _this4.updateAgentConfigs();

                        case 21:
                          if (_this4.tabManagerEnabled) {
                            _this4._heartBeat.heartBeatOnSuccess();
                          }

                          if (voiceConnectionChanged) {
                            _this4._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION_SUCCESS);
                          }

                          _this4.goToSettingsPage();

                          _this4._sendTabManager(_enums.tabManagerEvents.UPDATE_SESSION_SUCCESS_ALERT);

                          _this4._showUpdateSuccessAlert();

                        case 26:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                })));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function updateAgent(_x) {
        return _updateAgent.apply(this, arguments);
      }

      return updateAgent;
    }()
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
    value: function _handleAgentResult(_ref5) {
      var message = _ref5.message,
          status = _ref5.status;

      if (status !== 'SUCCESS') {
        if (typeof message === 'string') {
          this._deps.alert.danger({
            message: _enums.messageTypes.AGENT_CONFIG_DETAIL_ERROR,
            ttl: 0,
            payload: message
          });
        } else {
          this._deps.alert.danger({
            message: this._isAgentUpdating ? _enums.messageTypes.UPDATE_AGENT_ERROR : _enums.messageTypes.AGENT_CONFIG_ERROR,
            ttl: 0
          });
        }

        throw new Error(message);
      }

      this.assignFormGroupValue();
    }
  }, {
    key: "_autoConfigureAgent",
    value: function _autoConfigureAgent() {
      if (this.tabManagerEnabled) {
        var isWorkingByLocal = this._heartBeat.isWorkingByLocal;

        if (!isWorkingByLocal) {
          this._heartBeat.heartBeatOnWorking();
        } // check isSuccess first


        if (this._heartBeat.isSuccessByLocal || this._isAgentUpdating) {
          return this._othersTabConfigureAgent();
        } // then check local


        if (!isWorkingByLocal) {
          return this.configureAgent();
        }
      } else {
        return this.configureAgent();
      }
    }
  }, {
    key: "_othersTabConfigureAgent",
    value: function () {
      var _othersTabConfigureAgent2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!this.configSuccess) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt("return");

              case 2:
                _context9.prev = 2;
                _context9.next = 5;
                return this._deps.evClient.multiLoginRequest();

              case 5:
                this.setConfigSuccess(true);
                _context9.next = 8;
                return this.updateAgentConfigs();

              case 8:
                this._heartBeat.heartBeatOnSuccess();

                return _context9.abrupt("return");

              case 12:
                _context9.prev = 12;
                _context9.t0 = _context9["catch"](2);
                console.log(_context9.t0);

              case 15:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[2, 12]]);
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

                this._deps.evAuth.setAgent(agent);

              case 5:
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
  }, {
    key: "_connectEvServer",
    value: function () {
      var _connectEvServer2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(config) {
        var _this5 = this;

        var result, status, currentLocale, modalId;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this._deps.evClient.configureAgent(config);

              case 2:
                result = _context12.sent;
                status = result.data.status;

                if (!(status === _enums.messageTypes.EXISTING_LOGIN_FOUND)) {
                  _context12.next = 14;
                  break;
                }

                currentLocale = this._deps.locale.currentLocale; // TODO: think about sync up in all tabs?

                _context12.next = 8;
                return this._deps.modal.confirmSync({
                  title: _i18n["default"].getString('multipleLoginsTitle', currentLocale),
                  content: _i18n["default"].getString('multipleLoginsContent', currentLocale),
                  okText: _i18n["default"].getString('multipleLoginsConfirm', currentLocale),
                  cancelText: _i18n["default"].getString('multipleLoginsCancel', currentLocale),
                  onOK: function () {
                    var _onOK = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                      return regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                          switch (_context11.prev = _context11.next) {
                            case 0:
                              _context11.next = 2;
                              return _this5._deps.evClient.configureAgent(_objectSpread(_objectSpread({}, config), {}, {
                                isForce: true
                              }));

                            case 2:
                              result = _context11.sent;
                              _this5.isForceLogin = true;

                            case 4:
                            case "end":
                              return _context11.stop();
                          }
                        }
                      }, _callee11);
                    }));

                    function onOK() {
                      return _onOK.apply(this, arguments);
                    }

                    return onOK;
                  }()
                });

              case 8:
                modalId = _context12.sent;

                if (modalId) {
                  _context12.next = 12;
                  break;
                }

                this.isForceLogin = false;
                throw new Error(status);

              case 12:
                _context12.next = 17;
                break;

              case 14:
                if (!(status === _enums.messageTypes.EXISTING_LOGIN_ENGAGED)) {
                  _context12.next = 17;
                  break;
                }

                this._deps.alert.danger({
                  message: _enums.messageTypes.EXISTING_LOGIN_ENGAGED,
                  ttl: 0
                });

                throw new Error(_enums.messageTypes.EXISTING_LOGIN_ENGAGED);

              case 17:
                return _context12.abrupt("return", result);

              case 18:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function _connectEvServer(_x2) {
        return _connectEvServer2.apply(this, arguments);
      }

      return _connectEvServer;
    }()
  }, {
    key: "_checkFieldsResult",
    value: function _checkFieldsResult() {
      if (this.formGroup.selectedInboundQueueIds.length === 0) {
        this._deps.alert.danger({
          message: _enums.messageTypes.NO_AGENT_SELECTED,
          ttl: 0
        });

        throw new Error("'queueIds' is an empty array.");
      }

      return {
        dialDest: this._getDialDest(),
        queueIds: this.formGroup.selectedInboundQueueIds,
        skillProfileId: this.formGroup.selectedSkillProfileId === NONE ? '' : this.formGroup.selectedSkillProfileId
      };
    }
  }, {
    key: "_getDialDest",
    value: function _getDialDest() {
      // Only external phone has number input
      switch (this.formGroup.loginType) {
        case _enums.loginTypes.externalPhone:
          {
            if (!this.formGroup.extensionNumber) {
              this._deps.alert.danger({
                message: _enums.messageTypes.EMPTY_PHONE_NUMBER,
                ttl: 0
              });

              throw new Error("'extensionNumber' is an empty number.");
            }

            var formatPhoneNumber = (0, _phoneNumber.format)({
              phoneNumber: this.formGroup.extensionNumber,
              areaCode: this._deps.regionSettings.areaCode
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
            return this.formGroup.extensionNumber;
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
      if (typeof this.clearCalls === 'function') {
        this.clearCalls();
      }
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

      return (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2._tabbie.enabled;
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
      var agentConfig = this._deps.evAuth.agent.agentConfig;

      if (!agentConfig || !agentConfig.inboundSettings) {
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
    key: "defaultSkillProfile",
    get: function get() {
      var defaultSkill = this._pickSkillProfile(this.skillProfileList);

      return defaultSkill ? defaultSkill.profileId : NONE;
    }
  }, {
    key: "skillProfileList",
    get: function get() {
      var agentConfig = this._deps.evAuth.agent.agentConfig;

      if (!agentConfig || !agentConfig.inboundSettings) {
        return [];
      }

      var _agentConfig$inboundS2 = agentConfig.inboundSettings.availableSkillProfiles,
          availableSkillProfiles = _agentConfig$inboundS2 === void 0 ? [] : _agentConfig$inboundS2;

      var defaultSkill = this._pickSkillProfile(availableSkillProfiles);

      if (!defaultSkill && availableSkillProfiles.length > 0) {
        availableSkillProfiles.unshift({
          profileId: NONE,
          profileName: _i18n["default"].getString(NONE, this._deps.locale.currentLocale)
        });
      }

      return availableSkillProfiles;
    }
  }, {
    key: "selectedSkillProfile",
    get: function get() {
      var _this6 = this;

      var selectedSkillProfile = this.skillProfileList.find(function (profile) {
        return profile.profileId === _this6.formGroup.selectedSkillProfileId;
      });
      return selectedSkillProfile === null || selectedSkillProfile === void 0 ? void 0 : selectedSkillProfile.profileName;
    }
  }, {
    key: "selectedInboundQueues",
    get: function get() {
      var _this7 = this;

      var results = this.formGroup.selectedInboundQueueIds.map(function (id) {
        return _this7.inboundQueues.find(function (queue) {
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
    key: "isSessionChanged",
    get: function get() {
      var sessionConfigs = {
        selectedInboundQueueIds: this.selectedInboundQueueIds,
        selectedSkillProfileId: this.selectedSkillProfileId,
        loginType: this.loginType,
        extensionNumber: this.extensionNumber
      };
      return !(0, _ramda.equals)(sessionConfigs, this.formGroup);
    }
  }]);

  return EvAgentSession;
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
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "formGroup", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DEFAULT_FORM_GROUP;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "loginTypeList", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "loginTypeList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inboundQueues", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "inboundQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultSkillProfile", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultSkillProfile"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "skillProfileList", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "skillProfileList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "selectedSkillProfile", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedSkillProfile"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "selectedInboundQueues", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedInboundQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetAllConfig", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetAllConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConfigSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConfigSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLoginType", [_dec8, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLoginType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSkillProfileId", [_dec9, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSkillProfileId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setInboundQueueIds", [_dec10, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setInboundQueueIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setExtensionNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setExtensionNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTakingCall", [_dec11, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTakingCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoAnswer", [_dec12, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoAnswer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFreshConfig", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFreshConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFormGroup", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setFormGroup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isSessionChanged", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "isSessionChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "configureAgent", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "configureAgent"), _class2.prototype)), _class2)) || _class);
exports.EvAgentSession = EvAgentSession;
//# sourceMappingURL=EvAgentSession.js.map
