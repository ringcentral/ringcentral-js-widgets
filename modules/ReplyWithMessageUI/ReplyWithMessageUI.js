"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplyWithMessageUI = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _i18n = _interopRequireDefault(require("./i18n"));
var _ReplyWithMessageUI = require("./ReplyWithMessageUI.interface");
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
var ReplyWithMessageUI = (_dec = (0, _di.Module)({
  name: 'ReplyWithMessageUI',
  deps: ['Locale', 'RouterInteraction', {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'ActiveCallControl',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ReplyWithMessageUI, _RcUIModuleV);
  var _super = _createSuper(ReplyWithMessageUI);
  function ReplyWithMessageUI(deps) {
    _classCallCheck(this, ReplyWithMessageUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(ReplyWithMessageUI, [{
    key: "getUIProps",
    value: function getUIProps() {
      var minString = _i18n["default"].getString('min', this._deps.locale.currentLocale);
      var hourString = _i18n["default"].getString('hour', this._deps.locale.currentLocale);
      return {
        currentLocale: this._deps.locale.currentLocale,
        options: [{
          pattern: _ReplyWithMessageUI.ReplyWithPattern.inAMeeting,
          text: _i18n["default"].getString('inAMeeting', this._deps.locale.currentLocale)
        }, {
          pattern: _ReplyWithMessageUI.ReplyWithPattern.onMyWay,
          text: _i18n["default"].getString('onMyWay', this._deps.locale.currentLocale)
        }, {
          pattern: _ReplyWithMessageUI.ReplyWithPattern.callMeBack,
          text: _i18n["default"].getString('callMeBackIn', this._deps.locale.currentLocale),
          options: [{
            text: "5 ".concat(minString),
            timeValue: 5,
            timeUnits: 'Minute'
          }, {
            text: "10 ".concat(minString),
            timeValue: 10,
            timeUnits: 'Minute'
          }, {
            text: "30 ".concat(minString),
            timeValue: 30,
            timeUnits: 'Minute'
          }, {
            text: "1 ".concat(hourString),
            timeValue: 1,
            timeUnits: 'Hour'
          }]
        }, {
          pattern: _ReplyWithMessageUI.ReplyWithPattern.willCallYouBack,
          text: _i18n["default"].getString('willCallYouBackIn', this._deps.locale.currentLocale),
          options: [{
            text: "5 ".concat(minString),
            timeValue: 5,
            timeUnits: 'Minute'
          }, {
            text: "10 ".concat(minString),
            timeValue: 10,
            timeUnits: 'Minute'
          }, {
            text: "30 ".concat(minString),
            timeValue: 30,
            timeUnits: 'Minute'
          }, {
            text: "1 ".concat(hourString),
            timeValue: 1,
            timeUnits: 'Hour'
          }]
        }],
        displayCustomMessage: true
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref) {
      var _this = this;
      var _ref$params = _ref.params,
        sessionId = _ref$params.sessionId,
        _ref$params$type = _ref$params.type,
        type = _ref$params$type === void 0 ? 'active' : _ref$params$type;
      return {
        onBackClick: function onBackClick() {
          _this._deps.routerInteraction.goBack();
        },
        reply: function () {
          var _reply = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
            var _this$_deps$activeCal;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(type === 'active')) {
                      _context.next = 3;
                      break;
                    }
                    _context.next = 3;
                    return (_this$_deps$activeCal = _this._deps.activeCallControl) === null || _this$_deps$activeCal === void 0 ? void 0 : _this$_deps$activeCal.replyWithMessage(params, sessionId);
                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
          function reply(_x) {
            return _reply.apply(this, arguments);
          }
          return reply;
        }()
      };
    }
  }]);
  return ReplyWithMessageUI;
}(_core.RcUIModuleV2)) || _class);
exports.ReplyWithMessageUI = ReplyWithMessageUI;
//# sourceMappingURL=ReplyWithMessageUI.js.map
