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

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _Tabbie = require('../../lib/Tabbie');

var _Tabbie2 = _interopRequireDefault(_Tabbie);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getTabManagerReducer = require('./getTabManagerReducer');

var _getTabManagerReducer2 = _interopRequireDefault(_getTabManagerReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @description To handle data between different tabs
 */
var TabManager = (_dec = (0, _di.Module)(), _dec(_class = function (_RcModule) {
  (0, _inherits3.default)(TabManager, _RcModule);

  function TabManager(_ref) {
    var options = (0, _objectWithoutProperties3.default)(_ref, []);
    (0, _classCallCheck3.default)(this, TabManager);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TabManager.__proto__ || (0, _getPrototypeOf2.default)(TabManager)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._tabbie = new _Tabbie2.default({
      prefix: _this.prefix
    });
    _this._reducer = (0, _getTabManagerReducer2.default)(_this.actionTypes);
    return _this;
  }

  (0, _createClass3.default)(TabManager, [{
    key: 'initialize',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = this.store;
                _context2.t1 = this.actionTypes.initSuccess;
                _context2.next = 4;
                return this._tabbie.checkIsMain();

              case 4:
                _context2.t2 = _context2.sent;
                _context2.t3 = {
                  type: _context2.t1,
                  active: _context2.t2
                };

                _context2.t0.dispatch.call(_context2.t0, _context2.t3);

                if (this._tabbie.enabled) {
                  this._tabbie.on('mainTabIdChanged', function () {
                    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(mainTabId) {
                      return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.t0 = _this2.store;
                              _context.t1 = _this2.actionTypes.mainTabIdChanged;
                              _context.t2 = mainTabId;
                              _context.next = 5;
                              return _this2._tabbie.checkIsMain();

                            case 5:
                              _context.t3 = _context.sent;
                              _context.t4 = {
                                type: _context.t1,
                                mainTabId: _context.t2,
                                active: _context.t3
                              };

                              _context.t0.dispatch.call(_context.t0, _context.t4);

                            case 8:
                            case 'end':
                              return _context.stop();
                          }
                        }
                      }, _callee, _this2);
                    }));

                    return function (_x) {
                      return _ref3.apply(this, arguments);
                    };
                  }());
                  this._tabbie.on('event', function (event) {
                    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                      args[_key - 1] = arguments[_key];
                    }

                    _this2.store.dispatch({
                      type: _this2.actionTypes.event,
                      event: event,
                      args: args
                    });
                  });
                }

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function initialize() {
        return _ref2.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: 'send',
    value: function send(event) {
      var _tabbie;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (_tabbie = this._tabbie).send.apply(_tabbie, [event].concat(args));
    }
  }, {
    key: 'ensureActive',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', this._tabbie.checkIsMain());

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function ensureActive() {
        return _ref4.apply(this, arguments);
      }

      return ensureActive;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'active',
    get: function get() {
      return this.state.active;
    }
  }, {
    key: 'event',
    get: function get() {
      return this.state.event;
    }
  }]);
  return TabManager;
}(_RcModule3.default)) || _class);
exports.default = TabManager;
//# sourceMappingURL=index.js.map
