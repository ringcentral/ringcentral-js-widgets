"use strict";

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefixString = prefixString;
exports.ObjectMap = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

var _ramda = require("ramda");

var _class, _temp;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var ObjectMap = (_class = (_temp = /*#__PURE__*/function () {
  function ObjectMap(definition) {
    var _this = this;

    _classCallCheck(this, ObjectMap);

    this[sDefinition] = new Map();

    if (!RUNTIME.usingFactory) {
      throw TypeError('Instantiating ObjectMap with `new ObjectMap(definition)` is not recommended. ' + 'Please use one of the ObjectMap factory functions.');
    }

    if (definition) {
      var _loop = function _loop(_key2) {
        if (Object.prototype.hasOwnProperty.call(definition, _key2)) {
          _this[sDefinition].set(_key2, definition[_key2]);

          Object.defineProperty(_this, _key2, {
            get: function get() {
              return this[sDefinition].get(_key2);
            },
            enumerable: true
          });
        }
      };

      for (var _key2 in definition) {
        _loop(_key2);
      }
    }
  }

  _createClass(ObjectMap, null, [{
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
          var _key3 = _step.value;
          definition[_key3] = _key3;
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
          var _key4 = _step2.value;
          definition[_key4] = prefixString(_key4, prefix);
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

  return ObjectMap;
}(), _temp), (_applyDecoratedDescriptor(_class, "fromObject", [factory], Object.getOwnPropertyDescriptor(_class, "fromObject"), _class), _applyDecoratedDescriptor(_class, "fromKeys", [factory], Object.getOwnPropertyDescriptor(_class, "fromKeys"), _class), _applyDecoratedDescriptor(_class, "prefixKeys", [factory], Object.getOwnPropertyDescriptor(_class, "prefixKeys"), _class)), _class);
exports.ObjectMap = ObjectMap;
//# sourceMappingURL=ObjectMap.js.map
