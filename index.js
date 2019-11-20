"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RUNTIME = exports.PSEUDO_LOCALE = exports.DEFAULT_LOCALE = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.number.parse-float");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.is-nan");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

var _toPseudoString = _interopRequireDefault(require("./lib/toPseudoString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_LOCALE = 'en-US';
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
var PSEUDO_LOCALE = 'en-ZZ';
exports.PSEUDO_LOCALE = PSEUDO_LOCALE;
var RUNTIME = {
  locale: DEFAULT_LOCALE,
  defaultLocale: DEFAULT_LOCALE,
  instances: new Set(),
  padRatio: 0.3
};
/**
 * @function
 * @description Set currrent runtime locale and load the locale files accordingly
 * @param {String} locale - The desired locale.
 * @return Promise<undefined>
 */

exports.RUNTIME = RUNTIME;

function setLocale(locale) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i;

  return regeneratorRuntime.async(function setLocale$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          RUNTIME.locale = locale;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 4;
          _iterator = RUNTIME.instances[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 13;
            break;
          }

          i = _step.value;
          _context.next = 10;
          return regeneratorRuntime.awrap(i.load());

        case 10:
          _iteratorNormalCompletion = true;
          _context.next = 6;
          break;

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 19:
          _context.prev = 19;
          _context.prev = 20;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
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
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 15, 19, 27], [20,, 22, 26]]);
}
/**
 * @class
 * @description I18n is a simple localizations helper class that represents a set of locale files.
 */


var I18n =
/*#__PURE__*/
function () {
  /**
   * @constructor
   * @description Accepts a loadLocale function that should be async and resolve to the locale
   *  object when invoked.
   * @param {String => Promise<Object>} loadLocale - Asynchronous locale loader function.
   */
  function I18n(loadLocale) {
    _classCallCheck(this, I18n);

    if (typeof loadLocale !== 'function') {
      throw new Error('loadLocale must be a function');
    }

    this._loadLocale = loadLocale;
    this._cache = {};
    RUNTIME.instances.add(this);
    this.load();
  }

  _createClass(I18n, [{
    key: "_load",
    value: function _load(locale) {
      var _this = this;

      var data;
      return regeneratorRuntime.async(function _load$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(locale !== PSEUDO_LOCALE && !this._cache[locale])) {
                _context3.next = 11;
                break;
              }

              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(function _callee() {
                return regeneratorRuntime.async(function _callee$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", _this._loadLocale(locale));

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              }());

            case 4:
              data = _context3.sent;
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](1);

              /* ignore error */
              data = {};

            case 10:
              this._cache[locale] = data;

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[1, 7]]);
    }
  }, {
    key: "load",
    value: function load() {
      return regeneratorRuntime.async(function load$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this._load(RUNTIME.defaultLocale));

            case 2:
              _context4.next = 4;
              return regeneratorRuntime.awrap(this._load(RUNTIME.locale));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_getString",
    value: function _getString(key, locale) {
      var _context5;

      if (this._cache[locale] && (_context5 = this._cache[locale], Object.prototype.hasOwnProperty).call(_context5, key)) {
        return this._cache[locale][key];
      }

      if (this._cache[RUNTIME.defaultLocale] && (_context5 = this._cache[RUNTIME.defaultLocale], Object.prototype.hasOwnProperty).call(_context5, key)) {
        return this._cache[RUNTIME.defaultLocale][key];
      }

      return key;
    }
  }, {
    key: "getString",
    value: function getString(key) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : RUNTIME.locale;

      if (locale === PSEUDO_LOCALE) {
        return (0, _toPseudoString["default"])({
          str: this._getString(key, RUNTIME.defaultLocale),
          padRatio: RUNTIME.padRatio
        });
      }

      return this._getString(key, locale);
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "currentLocale",
    get: function get() {
      return RUNTIME.locale;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "setLocale",
    get: function get() {
      return setLocale;
    }
  }], [{
    key: "setDefaultLocale",
    value: function setDefaultLocale(locale) {
      RUNTIME.defaultLocale = locale;
    }
  }, {
    key: "currentLocale",
    get: function get() {
      return RUNTIME.locale;
    }
  }, {
    key: "setLocale",
    get: function get() {
      return setLocale;
    }
  }, {
    key: "padRatio",
    get: function get() {
      return RUNTIME.padRatio;
    },
    set: function set(ratio) {
      if (Number.isNaN(ratio)) {
        console.log('ratio must be a number');
        return;
      }

      RUNTIME.padRatio = Number.parseFloat(ratio);
    }
  }]);

  return I18n;
}();

exports["default"] = I18n;
//# sourceMappingURL=index.js.map
