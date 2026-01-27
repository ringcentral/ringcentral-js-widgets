"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerfTracker = exports.DEFAULT_INTERVAL = exports.APPLICATION_NAME = void 0;
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _ramda = require("ramda");
var _rxjs = require("rxjs");
var _helper = require("./helper");
var _dec, _dec2, _dec3, _dec4, _class;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var APPLICATION_NAME = exports.APPLICATION_NAME = 'int-teams-trace';
var DEFAULT_INTERVAL = exports.DEFAULT_INTERVAL = 60 * 1000;

/**
 * performance tracking module, if you need custom report detail data, can use `detailProcessor` to custom that
 */
var PerfTracker = exports.PerfTracker = (_dec = (0, _nextCore.injectable)({
  name: 'PerfTracker'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('PerfTrackerOptions')(target, undefined, 1);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _nextCore.Root === "undefined" ? Object : _nextCore.Root, typeof PerfTrackerOptions === "undefined" ? Object : PerfTrackerOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = /*#__PURE__*/function (_RcModule) {
  function PerfTracker(_root, _perfTrackerOption) {
    var _this;
    _classCallCheck(this, PerfTracker);
    _this = _callSuper(this, PerfTracker);
    _this._root = _root;
    _this._perfTrackerOption = _perfTrackerOption;
    _this._marks = new Set();
    _this._measures = new Set();
    _this._lastMeasurements = void 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _this.detailProcessor = new Set();
    var intervalTime = _this._perfTrackerOption.interval || DEFAULT_INTERVAL;
    if (_this.enabled) {
      (0, _rxjs.interval)(intervalTime).pipe((0, _rxjs.tap)(function () {
        _this.flush();
      }),
      // when app destroy remove that interval
      (0, _rxjs.takeUntil)(_this._root.destroy$)).subscribe();
    }
    return _this;
  }
  /**
   * create a timestamp marker in the browser's performance timeline
   * @param key
   * @returns
   */
  _inherits(PerfTracker, _RcModule);
  return _createClass(PerfTracker, [{
    key: "getProcessedDetail",
    value:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getProcessedDetail(value) {
      if (this.detailProcessor.size > 0) {
        return _toConsumableArray(this.detailProcessor).reduce(function (acc, curr) {
          return curr(acc);
        }, value);
      }
      return value;
    }
  }, {
    key: "performance",
    get: function get() {
      var _this$_perfTrackerOpt, _this$_perfTrackerOpt2;
      return (_this$_perfTrackerOpt = (_this$_perfTrackerOpt2 = this._perfTrackerOption) === null || _this$_perfTrackerOpt2 === void 0 ? void 0 : _this$_perfTrackerOpt2.performanceProvider) !== null && _this$_perfTrackerOpt !== void 0 ? _this$_perfTrackerOpt : performance;
    }
  }, {
    key: "mark",
    value: function mark(key, markOptions) {
      if (!this.enabled) return;
      try {
        this.performance.mark(key, markOptions);
        this._marks.add(key);
      } catch (err) {
        this.logger.log('performance mark error', err);
      }
    }

    /**
     * create a timestamp marker in the browser's performance timeline only one time
     * if call this function multiple times, only create the first timestamp marker
     * @param mark key
     * @returns
     */
  }, {
    key: "markOnce",
    value: function markOnce(key, markOptions) {
      if (!this.enabled || this._marks.has(key)) return;
      this.mark(key, markOptions);
    }

    /**
     * measure the time between two marks in the browser's performance timeline.
     * @param param0
     * @returns
     */
  }, {
    key: "measure",
    value: function measure(_ref) {
      var name = _ref.name,
        startMark = _ref.startMark,
        endMark = _ref.endMark;
      if (!this.enabled) return;
      try {
        var detail = this.getProcessedDetail({
          type: 'duration',
          os: (0, _utils.getOSType)(),
          memoryUsed: (0, _helper.getMemoryUsed)(),
          applicationName: APPLICATION_NAME,
          // This is a temporary filed, will modified in the future
          createAt: Date.now(),
          env: this._perfTrackerOption.env
        });
        this.performance.measure(name, {
          start: startMark ? startMark : 0,
          end: endMark || this.performance.now(),
          detail: detail
        });
        this._measures.add(name);
      } catch (err) {
        this.logger.log('performance measure error', err);
      }
    }

    /**
     * measure the time between two marks in the browser's performance timeline.
     * if call mulptile time, only measure the first time
     * @param param0
     * @returns
     */
  }, {
    key: "measureOnce",
    value: function measureOnce(_ref2) {
      var name = _ref2.name,
        startMark = _ref2.startMark,
        endMark = _ref2.endMark;
      if (!this.enabled || this._measures.has(name)) return;
      this.measure({
        name: name,
        startMark: startMark,
        endMark: endMark
      });
    }
  }, {
    key: "now",
    value: function now() {
      return this.performance.now() + this.performance.timeOrigin;
    }
  }, {
    key: "transform",
    value: function transform(entries) {
      return entries.map(function (_ref3) {
        var name = _ref3.name,
          duration = _ref3.duration,
          detail = _ref3.detail;
        return {
          name: name,
          value: "".concat(duration),
          unit: 'ms',
          labels: detail
        };
      });
    }
  }, {
    key: "peakMeasurement",
    value: function peakMeasurement() {
      var _ref4, _this$performance$get, _this$performance, _this$_perfTrackerOpt3;
      var measured = (_ref4 = (_this$performance$get = (_this$performance = this.performance).getEntriesByType) === null || _this$performance$get === void 0 ? void 0 : _this$performance$get.call(_this$performance, 'measure')) !== null && _ref4 !== void 0 ? _ref4 : [];
      var _ref5 = (_this$_perfTrackerOpt3 = this._perfTrackerOption) !== null && _this$_perfTrackerOpt3 !== void 0 ? _this$_perfTrackerOpt3 : {},
        sortByName = _ref5.sortByName;
      var bulk = this.transform(sortByName ? measured.sort(function (a, b) {
        return sortByName.indexOf(a.name) - sortByName.indexOf(b.name);
      }) : measured);
      return bulk;
    }
  }, {
    key: "flush",
    value: function flush() {
      var measured = this.peakMeasurement();
      if (!measured.length) return;
      if (!(0, _ramda.equals)(measured, this._lastMeasurements)) {
        this.logger.log(measured);
        this._lastMeasurements = measured;
        console.table(measured);
      }
    }
  }, {
    key: "enabled",
    get: function get() {
      var _this$_perfTrackerOpt4;
      return (_this$_perfTrackerOpt4 = this._perfTrackerOption.enabled) !== null && _this$_perfTrackerOpt4 !== void 0 ? _this$_perfTrackerOpt4 : false;
    }
  }]);
}(_nextCore.RcModule)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=PerfTracker.js.map
