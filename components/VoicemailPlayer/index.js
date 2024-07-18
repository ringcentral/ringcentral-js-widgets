"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var _formatDuration = require("@ringcentral-integration/commons/lib/formatDuration");
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _Download = _interopRequireDefault(require("../../assets/images/Download.svg"));
var _Pause = _interopRequireDefault(require("../../assets/images/Pause.svg"));
var _Play = _interopRequireDefault(require("../../assets/images/Play.svg"));
var _Button = require("../Button");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
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
          className: (0, _clsx["default"])(_styles["default"].play, disabled ? _styles["default"].disabled : null),
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
          className: (0, _clsx["default"])(_styles["default"].play, disabled ? _styles["default"].disabled : null),
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
        className: (0, _clsx["default"])(_styles["default"].root, className)
      }, icon, /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].startTime
      }, (0, _formatDuration.formatDuration)(currentTime)), /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
        className: (0, _clsx["default"])(_styles["default"].download, disabled ? _styles["default"].disabled : null),
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
