"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Injector", {
  enumerable: true,
  get: function get() {
    return _injector.Injector;
  }
});
Object.defineProperty(exports, "Module", {
  enumerable: true,
  get: function get() {
    return _module.default;
  }
});
Object.defineProperty(exports, "Library", {
  enumerable: true,
  get: function get() {
    return _library.default;
  }
});
Object.defineProperty(exports, "ModuleFactory", {
  enumerable: true,
  get: function get() {
    return _module_factory.default;
  }
});

var _injector = require("./injector");

var _module = _interopRequireDefault(require("./decorators/module"));

var _library = _interopRequireDefault(require("./decorators/library"));

var _module_factory = _interopRequireDefault(require("./decorators/module_factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map
