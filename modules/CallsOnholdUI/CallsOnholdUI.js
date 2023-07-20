"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallsOnholdUI = void 0;
require("regenerator-runtime/runtime");
var _ramda = require("ramda");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _ActiveCallsUI2 = require("../ActiveCallsUI");
var _dec, _dec2, _class, _class2;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
var CallsOnholdUI = (_dec = (0, _di.Module)({
  name: 'CallsOnholdUI',
  deps: ['RouterInteraction', {
    dep: 'CallsOnholdUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.callMonitor.calls, that.fromSessionId];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_ActiveCallsUI) {
  _inherits(CallsOnholdUI, _ActiveCallsUI);
  var _super = _createSuper(CallsOnholdUI);
  function CallsOnholdUI() {
    var _this;
    _classCallCheck(this, CallsOnholdUI);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.fromSessionId = void 0;
    return _this;
  }
  _createClass(CallsOnholdUI, [{
    key: "getUIProps",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function getUIProps(options) {
      this.fromSessionId = options.params.fromSessionId;
      return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(CallsOnholdUI.prototype), "getUIProps", this).call(this, options)), {}, {
        calls: this.calls
      });
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(options) {
      var _this2 = this;
      return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(CallsOnholdUI.prototype), "getUIFunctions", this).call(this, options)), {}, {
        onMerge: function () {
          var _onMerge = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sessionId) {
            var sessions, confId, confSessionId;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // to track user click merge
                    _this2._deps.callMonitor.callsOnHoldClickMergeTrack();

                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    _context.next = 3;
                    return _this2._deps.conferenceCall.parseMergingSessions({
                      sessionId: sessionId,
                      sessionIdToMergeWith: options.params.fromSessionId
                    });
                  case 3:
                    sessions = _context.sent;
                    if (!sessions) {
                      _context.next = 9;
                      break;
                    }
                    confId =
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    _this2._deps.conferenceCall.conferences &&
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    Object.keys(_this2._deps.conferenceCall.conferences)[0];
                    if (confId) {
                      confSessionId =
                      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                      _this2._deps.conferenceCall.conferences[confId].sessionId;
                      _this2._deps.routerInteraction.push("/calls/active/".concat(confSessionId));
                    } else {
                      _this2._deps.routerInteraction.goBack();
                    }
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    _context.next = 9;
                    return _this2._deps.conferenceCall.mergeSessions(sessions);
                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
          function onMerge(_x) {
            return _onMerge.apply(this, arguments);
          }
          return onMerge;
        }(),
        onBackButtonClick: function onBackButtonClick() {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          if (_this2._deps.webphone.sessions.length) {
            _this2._deps.routerInteraction.goBack();
            return;
          }
          _this2._deps.routerInteraction.go(-2);
        },
        onAdd: function onAdd() {
          // to track use click add button
          _this2._deps.callMonitor.callsOnHoldClickAddTrack();
          _this2._deps.routerInteraction.push("/conferenceCall/dialer/".concat(options.params.fromNumber, "/").concat(options.params.fromSessionId));
        },
        getAvatarUrl: options.getAvatarUrl,
        webphoneHangup: function () {
          var _webphoneHangup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sessionId) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    // track user click hangup on calls onhold page
                    _this2._deps.callMonitor.callsOnHoldClickHangupTrack();
                    return _context2.abrupt("return", _this2._deps.webphone && _this2._deps.webphone.hangup(sessionId));
                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));
          function webphoneHangup(_x2) {
            return _webphoneHangup.apply(this, arguments);
          }
          return webphoneHangup;
        }()
      });
    }
  }, {
    key: "calls",
    get: function get() {
      var _this3 = this;
      return (0, _ramda.filter)(function (call) {
        return (
          // @ts-expect-error TS(2769): No overload matches this call.
          call.webphoneSession &&
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          !_this3._deps.conferenceCall.isConferenceSession(call.webphoneSession.id) && call.webphoneSession.id !== _this3.fromSessionId
        );
      }, this._deps.callMonitor.calls);
    }
  }]);
  return CallsOnholdUI;
}(_ActiveCallsUI2.ActiveCallsUI), (_applyDecoratedDescriptor(_class2.prototype, "calls", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype)), _class2)) || _class);
exports.CallsOnholdUI = CallsOnholdUI;
//# sourceMappingURL=CallsOnholdUI.js.map
