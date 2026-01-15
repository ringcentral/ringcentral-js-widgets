"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeartBeat = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.timers.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var HeartBeat = exports.HeartBeat = /*#__PURE__*/function () {
  function HeartBeat(prefix, _heartBeatIntervalTime) {
    _classCallCheck(this, HeartBeat);
    this.prefix = prefix;
    this._heartBeatIntervalTime = _heartBeatIntervalTime;
    this._heartBeat = {
      success: {
        key: "".concat(this.prefix, "_success"),
        intervalId: null
      },
      working: {
        key: "".concat(this.prefix, "_working"),
        intervalId: null
      }
    };
  }
  return _createClass(HeartBeat, [{
    key: "localStorage",
    get: function get() {
      var _window;
      return (_window = window) === null || _window === void 0 ? void 0 : _window.localStorage;
    }
  }, {
    key: "isSuccessByLocal",
    get: function get() {
      return this._getStatusByLocal(this._heartBeat.success.key);
    }
  }, {
    key: "isWorkingByLocal",
    get: function get() {
      return this._getStatusByLocal(this._heartBeat.working.key);
    }
  }, {
    key: "heartBeatOnWorking",
    value: function heartBeatOnWorking() {
      var _this = this;
      if (typeof this._heartBeat.working === 'number') return;
      this._setLocalTime(this._heartBeat.working.key);
      this._heartBeat.working.intervalId = setInterval(function () {
        _this._setLocalTime(_this._heartBeat.working.key);
      }, this._heartBeatIntervalTime);
    }
  }, {
    key: "heartBeatOnSuccess",
    value: function heartBeatOnSuccess() {
      var _this2 = this;
      if (typeof this._heartBeat.success === 'number') return;
      this._heartBeat.success.intervalId = setInterval(function () {
        _this2._setLocalTime(_this2._heartBeat.success.key);
      }, this._heartBeatIntervalTime);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._heartBeat.success.intervalId) {
        clearInterval(this._heartBeat.success.intervalId);
        this._heartBeat.success.intervalId = null;
      }
      if (this._heartBeat.working.intervalId) {
        clearInterval(this._heartBeat.working.intervalId);
        this._heartBeat.working.intervalId = null;
      }
    }
  }, {
    key: "_setLocalTime",
    value: function _setLocalTime(key) {
      this.localStorage.setItem(key, Date.now().toString());
    }
  }, {
    key: "_getStatusByLocal",
    value: function _getStatusByLocal(statusKey) {
      return this.localStorage && Date.now() - Number(this.localStorage.getItem(statusKey)) < this._heartBeatIntervalTime * 2 - 100;
    }
  }]);
}();
//# sourceMappingURL=heartBeat.js.map
