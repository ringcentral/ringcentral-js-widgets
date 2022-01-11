"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

require("core-js/modules/es6.array.for-each");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var MessageTransportCore = /*#__PURE__*/function () {
  function MessageTransportCore() {
    var _this = this;

    _classCallCheck(this, MessageTransportCore);

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
