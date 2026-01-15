"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.parse-int.js");
var _debounce = _interopRequireDefault(require("@ringcentral-integration/commons/lib/debounce"));
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _CallAvatar = require("../CallAvatar");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var MAXIMUM_AVATARS = 4;
var WIDTH_PER_AVATAR = parseInt(_styles["default"].conferenceAvatarSize, 10); // 51
var AVATAR_MERGIN_LEFT = parseInt(_styles["default"].avatarMerginLeftSize, 10); // -20
var PEDDING_WIDTH = parseInt(_styles["default"].avatarPaddingSize, 10); // 15
var minWidthCalculator = function minWidthCalculator(count) {
  return WIDTH_PER_AVATAR * count + AVATAR_MERGIN_LEFT * (count - 1) + PEDDING_WIDTH * 2 + 1 + 2;
};
// when the container width reachs below item of width, display the avatar amount of count.
var KINDS_OF_WIDTH_THAT_NEED_ADAPATER = [{
  avartarCount: 0,
  width: minWidthCalculator(1)
}, {
  avartarCount: 1,
  width: minWidthCalculator(3)
}, {
  avartarCount: 2,
  width: minWidthCalculator(MAXIMUM_AVATARS)
}, {
  avartarCount: 3,
  width: minWidthCalculator(MAXIMUM_AVATARS + 1)
}];
var ConferenceInfo = /*#__PURE__*/function (_Component) {
  function ConferenceInfo(props) {
    var _this;
    _classCallCheck(this, ConferenceInfo);
    _this = _callSuper(this, ConferenceInfo, [props]);
    _this._container = void 0;
    _this._mounted = void 0;
    _this.onWindowResize = (0, _debounce["default"])(function () {
      _this.updateAvatarAmounts(_this.props);
    }, 100);
    _this.state = {
      avatarCount: MAXIMUM_AVATARS
    };
    _this._container = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  _inherits(ConferenceInfo, _Component);
  return _createClass(ConferenceInfo, [{
    key: "_computeAvatarCountByWindowWidth",
    value: function _computeAvatarCountByWindowWidth(props) {
      var partyProfiles = props.partyProfiles;
      var avatarProfilesCount = partyProfiles && partyProfiles.length || 0;
      if (!this._mounted) {
        if (avatarProfilesCount >= MAXIMUM_AVATARS) {
          return MAXIMUM_AVATARS;
        }
        return avatarProfilesCount;
      }
      var width = this._container && this._container.current && this._container.current.clientWidth;
      var avatarCount = avatarProfilesCount;
      var firstMatchWidth = KINDS_OF_WIDTH_THAT_NEED_ADAPATER.find(function (it) {
        return width < it.width;
      });
      if (firstMatchWidth) {
        avatarCount = firstMatchWidth.avartarCount;
        if (avatarCount + 1 === avatarProfilesCount) {
          avatarCount = avatarProfilesCount;
        }
      } else if (avatarCount >= MAXIMUM_AVATARS) {
        avatarCount = MAXIMUM_AVATARS;
      }
      return avatarCount;
    }
  }, {
    key: "updateAvatarAmounts",
    value: function updateAvatarAmounts(props) {
      if (!this._mounted) {
        return;
      }
      var avatarCount = this._computeAvatarCountByWindowWidth(props);
      if (avatarCount !== this.state.avatarCount) {
        this.setState({
          avatarCount: avatarCount
        });
      }
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this.updateAvatarAmounts(nextProps);
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
      window.addEventListener('resize', this.onWindowResize);
      this.updateAvatarAmounts(this.props);
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      window.removeEventListener('resize', this.onWindowResize);
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var partyProfiles = nextProps.partyProfiles;
      var oldpartyProfiles = this.props.partyProfiles;
      var showUpdate = true;
      if (partyProfiles !== oldpartyProfiles) {
        if (Array.isArray(partyProfiles) && Array.isArray(oldpartyProfiles) && partyProfiles.length === oldpartyProfiles.length) {
          showUpdate = false;
          for (var i = 0; i < partyProfiles.length; i += 1) {
            // @ts-expect-error TS(2339): Property 'id' does not exist on type '{ avatarUrl?... Remove this comment to see the full error message
            if (partyProfiles[i].id !== oldpartyProfiles[i].id) {
              showUpdate = true;
              break;
            }
          }
        }
      } else if (nextState.avatarCount !== this.state.avatarCount) {
        showUpdate = true;
      } else {
        showUpdate = false;
      }
      return showUpdate;
    }
  }, {
    key: "computeDisplayedProfiles",
    value: function computeDisplayedProfiles(_ref) {
      var profiles = _ref.profiles,
        avatarCount = _ref.avatarCount;
      var displayedProfiles = profiles.length >= avatarCount ? profiles.slice(0, avatarCount) : profiles;
      var remains = profiles.length - avatarCount;
      return {
        displayedProfiles: displayedProfiles,
        remains: remains
      };
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        currentLocale = _this$props.currentLocale,
        partyProfiles = _this$props.partyProfiles,
        _onClick = _this$props.onClick;
      var profiles = partyProfiles || [];
      var avatarCount = this.state.avatarCount;
      var _this$computeDisplaye = this.computeDisplayedProfiles({
          profiles: profiles,
          avatarCount: avatarCount
        }),
        displayedProfiles = _this$computeDisplaye.displayedProfiles,
        remains = _this$computeDisplaye.remains;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].conferenceCallInfoContainer,
        ref: this._container
      }, displayedProfiles.length || avatarCount === 0 && remains > 0 ? /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "conferenceInfo",
        className: (0, _clsx["default"])(_styles["default"].avatarContainer, _styles["default"].clickable),
        onClick: function onClick(e) {
          e.preventDefault();
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          _onClick();
        }
      }, displayedProfiles.map(function (_ref2, idx) {
        var avatarUrl = _ref2.avatarUrl,
          partyName = _ref2.partyName;
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: "".concat(partyName, "_").concat(idx),
          className: _styles["default"].avatar
        }, /*#__PURE__*/_react["default"].createElement(_CallAvatar.CallAvatar, {
          avatarUrl: avatarUrl
        }));
      }), remains > 0 ? /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].avatar, _styles["default"].remains)
      }, "+".concat(remains)) : null) : /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].avatarContainer
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].avatar,
        style: {
          backgroundColor: '#fff'
        }
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: (0, _clsx["default"])(_DynamicsFont["default"].portrait, _styles["default"].icon)
      }))), /*#__PURE__*/_react["default"].createElement("p", {
        className: _styles["default"].info,
        "data-sign": "conferenceCall"
      }, _i18n["default"].getString('conferenceCall', currentLocale)));
    }
  }]);
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ConferenceInfo.defaultProps = {
  partyProfiles: null,
  onClick: function onClick(i) {
    return i;
  }
};
var _default = exports["default"] = ConferenceInfo;
//# sourceMappingURL=ConferenceInfo.js.map
