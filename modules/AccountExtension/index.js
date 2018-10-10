'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _dec, _class, _desc, _value, _class2, _descriptor;

var _ramda = require('ramda');

var _reselect = require('reselect');

var _di = require('../../lib/di');

var _DataFetcher2 = require('../../lib/DataFetcher');

var _DataFetcher3 = _interopRequireDefault(_DataFetcher2);

var _fetchList = require('../../lib/fetchList');

var _fetchList2 = _interopRequireDefault(_fetchList);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _getter = require('../../lib/getter');

var _getter2 = _interopRequireDefault(_getter);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getAccountExtensionReducer = require('./getAccountExtensionReducer');

var _accountExtensionHelper = require('./accountExtensionHelper');

var _subscriptionFilters = require('../../enums/subscriptionFilters');

var _subscriptionFilters2 = _interopRequireDefault(_subscriptionFilters);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _extensionTypes = require('../../enums/extensionTypes');

var _extensionTypes2 = _interopRequireDefault(_extensionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty2.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var extensionRegExp = /.*\/extension$/;
var DEFAULT_TTL = 24 * 60 * 60 * 1000;
var DEFAULT_CHECK_STATUS = true;

// Consider enable all extension types and filter through selector if
// we'll allow users to configure this through settings
var DEFAULT_TYPE_LIST = [_extensionTypes2.default.digitalUser, _extensionTypes2.default.user, _extensionTypes2.default.department];

/**
 * @class
 * @description Accound extension list managing module
 */
var AccountExtension = (_dec = (0, _di.Module)({
  deps: ['Client', 'RolesAndPermissions', { dep: 'AccountExtensionOptions', optional: true }]
}), _dec(_class = (_class2 = function (_DataFetcher) {
  (0, _inherits3.default)(AccountExtension, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Number} params.ttl - local cache timestamp, default 24 hours
   */
  function AccountExtension(_ref) {
    var _this2 = this;

    var client = _ref.client,
        rolesAndPermissions = _ref.rolesAndPermissions,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        _ref$checkStatus = _ref.checkStatus,
        checkStatus = _ref$checkStatus === undefined ? DEFAULT_CHECK_STATUS : _ref$checkStatus,
        _ref$typeList = _ref.typeList,
        typeList = _ref$typeList === undefined ? DEFAULT_TYPE_LIST : _ref$typeList,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'rolesAndPermissions', 'ttl', 'checkStatus', 'typeList']);
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
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(message) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this._subscriptionHandleFn(message);

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        function subscriptionHandler(_x) {
          return _ref2.apply(this, arguments);
        }

        return subscriptionHandler;
      }(),
      fetchFunction: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _fetchList2.default)(function (params) {
                    var fetchRet = _this._client.account().extension().list(params);
                    return fetchRet;
                  });

                case 2:
                  _context2.t0 = function (ext) {
                    return _this._extensionFilter(ext);
                  };

                  _context2.t1 = _accountExtensionHelper.simplifyExtensionData;
                  return _context2.abrupt('return', _context2.sent.filter(_context2.t0).map(_context2.t1));

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        function fetchFunction() {
          return _ref3.apply(this, arguments);
        }

        return fetchFunction;
      }(),
      readyCheckFn: function readyCheckFn() {
        return _this._rolesAndPermissions.ready;
      }
    })));

    _initDefineProp(_this, 'availableExtensions', _descriptor, _this);

    _this._checkStatus = checkStatus;
    _this._typeList = typeList;
    _this._rolesAndPermissions = _ensureExist2.default.call(_this, rolesAndPermissions, 'rolesAndPermissions');
    return _this;
  }

  (0, _createClass3.default)(AccountExtension, [{
    key: '_extensionFilter',
    value: function _extensionFilter(ext) {
      return (0, _accountExtensionHelper.hasExtensionNumber)(ext) && (!this._checkStatus || (0, _accountExtensionHelper.isEnabled)(ext)) && !(0, _accountExtensionHelper.isFiltered)(ext, this._typeList);
    }
  }, {
    key: '_subscriptionHandleFn',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(message) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(message && extensionRegExp.test(message.event) && message.body && message.body.extensions)) {
                  _context3.next = 27;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 4;
                _iterator = (0, _getIterator3.default)(message.body.extensions);

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context3.next = 13;
                  break;
                }

                item = _step.value;
                _context3.next = 10;
                return this._processExtension(item);

              case 10:
                _iteratorNormalCompletion = true;
                _context3.next = 6;
                break;

              case 13:
                _context3.next = 19;
                break;

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 19:
                _context3.prev = 19;
                _context3.prev = 20;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 22:
                _context3.prev = 22;

                if (!_didIteratorError) {
                  _context3.next = 25;
                  break;
                }

                throw _iteratorError;

              case 25:
                return _context3.finish(22);

              case 26:
                return _context3.finish(19);

              case 27:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 15, 19, 27], [20,, 22, 26]]);
      }));

      function _subscriptionHandleFn(_x2) {
        return _ref4.apply(this, arguments);
      }

      return _subscriptionHandleFn;
    }()
  }, {
    key: '_processExtension',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(item) {
        var extensionId, eventType, id, extensionData;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                extensionId = item.extensionId, eventType = item.eventType;
                id = parseInt(extensionId, 10);

                if (!(eventType === 'Delete')) {
                  _context4.next = 6;
                  break;
                }

                this._deleteExtension(id);
                _context4.next = 18;
                break;

              case 6:
                if (!(eventType === 'Create' || eventType === 'Update')) {
                  _context4.next = 18;
                  break;
                }

                _context4.prev = 7;
                _context4.next = 10;
                return this._fetchExtensionData(id);

              case 10:
                extensionData = _context4.sent;

                this._addOrDeleteExtension(extensionData, id);
                _context4.next = 16;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4['catch'](7);

              case 16:
                _context4.next = 18;
                break;

              case 18:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[7, 14]]);
      }));

      function _processExtension(_x3) {
        return _ref5.apply(this, arguments);
      }

      return _processExtension;
    }()
  }, {
    key: '_addOrDeleteExtension',
    value: function _addOrDeleteExtension(extensionData, extensionId) {
      var essential = this._extensionFilter(extensionData);
      var alreadyExists = this.isAvailableExtension(extensionData.extensionNumber);
      if (essential && !alreadyExists) {
        this._addExtension(extensionData);
      } else if (!essential && alreadyExists) {
        this._deleteExtension(extensionId);
      }
    }
  }, {
    key: '_addExtension',
    value: function _addExtension(data) {
      this.store.dispatch({
        type: this.actionTypes.add,
        data: (0, _accountExtensionHelper.simplifyExtensionData)(data),
        timestamp: Date.now()
      });
    }
  }, {
    key: '_deleteExtension',
    value: function _deleteExtension(id) {
      this.store.dispatch({
        type: this.actionTypes.delete,
        id: id,
        timestamp: Date.now()
      });
    }
  }, {
    key: '_fetchExtensionData',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(id) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', this._client.account().extension(id).get());

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _fetchExtensionData(_x4) {
        return _ref6.apply(this, arguments);
      }

      return _fetchExtensionData;
    }()
  }, {
    key: 'isAvailableExtension',
    value: function isAvailableExtension(extensionNumber) {
      return !!(0, _ramda.find)(function (item) {
        return item.ext === extensionNumber;
      }, this.availableExtensions);
    }
  }, {
    key: '_hasPermission',
    get: function get() {
      return !!this._rolesAndPermissions.permissions.ReadExtensions;
    }
  }]);
  return AccountExtension;
}(_DataFetcher3.default), (_applyDecoratedDescriptor(_class2.prototype, '_fetchExtensionData', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_fetchExtensionData'), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, 'availableExtensions', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return (0, _reselect.createSelector)(function () {
      return _this3.data;
    }, function (data) {
      return data || [];
    });
  }
})), _class2)) || _class);
exports.default = AccountExtension;
//# sourceMappingURL=index.js.map
