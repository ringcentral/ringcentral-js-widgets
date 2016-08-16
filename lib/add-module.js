"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

exports.default = addModule;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function addModule
 * @param {String} name - Name of the module. Also used for the property name.
 * @param {any} module - The module to be attached, can be any type.
 * @description Intended to be used as an instance function. Either use
 *  the bind operator (target::addModule('testmodule', {})), or
 *  use call/apply (addModule.call(target, 'testmodule', {})).
 */
function addModule(name, module) {
  if (Object.prototype.hasOwnProperty.call(this, name)) {
    throw new Error("module '" + name + "' already exists...");
  }
  (0, _defineProperty2.default)(this, name, {
    get: function get() {
      return module;
    },

    enumerable: true
  });
}
//# sourceMappingURL=add-module.js.map
