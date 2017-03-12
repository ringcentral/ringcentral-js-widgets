'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RUNTIME = exports.PSEUDO_LOCALE = exports.DEFAULT_LOCALE = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

/**
 * @function
 * @description Set currrent runtime locale and load the locale files accordingly
 * @param {String} locale - The desired locale.
 * @return Promise<undefined>
 */
var setLocale = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(locale) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            RUNTIME.locale = locale;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = (0, _getIterator3.default)(RUNTIME.instances);

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 13;
              break;
            }

            i = _step.value;
            _context.next = 10;
            return i._load(locale);

          case 10:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 13:
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](4);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 19:
            _context.prev = 19;
            _context.prev = 20;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 22:
            _context.prev = 22;

            if (!_didIteratorError) {
              _context.next = 25;
              break;
            }

            throw _iteratorError;

          case 25:
            return _context.finish(22);

          case 26:
            return _context.finish(19);

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 15, 19, 27], [20,, 22, 26]]);
  }));

  return function setLocale(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @class
 * @description I18n is a simple localizations helper class that represents a set of locale files.
 */


var _toPseudoString = require('./toPseudoString');

var _toPseudoString2 = _interopRequireDefault(_toPseudoString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_LOCALE = exports.DEFAULT_LOCALE = 'en-US';
var PSEUDO_LOCALE = exports.PSEUDO_LOCALE = 'en-ZZ';
var RUNTIME = exports.RUNTIME = {
  locale: DEFAULT_LOCALE,
  instances: new _set2.default()
};
var I18n = function () {
  /**
   * @constructor
   * @description Accepts a loadLocale function that should be async and resolve to the locale
   *  object when invoked.
   * @param {String => Promise<Object>} loadLocale - Asynchronous locale loader function.
   */
  function I18n(loadLocale) {
    (0, _classCallCheck3.default)(this, I18n);

    if (typeof loadLocale !== 'function') {
      throw new Error('loadLocale must be a function');
    }
    this._loadLocale = loadLocale;
    this._cache = {};
    RUNTIME.instances.add(this);
    this._load(DEFAULT_LOCALE);
    this._load(RUNTIME.locale);
  }

  (0, _createClass3.default)(I18n, [{
    key: '_load',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(locale) {
        var _this = this;

        var data;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(locale !== PSEUDO_LOCALE && !this._cache[locale])) {
                  _context3.next = 12;
                  break;
                }

                data = void 0;
                _context3.prev = 2;
                _context3.next = 5;
                return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          return _context2.abrupt('return', _this._loadLocale(locale));

                        case 1:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this);
                }))();

              case 5:
                data = _context3.sent;
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3['catch'](2);

                /* ignore error */
                data = {};

              case 11:
                this._cache[locale] = data;

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 8]]);
      }));

      function _load(_x2) {
        return _ref2.apply(this, arguments);
      }

      return _load;
    }()
  }, {
    key: '_getString',
    value: function _getString(key, locale) {
      var _context4;

      if (this._cache[locale] && (_context4 = this._cache[locale], Object.prototype.hasOwnProperty).call(_context4, key)) {
        return this._cache[locale][key];
      }
      if (this._cache[DEFAULT_LOCALE] && (_context4 = this._cache[DEFAULT_LOCALE], Object.prototype.hasOwnProperty).call(_context4, key)) {
        return this._cache[DEFAULT_LOCALE][key];
      }
      return key;
    }
  }, {
    key: 'getString',
    value: function getString(key) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : RUNTIME.locale;

      if (locale === PSEUDO_LOCALE) {
        return (0, _toPseudoString2.default)(this._getString(key, DEFAULT_LOCALE));
      }
      return this._getString(key, locale);
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'currentLocale',
    get: function get() {
      return RUNTIME.locale;
    }
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'setLocale',
    get: function get() {
      return setLocale;
    }
  }], [{
    key: 'currentLocale',
    get: function get() {
      return RUNTIME.locale;
    }
  }, {
    key: 'setLocale',
    get: function get() {
      return setLocale;
    }
  }]);
  return I18n;
}();

exports.default = I18n;
//# sourceMappingURL=index.js.map
