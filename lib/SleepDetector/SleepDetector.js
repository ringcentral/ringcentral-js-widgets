"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SleepDetector = exports.SleepDetectorEvents = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.date.now");

var _events = _interopRequireDefault(require("events"));

var _Enum = _interopRequireDefault(require("../Enum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DEFAULT_INTERVAL = 30 * 1000;
var DEFAULT_THRESHOLD = 60 * 1000;
var SleepDetectorEvents = new _Enum["default"](['heartbeat', 'detected'], 'SleepDetectorEvents');
exports.SleepDetectorEvents = SleepDetectorEvents;

var SleepDetector = /*#__PURE__*/function (_EventEmitter) {
  _inherits(SleepDetector, _EventEmitter);

  var _super = _createSuper(SleepDetector);

  function SleepDetector() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$detectionInterva = _ref.detectionInterval,
        detectionInterval = _ref$detectionInterva === void 0 ? DEFAULT_INTERVAL : _ref$detectionInterva,
        _ref$detectionThresho = _ref.detectionThreshold,
        detectionThreshold = _ref$detectionThresho === void 0 ? DEFAULT_THRESHOLD : _ref$detectionThresho,
        _ref$startImmediately = _ref.startImmediately,
        startImmediately = _ref$startImmediately === void 0 ? true : _ref$startImmediately;

    _classCallCheck(this, SleepDetector);

    _this = _super.call(this);
    _this._detectionInterval = detectionInterval;
    _this._detectionThreshold = detectionThreshold;
    _this._timeout = null;

    if (startImmediately) {
      _this.detect();
    }

    return _this;
  }

  _createClass(SleepDetector, [{
    key: "detect",
    value: function detect() {
      var _this2 = this;

      this.stop();
      var startTime = Date.now();
      this.emit(SleepDetectorEvents.heartbeat, startTime);
      this._timeout = global.setTimeout(function () {
        var endTime = Date.now();
        var sleepTime = endTime - startTime - _this2._detectionInterval;

        if (sleepTime > _this2._detectionThreshold) {
          _this2.emit(SleepDetectorEvents.detected, startTime, endTime, sleepTime);
        }

        _this2._timeout = null;

        _this2.detect();
      }, this._detectionInterval);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this._timeout) {
        global.clearTimeout(this._timeout);
        this._timeout = null;
      }
    }
  }]);

  return SleepDetector;
}(_events["default"]);

exports.SleepDetector = SleepDetector;
//# sourceMappingURL=SleepDetector.js.map
