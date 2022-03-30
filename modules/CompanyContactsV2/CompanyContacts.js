"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanyContacts = void 0;

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _core = require("@ringcentral-integration/core");

var _extensionStatusTypes = require("../../enums/extensionStatusTypes");

var _extensionTypes = require("../../enums/extensionTypes");

var _phoneTypes = require("../../enums/phoneTypes");

var _subscriptionFilters = require("../../enums/subscriptionFilters");

var _di = require("../../lib/di");

var _fetchList = _interopRequireDefault(require("../../lib/fetchList"));

var _DataFetcherV = require("../DataFetcherV2");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * TODO:
 * 1. Consider moving the filters to some UI module for display contact list
 * 2. Find out whether there are other types should be searchable/matchable, but hidden in contact lists
 * 3. Find out whether isAvailableExtension can be better defined in our business logic layer
 * 4. Standardize and remove the IVR contacts special treatments
 */
var contactsRegExp = /.*\/directory\/contacts$/;
var DEFAULT_TTL = 24 * 60 * 60 * 1000;
var DEFAULT_SHOW_DISABLED = false;
var DEFAULT_SHOW_NOT_ACTIVATED = false;
var DEFAULT_ALLOW_SETTINGS = false;
var DEFAULT_SELECTED_TYPES = [_extensionTypes.extensionTypes.digitalUser, _extensionTypes.extensionTypes.user, _extensionTypes.extensionTypes.department // extensionTypes.limited,
// extensionTypes.announcement,
// extensionTypes.applicationExtension,
// extensionTypes.bot,
// extensionTypes.faxUser,
// extensionTypes.ivrMenu,
// extensionTypes.pagingOnly,
// extensionTypes.parkLocation,
// extensionTypes.sharedLinesGroup,
];
var CompanyContacts = (_dec = (0, _di.Module)({
  name: 'CompanyContacts',
  deps: ['Client', 'ExtensionFeatures', 'DataFetcherV2', 'Subscription', 'Storage', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'CompanyContactsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var selectedTypes = _ref.selectedTypes,
      showDisabled = _ref.showDisabled,
      showNotActivated = _ref.showNotActivated;
  return [selectedTypes, showDisabled, showNotActivated];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var data = _ref2.data,
      _extensionFilter = _ref2._extensionFilter;
  return [data, _extensionFilter];
}), _dec4 = (0, _core.computed)(function (_ref3) {
  var data = _ref3.data;
  return [data];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(CompanyContacts, _DataFetcherV2Consume);

  var _super = _createSuper(CompanyContacts);

  function CompanyContacts(deps) {
    var _deps$companyContacts;

    var _this;

    _classCallCheck(this, CompanyContacts);

    _this = _super.call(this, {
      deps: deps
    });
    _this._stopWatching = null;

    _initializerDefineProperty(_this, "_showDisabled", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_showNotActivated", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_selectedTypes", _descriptor3, _assertThisInitialized(_this));

    var _ref4 = (_deps$companyContacts = deps.companyContactsOptions) !== null && _deps$companyContacts !== void 0 ? _deps$companyContacts : {},
        _ref4$ttl = _ref4.ttl,
        ttl = _ref4$ttl === void 0 ? DEFAULT_TTL : _ref4$ttl,
        _ref4$polling = _ref4.polling,
        polling = _ref4$polling === void 0 ? true : _ref4$polling;

    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, deps.companyContactsOptions), {}, {
      key: 'companyContacts',
      polling: polling,
      ttl: ttl,
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", (0, _fetchList["default"])(function (params) {
                    return _this._deps.client.account().directory().contacts().list(params);
                  }));

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }

        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return _this._deps.extensionFeatures.ready && _this._deps.subscription.ready;
      },
      permissionCheckFunction: function permissionCheckFunction() {
        var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3;

        return (_this$_deps$extension = (_this$_deps$extension2 = _this._deps.extensionFeatures.features) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.ReadExtensions) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.available) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : false;
      }
    }));

    _this._deps.dataFetcherV2.register(_this._source);

    return _this;
  } // company directory events is missing in official swagger spec


  _createClass(CompanyContacts, [{
    key: "_handleSubscription",
    value: function _handleSubscription(message) {
      var _this$_deps$tabManage, _this$_deps$tabManage2, _message$body;

      if (this.ready && (this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true)) && contactsRegExp.test(message === null || message === void 0 ? void 0 : message.event) && (message === null || message === void 0 ? void 0 : (_message$body = message.body) === null || _message$body === void 0 ? void 0 : _message$body.contacts)) {
        var _this$data;

        var data = (_this$data = this.data) !== null && _this$data !== void 0 ? _this$data : []; // eslint-disable-next-line @typescript-eslint/no-unused-vars

        (0, _ramda.forEach)(function (_ref5) {
          var eventType = _ref5.eventType,
              oldEtag = _ref5.oldEtag,
              newEtag = _ref5.newEtag,
              contact = _objectWithoutProperties(_ref5, ["eventType", "oldEtag", "newEtag"]);

          if (eventType === 'Create' || eventType === 'Update') {
            data = [].concat(_toConsumableArray((0, _ramda.reject)(function (item) {
              return item.id === contact.id;
            }, data)), [contact]);
          } else if (eventType === 'Delete') {
            data = _toConsumableArray((0, _ramda.reject)(function (item) {
              return item.id === contact.id;
            }, data));
          }
        }, message.body.contacts);

        this._deps.dataFetcherV2.updateData(this._source, data, Date.now());
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this2 = this;

      this._deps.subscription.subscribe([_subscriptionFilters.subscriptionFilters.companyContacts]);

      this._stopWatching = (0, _core.watch)(this, function () {
        return _this2._deps.subscription.message;
      }, function (message) {
        return _this2._handleSubscription(message);
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatching;

      (_this$_stopWatching = this._stopWatching) === null || _this$_stopWatching === void 0 ? void 0 : _this$_stopWatching.call(this);
      this._stopWatching = null;
    }
  }, {
    key: "setShowDisabled",
    value: function setShowDisabled(showDisabled) {
      this._showDisabled = showDisabled;
    }
  }, {
    key: "setShowNotActivated",
    value: function setShowNotActivated(showNotActivated) {
      this._showNotActivated = showNotActivated;
    }
  }, {
    key: "isAvailableExtension",
    value: function isAvailableExtension(extensionNumber) {
      return !!(0, _ramda.find)(function (item) {
        return item.extensionNumber === extensionNumber;
      }, this.filteredContacts.concat(this.ivrContacts));
    }
  }, {
    key: "allowSettings",
    get: function get() {
      var _this$_deps$companyCo, _this$_deps$companyCo2;

      return (_this$_deps$companyCo = (_this$_deps$companyCo2 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo2 === void 0 ? void 0 : _this$_deps$companyCo2.allowSettings) !== null && _this$_deps$companyCo !== void 0 ? _this$_deps$companyCo : DEFAULT_ALLOW_SETTINGS;
    }
  }, {
    key: "extensionTypes",
    get: function get() {
      return _extensionTypes.extensionTypes;
    }
  }, {
    key: "showDisabled",
    get: function get() {
      var _ref6, _this$_showDisabled, _this$_deps$companyCo3, _this$_deps$companyCo4;

      return (_ref6 = this.allowSettings ? (_this$_showDisabled = this._showDisabled) !== null && _this$_showDisabled !== void 0 ? _this$_showDisabled : (_this$_deps$companyCo3 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo3 === void 0 ? void 0 : _this$_deps$companyCo3.showDisabled : (_this$_deps$companyCo4 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo4 === void 0 ? void 0 : _this$_deps$companyCo4.showDisabled) !== null && _ref6 !== void 0 ? _ref6 : DEFAULT_SHOW_DISABLED;
    }
  }, {
    key: "showNotActivated",
    get: function get() {
      var _ref7, _this$_showNotActivat, _this$_deps$companyCo5, _this$_deps$companyCo6;

      return (_ref7 = this.allowSettings ? (_this$_showNotActivat = this._showNotActivated) !== null && _this$_showNotActivat !== void 0 ? _this$_showNotActivat : (_this$_deps$companyCo5 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo5 === void 0 ? void 0 : _this$_deps$companyCo5.showNotActivated : (_this$_deps$companyCo6 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo6 === void 0 ? void 0 : _this$_deps$companyCo6.showNotActivated) !== null && _ref7 !== void 0 ? _ref7 : DEFAULT_SHOW_NOT_ACTIVATED;
    }
  }, {
    key: "selectedTypes",
    get: function get() {
      var _ref8, _this$_selectedTypes, _this$_deps$companyCo7, _this$_deps$companyCo8;

      return (_ref8 = this.allowSettings ? (_this$_selectedTypes = this._selectedTypes) !== null && _this$_selectedTypes !== void 0 ? _this$_selectedTypes : (_this$_deps$companyCo7 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo7 === void 0 ? void 0 : _this$_deps$companyCo7.selectedTypes : (_this$_deps$companyCo8 = this._deps.companyContactsOptions) === null || _this$_deps$companyCo8 === void 0 ? void 0 : _this$_deps$companyCo8.selectedTypes) !== null && _ref8 !== void 0 ? _ref8 : DEFAULT_SELECTED_TYPES;
    }
  }, {
    key: "_extensionFilter",
    get: function get() {
      var _this3 = this;

      var typeFilter = (0, _ramda.reduce)(function (acc, type) {
        acc[type] = true;
        return acc;
      }, {}, this.selectedTypes);
      return (0, _ramda.filter)(function (item) {
        return !(!_this3.showDisabled && item.status === _extensionStatusTypes.extensionStatusTypes.disabled || !_this3.showNotActivated && item.status === _extensionStatusTypes.extensionStatusTypes.notActivated || !typeFilter[item.type]);
      });
    }
  }, {
    key: "filteredContacts",
    get: function get() {
      var _this$data2;

      return this._extensionFilter((_this$data2 = this.data) !== null && _this$data2 !== void 0 ? _this$data2 : []);
    }
  }, {
    key: "ivrContacts",
    get: function get() {
      var _this$data3;

      var ivrContacts = (0, _ramda.filter)(function (item) {
        return item.type === _extensionTypes.extensionTypes.ivrMenu;
      }, (_this$data3 = this.data) !== null && _this$data3 !== void 0 ? _this$data3 : []);
      return (0, _ramda.map)(function (item) {
        var _item$phoneNumbers;

        return _objectSpread(_objectSpread({}, item), {}, {
          phoneNumbers: [].concat(_toConsumableArray((_item$phoneNumbers = item.phoneNumbers) !== null && _item$phoneNumbers !== void 0 ? _item$phoneNumbers : []), [{
            phonetype: _phoneTypes.phoneTypes.extension,
            phoneNumber: item.extensionNumber
          }])
        });
      }, ivrContacts);
    }
  }]);

  return CompanyContacts;
}(_DataFetcherV.DataFetcherV2Consumer), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_showDisabled", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_showNotActivated", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_selectedTypes", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setShowDisabled", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setShowDisabled"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setShowNotActivated", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setShowNotActivated"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_extensionFilter", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_extensionFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filteredContacts", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "filteredContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ivrContacts", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "ivrContacts"), _class2.prototype)), _class2)) || _class);
exports.CompanyContacts = CompanyContacts;
//# sourceMappingURL=CompanyContacts.js.map
