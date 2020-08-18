"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefixEnum = prefixEnum;
exports.createEnum = createEnum;
exports.prefixCache = exports["default"] = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.entries");

var _freeze = _interopRequireDefault(require("./freeze"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var hasOwnProperty = Object.prototype.hasOwnProperty,
    entries = Object.entries,
    keys = Object.keys,
    defineProperties = Object.defineProperties,
    defineProperty = Object.defineProperty;

var Enum = /*#__PURE__*/function () {
  function Enum() {
    var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var prefix = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Enum);

    var properties = {
      prefix: {
        value: prefix,
        configurable: false,
        enumerable: false,
        writable: false
      }
    };
    keys.forEach(function (item) {
      properties[item] = Enum.setPrefix(item, prefix);
    });
    defineProperties(this, properties);

    if (typeof window !== 'undefined' && window.Proxy && window.Reflect) {
      return (0, _freeze["default"])(this);
    }

    Object.freeze(this);
  }

  _createClass(Enum, [{
    key: "add",
    value: function add(item) {
      if (this[item]) {
        throw new Error("'".concat(item, "' enumeration property already exists for this instance"));
      }

      var property = Enum.setPrefix(item, this.prefix);
      defineProperty(this, item, property);
    }
  }, {
    key: "remove",
    value: function remove(item) {
      if (!hasOwnProperty.call(this, item)) {
        throw new Error("'".concat(item, "' enumeration property does not exist for this instance"));
      }

      delete this[item];
    }
  }, {
    key: "size",
    get: function get() {
      return entries(this).length;
    }
  }], [{
    key: "setPrefix",
    value: function setPrefix(item, prefix) {
      var value = prefix ? "".concat(prefix, "-").concat(item) : item;
      return {
        value: value,
        configurable: true,
        enumerable: true,
        writable: true
      };
    }
  }]);

  return Enum;
}();

exports["default"] = Enum;
var prefixCache = {};
exports.prefixCache = prefixCache;

function prefixEnum(_ref) {
  var enumMap = _ref.enumMap,
      prefix = _ref.prefix,
      _ref$base = _ref.base,
      base = _ref$base === void 0 ? enumMap : _ref$base;
  if (!prefix || prefix === '') return base;

  if (prefixCache[prefix] === null || typeof prefixCache[prefix] === 'undefined') {
    prefixCache[prefix] = {};
  }

  var cache = prefixCache[prefix];

  if (cache && !cache[base.prefix]) {
    Object.assign(cache, _defineProperty({}, base.prefix, new Enum(keys(enumMap), "".concat(prefix, "-").concat(enumMap.prefix))));
  }

  return cache && cache[base.prefix];
}

function createEnum(values, prefix) {
  return new Enum(values, prefix);
}
//# sourceMappingURL=enum.js.map
