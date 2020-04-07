"use strict";

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

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.is-nan");

require("core-js/modules/es6.regexp.split");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _formatDuration = _interopRequireDefault(require("../../lib/formatDuration"));

var _Download = _interopRequireDefault(require("../../assets/images/Download.svg"));

var _Play = _interopRequireDefault(require("../../assets/images/Play.svg"));

var _Pause = _interopRequireDefault(require("../../assets/images/Pause.svg"));

var _Button = require("../Button");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

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

var audiosMap = {};

var VoicemailPlayer =
/*#__PURE__*/
function (_Component) {
  _inherits(VoicemailPlayer, _Component);

  function VoicemailPlayer(props) {
    var _this;

    _classCallCheck(this, VoicemailPlayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VoicemailPlayer).call(this, props));
    _this.state = {
      playing: false,
      paused: false,
      progress: 0
    };
    _this._id = "".concat(props.uri && props.uri.split('?')[0].split('/').pop(), "/").concat(new Date().getTime());
    _this._audio = new Audio();
    _this._audio.preload = false;
    _this._audio.volume = 1;
    audiosMap[_this._id] = _this._audio;

    _this._audio.addEventListener('timeupdate', function () {
      if (!_this._mounted) {
        return;
      }

      _this.setState({
        progress: _this._audio.currentTime / _this._audio.duration
      });
    });

    _this._audio.addEventListener('ended', function () {
      if (!_this._mounted) {
        return;
      }

      _this.setState({
        playing: false
      });

      _this._audio.isPlaying = false;
    });

    _this._audio.addEventListener('pause', function () {
      if (!_this._mounted) {
        return;
      }

      _this.setState({
        paused: true,
        playing: false
      });

      _this._audio.isPlaying = false;
    });

    _this._audio.addEventListener('play', function () {
      if (!_this._mounted) {
        return;
      }

      _this.setState({
        playing: true,
        paused: false
      });

      _this._audio.isPlaying = true;
    });

    _this._audio.addEventListener('error', function () {
      console.error(_this._audio.error);
    });

    _this._playAudio = function () {
      if (_this.state.playing) {
        return;
      }

      if (!_this.state.paused) {
        _this._audio.src = _this.props.uri;

        _this._audio.load(_this.props.uri);

        if (!Number.isNaN(_this._audio.duration)) {
          _this._audio.currentTime = 0;
        }
      }

      _this._pauseOtherAudios();

      _this._audio._playPromise = _this._audio.play();

      if (typeof _this.props.onPlay === 'function') {
        _this.props.onPlay();
      }
    };

    _this._pauseAudio = function () {
      if (_this.state.paused) {
        return;
      }

      if (_this._audio._playPromise !== undefined) {
        _this._audio._playPromise.then(function () {
          _this._audio.pause();
        });
      }
    };

    _this._onDownloadClick = function (e) {
      if (_this.props.disabled) {
        e.preventDefault();
      }
    };

    return _this;
  }

  _createClass(VoicemailPlayer, [{
    key: "_pauseOtherAudios",
    value: function _pauseOtherAudios() {
      var _this2 = this;

      Object.keys(audiosMap).forEach(function (id) {
        if (id === _this2._id) {
          return;
        }

        var otherAudio = audiosMap[id];

        if (otherAudio.isPlaying && otherAudio._playPromise) {
          otherAudio._playPromise.then(function () {
            otherAudio.pause();
          });
        }
      });
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

      if (!Number.isNaN(this._audio.duration)) {
        this._audio.currentTime = 0;
      }

      this._audio.pause();

      delete audiosMap[this._id];
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          duration = _this$props.duration,
          uri = _this$props.uri,
          disabled = _this$props.disabled,
          currentLocale = _this$props.currentLocale;
      var icon;

      if (this.state.playing) {
        icon = _react["default"].createElement(_Button.Button, {
          className: (0, _classnames["default"])(_styles["default"].play, disabled ? _styles["default"].disabled : null),
          onClick: this._pauseAudio,
          disabled: disabled
        }, _react["default"].createElement("span", {
          title: _i18n["default"].getString('pause', currentLocale)
        }, _react["default"].createElement(_Pause["default"], {
          width: 18,
          height: 18
        })));
      } else {
        icon = _react["default"].createElement(_Button.Button, {
          className: (0, _classnames["default"])(_styles["default"].play, disabled ? _styles["default"].disabled : null),
          onClick: this._playAudio,
          disabled: disabled
        }, _react["default"].createElement("span", {
          title: _i18n["default"].getString('play', currentLocale),
          "data-sign": "play"
        }, _react["default"].createElement(_Play["default"], {
          width: 18,
          height: 18
        })));
      }

      var currentTime = this._audio.currentTime < duration ? this._audio.currentTime : duration;
      var downloadUri = "".concat(uri, "&contentDisposition=Attachment");
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, icon, _react["default"].createElement("span", {
        className: _styles["default"].startTime
      }, (0, _formatDuration["default"])(currentTime)), _react["default"].createElement("a", {
        className: (0, _classnames["default"])(_styles["default"].download, disabled ? _styles["default"].disabled : null),
        target: "_blank",
        download: true,
        "data-sign": "download",
        title: _i18n["default"].getString('download', currentLocale),
        href: downloadUri,
        onClick: this._onDownloadClick
      }, _react["default"].createElement(_Download["default"], {
        width: 18,
        height: 18
      })), _react["default"].createElement("span", {
        className: _styles["default"].endTime
      }, (0, _formatDuration["default"])(duration)), _react["default"].createElement("div", {
        className: _styles["default"].progress
      }, _react["default"].createElement("div", {
        className: _styles["default"].all
      }), _react["default"].createElement("div", {
        className: _styles["default"].done,
        style: {
          width: "".concat(this.state.progress * 100, "%")
        }
      }), _react["default"].createElement("div", {
        className: _styles["default"].current,
        style: {
          left: "".concat(this.state.progress * 100, "%")
        }
      })));
    }
  }]);

  return VoicemailPlayer;
}(_react.Component);

VoicemailPlayer.propTypes = {
  duration: _propTypes["default"].number,
  uri: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string,
  onPlay: _propTypes["default"].func,
  disabled: _propTypes["default"].bool,
  currentLocale: _propTypes["default"].string.isRequired
};
VoicemailPlayer.defaultProps = {
  duration: 0,
  className: undefined,
  onPlay: undefined,
  disabled: false
};
var _default = VoicemailPlayer;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
