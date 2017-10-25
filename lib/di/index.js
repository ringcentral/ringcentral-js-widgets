'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModuleFactory = exports.Library = exports.Module = exports.Injector = undefined;

var _injector = require('./injector');

Object.defineProperty(exports, 'Injector', {
  enumerable: true,
  get: function get() {
    return _injector.Injector;
  }
});

var _module = require('./decorators/module');

var _module2 = _interopRequireDefault(_module);

var _library = require('./decorators/library');

var _library2 = _interopRequireDefault(_library);

var _module_factory = require('./decorators/module_factory');

var _module_factory2 = _interopRequireDefault(_module_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Module = _module2.default;
exports.Library = _library2.default;
exports.ModuleFactory = _module_factory2.default;
//# sourceMappingURL=index.js.map
