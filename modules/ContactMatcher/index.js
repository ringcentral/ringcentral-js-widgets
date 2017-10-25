'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _dec, _class, _desc, _value, _class2;

var _di = require('../../lib/di');

var _DataMatcher2 = require('../../lib/DataMatcher');

var _DataMatcher3 = _interopRequireDefault(_DataMatcher2);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * @class
 * @description Contact matcher managing module
 */
var ContactMatcher = (_dec = (0, _di.Module)({
  deps: [{ dep: 'ContactMatcherOptions', optional: true }]
}), _dec(_class = (_class2 = function (_DataMatcher) {
  (0, _inherits3.default)(ContactMatcher, _DataMatcher);

  /**
   * @constructor
   */
  function ContactMatcher(_ref) {
    var options = (0, _objectWithoutProperties3.default)(_ref, []);
    (0, _classCallCheck3.default)(this, ContactMatcher);
    return (0, _possibleConstructorReturn3.default)(this, (ContactMatcher.__proto__ || (0, _getPrototypeOf2.default)(ContactMatcher)).call(this, (0, _extends3.default)({
      name: 'contactMatcher'
    }, options)));
  }

  (0, _createClass3.default)(ContactMatcher, [{
    key: 'hasMatchNumber',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
        var phoneNumber = _ref3.phoneNumber,
            _ref3$ignoreCache = _ref3.ignoreCache,
            ignoreCache = _ref3$ignoreCache === undefined ? false : _ref3$ignoreCache;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.match({
                  queries: [phoneNumber],
                  ignoreCache: ignoreCache
                });

              case 2:
                return _context.abrupt('return', !!this.dataMapping[phoneNumber] && this.dataMapping[phoneNumber].length > 0);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function hasMatchNumber(_x) {
        return _ref2.apply(this, arguments);
      }

      return hasMatchNumber;
    }()
  }, {
    key: 'forceMatchNumber',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref5) {
        var phoneNumber = _ref5.phoneNumber;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.match({
                  queries: [phoneNumber],
                  ignoreCache: true
                });

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function forceMatchNumber(_x2) {
        return _ref4.apply(this, arguments);
      }

      return forceMatchNumber;
    }()
  }]);
  return ContactMatcher;
}(_DataMatcher3.default), (_applyDecoratedDescriptor(_class2.prototype, 'hasMatchNumber', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'hasMatchNumber'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'forceMatchNumber', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'forceMatchNumber'), _class2.prototype)), _class2)) || _class);
exports.default = ContactMatcher;
//# sourceMappingURL=index.js.map
