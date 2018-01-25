'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _eventEmitter = require('event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _sleep = require('./sleep');

var _sleep2 = _interopRequireDefault(_sleep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HEART_BEAT_INTERVAL = 1000;
// heatbeat older than HEART_BEAT_EXPIRE will be gc'ed
// chrome and firefox throttles intervals when inactive expire time of 2000
// sometimes would kill live heartbeats and cause the mainTabId to change
var HEART_BEAT_EXPIRE = 3000;
var GC_INTERVAL = 5000;

var FIGHT_TIMEOUT = 20;

/**
 * @class
 * @description The base active tab and cross tab event handling class.
 */

var Tabbie = function () {
  function Tabbie(_ref) {
    var _this = this;

    var _ref$prefix = _ref.prefix,
        prefix = _ref$prefix === undefined ? '' : _ref$prefix,
        _ref$heartBeatInterva = _ref.heartBeatInterval,
        heartBeatInterval = _ref$heartBeatInterva === undefined ? HEART_BEAT_INTERVAL : _ref$heartBeatInterva,
        _ref$heartBeatExpire = _ref.heartBeatExpire,
        heartBeatExpire = _ref$heartBeatExpire === undefined ? HEART_BEAT_EXPIRE : _ref$heartBeatExpire,
        _ref$gcInterval = _ref.gcInterval,
        gcInterval = _ref$gcInterval === undefined ? GC_INTERVAL : _ref$gcInterval,
        _ref$fightTimeout = _ref.fightTimeout,
        fightTimeout = _ref$fightTimeout === undefined ? FIGHT_TIMEOUT : _ref$fightTimeout;
    (0, _classCallCheck3.default)(this, Tabbie);

    this._heartBeat = function () {
      localStorage.setItem(_this._heartBeatKey, Date.now());
    };

    this._gc = function () {
      var expiredCut = Date.now() - _this._heartBeatExpire;
      _this._getHeartBeatKeys().forEach(function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(key) {
          return _regenerator2.default.wrap(function _callee$(_context) {
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
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    };

    this._prefix = prefix && prefix !== '' ? prefix + '-' : '';
    this._enabled = typeof window !== 'undefined' && typeof document.visibilityState !== 'undefined' && typeof localStorage !== 'undefined';
    this._id = _uuid2.default.v4();
    this._heartBeatKey = this.prefix + 'tabbie-heartBeat-' + this.id;
    this._heartBeatRegExp = new RegExp('^' + this.prefix + 'tabbie-heartBeat-');
    this._mainTabKey = this.prefix + 'tabbie-mainTab-id';
    this._eventRegExp = new RegExp('^' + this.prefix + 'tabbie-event-');
    this._heartBeatExpire = heartBeatExpire;
    this._heartBeatInterval = heartBeatInterval;
    this._gcInterval = gcInterval;
    this._fightTimeout = fightTimeout;

    if (this.enabled) {
      this._heartBeatIntervalId = setInterval(this._heartBeat, heartBeatInterval);
      this._heartBeat();

      this._gcIntervalId = setInterval(this._gc, gcInterval);

      document.addEventListener('visibilitychange', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var currentMainTabId;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // avoid setting mainTabId repeatedly which may result in forced rendering
                currentMainTabId = localStorage.getItem(_this._mainTabKey);

                if (!document.hidden && currentMainTabId !== _this.id) _this._setAsMainTab();

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      })));
      window.addEventListener('storage', function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(e) {
          var payload, _payload, id, event, args;

          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!(e.key === _this._mainTabKey)) {
                    _context3.next = 8;
                    break;
                  }

                  _context3.t0 = _this;
                  _context3.next = 4;
                  return _this.getMainTabId();

                case 4:
                  _context3.t1 = _context3.sent;

                  _context3.t0.emit.call(_context3.t0, 'mainTabIdChanged', _context3.t1);

                  _context3.next = 20;
                  break;

                case 8:
                  if (!(_this._heartBeatRegExp.test(e.key) && (!e.newValue || e.newValue === ''))) {
                    _context3.next = 19;
                    break;
                  }

                  _context3.t2 = e.key.replace(_this._heartBeatRegExp, '');
                  _context3.next = 12;
                  return _this.getMainTabId();

                case 12:
                  _context3.t3 = _context3.sent;

                  if (!(_context3.t2 === _context3.t3)) {
                    _context3.next = 17;
                    break;
                  }

                  // main tab closed itself, fight to be the main tab
                  // or someone gc'ed the main tab
                  localStorage.removeItem(_this._mainTabKey);
                  _context3.next = 17;
                  return _this._fightForMainTab();

                case 17:
                  _context3.next = 20;
                  break;

                case 19:
                  if (_this._eventRegExp.test(e.key) && e.newValue && e.newValue !== '') {
                    payload = JSON.parse(e.newValue);
                    _payload = (0, _toArray3.default)(payload), id = _payload[0], event = _payload[1], args = _payload.slice(2);

                    if (id !== _this.id) {
                      // ie fires storage event on original
                      _this.emit.apply(_this, ['event', event].concat((0, _toConsumableArray3.default)(args)));
                    }
                  }

                case 20:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this);
        }));

        return function (_x2) {
          return _ref4.apply(this, arguments);
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
        this._setAsMainTab();
      } else if (!localStorage.getItem(this._mainTabKey)) {
        this._fightForMainTab();
      }
    }
  }

  (0, _createClass3.default)(Tabbie, [{
    key: '_getHeartBeatKeys',
    value: function _getHeartBeatKeys() {
      var _localStorage = localStorage,
          length = _localStorage.length;

      var keys = new _set2.default();
      for (var i = 0; i < length; i += 1) {
        var key = localStorage.key(i);
        if (key && key !== '' && this._heartBeatRegExp.test(key)) keys.add(key);
      }
      return [].concat((0, _toConsumableArray3.default)(keys));
    }
  }, {
    key: '_setAsMainTab',
    value: function _setAsMainTab() {
      localStorage.setItem(this._mainTabKey, this.id);
      this.emit('mainTabIdChanged', this.id);
    }
  }, {
    key: '_fightForMainTab',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var originalMainTabId;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                originalMainTabId = localStorage.getItem(this._mainTabKey);
                // if a tab becomes visible during the delay, it can just assume the main tab role

                _context4.next = 3;
                return (0, _sleep2.default)(this._fightTimeout);

              case 3:
                if (localStorage.getItem(this._mainTabKey) === originalMainTabId) {
                  this._setAsMainTab();
                }

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _fightForMainTab() {
        return _ref5.apply(this, arguments);
      }

      return _fightForMainTab;
    }()

    /**
     * @function
     * @return {Promise} - Resolves to current main tab id
     */

  }, {
    key: 'getMainTabId',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var _this2 = this;

        var mainTabId;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                mainTabId = localStorage.getItem(this._mainTabKey);

                if (!mainTabId) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt('return', mainTabId);

              case 3:
                return _context5.abrupt('return', new _promise2.default(function (resolve) {
                  _this2.once('mainTabIdChanged', resolve);
                }));

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getMainTabId() {
        return _ref6.apply(this, arguments);
      }

      return getMainTabId;
    }()
  }, {
    key: 'checkIsMain',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.t0 = !this.enabled;

                if (_context6.t0) {
                  _context6.next = 7;
                  break;
                }

                _context6.next = 4;
                return this.getMainTabId();

              case 4:
                _context6.t1 = _context6.sent;
                _context6.t2 = this.id;
                _context6.t0 = _context6.t1 === _context6.t2;

              case 7:
                return _context6.abrupt('return', _context6.t0);

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function checkIsMain() {
        return _ref7.apply(this, arguments);
      }

      return checkIsMain;
    }()
  }, {
    key: 'send',
    value: function send(event) {
      if (this.enabled) {
        var id = _uuid2.default.v4();
        var key = this.prefix + 'tabbie-event-' + id;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var payload = [this.id, event].concat(args);
        localStorage.setItem(key, (0, _stringify2.default)(payload));
        localStorage.removeItem(key);
      }
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'enabled',
    get: function get() {
      return this._enabled;
    }
  }, {
    key: 'prefix',
    get: function get() {
      return this._prefix;
    }
  }]);
  return Tabbie;
}();

exports.default = Tabbie;

(0, _eventEmitter2.default)(Tabbie.prototype);
//# sourceMappingURL=Tabbie.js.map
