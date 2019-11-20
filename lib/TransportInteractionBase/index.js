"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

require("regenerator-runtime/runtime");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TransportInteractionBase =
/*#__PURE__*/
function () {
  function TransportInteractionBase() {
    _classCallCheck(this, TransportInteractionBase);

    this._transportEvents = {};
  }

  _createClass(TransportInteractionBase, [{
    key: "registerTransportEvent",
    value: function registerTransportEvent(_ref) {
      var key = _ref.key,
          func = _ref.func;

      if (this._transportEvents[key]) {
        throw new Error('transport event has already registered');
      }

      this._transportEvents[key] = func;
    }
  }, {
    key: "registerTransportEvents",
    value: function registerTransportEvents(events) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _step.value,
              key = _step$value.key,
              func = _step$value.func;
          this.registerTransportEvent({
            key: key,
            func: func
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "_fetchAndResponse",
    value: function _fetchAndResponse(_ref2) {
      var requestId, fetchFunc, res;
      return regeneratorRuntime.async(function _fetchAndResponse$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              requestId = _ref2.requestId, fetchFunc = _ref2.fetchFunc;

              if (!fetchFunc || typeof fetchFunc !== 'function') {// throw new Error('Parameter `fetchFunc` is invalid!');
              }

              _context.prev = 2;
              _context.next = 5;
              return regeneratorRuntime.awrap(fetchFunc());

            case 5:
              res = _context.sent;

              this._transport.response({
                requestId: requestId,
                result: res,
                error: null
              });

              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);
              console.log(_context.t0);

              this._transport.response({
                requestId: requestId,
                result: null,
                error: _context.t0
              });

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[2, 9]]);
    }
  }, {
    key: "transportEvents",
    get: function get() {
      return this._transportEvents;
    }
  }]);

  return TransportInteractionBase;
}();

exports["default"] = TransportInteractionBase;
//# sourceMappingURL=index.js.map
