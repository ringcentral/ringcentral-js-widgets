"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SpinnerOverlay = _interopRequireDefault(require("../../components/SpinnerOverlay"));

var _BackHeader = _interopRequireDefault(require("../../components/BackHeader"));

var _Panel = _interopRequireDefault(require("../../components/Panel"));

var _ContactDetails = _interopRequireWildcard(require("../ContactDetails"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ContactDetailsView =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ContactDetailsView, _PureComponent);

  function ContactDetailsView() {
    _classCallCheck(this, ContactDetailsView);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContactDetailsView).apply(this, arguments));
  }

  _createClass(ContactDetailsView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.getContact();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.contactItem && nextProps.contactItem || nextProps.contactItem && nextProps.contactItem.id !== this.props.contactItem.id) {
        this.props.getPresence(nextProps.contactItem);
        this.props.getAvatar(nextProps.contactItem);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.clearContact();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          currentLocale = _this$props.currentLocale,
          showSpinner = _this$props.showSpinner,
          contactItem = _this$props.contactItem,
          onBackClick = _this$props.onBackClick,
          onClickToSMS = _this$props.onClickToSMS,
          onClickToDial = _this$props.onClickToDial,
          disableLinks = _this$props.disableLinks,
          disableCallButton = _this$props.disableCallButton,
          onClickMailTo = _this$props.onClickMailTo,
          formatNumber = _this$props.formatNumber,
          sourceNodeRenderer = _this$props.sourceNodeRenderer,
          outboundSmsPermission = _this$props.outboundSmsPermission,
          internalSmsPermission = _this$props.internalSmsPermission,
          children = _this$props.children;
      if (!contactItem) return null;
      var content = showSpinner ? _react["default"].createElement(_SpinnerOverlay["default"], null) : _react["default"].createElement(_ContactDetails["default"], {
        currentLocale: currentLocale,
        contactItem: contactItem,
        onClickToSMS: onClickToSMS,
        onClickToDial: onClickToDial,
        disableLinks: disableLinks,
        disableCallButton: disableCallButton,
        onClickMailTo: onClickMailTo,
        formatNumber: formatNumber,
        sourceNodeRenderer: sourceNodeRenderer,
        outboundSmsPermission: outboundSmsPermission,
        internalSmsPermission: internalSmsPermission
      });
      return _react["default"].createElement("div", {
        className: _styles["default"].root
      }, _react["default"].createElement(_BackHeader["default"], {
        buttons: [],
        onBackClick: onBackClick,
        className: _styles["default"].header
      }, _i18n["default"].getString('contactDetails', currentLocale)), _react["default"].createElement(_Panel["default"], {
        className: _styles["default"].content
      }, content, children));
    }
  }]);

  return ContactDetailsView;
}(_react.PureComponent);

exports["default"] = ContactDetailsView;
ContactDetailsView.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  showSpinner: _propTypes["default"].bool.isRequired,
  contactItem: _propTypes["default"].shape(_ContactDetails.contactItemPropTypes),
  getContact: _propTypes["default"].func.isRequired,
  clearContact: _propTypes["default"].func.isRequired,
  getAvatar: _propTypes["default"].func.isRequired,
  getPresence: _propTypes["default"].func.isRequired,
  onBackClick: _propTypes["default"].func,
  onClickToSMS: _propTypes["default"].func,
  onClickToDial: _propTypes["default"].func,
  onClickMailTo: _propTypes["default"].func,
  formatNumber: _propTypes["default"].func.isRequired,
  sourceNodeRenderer: _propTypes["default"].func,
  children: _propTypes["default"].node,
  outboundSmsPermission: _propTypes["default"].bool,
  internalSmsPermission: _propTypes["default"].bool,
  disableLinks: _propTypes["default"].bool,
  disableCallButton: _propTypes["default"].bool
};
ContactDetailsView.defaultProps = {
  onBackClick: undefined,
  onClickToSMS: undefined,
  onClickToDial: undefined,
  children: undefined,
  contactItem: undefined,
  onClickMailTo: undefined,
  sourceNodeRenderer: function sourceNodeRenderer() {
    return null;
  },
  outboundSmsPermission: false,
  internalSmsPermission: false,
  disableLinks: false,
  disableCallButton: false
};
//# sourceMappingURL=index.js.map
