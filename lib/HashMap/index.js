"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultGetFunction = defaultGetFunction;
exports.createHashMap = createHashMap;
exports["default"] = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sDefinition = Symbol('definition');
var sValueMap = Symbol('valueMap');

function defaultGetFunction(item) {
  return item;
}
/**
 * @class HashMap
 * @description Simple hash map class
 */


var HashMap =
/*#__PURE__*/
function () {
  /**
   * @constructor
   * @param {Object} definition
   */
  function HashMap(definition) {
    var _this = this;

    _classCallCheck(this, HashMap);

    this[sDefinition] = Object.assign({}, definition);
    this[sValueMap] = new Map();

    var _loop = function _loop(key) {
      /* istanbul ignore else */
      if (Object.prototype.hasOwnProperty.call(definition, key)) {
        Object.defineProperty(_this, key, {
          get: function get() {
            return this[sDefinition][key];
          },
          enumerable: true
        });

        _this[sValueMap].set(_this[sDefinition][key], key);
      }
    };

    for (var key in definition) {
      _loop(key);
    }

    Object.freeze(this);
  }

  _createClass(HashMap, null, [{
    key: "getKey",
    value: function getKey(map, value) {
      return map[sValueMap].get(value);
    }
  }, {
    key: "hasValue",
    value: function hasValue(map, value) {
      return map[sValueMap].has(value);
    }
  }, {
    key: "fromSet",
    value: function fromSet(_ref) {
      var set = _ref.set,
          _ref$getKey = _ref.getKey,
          getKey = _ref$getKey === void 0 ? defaultGetFunction : _ref$getKey,
          _ref$getValue = _ref.getValue,
          getValue = _ref$getValue === void 0 ? defaultGetFunction : _ref$getValue;
      var definition = {};

      _toConsumableArray(set).forEach(function (item) {
        var key = getKey(item);
        var value = getValue(item);

        if (typeof key !== 'undefined' && key !== null && key !== '') {
          definition[key] = value;
        }
      });

      return new HashMap(definition);
    }
  }]);

  return HashMap;
}();

exports["default"] = HashMap;

function createHashMap(definition) {
  return new HashMap(definition);
}
//# sourceMappingURL=index.js.map
