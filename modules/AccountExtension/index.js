'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

require('core-js/fn/array/find');

var _DataFetcher2 = require('../../lib/DataFetcher');

var _DataFetcher3 = _interopRequireDefault(_DataFetcher2);

var _fetchList = require('../../lib/fetchList');

var _fetchList2 = _interopRequireDefault(_fetchList);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getAccountExtensionReducer = require('./getAccountExtensionReducer');

var _subscriptionFilters = require('../../enums/subscriptionFilters');

var _subscriptionFilters2 = _interopRequireDefault(_subscriptionFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extensionRegExp = /.*\/extension$/;
var DEFAULT_TTL = 24 * 60 * 60 * 1000;

/**
 * @function
 * @description Determines whether an extension data is worth caching
 * @param {Object} ext - extension data
 * @return {Boolean}
 */
function isEssential(ext) {
  return ext.extensionNumber && ext.extensionNumber !== '' && ext.status === 'Enabled' && (ext.type === 'DigitalUser' || ext.type === 'User');
}
/**
 * @function
 * @description Returns a simplified extension data for caching to reducer storage use
 * @param {Object} ext - extension data
 * @return {Object}
 */
function simplifyExtensionData(ext) {
  return {
    ext: ext.extensionNumber,
    name: ext.name,
    id: ext.id
  };
}

var AccountExtension = function (_DataFetcher) {
  (0, _inherits3.default)(AccountExtension, _DataFetcher);

  function AccountExtension(_ref) {
    var _this2 = this;

    var client = _ref.client,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'ttl']);
    (0, _classCallCheck3.default)(this, AccountExtension);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AccountExtension.__proto__ || (0, _getPrototypeOf2.default)(AccountExtension)).call(this, (0, _extends3.default)({}, options, {
      name: 'accountExtension',
      client: client,
      ttl: ttl,
      actionTypes: _actionTypes2.default,
      getDataReducer: _getAccountExtensionReducer.getDataReducer,
      getTimestampReducer: _getAccountExtensionReducer.getTimestampReducer,
      subscriptionFilters: [_subscriptionFilters2.default.accountExtension],
      subscriptionHandler: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(message) {
          var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, id, eventType, extensionData;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(message && extensionRegExp.test(message.event) && message.body && message.body.extensions)) {
                    _context.next = 42;
                    break;
                  }

                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 4;
                  _iterator = (0, _getIterator3.default)(message.body.extensions);

                case 6:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context.next = 28;
                    break;
                  }

                  item = _step.value;
                  id = item.id, eventType = item.eventType;

                  if (!(eventType === 'Delete')) {
                    _context.next = 13;
                    break;
                  }

                  _this.store.dispatch({
                    type: _this.actionTypes.delete,
                    id: id,
                    timestamp: Date.now()
                  });
                  _context.next = 25;
                  break;

                case 13:
                  if (!(eventType === 'Create' || eventType === 'Update')) {
                    _context.next = 25;
                    break;
                  }

                  _context.prev = 14;
                  _context.next = 17;
                  return _this._client.account().extension(id).get();

                case 17:
                  extensionData = _context.sent;

                  if (isEssential(extensionData)) {
                    if (_this.isAvailableExtension(extensionData.extensionNumber)) {
                      _this.store.dispatch({
                        type: _this.actionTypes.add,
                        data: simplifyExtensionData(extensionData),
                        timestamp: Date.now()
                      });
                    }
                  } else {
                    // if an extension was updated to be not essential anymore
                    // eg. not assigned an extension number
                    _this.store.dispatch({
                      type: _this.actionTypes.delete,
                      id: id,
                      timestamp: Date.now()
                    });
                  }
                  _context.next = 23;
                  break;

                case 21:
                  _context.prev = 21;
                  _context.t0 = _context['catch'](14);

                case 23:
                  _context.next = 25;
                  break;

                case 25:
                  _iteratorNormalCompletion = true;
                  _context.next = 6;
                  break;

                case 28:
                  _context.next = 34;
                  break;

                case 30:
                  _context.prev = 30;
                  _context.t1 = _context['catch'](4);
                  _didIteratorError = true;
                  _iteratorError = _context.t1;

                case 34:
                  _context.prev = 34;
                  _context.prev = 35;

                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }

                case 37:
                  _context.prev = 37;

                  if (!_didIteratorError) {
                    _context.next = 40;
                    break;
                  }

                  throw _iteratorError;

                case 40:
                  return _context.finish(37);

                case 41:
                  return _context.finish(34);

                case 42:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2, [[4, 30, 34, 42], [14, 21], [35,, 37, 41]]);
        }));

        return function subscriptionHandler(_x) {
          return _ref2.apply(this, arguments);
        };
      }(),
      fetchFunction: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _fetchList2.default)(function (params) {
                    return _this._client.account().extension().list(params);
                  });

                case 2:
                  _context2.t0 = isEssential;
                  _context2.t1 = simplifyExtensionData;
                  return _context2.abrupt('return', _context2.sent.filter(_context2.t0).map(_context2.t1));

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function fetchFunction() {
          return _ref3.apply(this, arguments);
        };
      }()
    })));

    _this.addSelector('availableExtensions', function () {
      return _this.data;
    }, function (data) {
      return data || [];
    });
    return _this;
  }

  (0, _createClass3.default)(AccountExtension, [{
    key: 'isAvailableExtension',
    value: function isAvailableExtension(extensionNumber) {
      return !!this.availableExtensions.find(function (item) {
        return item.ext === extensionNumber;
      });
    }
  }, {
    key: 'availableExtensions',
    get: function get() {
      return this._selectors.availableExtensions();
    }
  }]);
  return AccountExtension;
}(_DataFetcher3.default);

exports.default = AccountExtension;
//# sourceMappingURL=index.js.map
