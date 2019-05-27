"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

var _di = require("../../lib/di");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _getFeedbackReducer = _interopRequireDefault(require("./getFeedbackReducer"));

var _getCacheReducer = _interopRequireDefault(require("./getCacheReducer"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var Feedback = (
/**
 * @class
 * @description user feedback module
 */
_dec = (0, _di.Module)({
  deps: ['Auth', 'Storage']
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(Feedback, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Storage} params.storage - storage module instance
   */
  function Feedback(_ref) {
    var _this;

    var auth = _ref.auth,
        storage = _ref.storage,
        options = _objectWithoutProperties(_ref, ["auth", "storage"]);

    _classCallCheck(this, Feedback);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Feedback).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));
    _this._auth = auth;
    _this._storageKey = 'feedback';
    _this._storage = storage;
    _this._reducer = (0, _getFeedbackReducer["default"])(_this.actionTypes);
    _this._cacheReducer = (0, _getCacheReducer["default"])(_this.actionTypes);

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: _this._cacheReducer
    });

    return _this;
  }

  _createClass(Feedback, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this._auth.ready && this._storage.ready && !this.ready) {
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if ((!this._auth.ready || !this._storage.ready) && this.ready) {
        this.store.dispatch({
          type: this.actionTypes.resetSuccess
        });
      }
    }
  }, {
    key: "updateEmail",
    value: function updateEmail(email) {
      this.store.dispatch({
        type: this.actionTypes.updateEmail,
        value: email
      });
    }
  }, {
    key: "updateTopic",
    value: function updateTopic(topic) {
      this.store.dispatch({
        type: this.actionTypes.updateTopic,
        value: topic
      });
    }
  }, {
    key: "updateSubject",
    value: function updateSubject(subjectText) {
      this.store.dispatch({
        type: this.actionTypes.updateSubject,
        value: subjectText
      });
    }
  }, {
    key: "updateDescription",
    value: function updateDescription(descriptionText) {
      this.store.dispatch({
        type: this.actionTypes.updateDescription,
        value: descriptionText
      });
    }
  }, {
    key: "clean",
    value: function clean() {
      this.store.dispatch({
        type: this.actionTypes.clean
      });
    }
  }, {
    key: "sendFeedback",
    value: function sendFeedback(mailToUrl) {
      window.location.href = mailToUrl;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "data",
    get: function get() {
      return this._storage.getItem(this._storageKey);
    }
  }, {
    key: "email",
    get: function get() {
      return this.data.email;
    }
  }, {
    key: "topic",
    get: function get() {
      return this.data.topic;
    }
  }, {
    key: "subject",
    get: function get() {
      return this.data.subject;
    }
  }, {
    key: "description",
    get: function get() {
      return this.data.description;
    }
  }]);

  return Feedback;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "updateEmail", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateEmail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTopic", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTopic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSubject", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSubject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateDescription", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateDescription"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clean", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendFeedback", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "sendFeedback"), _class2.prototype)), _class2)) || _class);
exports["default"] = Feedback;
//# sourceMappingURL=index.js.map
