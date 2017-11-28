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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _sleep = require('../../lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

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
 * @description Softphone module to call softphone
 */
var Softphone = (_dec = (0, _di.Module)({
  deps: ['Brand', { dep: 'SoftphoneOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(Softphone, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Brnad} params.brand - brand module instance
   * @param {Bool} params.extensionMode - default false
   */
  function Softphone(_ref) {
    var brand = _ref.brand,
        _ref$extensionMode = _ref.extensionMode,
        extensionMode = _ref$extensionMode === undefined ? false : _ref$extensionMode,
        options = (0, _objectWithoutProperties3.default)(_ref, ['brand', 'extensionMode']);
    (0, _classCallCheck3.default)(this, Softphone);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Softphone.__proto__ || (0, _getPrototypeOf2.default)(Softphone)).call(this, (0, _extends3.default)({}, options)));

    _this._brand = brand;
    _this._extensionMode = extensionMode;
    return _this;
  }

  (0, _createClass3.default)(Softphone, [{
    key: '_onStateChange',
    value: function _onStateChange() {
      /* do nothing */
    }
  }, {
    key: 'makeCall',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(phoneNumber) {
        var uri, frame;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // TODO use window.open in extension background, this method will crash chrome when
                // executed in background page.
                uri = this.protocol + '://call?number=' + encodeURIComponent(phoneNumber);

                if (!this._extensionMode) {
                  _context.next = 5;
                  break;
                }

                window.open(uri);
                _context.next = 14;
                break;

              case 5:
                frame = document.createElement('iframe');

                frame.style.display = 'none';

                document.body.appendChild(frame);
                _context.next = 10;
                return (0, _sleep2.default)(100);

              case 10:
                frame.contentWindow.location.href = uri;
                _context.next = 13;
                return (0, _sleep2.default)(300);

              case 13:
                document.body.removeChild(frame);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function makeCall(_x) {
        return _ref2.apply(this, arguments);
      }

      return makeCall;
    }()

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: '_actionTypes',
    get: function get() {
      /* no action types */
      return null;
    }
  }, {
    key: 'protocol',
    get: function get() {
      switch (this._brand.id) {
        case '3420':
          // ATT
          return 'attvr20';
        case '7710':
          // BT
          return 'rcbtmobile';
        case '7310':
          // TELUS
          return 'rctelus';
        default:
          return 'rcmobile';
      }
    }
  }, {
    key: 'status',
    get: function get() {
      return _moduleStatuses2.default.ready;
    }
  }]);
  return Softphone;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'makeCall', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'makeCall'), _class2.prototype)), _class2)) || _class);
exports.default = Softphone;
//# sourceMappingURL=index.js.map
