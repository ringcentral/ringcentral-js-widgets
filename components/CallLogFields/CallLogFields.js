"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.map");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _bindDebounce = require("../../lib/bindDebounce");

var _FieldItem = require("./FieldItem");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DEFAULT_INPUT_SAVE_TIMEOUT = 2e3;

var CallLogFields = /*#__PURE__*/function (_Component) {
  _inherits(CallLogFields, _Component);

  var _super = _createSuper(CallLogFields);

  function CallLogFields() {
    var _this;

    _classCallCheck(this, CallLogFields);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.debounce = (0, _bindDebounce.bindDebounce)(_assertThisInitialized(_this), DEFAULT_INPUT_SAVE_TIMEOUT);

    _this.renderFields = function () {
      var _this$props = _this.props,
          _this$props$currentLo = _this$props.currentLog,
          customLogFields = _this$props$currentLo.customLogFields,
          _this$props$currentLo2 = _this$props$currentLo.currentLogCall;
      _this$props$currentLo2 = _this$props$currentLo2 === void 0 ? {} : _this$props$currentLo2;
      var isAutoSave = _this$props$currentLo2.isAutoSave,
          call = _this$props$currentLo.call,
          _this$props$currentLo3 = _this$props$currentLo.task,
          task = _this$props$currentLo3 === void 0 ? {} : _this$props$currentLo3,
          refs = _this$props.refs,
          onSaveCallLog = _this$props.onSaveCallLog;

      var onSave = function onSave() {
        return isAutoSave && task.id && onSaveCallLog(call);
      };

      return _toConsumableArray(customLogFields).sort(function (a, b) {
        return a.sort - b.sort;
      }).map(function (fieldOption, i) {
        return /*#__PURE__*/_react["default"].createElement(_FieldItem.FieldItem, _extends({}, _this.props, {
          fieldRef: refs[fieldOption.value],
          fieldOption: fieldOption,
          debounce: _this.debounce,
          "data-sign": "callLogField",
          key: "field-".concat(i),
          onSave: onSave,
          timeout: DEFAULT_INPUT_SAVE_TIMEOUT
        }));
      });
    };

    return _this;
  }

  _createClass(CallLogFields, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          currentLog = _this$props2.currentLog,
          classes = _this$props2.classes;

      if (!currentLog.task) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].callLogFieldsSection, classes.root)
      }, this.renderFields());
    }
  }]);

  return CallLogFields;
}(_react.Component);

exports["default"] = CallLogFields;
CallLogFields.defaultProps = {
  currentLog: {},
  onUpdateCallLog: undefined,
  onSelectViewVisible: function onSelectViewVisible() {
    return null;
  },
  onSaveCallLog: undefined,
  customInputDataStruct: undefined,
  subjectDropdownsTracker: undefined,
  startAdornmentRender: function startAdornmentRender() {
    return null;
  },
  contactSearch: undefined,
  classes: {},
  refs: {}
};
//# sourceMappingURL=CallLogFields.js.map
