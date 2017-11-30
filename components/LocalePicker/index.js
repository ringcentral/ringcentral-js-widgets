'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DropdownSelect = require('../DropdownSelect');

var _DropdownSelect2 = _interopRequireDefault(_DropdownSelect);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _countryNames = require('../../lib/countryNames');

var _countryNames2 = _interopRequireDefault(_countryNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderFunction(locale) {
  var _locale$split = locale.split(/[-_]/),
      _locale$split2 = (0, _toArray3.default)(_locale$split),
      lang = _locale$split2[0],
      tokens = _locale$split2.slice(1);

  var region = tokens.join('-');
  return _i18n2.default.getString(lang, locale) + ' (' + _countryNames2.default.getString(region, locale) + ')';
}

var LocalePicker = function (_Component) {
  (0, _inherits3.default)(LocalePicker, _Component);

  function LocalePicker() {
    (0, _classCallCheck3.default)(this, LocalePicker);
    return (0, _possibleConstructorReturn3.default)(this, (LocalePicker.__proto__ || (0, _getPrototypeOf2.default)(LocalePicker)).apply(this, arguments));
  }

  (0, _createClass3.default)(LocalePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.mounted = true;
      (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _promise2.default.all(_this2.props.options.reduce(function (promises, l) {
                  promises.push(_i18n2.default._load(l));
                  promises.push(_countryNames2.default._load(l));
                  return promises;
                }, []));

              case 2:
                if (_this2.mounted) _this2.forceUpdate();

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }))();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_DropdownSelect2.default, (0, _extends3.default)({}, this.props, {
        dropdownAlign: 'left',
        renderValue: renderFunction,
        renderFunction: renderFunction
      }));
    }
  }]);
  return LocalePicker;
}(_react.Component);

exports.default = LocalePicker;

LocalePicker.propTypes = {
  value: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  onChange: _propTypes2.default.func.isRequired
};
//# sourceMappingURL=index.js.map
