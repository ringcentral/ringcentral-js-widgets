"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebphoneAudioHelper = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
var _audioHelper = require("ringcentral-web-phone/lib/audioHelper");
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /* eslint-disable no-console */
// @ts-ignore
var WebphoneAudioHelper = exports.WebphoneAudioHelper = /*#__PURE__*/function (_AudioHelper) {
  function WebphoneAudioHelper() {
    var _this;
    _classCallCheck(this, WebphoneAudioHelper);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, WebphoneAudioHelper, [].concat(args));
    _this._deviceId = 'default';
    return _this;
  }
  _inherits(WebphoneAudioHelper, _AudioHelper);
  return _createClass(WebphoneAudioHelper, [{
    key: "_playSound",
    value: function _playSound(url, val, volume) {
      // @ts-ignore
      if (!this.enabled || !url || this._deviceId === '') return this;
      // @ts-ignore
      var audio = this._audio[url];
      if (!audio) {
        if (val) {
          audio = new Audio();
          // @ts-ignore
          this._audio[url] = audio;
          audio.src = url;
          audio.loop = true;
          audio.volume = volume;
          if (this._deviceId && typeof audio.setSinkId === 'function') {
            audio.setSinkId(this._deviceId)["catch"](function (error) {
              console.error('setSinkId error:', error);
            });
          }
          audio.playPromise = audio.play()["catch"](function (error) {
            console.error('playAudio error:', error);
          });
        }
      } else {
        if (val) {
          audio.src = url; // load audio resource
          audio.currentTime = 0;
          if (typeof audio.setSinkId === 'function' && audio.sinkId !== this._deviceId) {
            audio.setSinkId(this._deviceId || '')["catch"](function (error) {
              console.error('setSinkId error:', error);
            });
          }
          audio.playPromise = audio.play()["catch"](function (error) {
            console.error('playAudio error:', error);
          });
        } else {
          if (audio.playPromise !== undefined) {
            audio.playPromise.then(function () {
              audio.pause();
            })["finally"](function () {
              audio.src = ''; // release audio resource
            });
          }
        }
      }
      return this;
    }
  }, {
    key: "playIncoming",
    value: function playIncoming(val) {
      var _this$volume;
      // @ts-ignore
      return this._playSound(this._incoming, val, (_this$volume = this.volume) !== null && _this$volume !== void 0 ? _this$volume : 0.5);
    }
  }, {
    key: "playOutgoing",
    value: function playOutgoing(val) {
      var _this$volume2;
      // @ts-ignore
      return this._playSound(this._outgoing, val, (_this$volume2 = this.volume) !== null && _this$volume2 !== void 0 ? _this$volume2 : 1);
    }
  }, {
    key: "setDeviceId",
    value: function setDeviceId() {
      var _this2 = this;
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
      // ringtone has 'off' option
      var deviceId = val === 'off' ? '' : val;
      this._deviceId = deviceId;
      if (!this.audio || Object.keys(this.audio).length === 0) {
        return;
      }
      var _loop = function _loop() {
        var audio = _this2.audio[url];
        if (typeof audio.setSinkId !== 'function') {
          return 1; // continue
        }
        if (audio.playPromise !== undefined) {
          audio.playPromise.then(function () {
            audio.setSinkId(deviceId)["catch"](function (error) {
              console.error('setSinkId error:', error);
            });
          });
        }
      };
      for (var url in this.audio) {
        if (_loop()) continue;
      }
    }
  }, {
    key: "audio",
    get: function get() {
      return this._audio;
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._enabled;
    }
  }]);
}(_audioHelper.AudioHelper);
//# sourceMappingURL=AudioHelper.js.map
