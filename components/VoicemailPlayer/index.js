"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.number.is-nan");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _juno = require("@ringcentral/juno");
var _classnames = _interopRequireDefault(require("classnames"));
var _formatDuration = require("@ringcentral-integration/commons/lib/formatDuration");
var _Download = _interopRequireDefault(require("../../assets/images/Download.svg"));
var _Pause = _interopRequireDefault(require("../../assets/images/Pause.svg"));
var _Play = _interopRequireDefault(require("../../assets/images/Play.svg"));
var _Button = require("../Button");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var audiosMap = {};
var isFirefox = navigator.userAgent.indexOf('Firefox') > 0;
var VoicemailPlayer = /*#__PURE__*/function (_Component) {
  _inherits(VoicemailPlayer, _Component);
  var _super = _createSuper(VoicemailPlayer);
  function VoicemailPlayer(props) {
    var _this;
    _classCallCheck(this, VoicemailPlayer);
    _this = _super.call(this, props);
    _this._audio = void 0;
    _this._id = void 0;
    _this._mounted = void 0;
    _this._pauseAudio = void 0;
    _this._playAudio = void 0;
    _this._onDownloadClick = function (e, downloadUri) {
      /**
       * target="_blank" doesn't work on firefox, so we need to use window.open
       */
      if (isFirefox) {
        window.open(downloadUri);
      }
    };
    _this.state = {
      playing: false,
      paused: false,
      progress: 0
    };
    _this._id = "".concat(props.uri && props.uri.split('?')[0].split('/').pop(), "/").concat(new Date().getTime());
    _this._audio = new Audio();
    _this._audio.preload = false;
    _this._audio.volume = 1;
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        var otherAudio = audiosMap[id];
        if (otherAudio.isPlaying && otherAudio._playPromise) {
          otherAudio._playPromise.then(function () {
            otherAudio.pause();
          });
        }
      });
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      if (!Number.isNaN(this._audio.duration)) {
        this._audio.currentTime = 0;
      }
      this._audio.pause();
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      delete audiosMap[this._id];
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props = this.props,
        className = _this$props.className,
        duration = _this$props.duration,
        uri = _this$props.uri,
        disabled = _this$props.disabled,
        currentLocale = _this$props.currentLocale;
      var icon;
      if (this.state.playing) {
        icon = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
          className: (0, _classnames["default"])(_styles["default"].play, disabled ? _styles["default"].disabled : null),
          onClick: this._pauseAudio,
          disabled: disabled
        }, /*#__PURE__*/_react["default"].createElement("span", {
          title: _i18n["default"].getString('pause', currentLocale)
        }, /*#__PURE__*/_react["default"].createElement(_Pause["default"], {
          width: 18,
          height: 18
        })));
      } else {
        icon = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
          className: (0, _classnames["default"])(_styles["default"].play, disabled ? _styles["default"].disabled : null),
          onClick: this._playAudio,
          disabled: disabled,
          dataSign: "play"
        }, /*#__PURE__*/_react["default"].createElement("span", {
          title: _i18n["default"].getString('play', currentLocale)
        }, /*#__PURE__*/_react["default"].createElement(_Play["default"], {
          width: 18,
          height: 18
        })));
      }
      var currentTime =
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._audio.currentTime < duration ? this._audio.currentTime : duration;
      var downloadUri = "".concat(uri, "&contentDisposition=Attachment");
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, icon, /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].startTime
      }, (0, _formatDuration.formatDuration)(currentTime)), /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
        className: (0, _classnames["default"])(_styles["default"].download, disabled ? _styles["default"].disabled : null),
        target: "_blank",
        download: true,
        disabled: disabled,
        "data-sign": "download",
        title: _i18n["default"].getString('download', currentLocale),
        href: isFirefox ? '#' : downloadUri,
        onClick: function onClick(e) {
          _this3._onDownloadClick(e, downloadUri);
        }
      }, /*#__PURE__*/_react["default"].createElement(_Download["default"], {
        width: 18,
        height: 18
      })), /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].endTime
      }, (0, _formatDuration.formatDuration)(duration)), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].progress
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].all
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].done,
        style: {
          width: "".concat(this.state.progress * 100, "%")
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].current,
        style: {
          left: "".concat(this.state.progress * 100, "%")
        }
      })));
    }
  }]);
  return VoicemailPlayer;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
VoicemailPlayer.defaultProps = {
  duration: 0,
  className: undefined,
  onPlay: undefined,
  disabled: false
};
var _default = VoicemailPlayer;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
