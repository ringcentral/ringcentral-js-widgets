'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LogButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Spinner = require('../Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LogButton(_ref) {
  var className = _ref.className,
      onLog = _ref.onLog,
      isLogged = _ref.isLogged,
      disableLinks = _ref.disableLinks,
      isLogging = _ref.isLogging,
      addTitle = _ref.addTitle,
      editTitle = _ref.editTitle;

  var spinner = isLogging ? _react2.default.createElement(_Spinner2.default, { ringWidth: 2, className: _styles2.default.spinner }) : null;
  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.log, className),
      onClick: onLog,
      disabled: disableLinks || isLogging
    },
    _react2.default.createElement('span', {
      className: isLogged ? _DynamicsFont2.default.edit : _DynamicsFont2.default.callLog,
      title: isLogged ? editTitle : addTitle }),
    spinner
  );
}
LogButton.propTypes = {
  className: _propTypes2.default.string,
  onLog: _propTypes2.default.func,
  isLogged: _propTypes2.default.bool,
  disableLinks: _propTypes2.default.bool,
  isLogging: _propTypes2.default.bool,
  addTitle: _propTypes2.default.string,
  editTitle: _propTypes2.default.string
};
LogButton.defaultProps = {
  className: undefined,
  onLog: undefined,
  isLogged: false,
  disableLinks: false,
  isLogging: false,
  addTitle: undefined,
  editTitle: undefined
};
//# sourceMappingURL=index.js.map
