'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _di = require('ringcentral-integration/lib/di');

var _DialerUI2 = require('../DialerUI');

var _DialerUI3 = _interopRequireDefault(_DialerUI2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConferenceDialerUI = (_dec = (0, _di.Module)(), _dec(_class = function (_DialerUI) {
  (0, _inherits3.default)(ConferenceDialerUI, _DialerUI);

  function ConferenceDialerUI(_ref) {
    var prefix = _ref.prefix,
        options = (0, _objectWithoutProperties3.default)(_ref, ['prefix']);
    (0, _classCallCheck3.default)(this, ConferenceDialerUI);
    return (0, _possibleConstructorReturn3.default)(this, (ConferenceDialerUI.__proto__ || (0, _getPrototypeOf2.default)(ConferenceDialerUI)).call(this, (0, _extends3.default)({}, options, {
      prefix: prefix + '-conf'
    })));
  }

  return ConferenceDialerUI;
}(_DialerUI3.default)) || _class);
exports.default = ConferenceDialerUI;
//# sourceMappingURL=index.js.map
