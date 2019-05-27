"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function RadioOption(props) {
  var btnClassName = '';

  if (props.currentIndex === props.selectedIndex) {
    btnClassName = (0, _classnames["default"])(_styles["default"].radioBtn, _styles["default"].active);
  } else {
    btnClassName = _styles["default"].radioBtn;
  }

  return _react["default"].createElement("div", {
    className: _styles["default"].radioOption,
    onClick: function onClick() {
      props.onSelect(props.currentIndex);
    }
  }, _react["default"].createElement("span", {
    className: btnClassName
  }), _react["default"].createElement("span", {
    className: _styles["default"].optionNumber
  }, props.phoneNumber), _react["default"].createElement("span", {
    className: _styles["default"].optionLabel,
    title: props.label
  }, _i18n["default"].getString(props.label, props.currentLocale)));
}

RadioOption.propTypes = {
  currentIndex: _propTypes["default"].number.isRequired,
  phoneNumber: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].string,
  selectedIndex: _propTypes["default"].number.isRequired,
  onSelect: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired
};
RadioOption.defaultProps = {
  label: ''
};

var RadioButtonGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(RadioButtonGroup, _Component);

  function RadioButtonGroup(props) {
    var _this;

    _classCallCheck(this, RadioButtonGroup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RadioButtonGroup).call(this, props));
    _this.state = {
      selectedIndex: 0
    };

    _this.chooseOption = function (index) {
      if (!_this.props.disabled) {
        _this.setState({
          selectedIndex: index
        });

        _this.props.onRadioSelect(_this.props.radioOptions[index].phoneNumber);
      }
    };

    return _this;
  }

  _createClass(RadioButtonGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, this.props.className)
      }, this.props.radioOptions.map(function (number, idx) {
        return _react["default"].createElement(RadioOption, {
          currentIndex: idx,
          selectedIndex: _this2.state.selectedIndex,
          key: number.id,
          phoneNumber: _this2.props.formatPhone(number.phoneNumber),
          label: number.label,
          onSelect: _this2.chooseOption,
          currentLocale: _this2.props.currentLocale
        });
      }));
    }
  }]);

  return RadioButtonGroup;
}(_react.Component);

exports["default"] = RadioButtonGroup;
RadioButtonGroup.propTypes = {
  className: _propTypes["default"].string.isRequired,
  radioOptions: _propTypes["default"].array.isRequired,
  disabled: _propTypes["default"].bool.isRequired,
  formatPhone: _propTypes["default"].func.isRequired,
  onRadioSelect: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired
};
//# sourceMappingURL=index.js.map
