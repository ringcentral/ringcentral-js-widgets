"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RUNTIME = exports.PSEUDO_LOCALE = exports.DEFAULT_LOCALE = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.number.parse-float");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.is-nan");

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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function setLocale(_x) {
  return _setLocale.apply(this, arguments);
}
/**
 * @class
 * @description I18n is a simple localizations helper class that represents a set of locale files.
 */


function _setLocale() {
  _setLocale = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(locale) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i;

    return regeneratorRuntime.wrap(function _callee4$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            RUNTIME.locale = locale;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context5.prev = 4;
            _iterator = RUNTIME.instances[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context5.next = 13;
              break;
            }

            i = _step.value;
            _context5.next = 10;
            return i.load();

          case 10:
            _iteratorNormalCompletion = true;
            _context5.next = 6;
            break;

          case 13:
            _context5.next = 19;
            break;

          case 15:
            _context5.prev = 15;
            _context5.t0 = _context5["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context5.t0;

          case 19:
            _context5.prev = 19;
            _context5.prev = 20;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 22:
            _context5.prev = 22;

            if (!_didIteratorError) {
              _context5.next = 25;
              break;
            }

            throw _iteratorError;

          case 25:
            return _context5.finish(22);

          case 26:
            return _context5.finish(19);

          case 27:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee4, null, [[4, 15, 19, 27], [20,, 22, 26]]);
  }));
  return _setLocale.apply(this, arguments);
}

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
    value: function () {
      var _load2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(locale) {
        var _this = this;

        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(locale !== PSEUDO_LOCALE && !this._cache[locale])) {
                  _context2.next = 11;
                  break;
                }

                _context2.prev = 1;
                _context2.next = 4;
                return _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", _this._loadLocale(locale));

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }))();

              case 4:
                data = _context2.sent;
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](1);

                /* ignore error */
                data = {};

              case 10:
                this._cache[locale] = data;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 7]]);
      }));

      function _load(_x2) {
        return _load2.apply(this, arguments);
      }

      return _load;
    }()
  }, {
    key: "load",
    value: function () {
      var _load3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._load(RUNTIME.defaultLocale);

              case 2:
                _context3.next = 4;
                return this._load(RUNTIME.locale);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function load() {
        return _load3.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "_getString",
    value: function _getString(key, locale) {
      var _context4;

      if (this._cache[locale] && (_context4 = this._cache[locale], Object.prototype.hasOwnProperty).call(_context4, key)) {
        return this._cache[locale][key];
      }

      if (this._cache[RUNTIME.defaultLocale] && (_context4 = this._cache[RUNTIME.defaultLocale], Object.prototype.hasOwnProperty).call(_context4, key)) {
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
