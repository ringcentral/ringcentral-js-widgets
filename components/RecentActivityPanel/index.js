'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _expandable = require('./expandable');

var _expandable2 = _interopRequireDefault(_expandable);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _RecentActivityView = require('../RecentActivityView');

var _RecentActivityView2 = _interopRequireDefault(_RecentActivityView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _bind2.default.bind(_styles2.default);
var ToggleIcon = function ToggleIcon(_ref) {
  var expanded = _ref.expanded;
  return _react2.default.createElement('i', { className: (0, _classnames2.default)(_DynamicsFont2.default.arrow, cx('arrowIcon', { foldArrowIcon: !expanded })) });
};

ToggleIcon.propTypes = {
  expanded: _propTypes2.default.bool.isRequired
};

/**
 * RecentActivityPanel component provides a animated slide-out panel.
 */
function RecentActivityPanel(props) {
  var title = props.title,
      expanded = props.expanded,
      onPanelToggle = props.onPanelToggle;

  var toggleButton = {
    label: _react2.default.createElement(ToggleIcon, { expanded: expanded }),
    onClick: onPanelToggle,
    placement: 'right'
  };
  if (!props.currentContact) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.container },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.header, onClick: onPanelToggle },
      _react2.default.createElement(
        _Header2.default,
        { buttons: [toggleButton], className: _styles2.default.header },
        title
      )
    ),
    _react2.default.createElement(_RecentActivityView2.default, props)
  );
}

RecentActivityPanel.propTypes = {
  title: _propTypes2.default.string.isRequired,
  currentContact: _propTypes2.default.object,
  onPanelToggle: _propTypes2.default.func.isRequired,
  expanded: _propTypes2.default.bool.isRequired
};

RecentActivityPanel.defaultProps = {
  currentContact: null
};

exports.default = (0, _expandable2.default)({
  styles: {
    height: '200px',
    offset: '27px'
  },
  className: _styles2.default.expandable
})(RecentActivityPanel);
//# sourceMappingURL=index.js.map
