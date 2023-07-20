"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ringout = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _ringoutErrors = require("./ringoutErrors");
var _ringoutStatus = require("./ringoutStatus");
var _dec, _class, _class2, _descriptor;
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
var DEFAULT_MONITOR_INTERVAL = 2500;
var DEFAULT_TIME_BETWEEN_CALLS = 10000;
var Ringout = (_dec = (0, _di.Module)({
  name: 'Ringout',
  deps: ['Auth', 'Client', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'RingoutOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Ringout, _RcModuleV);
  var _super = _createSuper(Ringout);
  function Ringout(deps) {
    var _this$_deps$ringoutOp, _this$_deps$ringoutOp2, _this$_deps$ringoutOp3, _this$_deps$ringoutOp4;
    var _this;
    _classCallCheck(this, Ringout);
    _this = _super.call(this, {
      deps: deps
    });
    _this._monitorInterval = void 0;
    _this._timeBetweenCalls = void 0;
    _initializerDefineProperty(_this, "ringoutStatus", _descriptor, _assertThisInitialized(_this));
    _this._monitorInterval = (_this$_deps$ringoutOp = (_this$_deps$ringoutOp2 = _this._deps.ringoutOptions) === null || _this$_deps$ringoutOp2 === void 0 ? void 0 : _this$_deps$ringoutOp2.monitorInterval) !== null && _this$_deps$ringoutOp !== void 0 ? _this$_deps$ringoutOp : DEFAULT_MONITOR_INTERVAL;
    _this._timeBetweenCalls = (_this$_deps$ringoutOp3 = (_this$_deps$ringoutOp4 = _this._deps.ringoutOptions) === null || _this$_deps$ringoutOp4 === void 0 ? void 0 : _this$_deps$ringoutOp4.timeBetweenCalls) !== null && _this$_deps$ringoutOp3 !== void 0 ? _this$_deps$ringoutOp3 : DEFAULT_TIME_BETWEEN_CALLS;
    return _this;
  }
  _createClass(Ringout, [{
    key: "setRingoutStatus",
    value: function setRingoutStatus(ringoutStatus) {
      this.ringoutStatus = ringoutStatus;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.auth.loggedIn && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !this._deps.auth.loggedIn && this.ready;
    }
  }, {
    key: "makeCall",
    value: function () {
      var _makeCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var fromNumber, toNumber, prompt, resp, startTime;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fromNumber = _ref.fromNumber, toNumber = _ref.toNumber, prompt = _ref.prompt;
                if (!this.ready) {
                  _context.next = 23;
                  break;
                }
                this.setRingoutStatus(_ringoutStatus.ringoutStatus.connecting);
                _context.prev = 3;
                _context.next = 6;
                return this._deps.client.account().extension().ringOut().post({
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
                if (!this._deps.contactMatcher) {
                  _context.next = 10;
                  break;
                }
                _context.next = 10;
                return this._deps.contactMatcher.forceMatchBatchNumbers({
                  phoneNumbers: [fromNumber, toNumber]
                });
              case 10:
                startTime = Date.now();
                _context.next = 13;
                return this._monitorRingout(resp.id, startTime);
              case 13:
                this.setRingoutStatus(_ringoutStatus.ringoutStatus.idle);
                _context.next = 21;
                break;
              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](3);
                this.setRingoutStatus(_ringoutStatus.ringoutStatus.idle);
                if (!(_context.t0.message !== _ringoutErrors.ringoutErrors.pollingCancelled)) {
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
                throw new Error(_ringoutErrors.ringoutErrors.pollingCancelled);
              case 6:
                _context2.next = 8;
                return (0, _utils.sleep)(this._monitorInterval);
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
                throw new Error(_ringoutErrors.ringoutErrors.firstLegConnectFailed);
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
        var callStatus, resp;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this._deps.client.account().extension().ringOut(ringoutId).get()["catch"](function (error) {
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
                throw new Error(_ringoutErrors.ringoutErrors.pollingFailed);
              case 10:
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
  }]);
  return Ringout;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ringoutStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _ringoutStatus.ringoutStatus.idle;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setRingoutStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setRingoutStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_monitorRingout", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_monitorRingout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchRingoutStatus", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchRingoutStatus"), _class2.prototype)), _class2)) || _class);
exports.Ringout = Ringout;
//# sourceMappingURL=Ringout.js.map
