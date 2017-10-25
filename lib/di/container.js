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

var _error = require('./utils/error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = function () {
  function Container() {
    (0, _classCallCheck3.default)(this, Container);

    this.parent = null;
    this._map = new _map2.default();
  }

  (0, _createClass3.default)(Container, [{
    key: 'has',
    value: function has(token) {
      if (this._map.has(token)) return true;
      if (this.parent !== null) return this.parent.has(token);
      return false;
    }
  }, {
    key: 'get',
    value: function get(token) {
      if (this._map.has(token)) return this._map.get(token);
      if (this.parent !== null) return this.parent.get(token);
      throw (0, _error.DIError)('Cannot find provider [' + token + '] in Container');
    }
  }, {
    key: 'set',
    value: function set(token, metadata) {
      if (this._map.has(token)) {
        throw (0, _error.DIError)('Cannot store duplicated provider instance [' + token + '] to Container');
      }
      return this._map.set(token, metadata);
    }
  }, {
    key: 'localHas',
    value: function localHas(token) {
      return this._map.has(token);
    }
  }, {
    key: 'localGet',
    value: function localGet(token) {
      return this._map.get(token);
    }
  }, {
    key: 'setParent',
    value: function setParent(parent) {
      this.parent = parent;
    }
  }, {
    key: 'entries',
    value: function entries() {
      return this._map.entries();
    }
  }, {
    key: 'values',
    value: function values() {
      return this._map.values();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this._map.clear();
    }
  }]);
  return Container;
}();

exports.default = Container;
//# sourceMappingURL=container.js.map
