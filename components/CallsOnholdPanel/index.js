'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CallsOnholdContainer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ActiveCallItemV = require('../ActiveCallItemV2');

var _ActiveCallItemV2 = _interopRequireDefault(_ActiveCallItemV);

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _BackButton = require('../BackButton');

var _BackButton2 = _interopRequireDefault(_BackButton);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _Combine = require('../../assets/images/Combine.svg');

var _Combine2 = _interopRequireDefault(_Combine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CallsOnholdContainer(_ref) {
  var calls = _ref.calls,
      currentLocale = _ref.currentLocale,
      areaCode = _ref.areaCode,
      countryCode = _ref.countryCode,
      brand = _ref.brand,
      showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
      autoLog = _ref.autoLog,
      webphoneAnswer = _ref.webphoneAnswer,
      webphoneReject = _ref.webphoneReject,
      webphoneHangup = _ref.webphoneHangup,
      webphoneResume = _ref.webphoneResume,
      webphoneToVoicemail = _ref.webphoneToVoicemail,
      enableContactFallback = _ref.enableContactFallback,
      sourceIcons = _ref.sourceIcons,
      phoneTypeRenderer = _ref.phoneTypeRenderer,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
      disableMerge = _ref.disableMerge,
      onBackButtonClick = _ref.onBackButtonClick,
      onMerge = _ref.onMerge,
      onAdd = _ref.onAdd,
      getAvatarUrl = _ref.getAvatarUrl;

  var backHeader = _react2.default.createElement(_BackHeader2.default, {
    className: _styles2.default.header,
    onBackClick: onBackButtonClick,
    backButton: _react2.default.createElement(_BackButton2.default, { label: _i18n2.default.getString('activeCall', currentLocale) })
  });

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.root },
    backHeader,
    _react2.default.createElement(
      'div',
      { className: _styles2.default.callList },
      calls.length ? calls.map(function (call) {
        return _react2.default.createElement(_ActiveCallItemV2.default, {
          call: call,
          key: call.id,
          showMergeCall: true,
          currentLocale: currentLocale,
          areaCode: areaCode,
          countryCode: countryCode,
          brand: brand,
          showContactDisplayPlaceholder: showContactDisplayPlaceholder,
          onMergeCall: onMerge,
          webphoneAnswer: webphoneAnswer,
          webphoneReject: webphoneReject,
          webphoneHangup: webphoneHangup,
          webphoneResume: webphoneResume,
          webphoneToVoicemail: webphoneToVoicemail,
          enableContactFallback: enableContactFallback,
          autoLog: autoLog,
          sourceIcons: sourceIcons,
          phoneTypeRenderer: phoneTypeRenderer,
          phoneSourceNameRenderer: phoneSourceNameRenderer,
          disableMerge: disableMerge,
          hasActionMenu: false,
          showAnswer: false,
          getAvatarUrl: getAvatarUrl,
          showHold: false
        });
      }) : _react2.default.createElement(
        'div',
        { className: _styles2.default.noCalls },
        _i18n2.default.getString('noCalls', currentLocale)
      )
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.addBtnContainer },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.addBtn },
        _react2.default.createElement(
          'span',
          { title: _i18n2.default.getString('add', currentLocale), className: _styles2.default.webphoneButton },
          _react2.default.createElement(_CircleButton2.default, {
            className: _styles2.default.addBtnIcon,
            icon: _Combine2.default,
            showBorder: false,
            onClick: onAdd
          })
        )
      )
    )
  );
}

CallsOnholdContainer.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  onMerge: _propTypes2.default.func,
  calls: _propTypes2.default.array.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  webphoneAnswer: _propTypes2.default.func,
  webphoneReject: _propTypes2.default.func,
  webphoneHangup: _propTypes2.default.func,
  webphoneResume: _propTypes2.default.func,
  webphoneToVoicemail: _propTypes2.default.func,
  enableContactFallback: _propTypes2.default.bool,
  autoLog: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  phoneTypeRenderer: _propTypes2.default.func,
  phoneSourceNameRenderer: _propTypes2.default.func,
  onBackButtonClick: _propTypes2.default.func,
  disableMerge: _propTypes2.default.bool,
  onAdd: _propTypes2.default.func,
  getAvatarUrl: _propTypes2.default.func
};

CallsOnholdContainer.defaultProps = {
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  webphoneToVoicemail: undefined,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  onBackButtonClick: undefined,
  onAdd: undefined,
  onMerge: undefined,
  disableMerge: false,
  getAvatarUrl: function getAvatarUrl(i) {
    return i;
  }
};
//# sourceMappingURL=index.js.map
