"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getRingoutReducer = _interopRequireDefault(require("./getRingoutReducer"));

var _ringoutErrors = _interopRequireDefault(require("./ringoutErrors"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var DEFAULT_MONITOR_INTERVAL = 2500;
var DEFAULT_TIME_BETWEEN_CALLS = 10000;
/**
 * @class
 * @description Ringout managing module
 */

var Ringout = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Client', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'RingoutOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(Ringout, _RcModule);

  var _super = _createSuper(Ringout);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Number} params.monitorInterval - monitor interval, default 2500
   * @param {Number} params.timeBetweenCalls - time between calls, default 10000
   * @param {MontactMatcher} param.contactMatcher - contactMatcher module instance, optional
   */
  function Ringout(_ref) {
    var _this;

    var auth = _ref.auth,
        client = _ref.client,
        contactMatcher = _ref.contactMatcher,
        _ref$monitorInterval = _ref.monitorInterval,
        monitorInterval = _ref$monitorInterval === void 0 ? DEFAULT_MONITOR_INTERVAL : _ref$monitorInterval,
        _ref$timeBetweenCalls = _ref.timeBetweenCalls,
        timeBetweenCalls = _ref$timeBetweenCalls === void 0 ? DEFAULT_TIME_BETWEEN_CALLS : _ref$timeBetweenCalls,
        options = _objectWithoutProperties(_ref, ["auth", "client", "contactMatcher", "monitorInterval", "timeBetweenCalls"]);

    _classCallCheck(this, Ringout);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes["default"]
    }));
    _this._auth = auth;
    _this._client = client;
    _this._contactMatcher = contactMatcher;
    _this._reducer = (0, _getRingoutReducer["default"])(_this.actionTypes);
    _this._monitorInterval = monitorInterval;
    _this._timeBetweenCalls = timeBetweenCalls;
    return _this;
  }

  _createClass(Ringout, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        if (_this2._auth.loggedIn && !_this2.ready) {
          _this2.store.dispatch({
            type: _this2.actionTypes.initSuccess
          });
        } else if (!_this2._auth.loggedIn && _this2.ready) {
          _this2.store.dispatch({
            type: _this2.actionTypes.resetSuccess
          });
        }
      });
    }
  }, {
    key: "makeCall",
    value: function () {
      var _makeCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var fromNumber, toNumber, prompt, resp, startTime;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fromNumber = _ref2.fromNumber, toNumber = _ref2.toNumber, prompt = _ref2.prompt;

                if (!(this.status === _moduleStatuses["default"].ready)) {
                  _context.next = 23;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.startToConnect
                });
                _context.prev = 3;
                _context.next = 6;
                return this._client.account().extension().ringOut().post({
                  from: {
                    phoneNumber: fromNumber
                  },
                  to: {
                    phoneNumber: toNumber
                  },
                  playPrompt: prompt
                });

              case 6:
                resp = _context.sent;

                if (!this._contactMatcher) {
                  _context.next = 10;
                  break;
                }

                _context.next = 10;
                return this._contactMatcher.forceMatchBatchNumbers({
                  phoneNumbers: [fromNumber, toNumber]
                });

              case 10:
                startTime = Date.now();
                _context.next = 13;
                return this._monitorRingout(resp.id, startTime);

              case 13:
                this.store.dispatch({
                  type: this.actionTypes.connectSuccess
                });
                _context.next = 21;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](3);
                this.store.dispatch({
                  type: this.actionTypes.connectError
                });

                if (!(_context.t0.message !== _ringoutErrors["default"].pollingCancelled)) {
                  _context.next = 21;
                  break;
                }

                throw _context.t0;

              case 21:
                _context.next = 23;
                break;

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 16]]);
      }));

      function makeCall(_x) {
        return _makeCall.apply(this, arguments);
      }

      return makeCall;
    }()
  }, {
    key: "_monitorRingout",
    value: function () {
      var _monitorRingout2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ringoutId, startTime) {
        var callerStatus;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._fetchRingoutStatus(ringoutId);

              case 2:
                callerStatus = _context2.sent;

              case 3:
                if (!(callerStatus === 'InProgress')) {
                  _context2.next = 13;
                  break;
                }

                if (!(Date.now() - startTime > this._timeBetweenCalls)) {
                  _context2.next = 6;
                  break;
                }

                throw new Error(_ringoutErrors["default"].pollingCancelled);

              case 6:
                _context2.next = 8;
                return (0, _sleep["default"])(this._monitorInterval);

              case 8:
                _context2.next = 10;
                return this._fetchRingoutStatus(ringoutId);

              case 10:
                callerStatus = _context2.sent;
                _context2.next = 3;
                break;

              case 13:
                if (!(callerStatus !== 'Success' && callerStatus !== 'NoAnswer')) {
                  _context2.next = 15;
                  break;
                }

                throw new Error(_ringoutErrors["default"].firstLegConnectFailed);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _monitorRingout(_x2, _x3) {
        return _monitorRingout2.apply(this, arguments);
      }

      return _monitorRingout;
    }()
  }, {
    key: "_fetchRingoutStatus",
    value: function () {
      var _fetchRingoutStatus2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ringoutId) {
        var callStatus, resp, exception;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this._client.account().extension().ringOut(ringoutId).get()["catch"](function (error) {
                  if (error && error.response && error.response.status === 404) {
                    callStatus = 'Success';
                  }
                });

              case 3:
                resp = _context3.sent;
                return _context3.abrupt("return", callStatus || resp.status.callerStatus);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                exception = new Error(_ringoutErrors["default"].pollingFailed);
                exception.error = _context3.t0;
                throw exception;

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function _fetchRingoutStatus(_x4) {
        return _fetchRingoutStatus2.apply(this, arguments);
      }

      return _fetchRingoutStatus;
    }()
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ringoutStatus",
    get: function get() {
      return this.state.ringoutStatus;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }]);

  return Ringout;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "makeCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_monitorRingout", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_monitorRingout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchRingoutStatus", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchRingoutStatus"), _class2.prototype)), _class2)) || _class);
exports["default"] = Ringout;
//# sourceMappingURL=index.js.map
