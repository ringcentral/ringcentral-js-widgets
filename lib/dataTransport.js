"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  bindListeners: true,
  listen: true
};
exports.listen = exports.bindListeners = void 0;
require("regenerator-runtime/runtime");
var _ramda = require("ramda");
var _dataTransport = require("data-transport");
Object.keys(_dataTransport).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _dataTransport[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dataTransport[key];
    }
  });
});
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * `@listen` decorator, that will auto binding event with `data-transport`
 */
var listen = function listen(target, key, descriptor) {
  var _target$listeners;
  var fn = descriptor.value;
  if (process.env.NODE_ENV !== 'production') {
    if (typeof fn !== 'function') {
      console.warn("The decorator '@listen' can only decorate methods, '".concat(key, "' is NOT a methods."));
      return descriptor;
    }
  }
  target.listeners = (_target$listeners = target.listeners) !== null && _target$listeners !== void 0 ? _target$listeners : {};
  target.listeners[key] = fn;
  return _objectSpread(_objectSpread({}, descriptor), {}, {
    value: function value() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(process.env.NODE_ENV !== 'production')) {
                  _context.next = 2;
                  break;
                }
                throw new Error("The method '".concat(key, "' is a listen function that can NOT be actively called."));
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  });
};

/**
 * bind current class listenable,
 * that your class `@listen` work
 *
 * @example
 *
  ```ts

  class Adapter implements ToExternal {

    transport?: Transport<{ emit: ToInternal; listen: ToExternal }>;

    constructor(){
      this.transport = createTransport('IFrameMain', {
        iframe: this.appIFrame,
      });
      bindListeners(this, this.transport);
    }

    @listen
    async fetchIsMatchCaseId(caseId: string): Promise<string> {
      return this.visualforceRequest('fetchIsMatchCaseId', caseId);
    }
  }
 * ```
 */
exports.listen = listen;
var bindListeners = function bindListeners(instance, transport) {
  var _listeners;
  (0, _ramda.forEachObjIndexed)(function (func, name) {
    transport.listen(name, func.bind(instance));
  }, (_listeners = instance.listeners) !== null && _listeners !== void 0 ? _listeners : {});
};
exports.bindListeners = bindListeners;
//# sourceMappingURL=dataTransport.js.map
