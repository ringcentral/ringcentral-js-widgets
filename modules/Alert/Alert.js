"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.date.now");

var uuid = _interopRequireWildcard(require("uuid"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _alertLevels = _interopRequireDefault(require("./alertLevels"));

var _getAlertReducer = _interopRequireDefault(require("./getAlertReducer"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var Alert = (
/**
 * @class
 * @description Alert messages managing module.
 */
_dec = (0, _di.Module)({
  deps: [{
    dep: 'AlertOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(Alert, _RcModule);

  var _super = _createSuper(Alert);

  // TODO: add state interface

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Number} params.ttl - Default time-to-live for alert messages.
   * @param {React.ReactNode} params.action - action template(right area) with new notification
   */
  function Alert(_ref) {
    var _this;

    var _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? 5000 : _ref$ttl,
        alertOptions = _ref.alertOptions,
        options = _objectWithoutProperties(_ref, ["ttl", "alertOptions"]);

    _classCallCheck(this, Alert);

    _this = _super.call(this, _objectSpread({
      alertOptions: alertOptions
    }, options));
    _this._ttl = void 0;
    _this._action = void 0;

    _this._autoDismiss = function () {
      var now = Date.now();

      var ids = _this.state.messages.filter(function (item) {
        return item.ttl > 0 && now - item.timestamp > item.ttl;
      }).map(function (item) {
        return item.id;
      });

      if (ids.length) {
        _this.dismiss(ids);
      }
    };

    _this._reducer = (0, _getAlertReducer["default"])(_this.actionTypes);
    _this._ttl = ttl;
    _this._action = alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.action;
    return _this;
  }

  _createClass(Alert, [{
    key: "_onStateChange",
    value: function _onStateChange() {
      /* do nothing */
    } // this module has no dependency, and is always ready
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "alert",

    /**
     * @function
     * @description Add alert message to the state.
     * @param {String} options.message
     * @param {Any} options.payload
     * @param {alertLevels} options.level
     * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
     */
    value: function alert(_ref2) {
      var message = _ref2.message,
          payload = _ref2.payload,
          _ref2$level = _ref2.level,
          level = _ref2$level === void 0 ? _alertLevels["default"].info : _ref2$level,
          _ref2$ttl = _ref2.ttl,
          ttl = _ref2$ttl === void 0 ? this._ttl : _ref2$ttl,
          _ref2$allowDuplicates = _ref2.allowDuplicates,
          allowDuplicates = _ref2$allowDuplicates === void 0 ? true : _ref2$allowDuplicates,
          _ref2$loading = _ref2.loading,
          loading = _ref2$loading === void 0 ? false : _ref2$loading,
          _ref2$backdrop = _ref2.backdrop,
          backdrop = _ref2$backdrop === void 0 ? false : _ref2$backdrop,
          classes = _ref2.classes,
          onBackdropClick = _ref2.onBackdropClick,
          _ref2$action = _ref2.action,
          action = _ref2$action === void 0 ? this._action : _ref2$action;
      var id = uuid.v4();
      this.store.dispatch({
        type: this.actionTypes.alert,
        message: message,
        payload: payload,
        level: level,
        // when loading the ttl will be zero, make this never dismiss
        ttl: loading ? 0 : ttl,
        allowDuplicates: allowDuplicates,
        backdrop: backdrop,
        classes: classes,
        onBackdropClick: onBackdropClick,
        id: id,
        timestamp: Date.now(),
        loading: loading,
        action: action
      });

      if (ttl > 0) {
        setTimeout(this._autoDismiss, ttl + 10);
      }

      return id;
    }
    /**
     * @function
     * @description Add alert message of alertLevel "danger" to the state.
     * @param {String} options.message
     * @param {Any} options.payload
     * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
     */

  }, {
    key: "danger",
    value: function danger(options) {
      return this.alert(_objectSpread(_objectSpread({}, options), {}, {
        level: _alertLevels["default"].danger
      }));
    }
    /**
     * @function
     * @description Add alert message of alertLevel "warning" to the state.
     * @param {String} options.message
     * @param {Any} options.payload
     * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
     */

  }, {
    key: "warning",
    value: function warning(options) {
      return this.alert(_objectSpread(_objectSpread({}, options), {}, {
        level: _alertLevels["default"].warning
      }));
    }
    /**
     * @function
     * @description Add alert message of alertLevel "info" to the state.
     * @param {String} options.message
     * @param {Any} options.payload
     * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
     */

  }, {
    key: "info",
    value: function info(options) {
      return this.alert(_objectSpread(_objectSpread({}, options), {}, {
        level: _alertLevels["default"].info
      }));
    }
    /**
     * @function
     * @description Add alert message of alertLevel "success" to the state.
     * @param {String} options.message
     * @param {Any} options.payload
     * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
     */

  }, {
    key: "success",
    value: function success(options) {
      return this.alert(_objectSpread(_objectSpread({}, options), {}, {
        level: _alertLevels["default"].success
      }));
    }
    /**
     * @function
     * @description Update the message with given id.
     * @param {Array<String>|String} id - The message id of you want to update.
     * @param options - update options.
     */

  }, {
    key: "update",
    value: function update(id, options) {
      this.store.dispatch(_objectSpread(_objectSpread({
        type: this.actionTypes.update
      }, options), {}, {
        id: id
      }));
    }
    /**
     * @function
     * @description Dismiss the message from the state.
     * @param {Array<String>|String} ids - The id, or array of ids to be dismissed.
     */

  }, {
    key: "dismiss",
    value: function dismiss(ids) {
      this.store.dispatch({
        type: this.actionTypes.dismiss,
        ids: [].concat(ids)
      });
    }
    /**
     * @function
     * @description Dismiss all messages.
     */

  }, {
    key: "dismissAll",
    value: function dismissAll() {
      this.store.dispatch({
        type: this.actionTypes.dismissAll
      });
    }
    /**
     * @function
     * @description  Dismiss all other messages expect some specified message.
     */

  }, {
    key: "dismissAllExpectSpecified",
    value: function dismissAllExpectSpecified(_ref3) {
      var _this2 = this;

      var specifiedAlertIds = _ref3.specifiedAlertIds;
      var messagesId = [];
      specifiedAlertIds.forEach(function (specifiedAlertId) {
        var message = _this2.messages.find(function (item) {
          return item === specifiedAlertId;
        });

        if (message) messagesId.push(message);
      });
      this.store.dispatch({
        type: this.actionTypes.dismiss,
        ids: messagesId
      });
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      return _actionTypes["default"];
    }
  }, {
    key: "status",
    get: function get() {
      return _moduleStatuses["default"].ready;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "ready",
    get: function get() {
      return true;
    }
  }, {
    key: "messages",
    get: function get() {
      return this.state.messages;
    }
    /**
     * @function
     * @description Scans the messages for expired ones and dismiss them.
     */

  }]);

  return Alert;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "alert", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "alert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismiss", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "dismiss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissAll", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissAll"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissAllExpectSpecified", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissAllExpectSpecified"), _class2.prototype)), _class2)) || _class);
exports["default"] = Alert;
//# sourceMappingURL=Alert.js.map
