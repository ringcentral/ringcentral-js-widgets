'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EntityButton;

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

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EntityButton(_ref) {
  var className = _ref.className,
      onViewEntity = _ref.onViewEntity,
      onCreateEntity = _ref.onCreateEntity,
      hasEntity = _ref.hasEntity,
      isCreating = _ref.isCreating,
      disableLinks = _ref.disableLinks,
      viewEntityTitle = _ref.viewEntityTitle,
      createEntityTitle = _ref.createEntityTitle;

  // console.debug('isCreating', isCreating);
  var spinner = isCreating ? _react2.default.createElement(
    'div',
    { className: _styles2.default.spinnerContainer },
    _react2.default.createElement(_Spinner2.default, { ringWidth: 2 })
  ) : null;
  var icon = hasEntity ? _DynamicsFont2.default.record : _DynamicsFont2.default.addEntity;
  var onClick = hasEntity ? onViewEntity : onCreateEntity;
  var title = hasEntity ? viewEntityTitle : createEntityTitle;
  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.entity, className),
      onClick: onClick,
      disabled: disableLinks },
    _react2.default.createElement('span', {
      className: icon,
      title: title
    }),
    spinner
  );
}

EntityButton.propTypes = {
  className: _propTypes2.default.string,
  onViewEntity: _propTypes2.default.func,
  onCreateEntity: _propTypes2.default.func,
  hasEntity: _propTypes2.default.bool,
  isCreating: _propTypes2.default.bool,
  disableLinks: _propTypes2.default.bool,
  viewEntityTitle: _propTypes2.default.string,
  createEntityTitle: _propTypes2.default.string
};

EntityButton.defaultProps = {
  className: undefined,
  onViewEntity: undefined,
  hasEntity: false,
  onCreateEntity: undefined,
  isCreating: false,
  disableLinks: false,
  viewEntityTitle: undefined,
  createEntityTitle: undefined
};
//# sourceMappingURL=index.js.map
