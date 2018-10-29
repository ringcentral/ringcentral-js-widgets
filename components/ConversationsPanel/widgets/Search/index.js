'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Search;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _messageTypes = require('ringcentral-integration/enums/messageTypes');

var _messageTypes2 = _interopRequireDefault(_messageTypes);

var _SearchInput = require('../../../SearchInput');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _NewComposeText = require('../../../../assets/images/NewComposeText.svg');

var _NewComposeText2 = _interopRequireDefault(_NewComposeText);

var _NewComposeTextHover = require('../../../../assets/images/NewComposeTextHover.svg');

var _NewComposeTextHover2 = _interopRequireDefault(_NewComposeTextHover);

var _i18n = require('../../i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Search(_ref) {
  var composeTextPermission = _ref.composeTextPermission,
      typeFilter = _ref.typeFilter,
      onSearchInputChange = _ref.onSearchInputChange,
      searchInput = _ref.searchInput,
      currentLocale = _ref.currentLocale,
      disableLinks = _ref.disableLinks,
      goToComposeText = _ref.goToComposeText,
      renderSearchTip = _ref.renderSearchTip;

  if (!onSearchInputChange) {
    return null;
  }
  var showTextIcon = composeTextPermission && (typeFilter === _messageTypes2.default.all || typeFilter === _messageTypes2.default.text);
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.searchContainer, showTextIcon ? null : _styles2.default.withoutTextIcon)
    },
    _react2.default.createElement(_SearchInput2.default, {
      className: _styles2.default.searchInput,
      value: searchInput,
      onChange: onSearchInputChange,
      placeholder: _i18n2.default.getString('search', currentLocale),
      disabled: disableLinks
    }),
    _react2.default.createElement(
      'span',
      {
        title: _i18n2.default.getString('composeText', currentLocale),
        className: _styles2.default.textIcon,
        onClick: goToComposeText
      },
      _react2.default.createElement(_NewComposeTextHover2.default, { className: _styles2.default.hoverTextSVGIcon, width: 20, height: 21 }),
      _react2.default.createElement(_NewComposeText2.default, { className: _styles2.default.textSVGIcon, width: 20, height: 21 })
    ),
    renderSearchTip && renderSearchTip()
  );
}

Search.propTypes = {
  composeTextPermission: _propTypes2.default.bool,
  typeFilter: _propTypes2.default.string,
  onSearchInputChange: _propTypes2.default.func,
  searchInput: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string.isRequired,
  disableLinks: _propTypes2.default.bool,
  goToComposeText: _propTypes2.default.func.isRequired,
  renderSearchTip: _propTypes2.default.func
};

Search.defaultProps = {
  composeTextPermission: true,
  typeFilter: _messageTypes2.default.all,
  onSearchInputChange: undefined,
  searchInput: '',
  disableLinks: false,
  renderSearchTip: undefined
};
//# sourceMappingURL=index.js.map
