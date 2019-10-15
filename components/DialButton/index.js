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

require("core-js/modules/es6.array.index-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _audios = _interopRequireDefault(require("./audios"));

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

var ALTERNATIVE_TIMEOUT = 1000;

var DialButton =
/*#__PURE__*/
function (_Component) {
  _inherits(DialButton, _Component);

  function DialButton(props) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DialButton);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DialButton)).call.apply(_getPrototypeOf2, [this, props].concat(args)));
    _this.state = {
      pressed: false
    };
    _this.timeout = null;
    _this.isEdge = window && window.navigator && window.navigator.userAgent.indexOf('Edge') > -1 || false;

    if (typeof document !== 'undefined' && document.createElement && _audios["default"][props.btn.value]) {
      _this.audio = document.createElement('audio');
      _this.audio.src = _audios["default"][props.btn.value];
    }

    _this.onMouseDown = function (e) {
      if (_this.audio && _this.audio.canPlayType('audio/ogg') !== '') {
        _this.audio.volume = _this.props.volume;
        _this.audio.muted = _this.props.muted;
        _this.audio.currentTime = 0; // on Edge, audio.play() could only use at the first time
        // so we reset the src of the audio when using audio.play()

        if (_this.isEdge) {
          _this.audio.src = _audios["default"][props.btn.value];
        }

        _this.audio.play();
      }

      if (typeof _this.props.onPress === 'function') {
        _this.props.onPress(_this.props.btn.value);
      }

      _this.timeout = setTimeout(function () {
        if (_this.state.pressed) {
          if (_this.timeout) {
            clearTimeout(_this.timeout);
            _this.timeout = null;
          }

          if (typeof _this.props.onOutput === 'function') {
            _this.props.onOutput(_this.props.btn.alternativeValue || _this.props.btn.value);
          }

          _this.setState({
            pressed: false
          });
        }
      }, _this.props.alternativeTimeout || ALTERNATIVE_TIMEOUT);

      _this.setState({
        pressed: true
      });

      e.preventDefault();
    };

    _this.onMouseUp = function () {
      if (_this.state.pressed) {
        if (_this.timeout) {
          clearTimeout(_this.timeout);
          _this.timeout = null;
        }

        if (typeof _this.props.onOutput === 'function') {
          _this.props.onOutput(_this.props.btn.value);
        }

        _this.setState({
          pressed: false
        });
      }
    };

    _this.onMouseLeave = function () {
      if (_this.state.pressed) {
        if (_this.timeout) {
          clearTimeout(_this.timeout);
          _this.timeout = null;
        }

        _this.setState({
          pressed: false
        });
      }
    };

    return _this;
  }

  _createClass(DialButton, [{
    key: "render",
    value: function render() {
      var isSpecial = this.props.btn.value === '*';
      return _react["default"].createElement("div", {
        "data-sign": "dialPadBtn".concat(this.props.btn.value),
        className: (0, _classnames["default"])(_styles["default"].root, this.props.className)
      }, _react["default"].createElement("svg", {
        className: _styles["default"].btnSvg,
        viewBox: "0 0 500 500"
      }, _react["default"].createElement("g", {
        className: (0, _classnames["default"])(_styles["default"].btnSvgGroup, this.state.pressed && _styles["default"].pressed),
        onMouseUp: this.onMouseUp,
        onMouseDown: this.onMouseDown,
        onMouseLeave: this.onMouseLeave
      }, _react["default"].createElement("circle", {
        className: _styles["default"].circle,
        cx: "250",
        cy: "250",
        r: "191"
      }), _react["default"].createElement("text", {
        className: (0, _classnames["default"])(_styles["default"].btnValue, isSpecial ? _styles["default"].special : null),
        x: "0",
        dx: "205",
        y: "0",
        dy: isSpecial ? 350 : 250
      }, this.props.btn.value), _react["default"].createElement("text", {
        className: _styles["default"].btnText,
        x: "0",
        dx: this.props.btn.dx,
        y: "0",
        dy: "360"
      }, this.props.btn.text))));
    }
  }]);

  return DialButton;
}(_react.Component);

exports["default"] = DialButton;
DialButton.propTypes = {
  btn: _propTypes["default"].shape({
    value: _propTypes["default"].string.isRequired,
    text: _propTypes["default"].string,
    alternativeValue: _propTypes["default"].string,
    dx: _propTypes["default"].string
  }).isRequired,
  className: _propTypes["default"].string,
  onPress: _propTypes["default"].func,
  onOutput: _propTypes["default"].func,
  alternativeTimeout: _propTypes["default"].number,
  volume: _propTypes["default"].number,
  muted: _propTypes["default"].bool
};
DialButton.defaultProps = {
  className: null,
  onPress: undefined,
  onOutput: undefined,
  alternativeTimeout: undefined,
  volume: 1,
  muted: false
};
//# sourceMappingURL=index.js.map
