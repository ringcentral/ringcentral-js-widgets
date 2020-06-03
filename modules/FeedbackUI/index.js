"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

var _di = require("ringcentral-integration/lib/di");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var FeedbackUI = (_dec = (0, _di.Module)({
  name: 'FeedbackUI',
  deps: ['RouterInteraction', 'Feedback', 'Locale', 'Brand']
}), _dec(_class = /*#__PURE__*/function (_RcUIModule) {
  _inherits(FeedbackUI, _RcUIModule);

  var _super = _createSuper(FeedbackUI);

  function FeedbackUI() {
    _classCallCheck(this, FeedbackUI);

    return _super.apply(this, arguments);
  }

  _createClass(FeedbackUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _ref$phone = _ref.phone,
          locale = _ref$phone.locale,
          feedback = _ref$phone.feedback,
          brand = _ref$phone.brand;
      return {
        brandName: brand.name,
        currentLocale: locale.currentLocale,
        email: feedback.email,
        topic: feedback.topic,
        subject: feedback.subject,
        description: feedback.description
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _ref2$phone = _ref2.phone,
          feedback = _ref2$phone.feedback,
          routerInteraction = _ref2$phone.routerInteraction,
          _sendFeedback = _ref2.sendFeedback;
      return {
        onBackClick: function onBackClick() {
          routerInteraction.goBack();
        },
        onEmailChange: function onEmailChange(value) {
          feedback.updateEmail(value);
        },
        onTopicChange: function onTopicChange(value) {
          feedback.updateTopic(value);
        },
        onSubjectChange: function onSubjectChange(value) {
          feedback.updateSubject(value);
        },
        onDescriptionChange: function onDescriptionChange(value) {
          feedback.updateDescription(value);
        },
        onRevertClick: function onRevertClick() {
          feedback.clean();
        },
        sendFeedback: function sendFeedback(mailToUrl) {
          if (_sendFeedback) {
            _sendFeedback(mailToUrl);

            return;
          }

          feedback.sendFeedback(mailToUrl);
        }
      };
    }
  }]);

  return FeedbackUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = FeedbackUI;
//# sourceMappingURL=index.js.map
