"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataSource = exports.DEFAULT_TTL = exports.DEFAULT_RETRY_INTERVALS = exports.DEFAULT_RETRY = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DEFAULT_TTL = exports.DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_RETRY = exports.DEFAULT_RETRY = 62 * 1000;
var DEFAULT_RETRY_INTERVALS = exports.DEFAULT_RETRY_INTERVALS = [2 * 1000, 5 * 1000, 10 * 1000, 30 * 1000];
var DEFAULT_READY_CHECK = function DEFAULT_READY_CHECK() {
  return true;
};
var DEFAULT_PERMISSION_CHECK = function DEFAULT_PERMISSION_CHECK() {
  return true;
};

/**
 * Data source for the DataFetcher service
 * Configures how data is fetched, cached, and polled
 *
 * @class
 * @template T Type of data this source fetches
 */
var DataSource = exports.DataSource = /*#__PURE__*/function () {
  function DataSource(_props) {
    _classCallCheck(this, DataSource);
    this._props = _props;
  }
  return _createClass(DataSource, [{
    key: "props",
    get: function get() {
      return this._props;
    }

    /**
     * Unique key for this data source
     * @type {string}
     */
  }, {
    key: "key",
    get: function get() {
      return this._props.key;
    }

    /**
     * Whether to disable setting null when permission check fails
     * @type {boolean}
     */
  }, {
    key: "disableSetNull",
    get: function get() {
      return this._props.disableSetNull;
    }

    /**
     * Function that fetches data from the server
     * @returns {Promise<T>} Promise that resolves with the fetched data
     */
  }, {
    key: "fetchFunction",
    value: function fetchFunction() {
      return this._props.fetchFunction();
    }

    /**
     * Time-to-live for cached data in milliseconds
     * @type {number}
     */
  }, {
    key: "ttl",
    get: function get() {
      var _this$_props$ttl;
      return (_this$_props$ttl = this._props.ttl) !== null && _this$_props$ttl !== void 0 ? _this$_props$ttl : DEFAULT_TTL;
    }

    /**
     * Time to wait before retrying after a failed fetch
     * @type {number}
     */
  }, {
    key: "timeToRetry",
    get: function get() {
      var _this$_props$timeToRe;
      return (_this$_props$timeToRe = this._props.timeToRetry) !== null && _this$_props$timeToRe !== void 0 ? _this$_props$timeToRe : DEFAULT_RETRY;
    }

    /**
     * Intervals to use for retry attempts
     * @type {readonly number[]}
     */
  }, {
    key: "retryIntervals",
    get: function get() {
      var _this$_props$retryInt;
      return (_this$_props$retryInt = this._props.retryIntervals) !== null && _this$_props$retryInt !== void 0 ? _this$_props$retryInt : DEFAULT_RETRY_INTERVALS;
    }

    /**
     * Whether to disable caching for this data source
     * @type {boolean}
     */
  }, {
    key: "disableCache",
    get: function get() {
      return !!this._props.disableCache;
    }

    /**
     * Whether to enable polling for this data source
     * @type {boolean}
     */
  }, {
    key: "polling",
    get: function get() {
      return !!this._props.polling;
    }

    /**
     * Interval for polling in milliseconds
     * @type {number}
     */
  }, {
    key: "pollingInterval",
    get: function get() {
      var _this$_props$pollingI;
      // polling interval should be >= than ttl
      return Math.max((_this$_props$pollingI = this._props.pollingInterval) !== null && _this$_props$pollingI !== void 0 ? _this$_props$pollingI : this.ttl, this.ttl);
    }

    /**
     * Whether to clean up data on reset/logout
     * @default true
     * @description Clean up data on logout. Default to true as DataFetcher
     *  will always fetchData on login. This will also be always true if disableCache is true.
     * @type {boolean}
     */
  }, {
    key: "cleanOnReset",
    get: function get() {
      var _ref;
      return !!((_ref = this.disableCache || this._props.cleanOnReset) !== null && _ref !== void 0 ? _ref : true);
    }

    /**
     * Function that checks if the module is ready to fetch data
     * @returns {boolean} Whether the module is ready
     */
  }, {
    key: "readyCheckFunction",
    value: function readyCheckFunction() {
      var _this$_props$readyChe;
      return ((_this$_props$readyChe = this._props.readyCheckFunction) !== null && _this$_props$readyChe !== void 0 ? _this$_props$readyChe : DEFAULT_READY_CHECK)();
    }

    /**
     * Function that checks if the user has permission to fetch data
     * @returns {boolean} Whether the user has permission
     */
  }, {
    key: "permissionCheckFunction",
    value: function permissionCheckFunction() {
      var _this$_props$permissi;
      return ((_this$_props$permissi = this._props.permissionCheckFunction) !== null && _this$_props$permissi !== void 0 ? _this$_props$permissi : DEFAULT_PERMISSION_CHECK)();
    }
  }]);
}();
//# sourceMappingURL=DataSource.js.map
