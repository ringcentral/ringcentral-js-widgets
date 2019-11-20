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

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DEFAULT_SCROLL_INTERVAL = 5000;

var CarrouselBar =
/*#__PURE__*/
function (_Component) {
  _inherits(CarrouselBar, _Component);

  function CarrouselBar(props) {
    var _this;

    _classCallCheck(this, CarrouselBar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CarrouselBar).call(this, props));
    _this.state = {
      currentIndex: 0,
      showAnimation: false,
      animationMode: 'move',
      hoverBar: false
    };
    return _this;
  }

  _createClass(CarrouselBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.timeout = setInterval(function () {
        if (!_this2.props.hoverBar) {
          _this2.setState(function (prevState) {
            return {
              currentIndex: prevState.currentIndex >= _this2.validChildren.length - 1 ? 0 : prevState.currentIndex + 1,
              showAnimation: true,
              animationMode: prevState.animationMode === 'move' ? 'moveOn' : 'move',
              hoverBar: false
            };
          });
        }
      }, this.props.scrollInterval);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.children !== this.props.children) {
        this.validChildren = this.getValidChildren(nextProps.children);
      }

      if (nextProps.hoverBar !== this.props.hoverBar && !!nextProps.hoverBar) {
        this.setState(function () {
          return {
            hoverBar: true
          };
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }, {
    key: "getValidChildren",
    value: function getValidChildren(children) {
      // .toArray automatically removes invalid React children
      return _react["default"].Children.toArray(children);
    }
  }, {
    key: "render",
    value: function render() {
      this.validChildren = this.getValidChildren(this.props.children);

      if (this.validChildren.length < 2) {
        return this.props.children;
      }

      return _react["default"].createElement("div", {
        className: _styles["default"].root
      }, _react["default"].createElement("div", {
        className: this.state.showAnimation && !this.state.hoverBar ? _styles["default"][this.state.animationMode] : _styles["default"].center
      }, this.validChildren[this.state.currentIndex]));
    }
  }]);

  return CarrouselBar;
}(_react.Component);

exports["default"] = CarrouselBar;
CarrouselBar.propTypes = {
  children: _propTypes["default"].node,
  scrollInterval: _propTypes["default"].number,
  hoverBar: _propTypes["default"].bool
};
CarrouselBar.defaultProps = {
  children: undefined,
  scrollInterval: DEFAULT_SCROLL_INTERVAL,
  hoverBar: false
};
//# sourceMappingURL=index.js.map
