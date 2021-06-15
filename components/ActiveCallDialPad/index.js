"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.replace");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DialPad = _interopRequireDefault(require("../DialPad"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _audios = _interopRequireDefault(require("../DialButton/audios"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var cleanRegex = /[^\d*#]/g;

var filter = function filter(value) {
  return value.replace(cleanRegex, '');
};

var MAX_PASTE_LENGTH = 15;

var ActiveCallDialPad = /*#__PURE__*/function (_Component) {
  _inherits(ActiveCallDialPad, _Component);

  var _super = _createSuper(ActiveCallDialPad);

  function ActiveCallDialPad(props) {
    var _this;

    _classCallCheck(this, ActiveCallDialPad);

    _this = _super.call(this, props);
    _this.state = {
      value: ''
    };

    if (typeof document !== 'undefined' && document.createElement) {
      _this.audio = document.createElement('audio');
    }

    _this.playAudio = function (value) {
      if (_this.audio && _this.audio.canPlayType('audio/ogg') !== '' && _audios["default"][value]) {
        if (!_this.audio.paused) {
          _this.audio.pause();
        }

        _this.audio.src = _audios["default"][value];
        _this.audio.currentTime = 0;

        _this.audio.play();
      }
    };

    _this.onButtonOutput = function (key) {
      _this.setState(function (preState) {
        var value = preState.value + key;

        _this.props.onChange(key);

        return {
          value: value
        };
      });
    };

    _this.sendDTMFKeys = function (keys) {
      if (keys === '') {
        return;
      }

      _this.props.onChange(keys);

      keys.split('').forEach(function (key, index) {
        setTimeout(function () {
          _this.playAudio(key);
        }, 100 * index);
      });
    };

    _this.onChange = function (e) {
      var value = filter(e.currentTarget.value);

      _this.setState({
        value: value
      });
    };

    _this.onKeyDown = function (e) {
      var value = filter(e.key);

      _this.sendDTMFKeys(value);
    };

    _this.onPaste = function (e) {
      var item = e.clipboardData.items[0];
      item.getAsString(function (data) {
        var value = filter(data.replace(/<[^>]*>/g, '')); // remove HTML tag in firefox

        var keys = value;

        if (value.length > MAX_PASTE_LENGTH) {
          keys = value.slice(0, MAX_PASTE_LENGTH);
        }

        _this.sendDTMFKeys(keys);

        if (value.length > MAX_PASTE_LENGTH) {
          _this.setState(function (preState) {
            return {
              value: preState.value.replace(value, keys)
            };
          });
        }
      });
    };

    return _this;
  }

  _createClass(ActiveCallDialPad, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "activeCallDialPad",
        className: _styles["default"].root
      }, /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
        onBackClick: this.props.hiddenDialPad
      }, _i18n["default"].getString('keypad', this.props.currentLocale)), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].dialInput
      }, /*#__PURE__*/_react["default"].createElement("input", {
        "data-sign": "input",
        className: _styles["default"].input,
        value: this.state.value,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        onPaste: this.onPaste,
        autoFocus: true // eslint-disable-line

      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].padContainer
      }, /*#__PURE__*/_react["default"].createElement(_DialPad["default"], {
        dataSign: "keypad",
        className: _styles["default"].dialPad,
        onButtonOutput: this.onButtonOutput
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonRow
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].button
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        className: _styles["default"].stopButton,
        onClick: this.props.onHangup,
        icon: _End["default"],
        showBorder: false,
        dataSign: "hangUp"
      })))));
    }
  }]);

  return ActiveCallDialPad;
}(_react.Component);

ActiveCallDialPad.propTypes = {
  onChange: _propTypes["default"].func.isRequired,
  hiddenDialPad: _propTypes["default"].func.isRequired,
  onHangup: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired
};
var _default = ActiveCallDialPad;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
