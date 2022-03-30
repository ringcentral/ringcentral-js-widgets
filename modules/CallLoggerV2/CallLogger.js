"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogger = void 0;

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.slice");

var _ramda = require("ramda");

var _core = require("@ringcentral-integration/core");

var _callLoggerTriggerTypes = require("../../enums/callLoggerTriggerTypes");

var _callLogHelpers = require("../../lib/callLogHelpers");

var _di = require("../../lib/di");

var _LoggerBaseV = require("../../lib/LoggerBaseV2");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _callLoggerHelper = require("./callLoggerHelper");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_OPACITY = 20;
var CallLogger = (_dec = (0, _di.Module)({
  name: 'CallLogger',
  deps: ['Storage', 'CallHistory', 'CallMonitor', 'CallLoggerOptions', {
    dep: 'ActivityMatcher',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.transferredCallsList];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_LoggerBase) {
  _inherits(CallLogger, _LoggerBase);

  var _super = _createSuper(CallLogger);

  function CallLogger(deps) {
    var _this;

    _classCallCheck(this, CallLogger);

    _this = _super.call(this, deps, {
      enableCache: true,
      storageKey: 'CallLogger'
    });
    _this._customMatcherHooks = [];
    _this._identityFunction = _callLoggerHelper.callIdentityFunction;
    _this._logFunction = _this._deps.callLoggerOptions.logFunction;
    _this._readyCheckFunction = _this._deps.callLoggerOptions.readyCheckFunction;

    _initializerDefineProperty(_this, "autoLog", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "logOnRinging", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "transferredCallsList", _descriptor3, _assertThisInitialized(_this));

    if (typeof _this._deps.callLoggerOptions.autoLog !== 'undefined') {
      _this.autoLog = _this._deps.callLoggerOptions.autoLog;
    }

    return _this;
  }

  _createClass(CallLogger, [{
    key: "_setLogOnRinging",
    value: function _setLogOnRinging(logOnRinging) {
      this.logOnRinging = !!logOnRinging;
    }
  }, {
    key: "_setAutoLog",
    value: function _setAutoLog(autoLog) {
      this.autoLog = !!autoLog;
    }
  }, {
    key: "_addTransferredCall",
    value: function _addTransferredCall(sessionId, transferredMiddleNumber) {
      this.transferredCallsList = [].concat(_toConsumableArray(this.transferredCallsList.slice(this.transferredCallsList.length >= DEFAULT_OPACITY ? 1 : 0, DEFAULT_OPACITY)), [_defineProperty({}, sessionId, {
        transferredMiddleNumber: transferredMiddleNumber
      })]);
    }
  }, {
    key: "log",
    value: function () {
      var _log = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var call, options;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                call = _ref2.call, options = _objectWithoutProperties(_ref2, ["call"]);
                return _context.abrupt("return", _get(_getPrototypeOf(CallLogger.prototype), "log", this).call(this, _objectSpread({
                  item: call
                }, options)));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function log(_x) {
        return _log.apply(this, arguments);
      }

      return log;
    }()
  }, {
    key: "_ensureActive",
    value: function () {
      var _ensureActive2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var isActive;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = !this._deps.tabManager;

                if (_context2.t0) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 4;
                return this._deps.tabManager.checkIsMain();

              case 4:
                _context2.t0 = _context2.sent;

              case 5:
                isActive = _context2.t0;
                return _context2.abrupt("return", isActive);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _ensureActive() {
        return _ensureActive2.apply(this, arguments);
      }

      return _ensureActive;
    }()
  }, {
    key: "_shouldLogNewCall",
    value: function () {
      var _shouldLogNewCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(call) {
        var isActive;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._ensureActive();

              case 2:
                isActive = _context3.sent;
                return _context3.abrupt("return", isActive && this.autoLog && (this.logOnRinging || !(0, _callLogHelpers.isRinging)(call)));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _shouldLogNewCall(_x2) {
        return _shouldLogNewCall2.apply(this, arguments);
      }

      return _shouldLogNewCall;
    }()
  }, {
    key: "logCall",
    value: function () {
      var _logCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref3) {
        var call, contact, options, inbound, fromEntity, toEntity;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                call = _ref3.call, contact = _ref3.contact, options = _objectWithoutProperties(_ref3, ["call", "contact"]);
                inbound = (0, _callLogHelpers.isInbound)(call);
                fromEntity = inbound && contact || null;
                toEntity = !inbound && contact || null;
                _context4.next = 6;
                return this.log(_objectSpread(_objectSpread({}, options), {}, {
                  call: _objectSpread(_objectSpread({}, call), {}, {
                    duration: Object.prototype.hasOwnProperty.call(call, 'duration') ? call.duration : Math.round((Date.now() - call.startTime) / 1000),
                    result: call.result || call.telephonyStatus
                  }),
                  fromEntity: fromEntity,
                  toEntity: toEntity
                }));

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function logCall(_x3) {
        return _logCall.apply(this, arguments);
      }

      return logCall;
    }()
  }, {
    key: "_autoLogCall",
    value: function () {
      var _autoLogCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref4) {
        var call, fromEntity, toEntity, triggerType;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                call = _ref4.call, fromEntity = _ref4.fromEntity, toEntity = _ref4.toEntity, triggerType = _ref4.triggerType;

                if (this.ready) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return");

              case 3:
                _context5.next = 5;
                return this.log({
                  call: _objectSpread(_objectSpread({}, call), {}, {
                    duration: Object.prototype.hasOwnProperty.call(call, 'duration') ? call.duration : Math.round((Date.now() - call.startTime) / 1000),
                    result: call.result || call.telephonyStatus
                  }),
                  fromEntity: fromEntity,
                  toEntity: toEntity,
                  triggerType: triggerType
                });

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _autoLogCall(_x4) {
        return _autoLogCall2.apply(this, arguments);
      }

      return _autoLogCall;
    }()
  }, {
    key: "_activityMatcherCheck",
    value: function _activityMatcherCheck(sessionId) {
      return !this._deps.activityMatcher.dataMapping[sessionId] || !this._deps.activityMatcher.dataMapping[sessionId].length;
    }
  }, {
    key: "_customMatcherCheck",
    value: function _customMatcherCheck(sessionId) {
      if (!this._customMatcherHooks.length) {
        return true;
      }

      return this._customMatcherHooks.some(function (hook) {
        return hook(sessionId);
      });
    }
  }, {
    key: "addCustomMatcherHook",
    value: function addCustomMatcherHook(hook) {
      this._customMatcherHooks.push(hook);
    }
  }, {
    key: "_onNewCall",
    value: function () {
      var _onNewCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(call, triggerType) {
        var toNumberEntity, fromMatches, toMatches, fromEntity, toEntity;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._shouldLogNewCall(call);

              case 2:
                if (!_context6.sent) {
                  _context6.next = 20;
                  break;
                }

                _context6.next = 5;
                return this._deps.activityMatcher.triggerMatch();

              case 5:
                if (!(this._activityMatcherCheck(call.sessionId) && this._customMatcherCheck(call.sessionId))) {
                  _context6.next = 18;
                  break;
                }

                _context6.next = 8;
                return this._deps.contactMatcher.triggerMatch();

              case 8:
                toNumberEntity = call.toNumberEntity || '';
                fromMatches = call.from && call.from.phoneNumber && this._deps.contactMatcher.dataMapping[call.from.phoneNumber] || [];
                toMatches = call.to && call.to.phoneNumber && this._deps.contactMatcher.dataMapping[call.to.phoneNumber] || [];
                fromEntity = fromMatches && fromMatches.length === 1 && fromMatches[0] || null;
                toEntity = null;

                if (toMatches && toMatches.length === 1) {
                  /* eslint { "prefer-destructuring": 0 } */
                  toEntity = toMatches[0];
                } else if (toMatches && toMatches.length > 1 && toNumberEntity !== '') {
                  toEntity = toMatches.find(function (match) {
                    return toNumberEntity === match.id;
                  });
                }

                _context6.next = 16;
                return this._autoLogCall({
                  call: call,
                  fromEntity: fromEntity,
                  toEntity: toEntity,
                  triggerType: triggerType
                });

              case 16:
                _context6.next = 20;
                break;

              case 18:
                _context6.next = 20;
                return this._autoLogCall({
                  call: call,
                  triggerType: triggerType
                });

              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _onNewCall(_x5, _x6) {
        return _onNewCall2.apply(this, arguments);
      }

      return _onNewCall;
    }()
  }, {
    key: "_shouldLogUpdatedCall",
    value: function () {
      var _shouldLogUpdatedCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(call) {
        var isActive, activityMatches;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._ensureActive();

              case 2:
                isActive = _context7.sent;

                if (!(isActive && (this.logOnRinging || !(0, _callLogHelpers.isRinging)(call)))) {
                  _context7.next = 10;
                  break;
                }

                if (!this.autoLog) {
                  _context7.next = 6;
                  break;
                }

                return _context7.abrupt("return", true);

              case 6:
                _context7.next = 8;
                return this._deps.activityMatcher.triggerMatch();

              case 8:
                activityMatches = this._deps.activityMatcher.dataMapping[call.sessionId] || [];
                return _context7.abrupt("return", activityMatches.length > 0);

              case 10:
                return _context7.abrupt("return", false);

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _shouldLogUpdatedCall(_x7) {
        return _shouldLogUpdatedCall2.apply(this, arguments);
      }

      return _shouldLogUpdatedCall;
    }()
  }, {
    key: "_onCallUpdated",
    value: function () {
      var _onCallUpdated2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(call, triggerType) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._shouldLogUpdatedCall(call);

              case 2:
                if (!_context8.sent) {
                  _context8.next = 5;
                  break;
                }

                _context8.next = 5;
                return this._autoLogCall({
                  call: call,
                  triggerType: triggerType
                });

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _onCallUpdated(_x8, _x9) {
        return _onCallUpdated2.apply(this, arguments);
      }

      return _onCallUpdated;
    }()
  }, {
    key: "_onCallAnswered",
    value: function () {
      var _onCallAnswered2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(call) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function _onCallAnswered(_x10) {
        return _onCallAnswered2.apply(this, arguments);
      }

      return _onCallAnswered;
    }()
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      (0, _core.watch)(this, function () {
        return _this2._deps.callMonitor.calls;
      }, function (newCalls, oldCalls) {
        if (_this2.ready) {
          var _oldCalls;

          oldCalls = ((_oldCalls = oldCalls) === null || _oldCalls === void 0 ? void 0 : _oldCalls.slice()) || [];
          (0, _callLogHelpers.removeDuplicateSelfCalls)(newCalls).forEach(function (call) {
            var oldCallIndex = oldCalls.findIndex(function (item) {
              return item.sessionId === call.sessionId;
            });

            if (oldCallIndex === -1) {
              _this2._onNewCall(call, _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
            } else {
              var oldCall = oldCalls[oldCallIndex];
              oldCalls.splice(oldCallIndex, 1);

              if (call.telephonyStatus !== oldCall.telephonyStatus) {
                _this2._onCallUpdated(_objectSpread(_objectSpread({}, call), {}, {
                  isTransferredCall: !!_this2.transferredCallsMap[call.sessionId],
                  transferredMiddleNumber: _this2.transferredCallsMap[call.sessionId] ? _this2.transferredCallsMap[call.sessionId].transferredMiddleNumber : null
                }), _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);

                if (oldCall.telephonyStatus === 'Ringing' && call.telephonyStatus === 'CallConnected') {
                  _this2._onCallAnswered(call);
                }
              }

              if ((call.from && call.from.phoneNumber) !== (oldCall.from && oldCall.from.phoneNumber)) {
                var _oldCall$from;

                _this2._addTransferredCall(call.sessionId, (_oldCall$from = oldCall.from) === null || _oldCall$from === void 0 ? void 0 : _oldCall$from.phoneNumber);

                _this2._onCallUpdated(_objectSpread(_objectSpread({}, call), {}, {
                  isTransferredCall: true,
                  transferredMiddleNumber: oldCall.from && oldCall.from.phoneNumber,
                  phoneNumberUpdated: true
                }), _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
              }
            }
          });
          oldCalls.forEach(function (call) {
            _this2._onCallUpdated(_objectSpread(_objectSpread({}, call), {}, {
              isTransferredCall: !!_this2.transferredCallsMap[call.sessionId],
              transferredMiddleNumber: _this2.transferredCallsMap[call.sessionId] ? _this2.transferredCallsMap[call.sessionId].transferredMiddleNumber : null
            }), _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
          });
        }
      });
      (0, _core.watch)(this, function () {
        return _this2._deps.callHistory.endedCalls;
      }, function (newCall, oldCalls) {
        if (_this2.ready) {
          var _oldCalls2;

          oldCalls = ((_oldCalls2 = oldCalls) === null || _oldCalls2 === void 0 ? void 0 : _oldCalls2.slice()) || [];
          var currentSessions = {};
          newCall.forEach(function (call) {
            currentSessions[call.sessionId] = true;
          });
          oldCalls.forEach(function (call) {
            if (!currentSessions[call.sessionId]) {
              // call log updated
              var callInfo = _this2._deps.callHistory.calls.find(function (item) {
                return item.sessionId === call.sessionId;
              });

              if (callInfo) {
                _this2._onCallUpdated(_objectSpread(_objectSpread({}, callInfo), {}, {
                  isTransferredCall: !!_this2.transferredCallsMap[callInfo.sessionId],
                  transferredMiddleNumber: _this2.transferredCallsMap[call.sessionId] ? _this2.transferredCallsMap[call.sessionId].transferredMiddleNumber : null
                }), _callLoggerTriggerTypes.callLoggerTriggerTypes.callLogSync);
              }
            }
          });
        }
      });
    }
  }, {
    key: "setAutoLog",
    value: function () {
      var _setAutoLog2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(autoLog) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this.ready && autoLog !== this.autoLog) {
                  this._setAutoLog(autoLog);
                }

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function setAutoLog(_x11) {
        return _setAutoLog2.apply(this, arguments);
      }

      return setAutoLog;
    }()
  }, {
    key: "setLogOnRinging",
    value: function () {
      var _setLogOnRinging2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(logOnRinging) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (this.ready && logOnRinging !== this.logOnRinging) {
                  this._setLogOnRinging(logOnRinging);
                }

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function setLogOnRinging(_x12) {
        return _setLogOnRinging2.apply(this, arguments);
      }

      return setLogOnRinging;
    }()
  }, {
    key: "transferredCallsMap",
    get: function get() {
      return (0, _ramda.reduce)(function (mapping, matcher) {
        return _objectSpread(_objectSpread({}, mapping), matcher);
      }, {}, this.transferredCallsList);
    }
  }]);

  return CallLogger;
}(_LoggerBaseV.LoggerBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "autoLog", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "logOnRinging", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "transferredCallsList", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setLogOnRinging", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLogOnRinging"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setAutoLog", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setAutoLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addTransferredCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addTransferredCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "log", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "log"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_shouldLogNewCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_shouldLogNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "logCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "logCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_autoLogCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_autoLogCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onNewCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_shouldLogUpdatedCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_shouldLogUpdatedCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCallUpdated", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCallUpdated"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCallAnswered", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCallAnswered"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoLog", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogOnRinging", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogOnRinging"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transferredCallsMap", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "transferredCallsMap"), _class2.prototype)), _class2)) || _class);
exports.CallLogger = CallLogger;
//# sourceMappingURL=CallLogger.js.map
