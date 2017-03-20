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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _sleep = require('../../lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Softphone = function (_RcModule) {
  (0, _inherits3.default)(Softphone, _RcModule);

  function Softphone(_ref) {
    var brand = _ref.brand,
        options = (0, _objectWithoutProperties3.default)(_ref, ['brand']);
    (0, _classCallCheck3.default)(this, Softphone);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Softphone.__proto__ || (0, _getPrototypeOf2.default)(Softphone)).call(this, (0, _extends3.default)({}, options)));

    _this._brand = brand;
    return _this;
  }

  (0, _createClass3.default)(Softphone, [{
    key: 'makeCall',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(phoneNumber) {
        var frame, uri;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                frame = document.createElement('iframe');

                frame.style.display = 'none';

                uri = this.protocol + '://call?number=' + encodeURIComponent(phoneNumber);


                document.body.appendChild(frame);
                _context.next = 6;
                return (0, _sleep2.default)(100);

              case 6:
                frame.contentWindow.location.href = uri;
                _context.next = 9;
                return (0, _sleep2.default)(300);

              case 9:
                document.body.removeChild(frame);

              case 10:
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

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'ready',
    get: function get() {
      return true;
    }
  }]);
  return Softphone;
}(_RcModule3.default);

exports.default = Softphone;
//# sourceMappingURL=index.js.map
