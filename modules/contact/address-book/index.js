'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _rcModule = require('../../../lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _addressBookReducer = require('./address-book-reducer');

var _addressBookReducer2 = _interopRequireDefault(_addressBookReducer);

var _addressBookActions = require('./address-book-actions');

var _addressBookActions2 = _interopRequireDefault(_addressBookActions);

var _utils = require('../../../lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['api', 'platform', 'settings']);

/**
 * @class
 * @description Contact module
 */

var AddressBook = function (_RcModule) {
  (0, _inherits3.default)(AddressBook, _RcModule);

  /**
   * @function
   */
  function AddressBook(options) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, AddressBook);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AddressBook.__proto__ || (0, _getPrototypeOf2.default)(AddressBook)).call(this, (0, _extends3.default)({}, options, {
      actions: _addressBookActions2.default
    })));

    var api = options.api;
    var platform = options.platform;
    var settings = options.settings;

    _this[symbols.api] = api;
    _this[symbols.platform] = platform;
    _this[symbols.settings] = settings;

    platform.on(platform.events.loginSuccess, function () {
      _this.loadCompanyContact();
    });

    (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return platform.loggedIn();

            case 2:
              if (!_context.sent) {
                _context.next = 5;
                break;
              }

              _context.next = 5;
              return _this.loadAddressBook();

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }))();
    return _this;
  }

  (0, _createClass3.default)(AddressBook, [{
    key: 'loadAddressBook',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this3 = this;

        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var _ref3$userOptions = _ref3.userOptions;
        var userOptions = _ref3$userOptions === undefined ? {} : _ref3$userOptions;
        var _ref3$perPage = _ref3.perPage;
        var perPage = _ref3$perPage === undefined ? 'max' : _ref3$perPage;
        var book;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actions.loadAddressBook
                });
                _context2.prev = 1;
                _context2.next = 4;
                return _utils.fetchList.call(this, function (options) {
                  return _this3[symbols.api].account().extension().addressBook().contact().get((0, _extends3.default)({}, options, userOptions, {
                    perPage: perPage
                  }));
                });

              case 4:
                _context2.t0 = _context2.sent;
                book = (0, _utils.extractData)(_context2.t0);

                this.store.dispatch({
                  type: this.actions.loadAddressBookSuccess,
                  payload: book
                });
                _context2.next = 13;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t1 = _context2['catch'](1);

                console.error(_context2.t1);
                this.store.dispatch({
                  type: this.actions.loadAddressBookFailed,
                  error: _context2.t1
                });

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 9]]);
      }));

      function loadAddressBook(_x) {
        return _ref2.apply(this, arguments);
      }

      return loadAddressBook;
    }()
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _addressBookReducer2.default)(this.prefix);
    }
  }]);
  return AddressBook;
}(_rcModule2.default);

exports.default = AddressBook;
//# sourceMappingURL=index.js.map
