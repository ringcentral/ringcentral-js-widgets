"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConferenceDialerUI = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _DialerUI2 = require("../DialerUI");
var _dec, _class, _class2, _descriptor;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
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
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
var ConferenceDialerUI = (_dec = (0, _di.Module)({
  name: 'ConferenceDialerUI',
  deps: ['Locale', 'ConferenceCall', 'RouterInteraction', {
    dep: 'ConferenceDialerUIOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DialerUI) {
  _inherits(ConferenceDialerUI, _DialerUI);
  var _super = _createSuper(ConferenceDialerUI);
  function ConferenceDialerUI() {
    var _this;
    _classCallCheck(this, ConferenceDialerUI);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _initializerDefineProperty(_this, "lastSessionId", _descriptor, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(ConferenceDialerUI, [{
    key: "_setLastSessionId",
    value: function _setLastSessionId(val) {
      this.lastSessionId = val;
    }
  }, {
    key: "setLastSessionId",
    value: function () {
      var _setLastSessionId2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sessionId) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.lastSessionId !== sessionId) {
                  this.clearRecipient();
                  this.clearToNumberField();
                }
                this._setLastSessionId(sessionId);
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function setLastSessionId(_x) {
        return _setLastSessionId2.apply(this, arguments);
      }
      return setLastSessionId;
    }()
  }, {
    key: "_onBeforeCall",
    value: function _onBeforeCall(fromSessionId) {
      var _this$_deps$conferenc;
      if (this._deps.conferenceCall && fromSessionId && !((_this$_deps$conferenc = this._deps.conferenceCall.mergingPair) === null || _this$_deps$conferenc === void 0 ? void 0 : _this$_deps$conferenc.fromSessionId)) {
        // set mergingPair if has
        this._deps.conferenceCall.setMergeParty({
          fromSessionId: fromSessionId
        });
      }
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(ConferenceDialerUI.prototype), "getUIProps", this).call(this)), {}, {
        inConference: true,
        showFromField: false
      });
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
      var _this2 = this;
      var _props$params = props.params,
        fromNumber = _props$params.fromNumber,
        fromSessionId = _props$params.fromSessionId;
      return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(ConferenceDialerUI.prototype), "getUIFunctions", this).call(this, props)), {}, {
        onBack: function onBack() {
          return _this2._deps.routerInteraction.push(_this2._backURL);
        },
        setLastSessionId: function setLastSessionId() {
          return _this2.setLastSessionId(fromSessionId);
        },
        onCallButtonClick: function onCallButtonClick() {
          return _this2.onCallButtonClick({
            fromNumber: fromNumber,
            fromSessionId: fromSessionId
          });
        }
      });
    }
  }, {
    key: "_backURL",
    get: function get() {
      var _this$_deps$conferenc2;
      return ((_this$_deps$conferenc2 = this._deps.conferenceDialerUIOptions) === null || _this$_deps$conferenc2 === void 0 ? void 0 : _this$_deps$conferenc2.backURL) || '/calls/active';
    }
  }]);
  return ConferenceDialerUI;
}(_DialerUI2.DialerUI), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lastSessionId", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setLastSessionId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLastSessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLastSessionId", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setLastSessionId"), _class2.prototype)), _class2)) || _class);
exports.ConferenceDialerUI = ConferenceDialerUI;
//# sourceMappingURL=ConferenceDialerUI.js.map
