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

function ToggleButton(_ref) {
  var onClick = _ref.onClick;
  return _react["default"].createElement("div", {
    className: _styles["default"].toggleButton,
    onClick: onClick
  }, _react["default"].createElement("div", {
    className: _styles["default"].toggleButtonInner
  }), _react["default"].createElement("div", {
    className: _styles["default"].toggleButtonIcon
  }, _react["default"].createElement("span", {
    className: (0, _classnames["default"])(_DynamicsFont["default"].arrow)
  })));
}

ToggleButton.propTypes = {
  onClick: _propTypes["default"].func
};
ToggleButton.defaultProps = {
  onClick: undefined
};

function ExtendIcon(_ref2) {
  var onClick = _ref2.onClick,
      extendIconClassName = _ref2.extendIconClassName;
  return _react["default"].createElement("div", {
    className: _styles["default"].extendIcon,
    onClick: onClick
  }, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].extendInner, extendIconClassName)
  }));
}

var SlideMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(SlideMenu, _Component);

  function SlideMenu(props) {
    var _this;

    _classCallCheck(this, SlideMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SlideMenu).call(this, props));

    _this.onToggle = function (e) {
      e.stopPropagation();

      _this.setState(function (prevState) {
        return {
          extended: !prevState.extended
        };
      });

      if (_this.props.onToggle) {
        _this.props.onToggle(e);
      }
    };

    _this.state = {
      extended: false
    };
    return _this;
  }

  _createClass(SlideMenu, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.extended !== this.props.extended) {
        this.setState({
          extended: nextProps.extended
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          minHeight = _this$props.minHeight,
          maxHeight = _this$props.maxHeight,
          children = _this$props.children,
          withAnimation = _this$props.withAnimation;
      var extended = this.props.extended || this.state.extended;
      var wrapperStyles = {
        height: extended ? maxHeight : minHeight
      };
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].wrapper, withAnimation && _styles["default"].withAnimation),
        style: wrapperStyles
      }, _react["default"].createElement("div", {
        className: _styles["default"].content
      }, children)), _react["default"].createElement(ExtendIcon, {
        extendIconClassName: extended ? (0, _classnames["default"])(_styles["default"].extended, this.props.extendIconClassName) : null,
        onClick: this.onToggle
      }));
    }
  }]);

  return SlideMenu;
}(_react.Component);

exports["default"] = SlideMenu;
SlideMenu.propTypes = {
  children: _propTypes["default"].node,
  extended: _propTypes["default"].bool,
  onToggle: _propTypes["default"].func,
  className: _propTypes["default"].string,
  extendIconClassName: _propTypes["default"].string,
  minHeight: _propTypes["default"].number,
  maxHeight: _propTypes["default"].number,
  withAnimation: _propTypes["default"].bool
};
SlideMenu.defaultProps = {
  className: undefined,
  extendIconClassName: undefined,
  children: undefined,
  onToggle: undefined,
  extended: false,
  minHeight: 0,
  maxHeight: 100,
  withAnimation: true
};
//# sourceMappingURL=index.js.map
