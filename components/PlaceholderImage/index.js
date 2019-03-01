"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var cache = {};

var defaultContainer = function defaultContainer(x) {
  return x;
};
/**
 * Reference: https://github.com/mbrevda/react-image
 * This component contains too many features we do not need for now
 *
 * @class PlaceholderImage
 * @extends {Component}
 */


var PlaceholderImage =
/*#__PURE__*/
function (_Component) {
  _inherits(PlaceholderImage, _Component);

  function PlaceholderImage(props) {
    var _this;

    _classCallCheck(this, PlaceholderImage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PlaceholderImage).call(this, props));

    _this.onLoad = function () {
      var src = _this.props.src;
      cache[src] = true;

      if (_this.img) {
        _this.setState({
          isLoaded: true
        });
      }
    };

    _this.onError = function () {
      var src = _this.props.src;
      cache[src] = false;

      if (!_this.img) {
        return false;
      }

      _this.setState({
        isLoaded: false
      });
    };

    _this.loadImg = function () {
      var src = _this.props.src;
      _this.img = new Image();
      _this.img.src = src; // TODO: Consider using decode first here

      _this.img.onload = _this.onLoad;
      _this.img.onerror = _this.onError;
    };

    _this.unloadImg = function () {
      delete _this.img.onerror;
      delete _this.img.onload;

      try {
        delete _this.img.src;
      } catch (e) {
        console.error('Error: error on deleting img src');
      }

      delete _this.img;
    };

    _this.state = {
      isLoading: true,
      isLoaded: false
    };
    return _this;
  }

  _createClass(PlaceholderImage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var isLoading = this.state.isLoading;

      if (isLoading) {
        this.loadImg();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.img) {
        this.unloadImg();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var imgSrc = nextProps.src;
      var src = this.props.src;

      if (src !== imgSrc) {
        // If the source is invalid, just render the placeholder
        if (!imgSrc) {
          return this.setState({
            isLoading: false,
            isLoaded: false
          });
        }

        this.setState({
          isLoaded: false,
          isLoading: false
        }, this.loadImg);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          container = _this$props.container,
          src = _this$props.src,
          placeholder = _this$props.placeholder,
          placeholderContainer = _this$props.placeholderContainer,
          rest = _objectWithoutProperties(_this$props, ["container", "src", "placeholder", "placeholderContainer"]);

      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          isLoaded = _this$state.isLoaded;

      if (isLoaded) {
        var imgProps = _objectSpread({}, {
          src: src
        }, rest);
        /* eslint-disable-next-line */


        return container(_react.default.createElement("img", imgProps));
      }

      if (!isLoaded && isLoading) {
        return placeholder ? placeholderContainer(placeholder) : null;
      }

      return null;
    }
  }]);

  return PlaceholderImage;
}(_react.Component);

PlaceholderImage.propTypes = {
  src: _propTypes.default.string,
  // Put default image here
  placeholder: _propTypes.default.node,
  placeholderContainer: _propTypes.default.func,
  container: _propTypes.default.func
};
PlaceholderImage.defaultProps = {
  src: '',
  placeholder: false,
  container: defaultContainer,
  placeholderContainer: defaultContainer
};
var _default = PlaceholderImage;
exports.default = _default;
//# sourceMappingURL=index.js.map
