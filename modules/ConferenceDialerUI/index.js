"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("regenerator-runtime/runtime");

var _di = require("ringcentral-integration/lib/di");

var _proxify = _interopRequireDefault(require("ringcentral-integration/lib/proxy/proxify"));

var _Enum = _interopRequireDefault(require("ringcentral-integration/lib/Enum"));

var _DialerUI2 = _interopRequireDefault(require("../DialerUI"));

var _getReducer = _interopRequireDefault(require("./getReducer"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var ConferenceDialerUI = (_dec = (0, _di.Module)({
  name: 'ConferenceDialerUI',
  deps: ['ConferenceCall', 'RouterInteraction']
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_DialerUI) {
  _inherits(ConferenceDialerUI, _DialerUI);

  function ConferenceDialerUI(_ref) {
    var _this;

    var conferenceCall = _ref.conferenceCall,
        routerInteraction = _ref.routerInteraction,
        _ref$backURL = _ref.backURL,
        backURL = _ref$backURL === void 0 ? '/calls/active' : _ref$backURL,
        options = _objectWithoutProperties(_ref, ["conferenceCall", "routerInteraction", "backURL"]);

    _classCallCheck(this, ConferenceDialerUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConferenceDialerUI).call(this, _objectSpread({}, options)));
    _this._conferenceCall = conferenceCall;
    _this._routerInteraction = routerInteraction;
    _this._backURL = backURL;
    _this._reducer = (0, _getReducer["default"])(_this.actionTypes);
    return _this;
  }

  _createClass(ConferenceDialerUI, [{
    key: "setLastSessionId",
    value: function setLastSessionId(sessionId) {
      return regeneratorRuntime.async(function setLastSessionId$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.lastSessionId !== sessionId) {
                this.clearRecipient();
                this.clearToNumberField();
              }

              this.store.dispatch({
                type: this.actionTypes.setLastSessionId,
                sessionId: sessionId
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_onBeforeCall",
    value: function _onBeforeCall(fromSessionId) {
      if (fromSessionId && this._conferenceCall.mergingPair && !this._conferenceCall.mergingPair.fromSessionId) {
        // set mergingPair if has
        this._conferenceCall.setMergeParty({
          fromSessionId: fromSessionId
        });
      }
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      return _objectSpread({}, _get(_getPrototypeOf(ConferenceDialerUI.prototype), "getUIProps", this).call(this), {
        showFromField: false
      });
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this2 = this;

      var _ref2$params = _ref2.params,
          fromNumber = _ref2$params.fromNumber,
          fromSessionId = _ref2$params.fromSessionId;
      return _objectSpread({}, _get(_getPrototypeOf(ConferenceDialerUI.prototype), "getUIFunctions", this).call(this), {
        onBack: function onBack() {
          return _this2._routerInteraction.push(_this2._backURL);
        },
        setLastSessionId: function setLastSessionId() {
          return _this2.setLastSessionId(fromSessionId);
        },
        onCallButtonClick: function onCallButtonClick() {
          return _this2.onCallButtonClick({
            fromNumber: fromNumber,
            fromSessionId: fromSessionId
          });
        },
        inConference: true
      });
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      return new _Enum["default"]([].concat(_toConsumableArray(Object.keys(_get(_getPrototypeOf(ConferenceDialerUI.prototype), "_actionTypes", this))), ['setLastSessionId']), 'conferenceDialerUI');
    }
  }, {
    key: "lastSessionId",
    get: function get() {
      return this.state.lastSessionId;
    }
  }]);

  return ConferenceDialerUI;
}(_DialerUI2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "setLastSessionId", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setLastSessionId"), _class2.prototype)), _class2)) || _class);
exports["default"] = ConferenceDialerUI;
//# sourceMappingURL=index.js.map
