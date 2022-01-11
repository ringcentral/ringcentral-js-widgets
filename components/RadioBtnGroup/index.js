"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function RadioOption(props) {
  var dataSign = props.dataSign,
      currentIndex = props.currentIndex,
      selectedIndex = props.selectedIndex,
      phoneNumber = props.phoneNumber,
      label = props.label,
      currentLocale = props.currentLocale,
      onSelect = props.onSelect;
  var btnClassName = '';

  if (currentIndex === selectedIndex) {
    btnClassName = (0, _classnames["default"])(_styles["default"].radioBtn, _styles["default"].active);
  } else {
    btnClassName = _styles["default"].radioBtn;
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": dataSign,
    className: _styles["default"].radioOption,
    onClick: function onClick() {
      onSelect(currentIndex);
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: btnClassName
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].optionNumber,
    title: phoneNumber
  }, phoneNumber), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].optionLabel,
    title: label
  }, _i18n["default"].getString(label, currentLocale)));
}

RadioOption.propTypes = {
  currentIndex: _propTypes["default"].number.isRequired,
  phoneNumber: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].string,
  selectedIndex: _propTypes["default"].number.isRequired,
  onSelect: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  dataSign: _propTypes["default"].string
};
RadioOption.defaultProps = {
  label: '',
  dataSign: ''
};

var RadioButtonGroup = /*#__PURE__*/function (_Component) {
  _inherits(RadioButtonGroup, _Component);

  var _super = _createSuper(RadioButtonGroup);

  function RadioButtonGroup(props) {
    var _this;

    _classCallCheck(this, RadioButtonGroup);

    _this = _super.call(this, props);
    var disabled = props.disabled,
        onRadioSelect = props.onRadioSelect,
        radioOptions = props.radioOptions;
    _this.state = {
      selectedIndex: 0
    };

    _this.chooseOption = function (index) {
      if (!disabled) {
        _this.setState({
          selectedIndex: index
        });

        onRadioSelect(radioOptions[index].phoneNumber);
      }
    };

    return _this;
  }

  _createClass(RadioButtonGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          dataSign = _this$props.dataSign,
          className = _this$props.className,
          radioOptions = _this$props.radioOptions,
          formatPhone = _this$props.formatPhone,
          currentLocale = _this$props.currentLocale;
      var selectedIndex = this.state.selectedIndex;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, radioOptions.map(function (number, idx) {
        return /*#__PURE__*/_react["default"].createElement(RadioOption, {
          dataSign: dataSign,
          currentIndex: idx,
          selectedIndex: selectedIndex,
          key: number.id,
          phoneNumber: formatPhone(number.phoneNumber),
          label: number.label,
          onSelect: _this2.chooseOption,
          currentLocale: currentLocale
        });
      }));
    }
  }]);

  return RadioButtonGroup;
}(_react.Component);

RadioButtonGroup.propTypes = {
  className: _propTypes["default"].string.isRequired,
  radioOptions: _propTypes["default"].array.isRequired,
  disabled: _propTypes["default"].bool.isRequired,
  formatPhone: _propTypes["default"].func.isRequired,
  onRadioSelect: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  dataSign: _propTypes["default"].string
};
RadioButtonGroup.defaultProps = {
  dataSign: ''
};
var _default = RadioButtonGroup;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
