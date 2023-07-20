"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.entries");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAgentScript = void 0;
require("regenerator-runtime/runtime");
var _events = require("events");
var _ramda = require("ramda");
var _debounceThrottle = require("@ringcentral-integration/commons/lib/debounce-throttle");
var _di = require("@ringcentral-integration/commons/lib/di");
var _SingleTabBroadcastChannel = require("@ringcentral-integration/commons/lib/SingleTabBroadcastChannel");
var _core = require("@ringcentral-integration/core");
var _enums = require("../../enums");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
var EvAgentScript = (_dec = (0, _di.Module)({
  name: 'EvAgentScript',
  deps: ['EvClient', 'EvAuth', 'EvCall', 'Storage', 'TabManager', 'EvCallMonitor', {
    dep: 'EvAgentScriptOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_ref) {
  _inherits(EvAgentScript, _ref);
  var _super = _createSuper(EvAgentScript);
  function EvAgentScript(deps) {
    var _this;
    _classCallCheck(this, EvAgentScript);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvAgentScript'
    });
    _this._channel = void 0;
    _this._eventEmitter = new _events.EventEmitter();
    _this._hadResponse = false;
    // currentChatScripts: any = null;
    _initializerDefineProperty(_this, "currentCallScript", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "isDisplayAgentScript", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "callScriptResultMapping", _descriptor3, _assertThisInitialized(_this));
    _this.debouncedSetCallScriptResult = (0, _debounceThrottle.debounce)({
      fn: _this.setCallScriptResult
    });
    return _this;
  }
  _createClass(EvAgentScript, [{
    key: "setIsDisplayAgentScript",
    value: function setIsDisplayAgentScript(state) {
      this.isDisplayAgentScript = state;
    }
  }, {
    key: "setCurrentCallScript",
    value: function setCurrentCallScript(script) {
      this.currentCallScript = script;
    }
  }, {
    key: "setCallScriptResult",
    value: function setCallScriptResult(id, data) {
      this.callScriptResultMapping[id] = data;
      this._eventEmitter.emit(_enums.agentScriptEvents.SET_SCRIPT_RESULT, id, data);
    }
  }, {
    key: "reset",
    value: function reset() {
      console.log('!!!EvAgentScript reset');
      // this.setIsDisplayAgentScript(false);
    }
  }, {
    key: "onSetScriptResult",
    value: function onSetScriptResult(cb) {
      this._eventEmitter.on(_enums.agentScriptEvents.SET_SCRIPT_RESULT, cb);
    }
  }, {
    key: "onUpdateDisposition",
    value: function onUpdateDisposition(cb) {
      this._eventEmitter.on(_enums.agentScriptEvents.UPDATE_DISPOSITION, cb);
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this._bindChannel();

      // when script change emit that
      (0, _core.watch)(this, function () {
        return _this2.currentCallScript;
      }, function () {
        _this2._responseInitScript();
      });
      this._deps.evCallMonitor.onCallAnswered( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(call) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!_this2.getIsAgentScript(call)) {
                    _context.next = 3;
                    break;
                  }
                  _context.next = 3;
                  return _this2.getScript(call.scriptId, call.scriptVersion, 'CALL', call.uii);
                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
      this._deps.evAuth.beforeAgentLogout(function () {
        _this2.reset();
      });
    }
  }, {
    key: "onInit",
    value: function onInit() {
      console.log('EvAgentScript!! init');
      this.setIsDisplayAgentScript(true);
    }
  }, {
    key: "getIsAgentScript",
    value: function getIsAgentScript(call) {
      return !!(this.isDisplayAgentScript && (call === null || call === void 0 ? void 0 : call.scriptId));
    }
  }, {
    key: "_bindChannel",
    value: function _bindChannel() {
      var _this3 = this;
      if (this._deps.tabManager.enable && !sessionStorage.getItem(_enums.EV_AGENT_SCRIPT_BROADCAST_KEY)) {
        sessionStorage.setItem(_enums.EV_AGENT_SCRIPT_BROADCAST_KEY, this._deps.tabManager.id);
      }
      this._channel = new _SingleTabBroadcastChannel.SingleTabBroadcastChannel(_enums.EV_AGENT_SCRIPT_BROADCAST_KEY, {
        from: _enums.EV_APP_PAGE_KEY,
        to: _enums.EV_AGENT_SCRIPT_PAGE_KEY
      }).init();
      this._channel.addEventListener(function (_ref3) {
        var data = _ref3.data;
        var key = data.key,
          value = data.value;
        var _this3$_deps$evCall = _this3._deps.evCall,
          activityCallId = _this3$_deps$evCall.activityCallId,
          currentCall = _this3$_deps$evCall.currentCall;
        if (_this3.isDisplayAgentScript && activityCallId && (currentCall === null || currentCall === void 0 ? void 0 : currentCall.scriptId)) {
          switch (key) {
            case _enums.agentScriptEvents.INIT:
              _this3._responseInitScript();
              break;
            case _enums.agentScriptEvents.SET_SCRIPT_RESULT:
              _this3.debouncedSetCallScriptResult(activityCallId, value);
              break;
            case _enums.agentScriptEvents.GET_KNOWLEDGE_BASE_ARTICLES:
              _this3._getKnowledgeBaseGroups(value);
              break;
            case _enums.agentScriptEvents.UPDATE_DISPOSITION:
              _this3._eventEmitter.emit(_enums.agentScriptEvents.UPDATE_DISPOSITION, activityCallId, value);
              break;
            default:
              break;
          }
        }
      });

      // if that agent Script is more quick than CTI app, that will need emit that when app init.
      setTimeout(function () {
        if (_this3.currentCallScript && !_this3._hadResponse) {
          _this3._responseInitScript();
        }
      }, 1000);
    }
  }, {
    key: "_getKnowledgeBaseGroups",
    value: function () {
      var _getKnowledgeBaseGroups2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(knowledgeBaseGroupIds) {
        var value;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._deps.evClient.getKnowledgeBaseGroups(knowledgeBaseGroupIds);
              case 2:
                value = _context2.sent;
                this._channel.send({
                  key: _enums.agentScriptEvents.GET_KNOWLEDGE_BASE_ARTICLES,
                  value: value
                });
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _getKnowledgeBaseGroups(_x2) {
        return _getKnowledgeBaseGroups2.apply(this, arguments);
      }
      return _getKnowledgeBaseGroups;
    }()
  }, {
    key: "_responseInitScript",
    value: function _responseInitScript() {
      this._channel.send({
        key: _enums.agentScriptEvents.INIT,
        value: {
          config: this.currentCallScript,
          call: this._deps.evCall.currentCall
        }
      });
      this._hadResponse = true;
    }
  }, {
    key: "getScript",
    value: function () {
      var _getScript = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(scriptId) {
        var version,
          type,
          uii,
          response,
          result,
          _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                version = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
                type = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 'CALL';
                uii = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : null;
                _context3.next = 5;
                return this._deps.evClient.getScript(scriptId, version);
              case 5:
                response = _context3.sent;
                // TODO: that will fix in next MR
                result = {
                  scriptId: response.scriptId,
                  // scriptName: response.scriptName,
                  // finalResult: null as any, // used for reporting
                  // navPosition: null as any,
                  // version: response.version,
                  data: JSON.parse(response.json)
                };
                _context3.t0 = type;
                _context3.next = _context3.t0 === 'CALL' ? 10 : 12;
                break;
              case 10:
                this.setCurrentCallScript(result);
                return _context3.abrupt("break", 13);
              case 12:
                return _context3.abrupt("break", 13);
              case 13:
                return _context3.abrupt("return", result);
              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function getScript(_x3) {
        return _getScript.apply(this, arguments);
      }
      return getScript;
    }()
    /**
     * @param call - the corresponding chat or call object
     */
  }, {
    key: "saveScriptResult",
    value: function saveScriptResult(call) {
      var scriptResult = this.callScriptResultMapping[this._deps.evClient.encodeUii({
        uii: call.uii,
        sessionId: call.session.sessionId
      })];
      if (scriptResult) {
        var result = this._formatScriptResult(scriptResult);
        this._deps.evClient.saveScriptResult(call.uii, call.scriptId, result);
      }
    }
  }, {
    key: "_formatScriptResult",
    value: function _formatScriptResult(scriptResult) {
      var resultCopy = (0, _ramda.clone)(scriptResult);
      resultCopy.model = (0, _ramda.reduce)(function (output, _ref4) {
        var _value$leadField;
        var _ref5 = _slicedToArray(_ref4, 2),
          key = _ref5[0],
          value = _ref5[1];
        var result = value;
        if (result.value !== undefined) {
          result = result.value;
        }
        output[key] = {
          value: result,
          leadField: (_value$leadField = value.leadField) !== null && _value$leadField !== void 0 ? _value$leadField : ''
        };
        return output;
      }, {}, Object.entries(resultCopy.model));
      return resultCopy;
    }
  }]);
  return EvAgentScript;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentCallScript", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isDisplayAgentScript", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "callScriptResultMapping", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setIsDisplayAgentScript", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsDisplayAgentScript"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCurrentCallScript", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCurrentCallScript"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCallScriptResult", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCallScriptResult"), _class2.prototype)), _class2)) || _class);
exports.EvAgentScript = EvAgentScript;
//# sourceMappingURL=EvAgentScript.js.map
