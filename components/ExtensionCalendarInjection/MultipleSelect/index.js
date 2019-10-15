"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _themeContext = require("../commons/themeContext");

var _ArrowSVG = _interopRequireDefault(require("../ArrowSVG"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MultipleSelect =
/*#__PURE__*/
function (_Component) {
  _inherits(MultipleSelect, _Component);

  function MultipleSelect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MultipleSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MultipleSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      open: _this.props.open
    };

    _this.toggleShowDropdown = function (e) {
      if (!_this.state.open) {
        window.addEventListener('click', _this._handleDocumentClick, false);
      } else {
        window.removeEventListener('click', _this._handleDocumentClick, false);
      }

      if (e && _this.props.stopPropagation) {
        e.stopPropagation();
      }

      _this.setState(function (preState) {
        return {
          open: !preState.open
        };
      });
    };

    _this.onChange = function (e, option, idx) {
      e.stopPropagation();

      if (_this.props.placeholder && idx === 0) {
        _this.toggleShowDropdown();

        return;
      }

      _this.props.onChange(option, idx);
    };

    _this._handleDocumentClick = function (e) {
      if (!_this.mounted) {
        return;
      }

      if (_this.wrapper && _this.wrapper.contains(e.target)) {
        return;
      }

      if (_this.dropdownMenu && _this.dropdownMenu.contains(e.target)) {
        return;
      }

      _this.setState({
        open: false
      });
    };

    return _this;
  }

  _createClass(MultipleSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      window.removeEventListener('click', this._handleDocumentClick, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          placeholder = _this$props.placeholder,
          label = _this$props.label,
          buttonStyle = _this$props.buttonStyle,
          className = _this$props.className,
          iconClassName = _this$props.iconClassName,
          wrapperStyle = _this$props.wrapperStyle,
          renderValue = _this$props.renderValue,
          dataSign = _this$props.dataSign,
          theme = _this$props.theme,
          renderDropdownMenu = _this$props.renderDropdownMenu;
      var open = this.state.open;
      return _react["default"].createElement("div", {
        className: wrapperStyle
      }, _react["default"].createElement("div", {
        "data-sign": dataSign,
        className: (0, _classnames2["default"])(_styles["default"].root, className, _defineProperty({}, _styles["default"].isOld, theme.isOldUI), theme.UI && _styles["default"][theme.UI]),
        ref: function ref(_ref) {
          _this2.wrapper = _ref;
        }
      }, _react["default"].createElement("div", {
        type: "button",
        className: (0, _classnames2["default"])(_styles["default"].button, buttonStyle),
        onClick: this.toggleShowDropdown,
        title: placeholder
      }, label && _react["default"].createElement("span", {
        className: _styles["default"].label
      }, label), _react["default"].createElement("span", {
        className: (0, _classnames2["default"])(_styles["default"].dropdownIcon, open && _styles["default"].iconUp, iconClassName)
      }, _react["default"].createElement(_ArrowSVG["default"], null))), renderDropdownMenu(open)), renderValue());
    }
  }]);

  return MultipleSelect;
}(_react.Component);

MultipleSelect.propTypes = {
  className: _propTypes["default"].string,
  selectedClassName: _propTypes["default"].string,
  dropdownClassName: _propTypes["default"].string,
  iconClassName: _propTypes["default"].string,
  label: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  renderValue: _propTypes["default"].func,
  renderDropdownMenu: _propTypes["default"].func,
  titleEnabled: _propTypes["default"].bool,
  dropdownAlign: _propTypes["default"].oneOf(['left', 'center', 'right']),
  stopPropagation: _propTypes["default"].bool,
  placeholder: _propTypes["default"].string,
  open: _propTypes["default"].bool,
  wrapperStyle: _propTypes["default"].string,
  buttonStyle: _propTypes["default"].string,
  dataSign: _propTypes["default"].string,
  theme: _propTypes["default"].object.isRequired
};
MultipleSelect.defaultProps = {
  className: null,
  selectedClassName: null,
  dropdownClassName: null,
  iconClassName: null,
  label: null,
  onChange: undefined,
  renderDropdownMenu: undefined,
  renderValue: function renderValue(option) {
    return option;
  },
  dropdownAlign: 'center',
  titleEnabled: undefined,
  stopPropagation: false,
  placeholder: undefined,
  open: false,
  wrapperStyle: '',
  buttonStyle: '',
  dataSign: 'MultipleSelect'
};

var _default = (0, _themeContext.ThemeConsumer)(MultipleSelect);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
