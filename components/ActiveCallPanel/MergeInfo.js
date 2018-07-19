'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _calleeTypes = require('../../enums/calleeTypes');

var _calleeTypes2 = _interopRequireDefault(_calleeTypes);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _CallAvatar = require('../CallAvatar');

var _CallAvatar2 = _interopRequireDefault(_CallAvatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MergeInfo(_ref) {
  var timeCounter = _ref.timeCounter,
      currentCall = _ref.currentCall,
      currentLocale = _ref.currentLocale,
      lastTo = _ref.lastTo;

  var isConference = lastTo && lastTo.calleeType === _calleeTypes2.default.conference ? _i18n2.default.getString('conferenceCall', currentLocale) : _i18n2.default.getString('unknow', currentLocale);
  return lastTo ? _react2.default.createElement(
    'div',
    { className: _styles2.default.mergeInfo },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.merge_item },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.callee_avatar },
        lastTo.calleeType === _calleeTypes2.default.conference ? _react2.default.createElement(_CallAvatar2.default, {
          avatarUrl: lastTo.avatarUrl,
          extraNum: lastTo.extraNum,
          isOnConferenceCall: true
        }) : _react2.default.createElement(_CallAvatar2.default, {
          avatarUrl: lastTo.avatarUrl
        })
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.callee_name },
        lastTo.calleeType === _calleeTypes2.default.contacts ? lastTo.name : isConference
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.callee_status },
        _i18n2.default.getString('onHold', currentLocale)
      )
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.merge_item_active },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.callee_avatar_active },
        !currentCall.nameMatches.length || !currentCall.avatarUrl ? _react2.default.createElement(_CallAvatar2.default, { avatarUrl: null }) : _react2.default.createElement(_CallAvatar2.default, { avatarUrl: currentCall.avatarUrl })
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.callee_name_active },
        currentCall.nameMatches.length ? currentCall.nameMatches[0].name : currentCall.fallBackName
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
  currentCall: _propTypes2.default.object.isRequired,
  timeCounter: _propTypes2.default.element.isRequired,
  lastTo: _propTypes2.default.object
};

MergeInfo.defaultProps = {
  lastTo: {
    calleeTypes: 'unknow'
  }
};

exports.default = MergeInfo;
//# sourceMappingURL=MergeInfo.js.map
