'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = MessagesPanel;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Header = require('../../components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _SpinnerOverlay = require('../../components/SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _MessageList = require('../../components/MessageList');

var _MessageList2 = _interopRequireDefault(_MessageList);

var _ComposeText = require('../../assets/images/ComposeText.svg');

var _ComposeText2 = _interopRequireDefault(_ComposeText);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MessagesPanel(_ref) {
  var currentLocale = _ref.currentLocale,
      showSpinner = _ref.showSpinner,
      showTitle = _ref.showTitle,
      showComposeText = _ref.showComposeText,
      composeText = _ref.composeText,
      props = (0, _objectWithoutProperties3.default)(_ref, ['currentLocale', 'showSpinner', 'showTitle', 'showComposeText', 'composeText']);

  var buttons = [];
  if (showComposeText) {
    buttons.push({
      label: _react2.default.createElement(_ComposeText2.default, { className: _styles2.default.composeText }),
      onClick: composeText,
      placement: 'right'
    });
  }
  var header = showTitle ? _react2.default.createElement(
    _Header2.default,
    { buttons: buttons },
    _i18n2.default.getString('title', currentLocale)
  ) : null;
  var content = showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : _react2.default.createElement(_MessageList2.default, (0, _extends3.default)({
    className: (0, _classnames2.default)(_styles2.default.content, showTitle && _styles2.default.contentWithHeader)
  }, props, {
    currentLocale: currentLocale
  }));
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.root },
    header,
    content
  );
}

MessagesPanel.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  showSpinner: _propTypes2.default.bool,
  showTitle: _propTypes2.default.bool,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  showComposeText: _propTypes2.default.bool,
  composeText: _propTypes2.default.func.isRequired
};
MessagesPanel.defaultProps = {
  showSpinner: false,
  showTitle: false,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  showComposeText: false
};
//# sourceMappingURL=index.js.map
