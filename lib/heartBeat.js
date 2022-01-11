"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeartBeat = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var HeartBeat = /*#__PURE__*/function () {
  _createClass(HeartBeat, [{
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
  }]);

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

  _createClass(HeartBeat, [{
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

  return HeartBeat;
}();

exports.HeartBeat = HeartBeat;
//# sourceMappingURL=heartBeat.js.map
