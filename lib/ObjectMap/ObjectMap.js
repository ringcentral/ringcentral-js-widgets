"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectMap = void 0;
exports.prefixString = prefixString;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("reflect-metadata");
var _ramda = require("ramda");
var _class;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var sDefinition = Symbol('definition');
var RUNTIME = {
  usingFactory: false,
  prefixCache: new Map()
};
function factory(prototype, property, descriptor) {
  var baseFunction = descriptor.value;
  return _objectSpread(_objectSpread({}, descriptor), {}, {
    value: function value() {
      RUNTIME.usingFactory = true;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var result = baseFunction.call.apply(baseFunction, [this].concat(args));
      RUNTIME.usingFactory = false;
      return result;
    }
  });
}
function prefixString(str) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return prefix === '' ? str : "".concat(prefix, "-").concat(str);
}
var ObjectMap = exports.ObjectMap = (_class = /*#__PURE__*/function () {
  function ObjectMap(definition) {
    var _this = this;
    _classCallCheck(this, ObjectMap);
    this[sDefinition] = new Map();
    if (!RUNTIME.usingFactory) {
      throw TypeError('Instantiating ObjectMap with `new ObjectMap(definition)` is not recommended. ' + 'Please use one of the ObjectMap factory functions.');
    }
    if (definition) {
      var _loop = function _loop(key) {
        if (Object.prototype.hasOwnProperty.call(definition, key)) {
          _this[sDefinition].set(key, definition[key]);
          Object.defineProperty(_this, key, {
            get: function get() {
              return this[sDefinition].get(key);
            },
            enumerable: true
          });
        }
      };
      for (var key in definition) {
        _loop(key);
      }
    }
  }
  return _createClass(ObjectMap, null, [{
    key: "fromObject",
    value: function fromObject(definition) {
      return new ObjectMap(definition);
    }
  }, {
    key: "fromKeys",
    value: function fromKeys(keys) {
      var definition = {};
      var _iterator = _createForOfIteratorHelper(keys),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          definition[key] = key;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return new ObjectMap(definition);
    }
  }, {
    key: "prefixKeys",
    value: function prefixKeys(keys) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var definition = {};
      var _iterator2 = _createForOfIteratorHelper(keys),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var key = _step2.value;
          definition[key] = prefixString(key, prefix);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return new ObjectMap(definition);
    }
  }, {
    key: "getKey",
    value: function getKey(instance, value) {
      var _ref = (0, _ramda.find)(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
            v = _ref4[1];
          return v === value;
        }, _toConsumableArray(ObjectMap.entries(instance))) || [],
        _ref2 = _slicedToArray(_ref, 1),
        _ref2$ = _ref2[0],
        key = _ref2$ === void 0 ? null : _ref2$;
      return key;
    }
  }, {
    key: "entries",
    value: function entries(instance) {
      return instance[sDefinition].entries();
    }
  }, {
    key: "size",
    value: function size(instance) {
      return instance[sDefinition].size;
    }
  }, {
    key: "has",
    value: function has(instance, key) {
      return instance[sDefinition].has(key);
    }
  }, {
    key: "hasValue",
    value: function hasValue(instance, value) {
      return !!ObjectMap.getKey(instance, value);
    }
  }, {
    key: "keys",
    value: function keys(instance) {
      return instance[sDefinition].keys();
    }
  }, {
    key: "values",
    value: function values(instance) {
      return instance[sDefinition].values();
    }
  }, {
    key: "forEach",
    value: function forEach(fn, instance) {
      return instance[sDefinition].forEach(function (v, k) {
        return fn(v, k, instance);
      });
    }
  }, {
    key: "filter",
    value: function filter(fn, instance) {
      var obj = {};
      ObjectMap.forEach(function (v, k) {
        if (fn(v, k)) {
          obj[k] = v;
        }
      }, instance);
      return ObjectMap.fromObject(obj);
    }
  }, {
    key: "prefixValues",
    value: function prefixValues(instance) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      if (prefix === '') {
        return instance;
      }
      if (!RUNTIME.prefixCache.has(prefix)) {
        RUNTIME.prefixCache.set(prefix, new Map());
      }
      if (!RUNTIME.prefixCache.get(prefix).has(instance)) {
        var definition = {};
        ObjectMap.forEach(function (value, key) {
          definition[key] = prefixString(value, prefix);
        }, instance);
        var prefixedInstance = ObjectMap.fromObject(definition);
        RUNTIME.prefixCache.get(prefix).set(instance, prefixedInstance);
      }
      return RUNTIME.prefixCache.get(prefix).get(instance);
    }
  }]);
}(), _applyDecoratedDescriptor(_class, "fromObject", [factory], Object.getOwnPropertyDescriptor(_class, "fromObject"), _class), _applyDecoratedDescriptor(_class, "fromKeys", [factory], Object.getOwnPropertyDescriptor(_class, "fromKeys"), _class), _applyDecoratedDescriptor(_class, "prefixKeys", [factory], Object.getOwnPropertyDescriptor(_class, "prefixKeys"), _class), _class);
//# sourceMappingURL=ObjectMap.js.map
