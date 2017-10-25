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

var _di = require('../../lib/di');

var _DataMatcher2 = require('../../lib/DataMatcher');

var _DataMatcher3 = _interopRequireDefault(_DataMatcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @description Active matcher manaing module
 */
var ActivityMatcher = (_dec = (0, _di.Module)(), _dec(_class = function (_DataMatcher) {
  (0, _inherits3.default)(ActivityMatcher, _DataMatcher);

  function ActivityMatcher(_ref) {
    var options = (0, _objectWithoutProperties3.default)(_ref, []);
    (0, _classCallCheck3.default)(this, ActivityMatcher);
    return (0, _possibleConstructorReturn3.default)(this, (ActivityMatcher.__proto__ || (0, _getPrototypeOf2.default)(ActivityMatcher)).call(this, (0, _extends3.default)({
      name: 'activityMatcher'
    }, options)));
  }

  return ActivityMatcher;
}(_DataMatcher3.default)) || _class);
exports.default = ActivityMatcher;
//# sourceMappingURL=index.js.map
