"use strict";

require("core-js/modules/es.array.iterator");
require("core-js/modules/es.map");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSelectorWithArray = void 0;
exports.defaultMemoize = defaultMemoize;
var _isEqual = require("./isEqual");
/* eslint-disable func-names */

/* eslint-disable prefer-rest-params */

function defaultMemoize(func) {
  var lastArgs = new Map();
  var lastResult = new Map();
  return function () {
    var _lastArgs$get;
    if (!(0, _isEqual.areShallowEqualWithArray)((_lastArgs$get = lastArgs.get(this)) !== null && _lastArgs$get !== void 0 ? _lastArgs$get : [], arguments)) {
      lastResult.set(this, func.apply(this, arguments));
    }
    lastArgs.set(this, arguments);
    return lastResult.get(this);
  };
}
var createSelectorCreatorWithArray = function createSelectorCreatorWithArray() {
  var memoize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMemoize;
  return function (dependenciesFunc, resultFunc) {
    var memoizedResultFunc = memoize(function () {
      return resultFunc.apply(this, arguments);
    });
    return function () {
      return memoizedResultFunc.apply(this, dependenciesFunc.apply(null, [this]));
    };
  };
};
var createSelectorWithArray = createSelectorCreatorWithArray();
exports.createSelectorWithArray = createSelectorWithArray;
//# sourceMappingURL=selector.js.map
