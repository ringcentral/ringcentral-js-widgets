"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.object.assign");

var _RcModule2 = _interopRequireDefault(require("./RcModule"));

var _di = require("./di");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pollable = (_dec = (0, _di.Library)({
  deps: [{
    dep: 'PollableOptions',
    optional: true
  }]
}), _dec(_class =
/*#__PURE__*/
function (_RcModule) {
  _inherits(Pollable, _RcModule);

  function Pollable(_ref) {
    var _this;

    var options = Object.assign({}, _ref);

    _classCallCheck(this, Pollable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pollable).call(this, _objectSpread({}, options)));
    _this._timeoutId = null;
    return _this;
  } // eslint-disable-next-line class-methods-use-this


  _createClass(Pollable, [{
    key: "fetchData",
    // eslint-disable-next-line class-methods-use-this
    value: function fetchData() {
      throw new Error('fetchData is not implemented');
    }
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      if (this._timeoutId) clearTimeout(this._timeoutId);
    }
  }, {
    key: "_startPolling",
    value: function _startPolling() {
      var _this2 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timestamp + this.ttl + 10 - Date.now();

      this._clearTimeout();

      this._timeoutId = setTimeout(function () {
        _this2._timeoutId = null;

        if (!_this2._tabManager || _this2._tabManager.active) {
          if (!_this2.timestamp || Date.now() - _this2.timestamp > _this2.ttl) {
            _this2.fetchData();
          } else {
            _this2._startPolling();
          }
        } else if (_this2.timestamp && Date.now() - _this2.timestamp < _this2.ttl) {
          _this2._startPolling();
        } else {
          _this2._startPolling(_this2.timeToRetry);
        }
      }, t);
    }
  }, {
    key: "_retry",
    value: function _retry() {
      var _this3 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeToRetry;

      this._clearTimeout();

      this._timeoutId = setTimeout(function () {
        _this3._timeoutId = null;

        if (!_this3.timestamp || Date.now() - _this3.timestamp > _this3.ttl) {
          if (!_this3._tabManager || _this3._tabManager.active) {
            _this3.fetchData();
          } else {
            // continue retry checks in case tab becomes main tab
            _this3._retry();
          }
        }
      }, t);
    }
  }, {
    key: "timestamp",
    get: function get() {
      throw new Error('timestamp is not defined');
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "ttl",
    get: function get() {
      throw new Error('ttl is not defined');
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "timeToRetry",
    get: function get() {
      throw new Error('timeToRetry is not defined');
    }
  }]);

  return Pollable;
}(_RcModule2.default)) || _class);
exports.default = Pollable;
//# sourceMappingURL=Pollable.js.map
