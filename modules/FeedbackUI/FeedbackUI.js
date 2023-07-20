"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackUI = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _dec, _class;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var FeedbackUI = (_dec = (0, _di.Module)({
  name: 'FeedbackUI',
  deps: ['RouterInteraction', 'Feedback', 'Locale', 'Brand']
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(FeedbackUI, _RcUIModuleV);
  var _super = _createSuper(FeedbackUI);
  function FeedbackUI(deps) {
    _classCallCheck(this, FeedbackUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(FeedbackUI, [{
    key: "getUIProps",
    value: function getUIProps() {
      return {
        brandName: this._deps.brand.name,
        currentLocale: this._deps.locale.currentLocale,
        email: this._deps.feedback.email,
        topic: this._deps.feedback.topic,
        subject: this._deps.feedback.subject,
        description: this._deps.feedback.description
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref) {
      var _this = this;
      var _sendFeedback = _ref.sendFeedback;
      return {
        onBackClick: function onBackClick() {
          _this._deps.routerInteraction.goBack();
        },
        onEmailChange: function onEmailChange(value) {
          _this._deps.feedback.updateEmail(value);
        },
        onTopicChange: function onTopicChange(value) {
          _this._deps.feedback.updateTopic(value);
        },
        onSubjectChange: function onSubjectChange(value) {
          _this._deps.feedback.updateSubject(value);
        },
        onDescriptionChange: function onDescriptionChange(value) {
          _this._deps.feedback.updateDescription(value);
        },
        onRevertClick: function onRevertClick() {
          _this._deps.feedback.clean();
        },
        sendFeedback: function sendFeedback(mailToUrl) {
          if (_sendFeedback) {
            _sendFeedback(mailToUrl);
            return;
          }
          _this._deps.feedback.sendFeedback(mailToUrl);
        }
      };
    }
  }]);
  return FeedbackUI;
}(_core.RcUIModuleV2)) || _class);
exports.FeedbackUI = FeedbackUI;
//# sourceMappingURL=FeedbackUI.js.map
