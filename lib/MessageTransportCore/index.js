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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
