"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _error = require("./utils/error");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Container =
/*#__PURE__*/
function () {
  function Container() {
    _classCallCheck(this, Container);

    this.parent = null;
    this._map = new Map();
  }

  _createClass(Container, [{
    key: "has",
    value: function has(token) {
      if (this._map.has(token)) return true;
      if (this.parent !== null) return this.parent.has(token);
      return false;
    }
  }, {
    key: "get",
    value: function get(token) {
      if (this._map.has(token)) return this._map.get(token);
      if (this.parent !== null) return this.parent.get(token);
      throw (0, _error.DIError)("Cannot find provider [".concat(token, "] in Container"));
    }
  }, {
    key: "set",
    value: function set(token, metadata) {
      if (this._map.has(token)) {
        throw (0, _error.DIError)("Cannot store duplicated provider instance [".concat(token, "] to Container"));
      }

      return this._map.set(token, metadata);
    }
  }, {
    key: "localHas",
    value: function localHas(token) {
      return this._map.has(token);
    }
  }, {
    key: "localGet",
    value: function localGet(token) {
      return this._map.get(token);
    }
  }, {
    key: "setParent",
    value: function setParent(parent) {
      this.parent = parent;
    }
  }, {
    key: "entries",
    value: function entries() {
      return this._map.entries();
    }
  }, {
    key: "values",
    value: function values() {
      return this._map.values();
    }
  }, {
    key: "reset",
    value: function reset() {
      this._map.clear();
    }
  }]);

  return Container;
}();

exports["default"] = Container;
//# sourceMappingURL=container.js.map
