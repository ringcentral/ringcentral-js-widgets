'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _error = require('../utils/error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Module registry is used to store module metadata.
 */
var ModuleRegistry = function () {
  function ModuleRegistry() {
    (0, _classCallCheck3.default)(this, ModuleRegistry);

    // class reference -> metadata
    this._map = new _map2.default();
  }

  (0, _createClass3.default)(ModuleRegistry, [{
    key: 'get',
    value: function get(moduleRef) {
      if (!this._map.has(moduleRef)) {
        throw (0, _error.DIError)('Cannot find module [' + moduleRef.name + '] in ModuleRegistry');
      }
      return this._map.get(moduleRef).metadata;
    }
  }, {
    key: 'resolved',
    value: function resolved(moduleRef) {
      return this._map.get(moduleRef).resolved;
    }
  }, {
    key: 'set',
    value: function set(moduleRef, metadata) {
      if (this._map.has(moduleRef)) {
        throw (0, _error.DIError)('Can only register module [' + moduleRef.name + '] once');
      }
      return this._map.set(moduleRef, { metadata: metadata, resolved: false });
    }
  }, {
    key: 'resolve',
    value: function resolve(moduleRef, metadata) {
      if (!this._map.has(moduleRef)) {
        throw (0, _error.DIError)('Cannot resolve module metadata [' + moduleRef + ']: module is not found');
      }
      this._map.set(moduleRef, {
        metadata: metadata,
        resolved: true
      });
    }
  }, {
    key: 'has',
    value: function has(moduleRef) {
      return this._map.has(moduleRef);
    }
  }, {
    key: 'entries',
    value: function entries() {
      return this._map.entries();
    }
  }, {
    key: 'keys',
    value: function keys() {
      return this._map.keys();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this._map.clear();
    }
  }]);
  return ModuleRegistry;
}();

exports.default = ModuleRegistry;
//# sourceMappingURL=module_registry.js.map
