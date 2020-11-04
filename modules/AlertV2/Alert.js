"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.date.now");

var uuid = _interopRequireWildcard(require("uuid"));

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _alertLevels = require("./alertLevels");

var _dec, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Alert = (_dec = (0, _di.Module)({
  name: 'Alert',
  deps: ['GlobalStorage', {
    dep: 'AlertOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Alert, _RcModuleV);

  var _super = _createSuper(Alert);

  function Alert(deps) {
    var _deps$alertOptions$tt, _deps$alertOptions, _deps$alertOptions$en, _deps$alertOptions2;

    var _this;

    _classCallCheck(this, Alert);

    _this = _super.call(this, {
      deps: _objectSpread(_objectSpread({}, deps), {}, {
        alertOptions: _objectSpread(_objectSpread({}, deps.alertOptions), {}, {
          ttl: (_deps$alertOptions$tt = (_deps$alertOptions = deps.alertOptions) === null || _deps$alertOptions === void 0 ? void 0 : _deps$alertOptions.ttl) !== null && _deps$alertOptions$tt !== void 0 ? _deps$alertOptions$tt : 5000
        })
      }),
      enableGlobalCache: (_deps$alertOptions$en = (_deps$alertOptions2 = deps.alertOptions) === null || _deps$alertOptions2 === void 0 ? void 0 : _deps$alertOptions2.enableTabSync) !== null && _deps$alertOptions$en !== void 0 ? _deps$alertOptions$en : false,
      storageKey: 'alert'
    });

    _initializerDefineProperty(_this, "messages", _descriptor, _assertThisInitialized(_this));

    _this._autoDismiss = function () {
      var now = Date.now();

      var ids = _this.messages.filter(function (item) {
        return item.ttl > 0 && now - item.timestamp > item.ttl;
      }).map(function (item) {
        return item.id;
      });

      if (ids.length) {
        _this.dismiss(ids);
      }
    };

    return _this;
  }

  _createClass(Alert, [{
    key: "_alert",
    value: function _alert(_ref) {
      var allowDuplicates = _ref.allowDuplicates,
          item = _objectWithoutProperties(_ref, ["allowDuplicates"]);

      if (!allowDuplicates && this.messages.find(function (_ref2) {
        var message = _ref2.message,
            level = _ref2.level;
        return item.message === message && item.level === level;
      })) {
        return;
      }

      this.messages.push(item);
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this$_deps$alertOpti,
          _this2 = this;

      if ((_this$_deps$alertOpti = this._deps.alertOptions) === null || _this$_deps$alertOpti === void 0 ? void 0 : _this$_deps$alertOpti.enableTabSync) {
        this.messages.forEach(function (_ref3) {
          var ttl = _ref3.ttl;
          setTimeout(_this2._autoDismiss, ttl + 10);
        });
      }
    }
    /**
     * Scans the messages for expired ones and dismiss them.
     */

  }, {
    key: "alert",

    /**
     * Add alert message to the state.
     */
    value: function alert(_ref4) {
      var message = _ref4.message,
          payload = _ref4.payload,
          _ref4$level = _ref4.level,
          level = _ref4$level === void 0 ? _alertLevels.alertLevels.info : _ref4$level,
          _ref4$ttl = _ref4.ttl,
          ttl = _ref4$ttl === void 0 ? this._deps.alertOptions.ttl : _ref4$ttl,
          _ref4$allowDuplicates = _ref4.allowDuplicates,
          allowDuplicates = _ref4$allowDuplicates === void 0 ? true : _ref4$allowDuplicates,
          _ref4$loading = _ref4.loading,
          loading = _ref4$loading === void 0 ? false : _ref4$loading,
          _ref4$backdrop = _ref4.backdrop,
          backdrop = _ref4$backdrop === void 0 ? false : _ref4$backdrop,
          classes = _ref4.classes,
          onBackdropClick = _ref4.onBackdropClick,
          action = _ref4.action;
      var id = uuid.v4();

      this._alert({
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
     * Add alert message of alertLevel "danger" to the state.
     */

  }, {
    key: "danger",
    value: function danger(options) {
      return this.alert(_objectSpread(_objectSpread({}, options), {}, {
        level: _alertLevels.alertLevels.danger
      }));
    }
    /**
     * Add alert message of alertLevel "warning" to the state.
     */

  }, {
    key: "warning",
    value: function warning(options) {
      return this.alert(_objectSpread(_objectSpread({}, options), {}, {
        level: _alertLevels.alertLevels.warning
      }));
    }
    /**
     * Add alert message of alertLevel "info" to the state.
     */

  }, {
    key: "info",
    value: function info(options) {
      return this.alert(_objectSpread(_objectSpread({}, options), {}, {
        level: _alertLevels.alertLevels.info
      }));
    }
    /**
     * Add alert message of alertLevel "success" to the state.
     */

  }, {
    key: "success",
    value: function success(options) {
      return this.alert(_objectSpread(_objectSpread({}, options), {}, {
        level: _alertLevels.alertLevels.success
      }));
    }
    /**
     * Update the message with given id.
     */

  }, {
    key: "update",
    value: function update(id, options) {
      var message = this.messages.find(function (item) {
        return item.id === id;
      });

      if (message) {
        Object.assign(message, options);
      }
    }
    /**
     * Dismiss the messages/message
     */

  }, {
    key: "dismiss",
    value: function dismiss(ids) {
      var _ids = [].concat(ids);

      this.messages = this.messages.filter(function (item) {
        return _ids.indexOf(item.id) === -1;
      });
    }
    /**
     * Dismiss all messages.
     */

  }, {
    key: "dismissAll",
    value: function dismissAll() {
      this.messages = [];
    }
  }]);

  return Alert;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "messages", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_alert", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_alert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alert", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "alert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "update", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismiss", [_proxify["default"], _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "dismiss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissAll", [_proxify["default"], _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissAll"), _class2.prototype)), _class2)) || _class);
exports.Alert = Alert;
//# sourceMappingURL=Alert.js.map
