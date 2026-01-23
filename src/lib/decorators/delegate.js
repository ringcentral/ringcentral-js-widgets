"use strict";

require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delegate = delegate;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _reactantShare = require("reactant-share");
var _delegateMainClient = require("./delegateMainClient");
var _parallel = require("./parallel");
var _parallelClients = require("./parallelClients");
var _proxify = require("./proxify");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); } /* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable func-names */
var generateDelegate = function generateDelegate(type) {
  var isDecorator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return function (target, key, descriptor) {
    switch (type) {
      case 'mainClient':
        return (0, _delegateMainClient.delegateMainClient)(target, key, descriptor, isDecorator);
      case 'clients':
        return (0, _parallelClients.parallelClients)(target, key, descriptor, isDecorator);
      case 'all':
        return (0, _parallel.parallel)(target, key, descriptor, isDecorator);
      case 'server':
        return (0, _proxify.proxify)(target, key, descriptor);
      default:
        throw new Error("Unsupported delegate type '".concat(type, "'"));
    }
  };
};
/**
 * delegate execution to `'mainClient' | 'clients' | 'all' | 'server'`
 *
 * @example
 *
 * Using function(target is 'server' by default):
 *
 * ```ts
 * await delegate(this.counter, 'increment'); // without function args
 * await delegate(this.counter, 'decrement', [1]); // function args is [1].
 * delegate(this.counter, 'decrement', [1], { target: 'all' }); // Unless the target is 'server', there are no more options available.
 * ```
 * Using decorator:
 *
 * ```ts
 * delegate('mainClient'); // make the method run in the main client port(always only have one client)
 * delegate('clients'); // make the method run in all clients port
 * delegate('all'); // make the method run in both all clients and server port
 * delegate('server'); // make the method run in server port
 * ```
 */
function delegate() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (typeof args[0] === 'string') {
    // it's a decorator
    var _type = args[0];
    return generateDelegate(_type);
  } else if (_typeof(args[0]) === 'object') {
    var _ref, _args$;
    // it's a function
    var _type2 = (_ref = (_args$ = args[3]) === null || _args$ === void 0 ? void 0 : _args$.target) !== null && _ref !== void 0 ? _ref : 'server';
    if (_type2 !== 'server') {
      var _generateDelegate = generateDelegate(_type2, false)(args[0], args[1], {
          value: args[0][args[1]]
        }),
        value = _generateDelegate.value;
      return value.apply(args[0], args[2]);
    }
    return _reactantShare.delegate.apply(void 0, _toConsumableArray(args));
  }
  throw new Error("\n    The first parameter of the delegate decorator must be a string or object.\n  ");
}
//# sourceMappingURL=delegate.js.map
