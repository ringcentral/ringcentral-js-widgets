'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = Modal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createModal = require('../../lib/createModal');

var _createModal2 = _interopRequireDefault(_createModal);

var _Dialog = require('../Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalDialog = (0, _createModal2.default)(_Dialog2.default);

// remap onCancel to onClose for backward compatibility
function Modal(_ref) {
  var onCancel = _ref.onCancel,
      props = (0, _objectWithoutProperties3.default)(_ref, ['onCancel']);

  return _react2.default.createElement(ModalDialog, (0, _extends3.default)({}, props, {
    onCancel: onCancel,
    onClose: onCancel }));
}
Modal.propTypes = {
  onCancel: _propTypes2.default.func
};
Modal.defaultProps = {
  onCancel: undefined
};
//# sourceMappingURL=index.js.map
