"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

var _eventEmitter = _interopRequireDefault(require("event-emitter"));

var _Enum = _interopRequireDefault(require("../Enum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TransportBase =
/*#__PURE__*/
function () {
  function TransportBase() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        name = _ref.name,
        prefix = _ref.prefix,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? 90 * 1000 : _ref$timeout;

    _classCallCheck(this, TransportBase);

    if (!name) {
      throw new Error("".concat(this.constructor.name, ": \"name\" is required."));
    }

    var prefixString = prefix ? "".concat(prefix, "-") : '';
    this._events = new _Enum.default(['request', 'response', 'push', 'timeout'], "".concat(prefixString).concat(name));
    this._timeout = timeout;
  }

  _createClass(TransportBase, [{
    key: "events",
    get: function get() {
      return this._events;
    }
  }]);

  return TransportBase;
}();

exports.default = TransportBase;
(0, _eventEmitter.default)(TransportBase.prototype);
//# sourceMappingURL=index.js.map
