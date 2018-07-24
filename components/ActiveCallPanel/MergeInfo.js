'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _sessionStatus = require('ringcentral-integration/modules/Webphone/sessionStatus');

var _sessionStatus2 = _interopRequireDefault(_sessionStatus);

var _calleeTypes = require('ringcentral-integration/enums/calleeTypes');

var _calleeTypes2 = _interopRequireDefault(_calleeTypes);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _CallAvatar = require('../CallAvatar');

var _CallAvatar2 = _interopRequireDefault(_CallAvatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MergeInfo(props) {
  var _classnames;

  var currentLocale = props.currentLocale,
      timeCounter = props.timeCounter,
      lastCallInfo = props.lastCallInfo,
      currentCallTitle = props.currentCallTitle,
      currentCallAvatarUrl = props.currentCallAvatarUrl;


  var isLastCallEnded = lastCallInfo && lastCallInfo.status === _sessionStatus2.default.finished;
  var statusClasses = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, _styles2.default.callee_status, true), (0, _defineProperty3.default)(_classnames, _styles2.default.callee_status_disconnected, !!isLastCallEnded), _classnames));

  var isOnConferenCall = !!(lastCallInfo && lastCallInfo.calleeType === _calleeTypes2.default.conference);

  return lastCallInfo ? _react2.default.createElement(
    'div',
    { className: _styles2.default.mergeInfo },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.merge_item },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.callee_avatar },
        _react2.default.createElement(_CallAvatar2.default, {
          avatarUrl: lastCallInfo.avatarUrl,
          extraNum: isOnConferenCall ? lastCallInfo.extraNum : 0,
          isOnConferenceCall: isOnConferenCall
        })
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.callee_name },
        lastCallInfo.calleeType === _calleeTypes2.default.conference ? _i18n2.default.getString('conferenceCall', currentLocale) : lastCallInfo.name
      ),
      _react2.default.createElement(
        'div',
        { className: statusClasses },
        lastCallInfo.status === _sessionStatus2.default.finished ? _i18n2.default.getString('disconnected', currentLocale) : _i18n2.default.getString('onHold', currentLocale)
      )
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.merge_item_active },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.callee_avatar_active },
        currentCallAvatarUrl ? _react2.default.createElement(_CallAvatar2.default, { avatarUrl: currentCallAvatarUrl }) : _react2.default.createElement(_CallAvatar2.default, { avatarUrl: null })
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.callee_name_active },
        currentCallTitle
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.callee_status_active },
        timeCounter
      )
    )
  ) : _react2.default.createElement('span', null);
}

MergeInfo.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  timeCounter: _propTypes2.default.element.isRequired,
  lastCallInfo: _propTypes2.default.object,
  currentCallTitle: _propTypes2.default.string,
  currentCallAvatarUrl: _propTypes2.default.string
};

MergeInfo.defaultProps = {
  lastCallInfo: { calleeType: _calleeTypes2.default.unknow },
  currentCallTitle: undefined,
  currentCallAvatarUrl: undefined
};

exports.default = MergeInfo;
//# sourceMappingURL=MergeInfo.js.map
