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

var _classnames = _interopRequireDefault(require("classnames"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MeetingSection =
/*#__PURE__*/
function (_Component) {
  _inherits(MeetingSection, _Component);

  function MeetingSection() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MeetingSection);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MeetingSection)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      toggle: _this.props.toggle
    };
    return _this;
  }

  _createClass(MeetingSection, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          title = _this$props.title,
          withSwitch = _this$props.withSwitch,
          className = _this$props.className,
          hideTopBorderLine = _this$props.hideTopBorderLine;

      var toggle = function toggle() {
        _this2.setState({
          toggle: !_this2.state.toggle
        });
      };

      var Title = function Title() {
        return title ? _react["default"].createElement("span", {
          className: _styles["default"].title
        }, title) : null;
      };

      var DropDown = function DropDown(_ref) {
        var isDropDown = _ref.isDropDown,
            onClick = _ref.onClick;
        return withSwitch ? _react["default"].createElement("span", {
          className: (0, _classnames["default"])(isDropDown ? _styles["default"].dropDown : null),
          onClick: onClick
        }, _react["default"].createElement("i", {
          className: (0, _classnames["default"])(_DynamicsFont["default"].arrow, _styles["default"].arrow)
        })) : null;
      };

      var topBorderLine = hideTopBorderLine ? _styles["default"].hiddenTopBorder : null;
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].section, topBorderLine, className)
      }, title ? _react["default"].createElement("div", {
        className: _styles["default"].spaceBetween
      }, _react["default"].createElement(Title, null), _react["default"].createElement(DropDown, {
        isDropDown: this.state.toggle,
        onClick: toggle
      })) : null, this.state.toggle ? children : null);
    }
  }]);

  return MeetingSection;
}(_react.Component);

MeetingSection.propTypes = {
  children: _propTypes["default"].element.isRequired,
  title: _propTypes["default"].string,
  className: _propTypes["default"].string,
  withSwitch: _propTypes["default"].bool,
  toggle: _propTypes["default"].bool,
  hideTopBorderLine: _propTypes["default"].bool
};
MeetingSection.defaultProps = {
  className: null,
  title: null,
  withSwitch: false,
  toggle: true,
  hideTopBorderLine: false
};
var _default = MeetingSection;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
