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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
