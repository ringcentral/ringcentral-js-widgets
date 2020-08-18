"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = exports["default"] = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.filter");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Event = /*#__PURE__*/function () {
  function Event() {
    _classCallCheck(this, Event);

    this._events = void 0;
    this._events = {};
  }

  _createClass(Event, [{
    key: "on",
    value: function on(eventType, callback) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$once = _ref.once,
          once = _ref$once === void 0 ? false : _ref$once,
          _ref$priority = _ref.priority,
          priority = _ref$priority === void 0 ? false : _ref$priority;

      var listeners = this._events[eventType] || [];
      var isExist = listeners.filter(function (listener) {
        return listener.callback === callback;
      }).length > 0;
      var listener = {
        callback: callback,
        once: once
      };

      if (isExist) {
        throw new Error("Event type '".concat(eventType, "' has been registered, please re-register it."));
      }

      if (priority) {
        listeners.unshift(listener);
      } else {
        listeners.push(listener);
      }

      this._events[eventType] = listeners;
    }
  }, {
    key: "off",
    value: function off(eventType, callback) {
      var listeners = this._events[eventType];

      if (listeners) {
        var index = listeners.findIndex(function (listener) {
          return listener.callback === callback;
        });
        var isExist = index > -1;

        if (isExist) {
          listeners.splice(index, 1);
        }
      }
    }
  }, {
    key: "remove",
    value: function remove(eventType) {
      if (this._events[eventType]) {
        delete this._events[eventType];
      }
    }
  }, {
    key: "emit",
    value: function emit(eventType) {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var listeners = this._events[eventType];

      if (!Array.isArray(listeners)) {
        throw new Error("Event type '".concat(eventType, "' should be registered before emit it."));
      } else if (listeners.length === 0) {
        throw new Error("Event type '".concat(eventType, "' has not any listener."));
      }

      _toConsumableArray(listeners).forEach(function (_ref2, index) {
        var callback = _ref2.callback,
            once = _ref2.once;

        if (once) {
          listeners.splice(index, 1);
        }

        if (Array.isArray(args)) callback.apply(_this, args);
      });
    }
  }]);

  return Event;
}();

exports.Event = Event;
var event = new Event();
exports["default"] = event;
//# sourceMappingURL=event.js.map
