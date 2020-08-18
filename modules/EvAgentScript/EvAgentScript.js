"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAgentScript = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.entries");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _events = require("events");

var _ramda = require("ramda");

var _di = require("ringcentral-integration/lib/di");

var _enums = require("../../enums");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var EvAgentScript = (_dec = (0, _di.Module)({
  name: 'EvAgentScript',
  deps: ['EvClient', 'EvAuth', 'EvCall', 'Storage', {
    dep: 'EvAgentScriptOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvAgentScript, _RcModuleV);

  var _super = _createSuper(EvAgentScript);

  function EvAgentScript(deps) {
    var _this;

    _classCallCheck(this, EvAgentScript);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvAgentScript'
    });
    _this.broadcastChannel = new BroadcastChannel(_enums.BROADCAST_KEY);
    _this._eventEmitter = new _events.EventEmitter();

    _initializerDefineProperty(_this, "currentCallScript", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isAgentScript", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "callScriptResultMapping", _descriptor3, _assertThisInitialized(_this));

    return _this;
  } // currentChatScripts: any = null;


  _createClass(EvAgentScript, [{
    key: "setIsAgentScript",
    value: function setIsAgentScript(state) {
      this.isAgentScript = state;
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
      this.setIsAgentScript(false);
    }
  }, {
    key: "onSetScriptResult",
    value: function onSetScriptResult(cb) {
      this._eventEmitter.on(_enums.agentScriptEvents.SET_SCRIPT_RESULT, cb);
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      this.broadcastChannel.onmessage = function (_ref) {
        var data = _ref.data;

        if (_this2.isAgentScript) {
          switch (data.key) {
            case _enums.agentScriptEvents.INIT:
              {
                var currentCall = _this2._deps.evCall.currentCall;

                if (currentCall === null || currentCall === void 0 ? void 0 : currentCall.scriptId) {
                  _this2._sendInitScript();
                }
              }
              break;

            case _enums.agentScriptEvents.SET_SCRIPT_RESULT:
              {
                var _currentCall = _this2._deps.evCall.currentCall;

                if (_currentCall) {
                  _this2.setCallScriptResult(_currentCall.uii, data.data);
                }
              }
              break;

            default:
              break;
          }
        }
      };

      this._deps.evAuth.beforeAgentLogout(function () {
        _this2.reset();
      });
    }
  }, {
    key: "_sendInitScript",
    value: function _sendInitScript() {
      this.broadcastChannel.postMessage({
        key: _enums.agentScriptEvents.INIT,
        value: this.currentCallScript
      });
    }
  }, {
    key: "getScript",
    value: function () {
      var _getScript = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(scriptId) {
        var version,
            type,
            uii,
            response,
            result,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                version = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
                type = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'CALL';
                uii = _args.length > 3 && _args[3] !== undefined ? _args[3] : null;
                _context.next = 5;
                return this._deps.evClient.getScript(scriptId, version);

              case 5:
                response = _context.sent;
                // TODO: that will fix in next MR
                result = {
                  scriptId: response.scriptId,
                  // scriptName: response.scriptName,
                  // finalResult: null as any, // used for reporting
                  // navPosition: null as any,
                  // version: response.version,
                  data: JSON.parse(response.json)
                };
                _context.t0 = type;
                _context.next = _context.t0 === 'CALL' ? 10 : 13;
                break;

              case 10:
                this.setCurrentCallScript(result);

                this._sendInitScript();

                return _context.abrupt("break", 14);

              case 13:
                return _context.abrupt("break", 14);

              case 14:
                return _context.abrupt("return", result);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getScript(_x) {
        return _getScript.apply(this, arguments);
      }

      return getScript;
    }()
    /**
     * @param call - the corresponding chat or call object
     */

  }, {
    key: "saveScriptResult",
    value: function () {
      var _saveScriptResult = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(call) {
        var scriptResult, result, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                scriptResult = this.callScriptResultMapping[call.uii];

                if (!scriptResult) {
                  _context2.next = 13;
                  break;
                }

                result = this._formatScriptResult(scriptResult);
                _context2.prev = 3;
                _context2.next = 6;
                return this._deps.evClient.saveScriptResult(call.uii, call.scriptId, result);

              case 6:
                res = _context2.sent;
                return _context2.abrupt("return", res);

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](3);
                console.log('saveScriptResult fail', _context2.t0);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 10]]);
      }));

      function saveScriptResult(_x2) {
        return _saveScriptResult.apply(this, arguments);
      }

      return saveScriptResult;
    }()
  }, {
    key: "_formatScriptResult",
    value: function _formatScriptResult(scriptResult) {
      var resultCopy = (0, _ramda.clone)(scriptResult);
      resultCopy.model = (0, _ramda.reduce)(function (output, _ref2) {
        var _value$leadField;

        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

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
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentCallScript", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isAgentScript", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "setIsAgentScript", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsAgentScript"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCurrentCallScript", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCurrentCallScript"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCallScriptResult", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCallScriptResult"), _class2.prototype)), _class2)) || _class);
exports.EvAgentScript = EvAgentScript;
//# sourceMappingURL=EvAgentScript.js.map
