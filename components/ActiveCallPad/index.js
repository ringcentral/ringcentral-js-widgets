'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _recordStatus = require('ringcentral-integration/modules/Webphone/recordStatus');

var _recordStatus2 = _interopRequireDefault(_recordStatus);

var _is_type = require('ringcentral-integration/lib/di/utils/is_type');

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _Tooltip = require('../Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _ActiveCallButton = require('../ActiveCallButton');

var _ActiveCallButton2 = _interopRequireDefault(_ActiveCallButton);

var _Mute = require('../../assets/images/Mute.svg');

var _Mute2 = _interopRequireDefault(_Mute);

var _Unmute = require('../../assets/images/Unmute.svg');

var _Unmute2 = _interopRequireDefault(_Unmute);

var _Dialpad = require('../../assets/images/Dialpad.svg');

var _Dialpad2 = _interopRequireDefault(_Dialpad);

var _Hold = require('../../assets/images/Hold.svg');

var _Hold2 = _interopRequireDefault(_Hold);

var _Record = require('../../assets/images/Record.svg');

var _Record2 = _interopRequireDefault(_Record);

var _MoreIcon = require('../../assets/images/MoreIcon.svg');

var _MoreIcon2 = _interopRequireDefault(_MoreIcon);

var _Transfer = require('../../assets/images/Transfer.svg');

var _Transfer2 = _interopRequireDefault(_Transfer);

var _Flip = require('../../assets/images/Flip.svg');

var _Flip2 = _interopRequireDefault(_Flip);

var _End = require('../../assets/images/End.svg');

var _End2 = _interopRequireDefault(_End);

var _Combine = require('../../assets/images/Combine.svg');

var _Combine2 = _interopRequireDefault(_Combine);

var _MergeIntoConferenceIcon = require('../../assets/images/MergeIntoConferenceIcon.svg');

var _MergeIntoConferenceIcon2 = _interopRequireDefault(_MergeIntoConferenceIcon);

var _callCtrlLayouts = require('../../enums/callCtrlLayouts');

var _callCtrlLayouts2 = _interopRequireDefault(_callCtrlLayouts);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ParkIcon from '../../assets/images/Park.svg';
var DisplayButtonNumber = 6;
// import AddIcon from '../../assets/images/AddCall.svg';


function MoreActionItem(_ref) {
  var title = _ref.title,
      Icon = _ref.icon,
      disabled = _ref.disabled,
      onClick = _ref.onClick;

  var iconClassName = (0, _classnames2.default)(_styles2.default.buttonIcon, disabled ? _styles2.default.buttonDisabled : _styles2.default.buttonActive);
  return _react2.default.createElement(
    'div',
    {
      className: _styles2.default.buttonItem,
      onClick: disabled ? null : onClick },
    _react2.default.createElement(
      'div',
      { className: iconClassName },
      _react2.default.createElement(Icon, null)
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.buttonName },
      title
    )
  );
}

MoreActionItem.propTypes = {
  title: _propTypes2.default.string.isRequired,
  icon: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool.isRequired,
  onClick: _propTypes2.default.func.isRequired
};

var ActiveCallPad = function (_Component) {
  (0, _inherits3.default)(ActiveCallPad, _Component);

  function ActiveCallPad(props) {
    (0, _classCallCheck3.default)(this, ActiveCallPad);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveCallPad.__proto__ || (0, _getPrototypeOf2.default)(ActiveCallPad)).call(this, props));

    _this.moreButton = (0, _react.createRef)();
    _this.dropdown = (0, _react.createRef)();
    _this.onClick = _this.onClick.bind(_this);
    _this.toggleMore = _this.toggleMore.bind(_this);
    _this.state = {
      expandMore: props.expandMore,
      moreButton: _this.moreButton && _this.moreButton.current
    };
    return _this;
  }

  (0, _createClass3.default)(ActiveCallPad, [{
    key: 'onClick',
    value: function onClick(e) {
      if ((0, _is_type.isObject)(this.dropdown) && (0, _is_type.isObject)(this.dropdown.current)) {
        var current = this.dropdown.current.dom.current;


        if (!current.contains(e.target) && !this.moreButton.current.contains(e.target) && this.state.expandMore) {
          this.setState({
            expandMore: false
          });
        }
      }
    }
  }, {
    key: 'toggleMore',
    value: function toggleMore() {
      this.setState(function (prevState) {
        return {
          expandMore: !prevState.expandMore
        };
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.body.addEventListener('click', this.onClick);
      this.setState({
        moreButton: this.moreButton && this.moreButton.current
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setState({
        moreButton: this.moreButton && this.moreButton.current
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this.onClick);
    }
  }, {
    key: 'render',
    value: function render() {
      var buttons = [];

      /* --------------------- Mute/Unmute --------------------------- */
      buttons.push(this.props.isOnMute ? {
        icon: _Mute2.default,
        title: _i18n2.default.getString('unmute', this.props.currentLocale),
        disabled: this.props.isOnHold,
        onClick: this.props.onUnmute
      } : {
        icon: _Unmute2.default,
        title: _i18n2.default.getString('mute', this.props.currentLocale),
        disabled: this.props.isOnHold,
        onClick: this.props.onMute
      });

      /* --------------------- keyPad --------------------------- */
      buttons.push({
        icon: _Dialpad2.default,
        title: _i18n2.default.getString('keypad', this.props.currentLocale),
        onClick: this.props.onShowKeyPad
      });

      /* --------------------- Hold/Unhold --------------------------- */
      buttons.push({
        icon: _Hold2.default,
        iconWidth: 120,
        iconHeight: 160,
        iconX: 190,
        iconY: 165,
        title: this.props.isOnHold ? _i18n2.default.getString('onHold', this.props.currentLocale) : _i18n2.default.getString('hold', this.props.currentLocale),
        active: this.props.isOnHold,
        onClick: this.props.isOnHold ? this.props.onUnhold : this.props.onHold
      });

      /* --------------------- Add/Merge --------------------------- */
      if (this.props.conferenceCallEquipped) {
        var showMerge = this.props.layout === _callCtrlLayouts2.default.mergeCtrl || this.props.layout === _callCtrlLayouts2.default.normalCtrl && this.props.hasConferenceCall;
        buttons.push(showMerge ? {
          icon: _MergeIntoConferenceIcon2.default,
          title: _i18n2.default.getString('mergeToConference', this.props.currentLocale),
          disabled: this.props.mergeDisabled,
          onClick: this.props.onMerge,
          showRipple: !this.props.mergeDisabled
        } : {
          icon: _Combine2.default,
          title: _i18n2.default.getString('add', this.props.currentLocale),
          disabled: this.props.addDisabled,
          onClick: this.props.onAdd
        });
      }

      /* --------------------- Record/Stop --------------------------- */
      buttons.push({
        icon: _Record2.default,
        title: this.props.recordStatus === _recordStatus2.default.recording ? _i18n2.default.getString('stopRecord', this.props.currentLocale) : _i18n2.default.getString('record', this.props.currentLocale),
        active: this.props.recordStatus === _recordStatus2.default.recording,
        disabled: this.props.isOnHold || this.props.recordStatus === _recordStatus2.default.pending || this.props.layout === _callCtrlLayouts2.default.mergeCtrl,
        onClick: this.props.recordStatus === _recordStatus2.default.recording ? this.props.onStopRecord : this.props.onRecord
      });

      /* --------------------- Transfer --------------------------- */
      var disabledTransfer = this.props.layout === _callCtrlLayouts2.default.mergeCtrl;
      buttons.push({
        icon: _Transfer2.default,
        title: _i18n2.default.getString('transfer', this.props.currentLocale),
        disabled: disabledTransfer,
        onClick: this.props.onToggleTransferPanel
      });

      /* --------------------- Flip --------------------------- */
      var disabledFlip = this.props.flipNumbers.length === 0 || this.props.isOnHold || this.props.layout === _callCtrlLayouts2.default.mergeCtrl;
      buttons.push({
        icon: _Flip2.default,
        title: _i18n2.default.getString('flip', this.props.currentLocale),
        disabled: disabledFlip,
        onClick: this.props.onShowFlipPanel
      });

      /* --------------------- More Actions --------------------------- */
      var moreActions = null;
      if (buttons.length > DisplayButtonNumber) {
        moreActions = _react2.default.createElement(
          'span',
          {
            className: _styles2.default.moreButtonContainer,
            ref: this.moreButton
          },
          _react2.default.createElement(_ActiveCallButton2.default, {
            onClick: this.toggleMore,
            title: _i18n2.default.getString('more', this.props.currentLocale),
            active: this.state.expandMore,
            className: (0, _classnames2.default)(_styles2.default.moreButton, _styles2.default.callButton),
            disabled: disabledFlip && disabledTransfer,
            icon: _MoreIcon2.default }),
          _react2.default.createElement(
            _Tooltip2.default,
            {
              fixed: false,
              open: this.state.expandMore,
              direction: 'top',
              ref: this.dropdown,
              triggerElm: this.state.moreButton },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.buttonPopup },
              buttons.slice(DisplayButtonNumber - 1).map(function (_ref2) {
                var title = _ref2.title,
                    opts = (0, _objectWithoutProperties3.default)(_ref2, ['title']);
                return _react2.default.createElement(MoreActionItem, (0, _extends3.default)({
                  key: title,
                  title: title
                }, opts));
              })
            )
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, this.props.className) },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.callCtrlButtonGroup },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.buttonRow },
            buttons.slice(0, DisplayButtonNumber - (moreActions ? 1 : 0)).map(function (opts) {
              return _react2.default.createElement(_ActiveCallButton2.default, (0, _extends3.default)({
                key: opts.title,
                className: _styles2.default.callButton
              }, opts));
            }),
            moreActions
          )
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_styles2.default.buttonRow, _styles2.default.stopButtonGroup) },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.button },
            _react2.default.createElement(_CircleButton2.default, {
              className: _styles2.default.stopButton,
              onClick: this.props.onHangup,
              icon: _End2.default,
              showBorder: false,
              iconWidth: 250,
              iconX: 125
            })
          )
        )
      );
    }
  }]);
  return ActiveCallPad;
}(_react.Component);

ActiveCallPad.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  isOnMute: _propTypes2.default.bool,
  isOnHold: _propTypes2.default.bool,
  recordStatus: _propTypes2.default.string.isRequired,
  onMute: _propTypes2.default.func.isRequired,
  onUnmute: _propTypes2.default.func.isRequired,
  onHold: _propTypes2.default.func.isRequired,
  onUnhold: _propTypes2.default.func.isRequired,
  onRecord: _propTypes2.default.func.isRequired,
  onStopRecord: _propTypes2.default.func.isRequired,
  onHangup: _propTypes2.default.func.isRequired,
  // onPark: PropTypes.func.isRequired,
  onShowKeyPad: _propTypes2.default.func.isRequired,
  onAdd: _propTypes2.default.func,
  onMerge: _propTypes2.default.func,
  onShowFlipPanel: _propTypes2.default.func.isRequired,
  onToggleTransferPanel: _propTypes2.default.func.isRequired,
  flipNumbers: _propTypes2.default.array.isRequired,
  layout: _propTypes2.default.string,
  addDisabled: _propTypes2.default.bool,
  mergeDisabled: _propTypes2.default.bool,
  conferenceCallEquipped: _propTypes2.default.bool,
  hasConferenceCall: _propTypes2.default.bool,
  expandMore: _propTypes2.default.bool
};

ActiveCallPad.defaultProps = {
  className: null,
  isOnMute: false,
  isOnHold: false,
  layout: _callCtrlLayouts2.default.normalCtrl,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  onAdd: undefined,
  onMerge: undefined,
  expandMore: false
};

exports.default = ActiveCallPad;
//# sourceMappingURL=index.js.map
