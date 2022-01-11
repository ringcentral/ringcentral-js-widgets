"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ACTIONS_CTRL_MAP = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _is_type = require("@ringcentral-integration/commons/lib/di/utils/is_type");

var _recordStatus = require("@ringcentral-integration/commons/modules/Webphone/recordStatus");

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

var _i18n = _interopRequireDefault(require("./i18n"));

var _MoreActionItem = _interopRequireDefault(require("./MoreActionItem"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
      } // filter actions


      if (actions.length > 0) {
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
          className: (0, _classnames["default"])(_styles["default"].moreButton, _styles["default"].callButton),
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

          return /*#__PURE__*/_react["default"].createElement(_MoreActionItem["default"], _extends({
            key: id
          }, opts));
        }))));
      }

      var isLessBtn = buttons.length <= 3 && moreActions === null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].callCtrlButtonGroup, isLessBtn && _styles["default"].biggerButton)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonRow
      }, buttons.slice(0, DisplayButtonNumber - (moreActions ? 1 : 0)).map(function (opts) {
        return /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], _extends({
          key: opts.title,
          className: _styles["default"].callButton
        }, opts));
      }), moreActions)), /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].buttonRow, _styles["default"].stopButtonGroup)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].button
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        className: (0, _classnames["default"])(_styles["default"].stopButton, controlBusy && _styles["default"].disabled),
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
}(_react.Component);

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
