"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class Subscribable
 * @description Simple subscribable base class
 */
var Subscribable = function () {
  function Subscribable() {
    (0, _classCallCheck3.default)(this, Subscribable);

    this._handlers = new _set2.default();
  }
  /**
   * @function
   * @param {Function} handler
   * @return {Function} unsubscriber
   */


  (0, _createClass3.default)(Subscribable, [{
    key: "subscribe",
    value: function subscribe(handler) {
      var _this = this;

      this._handlers.add(handler);
      return function () {
        _this.unsubscribe(handler);
      };
    }
    /**
     * @function
     * @param {Function} handler
     */

  }, {
    key: "unsubscribe",
    value: function unsubscribe(handler) {
      this._handlers.delete(handler);
    }
    /**
     * @function
     */

  }, {
    key: "trigger",
    value: function trigger() {
      [].concat((0, _toConsumableArray3.default)(this._handlers)).forEach(function (handler) {
        try {
          handler();
        } catch (e) {
          /* ignore error */
        }
      });
    }
  }]);
  return Subscribable;
}();

exports.default = Subscribable;
//# sourceMappingURL=index.js.map
