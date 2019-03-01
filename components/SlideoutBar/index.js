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

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _CloseIcon = _interopRequireDefault(require("../../assets/images/CloseIcon.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SlideoutBar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SlideoutBar, _React$Component);

  function SlideoutBar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SlideoutBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SlideoutBar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this._onClose = function (evt) {
      evt.stopPropagation();

      _this.props.onClose();
    };

    return _this;
  }

  _createClass(SlideoutBar, [{
    key: "_renderCloseButton",
    value: function _renderCloseButton() {
      return _react.default.createElement("i", {
        className: _styles.default.closeBtn,
        onClick: this._onClose
      }, _react.default.createElement(_CloseIcon.default, null));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          offset = _this$props.offset,
          onClick = _this$props.onClick,
          slideout = _this$props.slideout,
          className = _this$props.className,
          closable = _this$props.closable,
          children = _this$props.children;
      var slideStyle = slideout ? 'translateX(0)' : "translateX(".concat(offset, "px)");
      var cls = (0, _classnames.default)(_styles.default.container, className);
      var closeButton = closable ? this._renderCloseButton() : null;
      return _react.default.createElement("div", {
        className: cls,
        style: {
          transform: slideStyle
        },
        onClick: onClick
      }, children, closeButton);
    }
  }]);

  return SlideoutBar;
}(_react.default.Component);

exports.default = SlideoutBar;
SlideoutBar.propTypes = {
  closable: _propTypes.default.bool,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  offset: _propTypes.default.number.isRequired,
  slideout: _propTypes.default.bool.isRequired,
  onClick: _propTypes.default.func,
  onClose: _propTypes.default.func
};
SlideoutBar.defaultProps = {
  closable: true,
  className: undefined,
  children: undefined,
  onClick: function onClick() {},
  onClose: function onClose() {}
};
//# sourceMappingURL=index.js.map
