"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _calleeTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/calleeTypes"));
var _react = _interopRequireWildcard(require("react"));
var _BackButton = _interopRequireDefault(require("../BackButton"));
var _BackHeader = _interopRequireDefault(require("../BackHeader"));
var _ConfirmRemoveModal = _interopRequireDefault(require("./ConfirmRemoveModal"));
var _ParticipantItem = _interopRequireDefault(require("./ParticipantItem"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var ParticipantsContainer = /*#__PURE__*/function (_Component) {
  _inherits(ParticipantsContainer, _Component);
  var _super = _createSuper(ParticipantsContainer);
  function ParticipantsContainer(props) {
    var _this;
    _classCallCheck(this, ParticipantsContainer);
    _this = _super.call(this, props);
    _this.state = {
      showModal: false,
      detail: null
    };
    _this.formatPrticipants(props);
    _this.onRemoveBtnClick = _this.onRemoveBtnClick.bind(_assertThisInitialized(_this));
    _this.onCancel = _this.onCancel.bind(_assertThisInitialized(_this));
    _this.onCancelNoAfter = _this.onCancelNoAfter.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(ParticipantsContainer, [{
    key: "formatPrticipants",
    value: function formatPrticipants() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var participants = props.participants,
        formatPhone = props.formatPhone;
      participants.forEach(function (participant) {
        // @ts-expect-error TS(2339): Property 'partyNumber' does not exist on type 'obj... Remove this comment to see the full error message
        participant.partyNumber = formatPhone(participant.partyNumber);
      });
    }
  }, {
    key: "onRemoveBtnClick",
    value: function onRemoveBtnClick(participant) {
      this.setState(function () {
        return {
          detail: participant,
          showModal: true
        };
      });
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      this.props.afterOnRemoveBtnClick();
    }
  }, {
    key: "onCancel",
    value: function onCancel() {
      this.onCancelNoAfter();
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      this.props.afterOnCancel();
    } // onCancel without track
  }, {
    key: "onCancelNoAfter",
    value: function onCancelNoAfter() {
      this.setState({
        showModal: false,
        detail: null
      });
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this2 = this;
      this.formatPrticipants(nextProps);
      if (this.state.showModal && !nextProps.participants.find(
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      function (participant) {
        return participant.id === _this2.state.detail.id;
      })) {
        this.onCancelNoAfter();
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props = this.props,
        showCallerIdName = _this$props.showCallerIdName,
        participants = _this$props.participants,
        currentLocale = _this$props.currentLocale,
        removeFunc = _this$props.removeFunc,
        onBackButtonClick = _this$props.onBackButtonClick;
      var _this$state = this.state,
        detail = _this$state.detail,
        showModal = _this$state.showModal;
      var backHeader = /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
        className: _styles["default"].header,
        onBackClick: onBackButtonClick,
        backButton: /*#__PURE__*/_react["default"].createElement(_BackButton["default"], {
          label: _i18n["default"].getString('conferenceCall', currentLocale)
        })
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root
      }, backHeader, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].participantsListContainer
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].participantsCount
      }, participants.length === 1 ? "".concat(participants.length, " ").concat(_i18n["default"].getString('participant', currentLocale)) : "".concat(participants.length, " ").concat(_i18n["default"].getString('participants', currentLocale))), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].participantsList,
        "data-sign": "participantsList"
      }, participants.map(function (participant) {
        // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
        var id = participant.id,
          avatarUrl = participant.avatarUrl,
          partyName = participant.partyName,
          partyNumber = participant.partyNumber,
          calleeType = participant.calleeType;
        var displayText = partyNumber || _i18n["default"].getString('unknownNumber', currentLocale);
        if (partyName && calleeType === _calleeTypes["default"].contacts) {
          // means that matched a contact
          displayText = partyName;
        }
        if (partyName && calleeType === _calleeTypes["default"].unknown && showCallerIdName) {
          // means outside company call, show caller id name
          displayText = partyName;
        }
        return /*#__PURE__*/_react["default"].createElement(_ParticipantItem["default"], {
          key: id,
          avatarUrl: avatarUrl,
          detail: displayText,
          currentLocale: currentLocale,
          onRemove: function onRemove() {
            return _this3.onRemoveBtnClick(participant);
          }
        });
      }))), /*#__PURE__*/_react["default"].createElement(_ConfirmRemoveModal["default"], {
        show: showModal
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'object | un... Remove this comment to see the full error message
        ,
        detail: detail,
        showCallerIdName: showCallerIdName,
        onCancel: this.onCancel,
        currentLocale: currentLocale,
        onRemove: function onRemove() {
          return (
            // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
            removeFunc(detail && detail.id).then(_this3.onCancelNoAfter)
          );
        }
      }));
    }
  }]);
  return ParticipantsContainer;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ParticipantsContainer.defaultProps = {
  removeFunc: function removeFunc(i) {
    return i;
  },
  onBackButtonClick: function onBackButtonClick(i) {
    return i;
  },
  formatPhone: function formatPhone(i) {
    return i;
  },
  afterOnCancel: function afterOnCancel(i) {
    return i;
  },
  afterOnRemoveBtnClick: function afterOnRemoveBtnClick(i) {
    return i;
  }
};
var _default = ParticipantsContainer;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
