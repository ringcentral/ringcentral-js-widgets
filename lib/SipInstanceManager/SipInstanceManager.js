"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SipInstanceManager = void 0;
var _uuid = require("uuid");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SipInstanceManager = /*#__PURE__*/function () {
  function SipInstanceManager(prefix) {
    _classCallCheck(this, SipInstanceManager);
    this._prefix = void 0;
    this._prefix = prefix;
  }
  _createClass(SipInstanceManager, [{
    key: "getInstanceId",
    value: function getInstanceId(endpointId) {
      var _this = this;
      var allInstances = this._getAllInActiveInstancesData();
      var currentTime = Date.now();
      // clean expired data;
      allInstances.forEach(function (instance) {
        if (instance.endpointId !== endpointId || currentTime - instance.inactiveAt >= 180000) {
          // clean instance not in current endpoint id
          // clean instance if inactive before 3 min
          _this._removeInstanceData(instance.id);
        }
      });
      // find inactive instance that inactive in 3 min
      var inactiveInstance = allInstances.filter(function (instance) {
        return instance.endpointId === endpointId && currentTime - instance.inactiveAt < 180000;
      }).sort(function (inst1, inst2) {
        return inst2.inactiveAt - inst1.inactiveAt;
      })[0];
      // reuse inactive instance
      if (inactiveInstance) {
        // remove it from localStorage, so it can only be used in current tab
        this._removeInstanceData(inactiveInstance.id);
        return inactiveInstance.id;
      }
      return (0, _uuid.v4)();
    }
  }, {
    key: "setInstanceInactive",
    value: function setInstanceInactive(instanceId, endpointId) {
      var instanceData = {
        id: instanceId,
        endpointId: endpointId,
        inactiveAt: Date.now()
      };
      this._saveInstanceData(instanceData);
    }
  }, {
    key: "_getAllInActiveInstancesData",
    value: function _getAllInActiveInstancesData() {
      var keys = this._getAllKeys();
      var instances = [];
      keys.forEach(function (key) {
        var rawData = localStorage.getItem(key);
        if (rawData) {
          instances.push(JSON.parse(rawData));
        }
      });
      return instances;
    }
  }, {
    key: "_saveInstanceData",
    value: function _saveInstanceData(instanceData) {
      localStorage.setItem("".concat(this._prefix, "-").concat(instanceData.id), JSON.stringify(instanceData));
    }
  }, {
    key: "_removeInstanceData",
    value: function _removeInstanceData(instanceId) {
      localStorage.removeItem("".concat(this._prefix, "-").concat(instanceId));
    }
  }, {
    key: "_getAllKeys",
    value: function _getAllKeys() {
      var keys = [];
      for (var i = 0; i < localStorage.length; i += 1) {
        var key = localStorage.key(i);
        if (key && key !== '' && key.indexOf(this._prefix) === 0) {
          keys.push(key);
        }
      }
      return keys;
    }
  }]);
  return SipInstanceManager;
}();
exports.SipInstanceManager = SipInstanceManager;
//# sourceMappingURL=SipInstanceManager.js.map
