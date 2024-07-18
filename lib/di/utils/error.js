"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.from");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.join");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.reflect.construct");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircularDependencyError = CircularDependencyError;
exports.DIError = DIError;
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
// @ts-nocheck
function DIError(message) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return _construct(Error, ["[DI] ".concat(message)].concat(args));
}
function CircularDependencyError(pending, dep) {
  var path = Array.from(pending.values()).join(' -> ');
  return DIError("Circular dependency detected: ".concat(path, " -> ").concat(dep));
}
//# sourceMappingURL=error.js.map
