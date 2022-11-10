"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogFieldsInput = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.number.constructor");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _juno = require("@ringcentral/juno");

var _bindDebounce = require("../../../../lib/bindDebounce");

var _bindNextPropsUpdate = require("../../../../lib/bindNextPropsUpdate");

var _styles = _interopRequireDefault(require("../styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var LogFieldsInput = /*#__PURE__*/function (_Component) {
  _inherits(LogFieldsInput, _Component);

  var _super = _createSuper(LogFieldsInput);

  function LogFieldsInput(props) {
    var _this;

    _classCallCheck(this, LogFieldsInput);

    _this = _super.call(this, props);
    _this.inputRef = /*#__PURE__*/_react["default"].createRef();
    _this.checkPropsUpdate = (0, _bindNextPropsUpdate.bindNextPropsUpdate)(_assertThisInitialized(_this));
    _this.debounce = (0, _bindDebounce.bindDebounce)(_assertThisInitialized(_this), 500);
    var value = props.value;
    _this.state = {
      value: value || ''
    };
    return _this;
  } // eslint-disable-next-line react/no-deprecated


  _createClass(LogFieldsInput, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var isFocus = document.activeElement === this.inputRef.current;
      this.checkPropsUpdate(nextProps, 'value', isFocus);
    }
  }, {
    key: "updateValue",
    value: function updateValue(value, onChange) {
      this.setState({
        value: value
      });
      this.debounce(function () {
        return onChange(value);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _onChange = _this$props.onChange,
          required = _this$props.required,
          error = _this$props.error,
          type = _this$props.type,
          onFocus = _this$props.onFocus,
          rest = _objectWithoutProperties(_this$props, ["onChange", "required", "error", "type", "onFocus"]);

      var value = this.state.value;
      var styleRequired = required ? _styles["default"].isRequired : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(styleRequired, _styles["default"].commonStyle)
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, _extends({}, rest, {
        inputRef: this.inputRef,
        type: type,
        required: required,
        error: error,
        value: value,
        gutterBottom: true,
        onChange: function onChange(e) {
          return _this2.updateValue(type === 'number' && e.target.value !== '' ? Number(e.target.value) : e.target.value, _onChange);
        },
        fullWidth: true,
        clearBtn: false,
        onFocus: onFocus
      })));
    }
  }]);

  return LogFieldsInput;
}(_react.Component);

exports.LogFieldsInput = LogFieldsInput;
LogFieldsInput.defaultProps = {
  type: 'text',
  required: false,
  placeholder: 'no label',
  value: undefined,
  multiline: false
};
//# sourceMappingURL=LogFieldsInput.js.map
