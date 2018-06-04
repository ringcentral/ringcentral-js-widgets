'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

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

var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

require('core-js/fn/array/find');

var _reselect = require('reselect');

var _di = require('../../lib/di');

var _fetchList = require('../../lib/fetchList');

var _fetchList2 = _interopRequireDefault(_fetchList);

var _removeUri = require('../../lib/removeUri');

var _removeUri2 = _interopRequireDefault(_removeUri);

var _DataFetcher2 = require('../../lib/DataFetcher');

var _DataFetcher3 = _interopRequireDefault(_DataFetcher2);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _getter = require('../../lib/getter');

var _getter2 = _interopRequireDefault(_getter);

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

/**
 * @class
 * @description Extension phone number list module
 */
var ExtensionPhoneNumber = (_dec = (0, _di.Module)({
  deps: ['Client', 'RolesAndPermissions', { dep: 'ExtensionPhoneNumberOptions', optional: true }]
}), _dec(_class = (_class2 = function (_DataFetcher) {
  (0, _inherits3.default)(ExtensionPhoneNumber, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  function ExtensionPhoneNumber(_ref) {
    var _this2 = this;

    var client = _ref.client,
        rolesAndPermissions = _ref.rolesAndPermissions,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'rolesAndPermissions']);
    (0, _classCallCheck3.default)(this, ExtensionPhoneNumber);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ExtensionPhoneNumber.__proto__ || (0, _getPrototypeOf2.default)(ExtensionPhoneNumber)).call(this, (0, _extends3.default)({
      name: 'extensionPhoneNumber',
      client: client,
      fetchFunction: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _fetchList2.default)(function (params) {
                    return client.account().extension().phoneNumber().list(params);
                  });

                case 2:
                  _context.t0 = function (number) {
                    return (0, _extends3.default)({}, number, {
                      country: (0, _removeUri2.default)(number.country)
                    });
                  };

                  return _context.abrupt('return', _context.sent.map(_context.t0));

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        function fetchFunction() {
          return _ref2.apply(this, arguments);
        }

        return fetchFunction;
      }(),
      readyCheckFn: function readyCheckFn() {
        return _this._rolesAndPermissions.ready;
      },
      cleanOnReset: true
    }, options)));

    _initDefineProp(_this, 'numbers', _descriptor, _this);

    _initDefineProp(_this, 'companyNumbers', _descriptor2, _this);

    _initDefineProp(_this, 'mainCompanyNumber', _descriptor3, _this);

    _initDefineProp(_this, 'directNumbers', _descriptor4, _this);

    _initDefineProp(_this, 'callerIdNumbers', _descriptor5, _this);

    _initDefineProp(_this, 'smsSenderNumbers', _descriptor6, _this);

    _this._rolesAndPermissions = _ensureExist2.default.call(_this, rolesAndPermissions, 'rolesAndPermissions');
    return _this;
  }

  (0, _createClass3.default)(ExtensionPhoneNumber, [{
    key: '_hasPermission',
    get: function get() {
      return !!this._rolesAndPermissions.permissions.ReadUserPhoneNumbers;
    }
  }]);
  return ExtensionPhoneNumber;
}(_DataFetcher3.default), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'numbers', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return (0, _reselect.createSelector)(function () {
      return _this3.data;
    }, function (data) {
      return data || [];
    });
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'companyNumbers', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return (0, _reselect.createSelector)(function () {
      return _this4.numbers;
    }, function (phoneNumbers) {
      return phoneNumbers.filter(function (p) {
        return p.usageType === 'CompanyNumber';
      });
    });
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'mainCompanyNumber', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return (0, _reselect.createSelector)(function () {
      return _this5.numbers;
    }, function (phoneNumbers) {
      return phoneNumbers.find(function (p) {
        return p.usageType === 'MainCompanyNumber';
      });
    });
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'directNumbers', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return (0, _reselect.createSelector)(function () {
      return _this6.numbers;
    }, function (phoneNumbers) {
      return phoneNumbers.filter(function (p) {
        return p.usageType === 'DirectNumber';
      });
    });
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'callerIdNumbers', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return (0, _reselect.createSelector)(function () {
      return _this7.numbers;
    }, function (phoneNumbers) {
      return phoneNumbers.filter(function (p) {
        return p.features && p.features.indexOf('CallerId') !== -1 || p.usageType === 'ForwardedNumber' && p.status === 'PortedIn';
      });
    });
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'smsSenderNumbers', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return (0, _reselect.createSelector)(function () {
      return _this8.numbers;
    }, function (phoneNumbers) {
      return phoneNumbers.filter(function (p) {
        return p.features && p.features.indexOf('SmsSender') !== -1;
      });
    });
  }
})), _class2)) || _class);
exports.default = ExtensionPhoneNumber;
//# sourceMappingURL=index.js.map
