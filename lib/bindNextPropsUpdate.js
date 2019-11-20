"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindNextPropsUpdate = bindNextPropsUpdate;

require("core-js/modules/es6.object.define-property");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function bindNextPropsUpdate(instance) {
  return function (nextProps) {
    var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';

    if (typeof nextProps[field] !== 'undefined' && nextProps[field] !== instance.props[field] && nextProps[field] !== instance.state[field]) {
      instance.setState(_defineProperty({}, field, nextProps[field]));
    }
  };
}
//# sourceMappingURL=bindNextPropsUpdate.js.map
