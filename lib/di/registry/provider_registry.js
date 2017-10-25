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
 * ProviderRegistry is a centralized structure for storing provider metadata.
 * It's a map data structure mapping Token to Provider.
 */
var ProviderRegistry = function () {
  function ProviderRegistry() {
    (0, _classCallCheck3.default)(this, ProviderRegistry);

    this._map = new _map2.default();
  }

  (0, _createClass3.default)(ProviderRegistry, [{
    key: 'get',
    value: function get(token) {
      if (!this._map.has(token)) {
        throw (0, _error.DIError)('Can not find token [' + token + '] in ProviderRegistry');
      }
      return this._map.get(token).providers;
    }
  }, {
    key: 'set',
    value: function set(token, providers) {
      if (this._map.has(token)) {
        throw (0, _error.DIError)('Can only register [' + token + '] once');
      }
      return this._map.set(token, { providers: providers, resolved: false });
    }
  }, {
    key: 'resolved',
    value: function resolved(token) {
      return !!this._map.get(token).resolved;
    }
  }, {
    key: 'resolve',
    value: function resolve(token, providers) {
      if (!this._map.has(token)) {
        throw (0, _error.DIError)('Cannot resolve provider metadata [' + token + ']: providers is not found');
      }
      this._map.set(token, { providers: providers, resolved: true });
    }
  }, {
    key: 'has',
    value: function has(token) {
      return this._map.has(token);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this._map.clear();
    }
  }]);
  return ProviderRegistry;
}();

exports.default = ProviderRegistry;
//# sourceMappingURL=provider_registry.js.map
