"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _sessionStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/sessionStatus"));

var _ActiveCallBadge = _interopRequireDefault(require("../ActiveCallBadge"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CallBadge = /*#__PURE__*/function (_Component) {
  _inherits(CallBadge, _Component);

  var _super = _createSuper(CallBadge);

  function CallBadge(props) {
    var _this;

    _classCallCheck(this, CallBadge);

    _this = _super.call(this, props);

    _this.updatePositionOffset = function (x, y) {
      _this.setState({
        badgeOffsetX: x,
        badgeOffsetY: y
      });
    };

    _this.onClick = function () {
      var isRinging = _this._isRinging();

      var _this$props = _this.props,
          session = _this$props.session,
          toggleMinimized = _this$props.toggleMinimized,
          goToCallCtrl = _this$props.goToCallCtrl;

      if (isRinging) {
        toggleMinimized(session.id);
        return;
      }

      goToCallCtrl(session.id);
    };

    _this.state = {
      badgeOffsetX: props.defaultOffsetX || 0,
      badgeOffsetY: props.defaultOffsetY || 0
    };
    return _this;
  }

  _createClass(CallBadge, [{
    key: "_isRinging",
    value: function _isRinging() {
      var isRinging = false;
      var session = this.props.session;

      if (session.direction === _callDirections["default"].inbound && session.callStatus === _sessionStatus["default"].connecting) {
        isRinging = true;
      }

      return isRinging;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          session = _this$props2.session,
          hidden = _this$props2.hidden,
          currentLocale = _this$props2.currentLocale;
      var _this$state = this.state,
          badgeOffsetX = _this$state.badgeOffsetX,
          badgeOffsetY = _this$state.badgeOffsetY;
      var active = !!session.id;

      if (!active) {
        return null;
      }

      var isRinging = this._isRinging();

      if (isRinging && !session.minimized) {
        return null;
      }

      if (hidden) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement(_ActiveCallBadge["default"], {
        onClick: this.onClick,
        offsetX: badgeOffsetX,
        offsetY: badgeOffsetY,
        updatePositionOffset: this.updatePositionOffset,
        title: _i18n["default"].getString('activeCall', currentLocale)
      });
    }
  }]);

  return CallBadge;
}(_react.Component);

exports["default"] = CallBadge;
//# sourceMappingURL=index.js.map
