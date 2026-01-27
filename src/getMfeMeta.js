"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMfeMeta = exports.getMfeDeps = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.to-string.js");
var _mfeReact = require("@ringcentral/mfe-react");
var _excluded = ["dependencies", "exposes"];
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var getMfeDeps = exports.getMfeDeps = function getMfeDeps() {
  var _meta$data$modules, _modules$name$depende, _modules$name;
  var meta = (0, _mfeReact.getMeta)();
  if (!(meta === null || meta === void 0 ? void 0 : meta.data.main)) return {};
  var name = meta.data.main;
  var modules = (_meta$data$modules = meta.data.modules) !== null && _meta$data$modules !== void 0 ? _meta$data$modules : {};
  return (_modules$name$depende = (_modules$name = modules[name]) === null || _modules$name === void 0 ? void 0 : _modules$name.dependencies) !== null && _modules$name$depende !== void 0 ? _modules$name$depende : {};
};
/**
 * Get MFE meta data from the current app shell.
 *
 * @param options
 * @returns
 */
var getMfeMeta = exports.getMfeMeta = function getMfeMeta() {
  var _getMeta, _name$dependencies, _name, _getMeta$data$modules, _getMeta2;
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    onlyVersion = _ref.onlyVersion,
    _ref$prefix = _ref.prefix,
    prefix = _ref$prefix === void 0 ? '' : _ref$prefix;
  var name = (_getMeta = (0, _mfeReact.getMeta)()) === null || _getMeta === void 0 ? void 0 : _getMeta.data.main;
  if (!name) return {};
  var modules = (_name$dependencies = (_name = ((_getMeta$data$modules = (_getMeta2 = (0, _mfeReact.getMeta)()) === null || _getMeta2 === void 0 ? void 0 : _getMeta2.data.modules) !== null && _getMeta$data$modules !== void 0 ? _getMeta$data$modules : {})[name]) === null || _name === void 0 ? void 0 : _name.dependencies) !== null && _name$dependencies !== void 0 ? _name$dependencies : {};
  return Object.entries(modules).reduce(function (acc, _ref3) {
    var _config$version;
    var _ref4 = _slicedToArray(_ref3, 2),
      name = _ref4[0],
      _ref2 = _ref4[1];
    var dependencies = _ref2.dependencies,
      exposes = _ref2.exposes,
      config = _objectWithoutProperties(_ref2, _excluded);
    return Object.assign(acc, _defineProperty({}, "".concat(prefix).concat(name), onlyVersion ? (_config$version = config.version) !== null && _config$version !== void 0 ? _config$version : '*' : config));
  }, {});
};
//# sourceMappingURL=getMfeMeta.js.map
