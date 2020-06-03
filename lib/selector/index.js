"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSelector = createSelector;

var _reselect = require("reselect");

function createSelector() {
  var selector = _reselect.createSelector.apply(void 0, arguments);

  return function (checkedState) {
    return selector(checkedState || {});
  };
}
//# sourceMappingURL=index.js.map
