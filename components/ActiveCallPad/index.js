"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoreActionItem = MoreActionItem;
exports.default = exports.ACTIONS_CTRL_MAP = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _recordStatus = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/recordStatus"));

var _is_type = require("ringcentral-integration/lib/di/utils/is_type");

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _ActiveCallButton = _interopRequireDefault(require("../ActiveCallButton"));

var _Mute = _interopRequireDefault(require("../../assets/images/Mute.svg"));

var _Unmute = _interopRequireDefault(require("../../assets/images/Unmute.svg"));

var _Dialpad = _interopRequireDefault(require("../../assets/images/Dialpad.svg"));

var _Hold = _interopRequireDefault(require("../../assets/images/Hold.svg"));

var _Record = _interopRequireDefault(require("../../assets/images/Record.svg"));

var _MoreIcon = _interopRequireDefault(require("../../assets/images/MoreIcon.svg"));

var _Transfer = _interopRequireDefault(require("../../assets/images/Transfer.svg"));

var _Flip = _interopRequireDefault(require("../../assets/images/Flip.svg"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _Combine = _interopRequireDefault(require("../../assets/images/Combine.svg"));

var _MergeIntoConferenceIcon = _interopRequireDefault(require("../../assets/images/MergeIntoConferenceIcon.svg"));

var _callCtrlLayouts = _interopRequireDefault(require("../../enums/callCtrlLayouts"));

var _utils = require("./utils");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var DisplayButtonNumber = 6;
var ACTIONS_CTRL_MAP = {
  muteCtrl: 'muteCtrl',
  keypadCtrl: 'keypadCtrl',
  holdCtrl: 'holdCtrl',
  mergeOrAddCtrl: 'mergeOrAddCtrl',
  recordCtrl: 'recordCtrl',
  transferCtrl: 'transferCtrl',
  flipCtrl: 'flipCtrl'
};
exports.ACTIONS_CTRL_MAP = ACTIONS_CTRL_MAP;

function MoreActionItem(_ref) {
  var title = _ref.title,
      Icon = _ref.icon,
      disabled = _ref.disabled,
      onClick = _ref.onClick;
  var iconClassName = (0, _classnames.default)(_styles.default.buttonIcon, disabled ? _styles.default.buttonDisabled : _styles.default.buttonActive);
  return _react.default.createElement("div", {
    className: _styles.default.buttonItem,
    onClick: disabled ? null : onClick
  }, _react.default.createElement("div", {
    className: iconClassName
  }, _react.default.createElement(Icon, null)), _react.default.createElement("div", {
    className: _styles.default.buttonName
  }, title));
}

MoreActionItem.propTypes = {
  title: _propTypes.default.string.isRequired,
  icon: _propTypes.default.func.isRequired,
  disabled: _propTypes.default.bool.isRequired,
  onClick: _propTypes.default.func.isRequired
};

var ActiveCallPad =
/*#__PURE__*/
function (_Component) {
  _inherits(ActiveCallPad, _Component);

  function ActiveCallPad(props) {
    var _context;

    var _this;

    _classCallCheck(this, ActiveCallPad);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ActiveCallPad).call(this, props));
    _this.moreButton = (0, _react.createRef)();
    _this.dropdown = (0, _react.createRef)();
    _this.onClick = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _this.onClick).bind(_context);
    _this.toggleMore = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _this.toggleMore).bind(_context);
    _this.state = {
      expandMore: props.expandMore,
      moreButton: _this.moreButton && _this.moreButton.current
    };
    return _this;
  }

  _createClass(ActiveCallPad, [{
    key: "onClick",
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
    key: "toggleMore",
    value: function toggleMore() {
      this.setState(function (prevState) {
        return {
          expandMore: !prevState.expandMore
        };
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.body.addEventListener('click', this.onClick);
      this.setState({
        moreButton: this.moreButton && this.moreButton.current
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      this.setState({
        moreButton: this.moreButton && this.moreButton.current
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this.onClick);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextState !== this.state) {
        return true;
      }

      var showUpdate = false;

      for (var p in nextProps) {
        if (Object.prototype.hasOwnProperty.call(nextProps, p)) {
          var val = nextProps[p];

          if (val !== this.props[p] && typeof val !== 'function') {
            showUpdate = true;
            break;
          }
        }
      }

      return showUpdate;
    }
  }, {
    key: "render",
    value: function render() {
      var controlBusy = this.props.controlBusy;
      var buttons = [];
      /* --------------------- Mute/Unmute --------------------------- */

      buttons.push(this.props.isOnMute ? {
        icon: _Mute.default,
        id: ACTIONS_CTRL_MAP.muteCtrl,
        title: _i18n.default.getString('unmute', this.props.currentLocale),
        disabled: this.props.isOnHold || controlBusy,
        onClick: this.props.onUnmute
      } : {
        icon: _Unmute.default,
        id: ACTIONS_CTRL_MAP.muteCtrl,
        title: _i18n.default.getString('mute', this.props.currentLocale),
        disabled: this.props.isOnHold || controlBusy,
        onClick: this.props.onMute
      });
      /* --------------------- keyPad --------------------------- */

      buttons.push({
        icon: _Dialpad.default,
        id: ACTIONS_CTRL_MAP.keypadCtrl,
        title: _i18n.default.getString('keypad', this.props.currentLocale),
        onClick: this.props.onShowKeyPad,
        disabled: this.props.layout === _callCtrlLayouts.default.conferenceCtrl
      });
      /* --------------------- Hold/Unhold --------------------------- */

      buttons.push({
        icon: _Hold.default,
        id: ACTIONS_CTRL_MAP.holdCtrl,
        iconWidth: 120,
        iconHeight: 160,
        iconX: 190,
        iconY: 165,
        title: this.props.isOnHold ? _i18n.default.getString('onHold', this.props.currentLocale) : _i18n.default.getString('hold', this.props.currentLocale),
        active: this.props.isOnHold,
        onClick: this.props.isOnHold ? this.props.onUnhold : this.props.onHold,
        disabled: controlBusy
      });
      /* --------------------- Add/Merge --------------------------- */

      if (this.props.conferenceCallEquipped) {
        var showMerge = this.props.layout === _callCtrlLayouts.default.mergeCtrl || this.props.layout === _callCtrlLayouts.default.normalCtrl && this.props.hasConferenceCall;
        buttons.push(showMerge ? {
          icon: _MergeIntoConferenceIcon.default,
          id: ACTIONS_CTRL_MAP.mergeOrAddCtrl,
          title: _i18n.default.getString('mergeToConference', this.props.currentLocale),
          disabled: this.props.mergeDisabled || controlBusy,
          onClick: this.props.onMerge,
          showRipple: !this.props.mergeDisabled
        } : {
          icon: _Combine.default,
          id: ACTIONS_CTRL_MAP.mergeOrAddCtrl,
          title: _i18n.default.getString('add', this.props.currentLocale),
          disabled: this.props.addDisabled || controlBusy,
          onClick: this.props.onAdd
        });
      }
      /* --------------------- Record/Stop --------------------------- */


      buttons.push({
        icon: _Record.default,
        id: ACTIONS_CTRL_MAP.recordCtrl,
        title: this.props.recordStatus === _recordStatus.default.recording ? _i18n.default.getString('stopRecord', this.props.currentLocale) : _i18n.default.getString('record', this.props.currentLocale),
        active: this.props.recordStatus === _recordStatus.default.recording,
        disabled: this.props.isOnHold || this.props.recordStatus === _recordStatus.default.pending || this.props.layout === _callCtrlLayouts.default.mergeCtrl || this.props.recordStatus === _recordStatus.default.noAccess || controlBusy,
        onClick: this.props.recordStatus === _recordStatus.default.recording ? this.props.onStopRecord : this.props.onRecord
      });
      /* --------------------- Transfer --------------------------- */

      var disabledTransfer = this.props.layout !== _callCtrlLayouts.default.normalCtrl;
      buttons.push({
        icon: _Transfer.default,
        id: ACTIONS_CTRL_MAP.transferCtrl,
        title: _i18n.default.getString('transfer', this.props.currentLocale),
        disabled: disabledTransfer || controlBusy,
        onClick: this.props.onToggleTransferPanel
      });
      /* --------------------- Flip --------------------------- */

      var disabledFlip = this.props.flipNumbers.length === 0 || this.props.isOnHold || this.props.layout !== _callCtrlLayouts.default.normalCtrl;
      buttons.push({
        icon: _Flip.default,
        id: ACTIONS_CTRL_MAP.flipCtrl,
        title: _i18n.default.getString('flip', this.props.currentLocale),
        disabled: disabledFlip || controlBusy,
        onClick: this.props.onShowFlipPanel
      }); // filter actions

      var actions = this.props.actions;

      if (actions.length > 0) {
        buttons = (0, _utils.pickElements)(actions, buttons);
      }
      /* --------------------- More Actions --------------------------- */


      var moreActions = null;

      if (buttons.length > DisplayButtonNumber) {
        moreActions = _react.default.createElement("span", {
          className: _styles.default.moreButtonContainer,
          ref: this.moreButton
        }, _react.default.createElement(_ActiveCallButton.default, {
          onClick: this.toggleMore,
          title: _i18n.default.getString('more', this.props.currentLocale),
          active: this.state.expandMore,
          className: (0, _classnames.default)(_styles.default.moreButton, _styles.default.callButton),
          disabled: disabledFlip && disabledTransfer || controlBusy,
          icon: _MoreIcon.default
        }), _react.default.createElement(_Tooltip.default, {
          fixed: false,
          open: this.state.expandMore,
          direction: "top",
          ref: this.dropdown,
          triggerElm: this.state.moreButton
        }, _react.default.createElement("div", {
          className: _styles.default.buttonPopup
        }, buttons.slice(DisplayButtonNumber - 1).map(function (_ref2) {
          var id = _ref2.id,
              opts = _objectWithoutProperties(_ref2, ["id"]);

          return _react.default.createElement(MoreActionItem, _extends({
            key: id
          }, opts));
        }))));
      }

      var isLessBtn = buttons.length <= 3 && moreActions === null;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(_styles.default.root, this.props.className)
      }, _react.default.createElement("div", {
        className: (0, _classnames.default)(_styles.default.callCtrlButtonGroup, isLessBtn && _styles.default.biggerButton)
      }, _react.default.createElement("div", {
        className: _styles.default.buttonRow
      }, buttons.slice(0, DisplayButtonNumber - (moreActions ? 1 : 0)).map(function (opts) {
        return _react.default.createElement(_ActiveCallButton.default, _extends({
          key: opts.title,
          className: _styles.default.callButton
        }, opts));
      }), moreActions)), _react.default.createElement("div", {
        className: (0, _classnames.default)(_styles.default.buttonRow, _styles.default.stopButtonGroup)
      }, _react.default.createElement("div", {
        className: _styles.default.button
      }, _react.default.createElement(_CircleButton.default, {
        className: (0, _classnames.default)(_styles.default.stopButton, controlBusy && _styles.default.disabled),
        onClick: this.props.onHangup,
        icon: _End.default,
        showBorder: false,
        iconWidth: 250,
        iconX: 125,
        dataSign: "hangup",
        disabled: controlBusy
      }))));
    }
  }]);

  return ActiveCallPad;
}(_react.Component);

ActiveCallPad.propTypes = {
  currentLocale: _propTypes.default.string.isRequired,
  className: _propTypes.default.string,
  isOnMute: _propTypes.default.bool,
  isOnHold: _propTypes.default.bool,
  recordStatus: _propTypes.default.string.isRequired,
  onMute: _propTypes.default.func.isRequired,
  onUnmute: _propTypes.default.func.isRequired,
  onHold: _propTypes.default.func.isRequired,
  onUnhold: _propTypes.default.func.isRequired,
  onRecord: _propTypes.default.func.isRequired,
  onStopRecord: _propTypes.default.func.isRequired,
  onHangup: _propTypes.default.func.isRequired,
  // onPark: PropTypes.func.isRequired,
  onShowKeyPad: _propTypes.default.func.isRequired,
  onAdd: _propTypes.default.func,
  onMerge: _propTypes.default.func,
  onShowFlipPanel: _propTypes.default.func.isRequired,
  onToggleTransferPanel: _propTypes.default.func.isRequired,
  flipNumbers: _propTypes.default.array.isRequired,
  layout: _propTypes.default.string,
  addDisabled: _propTypes.default.bool,
  mergeDisabled: _propTypes.default.bool,
  conferenceCallEquipped: _propTypes.default.bool,
  hasConferenceCall: _propTypes.default.bool,
  expandMore: _propTypes.default.bool,
  actions: _propTypes.default.array
};
ActiveCallPad.defaultProps = {
  className: null,
  isOnMute: false,
  isOnHold: false,
  layout: _callCtrlLayouts.default.normalCtrl,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  onAdd: undefined,
  onMerge: undefined,
  expandMore: false,
  actions: []
};
var _default = ActiveCallPad;
exports.default = _default;
//# sourceMappingURL=index.js.map
