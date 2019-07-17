"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.replace");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.date.now");

var _uuid = _interopRequireDefault(require("uuid"));

var _events = _interopRequireDefault(require("events"));

var _sleep = _interopRequireDefault(require("./sleep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HEART_BEAT_INTERVAL = 1000; // heatbeat older than HEART_BEAT_EXPIRE will be gc'ed
// chrome and firefox throttles intervals when inactive expire time of 2000
// sometimes would kill live heartbeats and cause the mainTabId to change

var HEART_BEAT_EXPIRE = 3000;
var GC_INTERVAL = 5000;
var FIGHT_TIMEOUT = 20;
/**
 * @class
 * @description The base active tab and cross tab event handling class.
 */

var Tabbie =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Tabbie, _EventEmitter);

  function Tabbie(_ref) {
    var _this;

    var _ref$prefix = _ref.prefix,
        prefix = _ref$prefix === void 0 ? '' : _ref$prefix,
        _ref$heartBeatInterva = _ref.heartBeatInterval,
        heartBeatInterval = _ref$heartBeatInterva === void 0 ? HEART_BEAT_INTERVAL : _ref$heartBeatInterva,
        _ref$heartBeatExpire = _ref.heartBeatExpire,
        heartBeatExpire = _ref$heartBeatExpire === void 0 ? HEART_BEAT_EXPIRE : _ref$heartBeatExpire,
        _ref$gcInterval = _ref.gcInterval,
        gcInterval = _ref$gcInterval === void 0 ? GC_INTERVAL : _ref$gcInterval,
        _ref$fightTimeout = _ref.fightTimeout,
        fightTimeout = _ref$fightTimeout === void 0 ? FIGHT_TIMEOUT : _ref$fightTimeout,
        options = _objectWithoutProperties(_ref, ["prefix", "heartBeatInterval", "heartBeatExpire", "gcInterval", "fightTimeout"]);

    _classCallCheck(this, Tabbie);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tabbie).call(this, options));

    _this._heartBeat = function () {
      localStorage.setItem(_this._heartBeatKey, Date.now());
    };

    _this._gc = function () {
      var expiredCut = Date.now() - _this._heartBeatExpire;

      _this._getHeartBeatKeys().forEach(
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(key) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(localStorage.getItem(key) < expiredCut)) {
                    _context.next = 8;
                    break;
                  }

                  localStorage.removeItem(key);
                  _context.t0 = key.replace(_this._heartBeatRegExp, '');
                  _context.next = 5;
                  return _this.getMainTabId();

                case 5:
                  _context.t1 = _context.sent;

                  if (!(_context.t0 === _context.t1)) {
                    _context.next = 8;
                    break;
                  }

                  // the tab that gc's the main tab will not receive the storage event
                  _this._fightForMainTab();

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    };

    _this._setAsVisibleTab = function () {
      // avoid setting mainTabId repeatedly which may result in forced rendering
      var currentMainTabId = localStorage.getItem(_this._mainTabKey);
      if (!document.hidden && currentMainTabId !== _this.id) _this._setAsMainTab();
    };

    _this._prefix = prefix && prefix !== '' ? "".concat(prefix, "-") : '';
    _this._enabled = typeof window !== 'undefined' && typeof document.visibilityState !== 'undefined' && typeof localStorage !== 'undefined';
    _this._id = _uuid["default"].v4();
    _this._heartBeatKey = "".concat(_this.prefix, "tabbie-heartBeat-").concat(_this.id);
    _this._heartBeatRegExp = new RegExp("^".concat(_this.prefix, "tabbie-heartBeat-"));
    _this._mainTabKey = "".concat(_this.prefix, "tabbie-mainTab-id");
    _this._eventRegExp = new RegExp("^".concat(_this.prefix, "tabbie-event-"));
    _this._heartBeatExpire = heartBeatExpire;
    _this._heartBeatInterval = heartBeatInterval;
    _this._gcInterval = gcInterval;
    _this._fightTimeout = fightTimeout;

    if (_this.enabled) {
      _this._heartBeatIntervalId = setInterval(_this._heartBeat, heartBeatInterval);

      _this._heartBeat();

      _this._gcIntervalId = setInterval(_this._gc, gcInterval);
      document.addEventListener('visibilitychange', _this._setAsVisibleTab);
      window.addEventListener('focus', _this._setAsVisibleTab);
      window.addEventListener('storage',
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(e) {
          var payload, _payload, id, event, args, _this2;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(e.key === _this._mainTabKey)) {
                    _context2.next = 8;
                    break;
                  }

                  _context2.t0 = _this;
                  _context2.next = 4;
                  return _this.getMainTabId();

                case 4:
                  _context2.t1 = _context2.sent;

                  _context2.t0.emit.call(_context2.t0, 'mainTabIdChanged', _context2.t1);

                  _context2.next = 20;
                  break;

                case 8:
                  if (!(_this._heartBeatRegExp.test(e.key) && (!e.newValue || e.newValue === ''))) {
                    _context2.next = 19;
                    break;
                  }

                  _context2.t2 = e.key.replace(_this._heartBeatRegExp, '');
                  _context2.next = 12;
                  return _this.getMainTabId();

                case 12:
                  _context2.t3 = _context2.sent;

                  if (!(_context2.t2 === _context2.t3)) {
                    _context2.next = 17;
                    break;
                  }

                  // main tab closed itself, fight to be the main tab
                  // or someone gc'ed the main tab
                  localStorage.removeItem(_this._mainTabKey);
                  _context2.next = 17;
                  return _this._fightForMainTab();

                case 17:
                  _context2.next = 20;
                  break;

                case 19:
                  if (_this._eventRegExp.test(e.key) && e.newValue && e.newValue !== '') {
                    payload = JSON.parse(e.newValue);
                    _payload = _toArray(payload), id = _payload[0], event = _payload[1], args = _payload.slice(2);

                    if (id !== _this.id) {
                      // ie fires storage event on original
                      (_this2 = _this).emit.apply(_this2, ['event', event].concat(_toConsumableArray(args)));
                    }
                  }

                case 20:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref3.apply(this, arguments);
        };
      }());
      window.addEventListener('unload', function () {
        clearInterval(_this._gcIntervalId);
        clearInterval(_this._heartBeatIntervalId);

        if (localStorage.getItem(_this._mainTabKey) === _this.id) {
          localStorage.removeItem(_this._mainTabKey);
        }

        localStorage.removeItem(_this._heartBeatKey);
      });

      if (!document.hidden) {
        _this._setAsMainTab();
      } else if (!localStorage.getItem(_this._mainTabKey)) {
        _this._fightForMainTab();
      }
    }

    return _this;
  }

  _createClass(Tabbie, [{
    key: "_getHeartBeatKeys",
    value: function _getHeartBeatKeys() {
      var _localStorage = localStorage,
          length = _localStorage.length;
      var keys = new Set();

      for (var i = 0; i < length; i += 1) {
        var key = localStorage.key(i);
        if (key && key !== '' && this._heartBeatRegExp.test(key)) keys.add(key);
      }

      return _toConsumableArray(keys);
    }
  }, {
    key: "_setAsMainTab",
    value: function _setAsMainTab() {
      localStorage.setItem(this._mainTabKey, this.id);
      this.emit('mainTabIdChanged', this.id);
    }
  }, {
    key: "_fightForMainTab",
    value: function () {
      var _fightForMainTab2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var originalMainTabId;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                originalMainTabId = localStorage.getItem(this._mainTabKey); // if a tab becomes visible during the delay, it can just assume the main tab role

                _context3.next = 3;
                return (0, _sleep["default"])(this._fightTimeout);

              case 3:
                if (localStorage.getItem(this._mainTabKey) === originalMainTabId) {
                  this._setAsMainTab();
                }

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _fightForMainTab() {
        return _fightForMainTab2.apply(this, arguments);
      }

      return _fightForMainTab;
    }()
    /**
     * @function
     * @return {Promise} - Resolves to current main tab id
     */

  }, {
    key: "getMainTabId",
    value: function () {
      var _getMainTabId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _this3 = this;

        var mainTabId;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                mainTabId = localStorage.getItem(this._mainTabKey);

                if (!mainTabId) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", mainTabId);

              case 3:
                return _context4.abrupt("return", new Promise(function (resolve) {
                  _this3.once('mainTabIdChanged', resolve);
                }));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getMainTabId() {
        return _getMainTabId.apply(this, arguments);
      }

      return getMainTabId;
    }()
  }, {
    key: "checkIsMain",
    value: function () {
      var _checkIsMain = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = !this.enabled;

                if (_context5.t0) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 4;
                return this.getMainTabId();

              case 4:
                _context5.t1 = _context5.sent;
                _context5.t2 = this.id;
                _context5.t0 = _context5.t1 === _context5.t2;

              case 7:
                return _context5.abrupt("return", _context5.t0);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function checkIsMain() {
        return _checkIsMain.apply(this, arguments);
      }

      return checkIsMain;
    }()
  }, {
    key: "send",
    value: function send(event) {
      if (this.enabled) {
        var id = _uuid["default"].v4();

        var key = "".concat(this.prefix, "tabbie-event-").concat(id);

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var payload = [this.id, event].concat(args);
        localStorage.setItem(key, JSON.stringify(payload));
        localStorage.removeItem(key);
      }
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._enabled;
    }
  }, {
    key: "prefix",
    get: function get() {
      return this._prefix;
    }
  }]);

  return Tabbie;
}(_events["default"]);

exports["default"] = Tabbie;
//# sourceMappingURL=Tabbie.js.map
