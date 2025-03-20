"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ACTIONS_CTRL_MAP = void 0;
var _recordStatus = require("@ringcentral-integration/commons/modules/Webphone/recordStatus");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _Combine = _interopRequireDefault(require("../../assets/images/Combine.svg"));
var _Dialpad = _interopRequireDefault(require("../../assets/images/Dialpad.svg"));
var _End = _interopRequireDefault(require("../../assets/images/End.svg"));
var _Flip = _interopRequireDefault(require("../../assets/images/Flip.svg"));
var _Hold = _interopRequireDefault(require("../../assets/images/Hold.svg"));
var _MergeIntoConferenceIcon = _interopRequireDefault(require("../../assets/images/MergeIntoConferenceIcon.svg"));
var _MoreIcon = _interopRequireDefault(require("../../assets/images/MoreIcon.svg"));
var _Mute = _interopRequireDefault(require("../../assets/images/Mute.svg"));
var _Park = _interopRequireDefault(require("../../assets/images/Park.svg"));
var _Record = _interopRequireDefault(require("../../assets/images/Record.svg"));
var _Transfer = _interopRequireDefault(require("../../assets/images/Transfer.svg"));
var _Unmute = _interopRequireDefault(require("../../assets/images/Unmute.svg"));
var _callCtrlLayouts = _interopRequireDefault(require("../../enums/callCtrlLayouts"));
var _ActiveCallButton = _interopRequireDefault(require("../ActiveCallButton"));
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _MoreActionItem = _interopRequireDefault(require("./MoreActionItem"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _utils = require("./utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); } // import AddIcon from '../../assets/images/AddCall.svg';
var DisplayButtonNumber = 6;
var ACTIONS_CTRL_MAP = {
  muteCtrl: 'muteCtrl',
  keypadCtrl: 'keypadCtrl',
  holdCtrl: 'holdCtrl',
  mergeOrAddCtrl: 'mergeOrAddCtrl',
  recordCtrl: 'recordCtrl',
  transferCtrl: 'transferCtrl',
  flipCtrl: 'flipCtrl',
  parkCtrl: 'parkCtrl',
  completeTransferCtrl: 'completeTransferCtrl'
};
exports.ACTIONS_CTRL_MAP = ACTIONS_CTRL_MAP;
var ActiveCallPad = /*#__PURE__*/function (_Component) {
  _inherits(ActiveCallPad, _Component);
  var _super = _createSuper(ActiveCallPad);
  function ActiveCallPad(props) {
    var _this;
    _classCallCheck(this, ActiveCallPad);
    _this = _super.call(this, props);
    _this.dropdown = void 0;
    _this.moreButton = void 0;
    _this.moreButton = /*#__PURE__*/(0, _react.createRef)();
    _this.dropdown = /*#__PURE__*/(0, _react.createRef)();
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.toggleMore = _this.toggleMore.bind(_assertThisInitialized(_this));
    _this.state = {
      expandMore: props.expandMore,
      moreButton: _this.moreButton && _this.moreButton.current
    };
    return _this;
  }
  _createClass(ActiveCallPad, [{
    key: "onClick",
    value: function onClick(e) {
      if (this.dropdown && this.dropdown.current) {
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
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.body.addEventListener('click', this.onClick);
      this.setState({
        moreButton: this.moreButton && this.moreButton.current
      });
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps() {
      this.setState({
        moreButton: this.moreButton && this.moreButton.current
      });
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this.onClick);
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (val !== this.props[p] && typeof val !== 'function') {
            showUpdate = true;
            break;
          }
        }
      }
      return showUpdate;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        controlBusy = _this$props.controlBusy,
        actions = _this$props.actions,
        currentLocale = _this$props.currentLocale,
        isOnWaitingTransfer = _this$props.isOnWaitingTransfer,
        onHangup = _this$props.onHangup,
        onCompleteTransfer = _this$props.onCompleteTransfer,
        conferenceCallEquipped = _this$props.conferenceCallEquipped,
        isOnMute = _this$props.isOnMute,
        isOnHold = _this$props.isOnHold,
        onUnmute = _this$props.onUnmute,
        onMute = _this$props.onMute,
        onShowKeyPad = _this$props.onShowKeyPad,
        layout = _this$props.layout,
        onUnhold = _this$props.onUnhold,
        onHold = _this$props.onHold,
        hasConferenceCall = _this$props.hasConferenceCall,
        mergeDisabled = _this$props.mergeDisabled,
        onMerge = _this$props.onMerge,
        addDisabled = _this$props.addDisabled,
        onAdd = _this$props.onAdd,
        recordStatus = _this$props.recordStatus,
        onStopRecord = _this$props.onStopRecord,
        onRecord = _this$props.onRecord,
        onTransfer = _this$props.onTransfer,
        disableFlip = _this$props.disableFlip,
        onFlip = _this$props.onFlip,
        showPark = _this$props.showPark,
        onPark = _this$props.onPark,
        className = _this$props.className,
        isOnTransfer = _this$props.isOnTransfer;
      var buttons = [];
      /* --------------------- Mute/Unmute --------------------------- */
      buttons.push(isOnMute ? {
        icon: _Mute["default"],
        id: ACTIONS_CTRL_MAP.muteCtrl,
        dataSign: 'mute',
        title: _i18n["default"].getString('unmute', currentLocale),
        disabled: isOnHold || controlBusy,
        onClick: onUnmute
      } : {
        icon: _Unmute["default"],
        id: ACTIONS_CTRL_MAP.muteCtrl,
        dataSign: 'unmute',
        title: _i18n["default"].getString('mute', currentLocale),
        disabled: isOnHold || controlBusy,
        onClick: onMute
      });
      /* --------------------- keyPad --------------------------- */
      buttons.push({
        icon: _Dialpad["default"],
        id: ACTIONS_CTRL_MAP.keypadCtrl,
        dataSign: 'keypad',
        title: _i18n["default"].getString('keypad', currentLocale),
        onClick: onShowKeyPad,
        disabled: layout === _callCtrlLayouts["default"].conferenceCtrl
      });
      /* --------------------- Hold/Unhold --------------------------- */
      buttons.push({
        icon: _Hold["default"],
        id: ACTIONS_CTRL_MAP.holdCtrl,
        iconWidth: 120,
        iconHeight: 160,
        iconX: 190,
        iconY: 165,
        dataSign: isOnHold ? 'onHold' : 'hold',
        title: isOnHold ? _i18n["default"].getString('onHold', currentLocale) : _i18n["default"].getString('hold', currentLocale),
        active: isOnHold,
        onClick: isOnHold ? onUnhold : onHold,
        disabled: controlBusy
      });
      if (isOnWaitingTransfer) {
        buttons.push({
          icon: _Transfer["default"],
          id: ACTIONS_CTRL_MAP.completeTransferCtrl,
          dataSign: 'completeTransfer',
          title: _i18n["default"].getString('completeTransfer', currentLocale),
          disabled: isOnTransfer || controlBusy,
          onClick: onCompleteTransfer,
          showRipple: true
        });
      }
      /* --------------------- Add/Merge --------------------------- */
      if (!isOnWaitingTransfer && conferenceCallEquipped) {
        var showMerge = layout === _callCtrlLayouts["default"].mergeCtrl || layout === _callCtrlLayouts["default"].normalCtrl && hasConferenceCall;
        buttons.push(showMerge ? {
          icon: _MergeIntoConferenceIcon["default"],
          id: ACTIONS_CTRL_MAP.mergeOrAddCtrl,
          dataSign: 'merge',
          title: _i18n["default"].getString('mergeToConference', currentLocale),
          disabled: mergeDisabled || controlBusy,
          onClick: onMerge,
          showRipple: !mergeDisabled
        } : {
          icon: _Combine["default"],
          id: ACTIONS_CTRL_MAP.mergeOrAddCtrl,
          dataSign: 'add',
          title: _i18n["default"].getString('add', currentLocale),
          disabled: addDisabled || controlBusy,
          onClick: onAdd
        });
      }
      /* --------------------- Record/Stop --------------------------- */
      buttons.push({
        icon: _Record["default"],
        id: ACTIONS_CTRL_MAP.recordCtrl,
        dataSign: recordStatus === _recordStatus.recordStatus.recording ? 'stopRecord' : 'record',
        title: recordStatus === _recordStatus.recordStatus.recording ? _i18n["default"].getString('stopRecord', currentLocale) : _i18n["default"].getString('record', currentLocale),
        active: recordStatus === _recordStatus.recordStatus.recording,
        disabled: isOnHold || recordStatus === _recordStatus.recordStatus.pending || layout === _callCtrlLayouts["default"].mergeCtrl || recordStatus === _recordStatus.recordStatus.noAccess || controlBusy,
        onClick: recordStatus === _recordStatus.recordStatus.recording ? onStopRecord : onRecord
      });
      /* --------------------- Transfer --------------------------- */
      var disabledTransfer = layout !== _callCtrlLayouts["default"].normalCtrl;
      if (!isOnWaitingTransfer) {
        buttons.push({
          icon: _Transfer["default"],
          id: ACTIONS_CTRL_MAP.transferCtrl,
          dataSign: 'transfer',
          title: _i18n["default"].getString('transfer', currentLocale),
          disabled: disabledTransfer || controlBusy,
          onClick: onTransfer
        });
      }
      /* --------------------- Flip --------------------------- */
      var disableControlButton = isOnHold || layout !== _callCtrlLayouts["default"].normalCtrl;
      var disabledFlip = disableFlip || disableControlButton;
      buttons.push({
        icon: _Flip["default"],
        id: ACTIONS_CTRL_MAP.flipCtrl,
        dataSign: 'flip',
        title: _i18n["default"].getString('flip', currentLocale),
        disabled: disabledFlip || controlBusy,
        onClick: onFlip
      });
      /* --------------------- Park --------------------------- */
      if (showPark) {
        buttons.push({
          icon: _Park["default"],
          id: ACTIONS_CTRL_MAP.parkCtrl,
          dataSign: 'park',
          title: _i18n["default"].getString('park', currentLocale),
          disabled: disableControlButton || controlBusy,
          onClick: onPark
        });
      }
      // filter actions
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (actions.length > 0) {
        // @ts-expect-error TS(2345): Argument of type 'any[] | undefined' is not assign... Remove this comment to see the full error message
        buttons = (0, _utils.pickElements)(actions, buttons);
      }
      /* --------------------- More Actions --------------------------- */
      var moreActions = null;
      if (buttons.length > DisplayButtonNumber) {
        var disableMoreButton = isOnWaitingTransfer || disabledFlip && disabledTransfer || controlBusy;
        moreActions = /*#__PURE__*/_react["default"].createElement("span", {
          className: _styles["default"].moreButtonContainer,
          ref: this.moreButton
        }, /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
          onClick: this.toggleMore,
          title: _i18n["default"].getString('more', currentLocale),
          active: this.state.expandMore,
          className: (0, _clsx["default"])(_styles["default"].moreButton, _styles["default"].callButton),
          disabled: disableMoreButton,
          icon: _MoreIcon["default"],
          dataSign: "callActions"
        }), /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
          fixed: false,
          open: this.state.expandMore,
          direction: "top",
          ref: this.dropdown,
          triggerElm: this.state.moreButton
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].buttonPopup
        }, buttons.slice(DisplayButtonNumber - 1).map(function (_ref) {
          var id = _ref.id,
            opts = _objectWithoutProperties(_ref, ["id"]);
          return (
            /*#__PURE__*/
            // @ts-expect-error TS(2322): Type '{ icon: any; iconWidth: number; iconHeight: ... Remove this comment to see the full error message
            _react["default"].createElement(_MoreActionItem["default"], _extends({
              key: id
            }, opts))
          );
        }))));
      }
      var isLessBtn = buttons.length <= 3 && moreActions === null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].callCtrlButtonGroup, isLessBtn && _styles["default"].biggerButton)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonRow
      }, buttons.slice(0, DisplayButtonNumber - (moreActions ? 1 : 0)).map(function (opts) {
        return /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], _extends({
          key: opts.title,
          className: _styles["default"].callButton
        }, opts));
      }), moreActions)), /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].buttonRow, _styles["default"].stopButtonGroup)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].button
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        className: (0, _clsx["default"])(_styles["default"].stopButton, controlBusy && _styles["default"].disabled),
        onClick: onHangup,
        icon: _End["default"],
        showBorder: false,
        iconWidth: 250,
        iconX: 125,
        dataSign: "hangup",
        disabled: controlBusy
      }))));
    }
  }]);
  return ActiveCallPad;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ActiveCallPad.defaultProps = {
  className: null,
  isOnMute: false,
  isOnHold: false,
  layout: _callCtrlLayouts["default"].normalCtrl,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  onAdd: undefined,
  onMerge: undefined,
  expandMore: false,
  disableFlip: false,
  showPark: false,
  actions: [],
  isOnTransfer: false,
  isOnWaitingTransfer: false,
  controlBusy: false
};
var _default = ActiveCallPad;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
