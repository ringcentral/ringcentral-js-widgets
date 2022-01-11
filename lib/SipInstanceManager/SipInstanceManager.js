"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SipInstanceManager = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.date.now");

var uuid = _interopRequireWildcard(require("uuid"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

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

      var currentTime = Date.now(); // clean expired data;

      allInstances.forEach(function (instance) {
        if (instance.endpointId !== endpointId || currentTime - instance.inactiveAt >= 180000) {
          // clean instance not in current endpoint id
          // clean instance if inactive before 3 min
          _this._removeInstanceData(instance.id);
        }
      }); // find inactive instance that inactive in 3 min

      var inactiveInstance = allInstances.filter(function (instance) {
        return instance.endpointId === endpointId && currentTime - instance.inactiveAt < 180000;
      }).sort(function (inst1, inst2) {
        return inst2.inactiveAt - inst1.inactiveAt;
      })[0]; // reuse inactive instance

      if (inactiveInstance) {
        // remove it from localStorage, so it can only be used in current tab
        this._removeInstanceData(inactiveInstance.id);

        return inactiveInstance.id;
      }

      return uuid.v4();
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
