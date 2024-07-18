"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.function.name");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.set");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MessageTransportCore = /*#__PURE__*/function () {
  function MessageTransportCore() {
    var _this = this;
    _classCallCheck(this, MessageTransportCore);
    this._listeners = void 0;
    this._distributeMessage = function (msg) {
      _this._listeners.forEach(function (fn) {
        return fn(msg);
      });
    };
    this._listeners = new Set();
  }
  _createClass(MessageTransportCore, [{
    key: "addListener",
    value: function addListener(fn) {
      this._listeners.add(fn);
    }
  }, {
    key: "removeListener",
    value: function removeListener(fn) {
      this._listeners["delete"](fn);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      throw new Error("".concat(this.constructor.name, ".dispose is not implemented."));
    }
  }, {
    key: "postMessage",
    value: function postMessage() {
      throw new Error("".concat(this.constructor.name, ".postMessage is not implemented."));
    }
  }]);
  return MessageTransportCore;
}();
exports["default"] = MessageTransportCore;
//# sourceMappingURL=index.js.map
