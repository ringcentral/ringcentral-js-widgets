"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageTransportCore = function () {
  function MessageTransportCore() {
    var _this = this;

    (0, _classCallCheck3.default)(this, MessageTransportCore);

    this._distributeMessage = function (msg) {
      _this._listeners.forEach(function (fn) {
        return fn(msg);
      });
    };

    this._listeners = new _set2.default();
  }

  (0, _createClass3.default)(MessageTransportCore, [{
    key: "addListener",
    value: function addListener(fn) {
      this._listeners.add(fn);
    }
  }, {
    key: "removeListener",
    value: function removeListener(fn) {
      this._listeners.delete(fn);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      throw new Error(this.constructor.name + ".dispose is not implemented.");
    }
  }, {
    key: "postMessage",
    value: function postMessage() {
      throw new Error(this.constructor.name + ".postMessage is not implemented.");
    }
  }]);
  return MessageTransportCore;
}();

exports.default = MessageTransportCore;
//# sourceMappingURL=index.js.map
