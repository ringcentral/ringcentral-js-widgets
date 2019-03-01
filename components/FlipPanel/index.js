"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BackButton = _interopRequireDefault(require("../BackButton"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _RadioBtnGroup = _interopRequireDefault(require("../RadioBtnGroup"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _Flip = _interopRequireDefault(require("../../assets/images/Flip.svg"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FlipPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(FlipPanel, _Component);

  function FlipPanel(props) {
    var _this;

    _classCallCheck(this, FlipPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FlipPanel).call(this, props));
    _this.state = {
      flipValue: _this.props.flipNumbers.length === 0 ? '' : _this.props.flipNumbers[0].phoneNumber,
      flipEnabled: !_this.props.isOnFlip
    };

    _this.onRadioSelect = function (value) {
      _this.setState({
        flipValue: value
      });
    };

    _this.onFlip = function () {
      _this.props.onFlip(_this.state.flipValue);

      _this.setState({
        flipEnabled: false
      });
    };

    return _this;
  }

  _createClass(FlipPanel, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: _styles.default.root
      }, _react.default.createElement(_BackHeader.default, {
        onBackClick: this.props.isOnFlip ? null : this.props.hideFlipPanel,
        backButton: _react.default.createElement(_BackButton.default, {
          showIcon: !this.props.isOnFlip
        })
      }, _react.default.createElement("span", {
        className: _styles.default.headerTitle
      }, _i18n.default.getString('flipHeader', this.props.currentLocale))), _react.default.createElement("div", {
        className: _styles.default.flipContainer
      }, _react.default.createElement(_RadioBtnGroup.default, {
        className: _styles.default.radioGroup,
        radioOptions: this.props.flipNumbers,
        disabled: !this.state.flipEnabled,
        formatPhone: this.props.formatPhone,
        onRadioSelect: this.onRadioSelect,
        currentLocale: this.props.currentLocale
      }), _react.default.createElement("div", {
        className: _styles.default.buttonGroup
      }, _react.default.createElement("div", {
        className: _styles.default.button,
        title: _i18n.default.getString('flip', this.props.currentLocale)
      }, _react.default.createElement(_CircleButton.default, {
        disabled: !this.state.flipEnabled,
        className: (0, _classnames.default)(_styles.default.flipButton, this.state.flipEnabled ? '' : _styles.default.disabled),
        iconClassName: _styles.default.flipIcon,
        onClick: this.onFlip,
        icon: _Flip.default,
        showBorder: true
      })), _react.default.createElement("div", {
        className: _styles.default.button,
        title: _i18n.default.getString('complete', this.props.currentLocale)
      }, _react.default.createElement(_CircleButton.default, {
        disabled: !this.props.isOnFlip,
        className: (0, _classnames.default)(_styles.default.completeButton, this.props.isOnFlip ? '' : _styles.default.disabled),
        onClick: this.props.complete,
        icon: _End.default,
        showBorder: true
      })))));
    }
  }]);

  return FlipPanel;
}(_react.Component);

exports.default = FlipPanel;
FlipPanel.propTypes = {
  isOnFlip: _propTypes.default.bool.isRequired,
  flipNumbers: _propTypes.default.array.isRequired,
  currentLocale: _propTypes.default.string.isRequired,
  formatPhone: _propTypes.default.func.isRequired,
  hideFlipPanel: _propTypes.default.func.isRequired,
  onFlip: _propTypes.default.func.isRequired,
  complete: _propTypes.default.func.isRequired
};
//# sourceMappingURL=index.js.map
