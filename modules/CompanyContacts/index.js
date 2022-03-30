"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _redux = require("redux");

var _extensionStatusTypes = require("../../enums/extensionStatusTypes");

var _extensionTypes = _interopRequireDefault(require("../../enums/extensionTypes"));

var _phoneTypes = require("../../enums/phoneTypes");

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _DataFetcher2 = _interopRequireDefault(require("../../lib/DataFetcher"));

var _getDataFetcherReducer = require("../../lib/DataFetcher/getDataFetcherReducer");

var _di = require("../../lib/di");

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _fetchList = _interopRequireDefault(require("../../lib/fetchList"));

var _selector = require("../../lib/selector");

var _actionTypes = require("./actionTypes");

var _getReducers = require("./getReducers");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var contactsRegExp = /.*\/directory\/contacts$/;
var DEFAULT_TTL = 24 * 60 * 60 * 1000;
var DEFAULT_SHOW_DISABLED = false;
var DEFAULT_SHOW_NOT_ACTIVATED = false;
var DEFAULT_ALLOW_SETTINGS = false; // Consider enable all extension types and filter through selector if
// we'll allow users to configure this through settings

var DEFAULT_TYPE_FILTERS = [_extensionTypes["default"].digitalUser, _extensionTypes["default"].user, _extensionTypes["default"].department // extensionTypes.limited,
// extensionTypes.announcement,
// extensionTypes.applicationExtension,
// extensionTypes.bot,
// extensionTypes.faxUser,
// extensionTypes.ivrMenu,
// extensionTypes.pagingOnly,
// extensionTypes.parkLocation,
// extensionTypes.sharedLinesGroup,
];
/**
 * @class
 * @description Accound extension list managing module
 */

var CompanyContacts = (_dec = (0, _di.Module)({
  deps: ['Client', 'ExtensionFeatures', {
    dep: 'CompanyContactsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcher) {
  _inherits(CompanyContacts, _DataFetcher);

  var _super = _createSuper(CompanyContacts);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Number} params.ttl - local cache timestamp, default 24 hours
   */
  function CompanyContacts(_ref) {
    var _this;

    var client = _ref.client,
        extensionFeatures = _ref.extensionFeatures,
        storage = _ref.storage,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        _ref$polling = _ref.polling,
        polling = _ref$polling === void 0 ? true : _ref$polling,
        _ref$showDisabled = _ref.showDisabled,
        showDisabled = _ref$showDisabled === void 0 ? DEFAULT_SHOW_DISABLED : _ref$showDisabled,
        _ref$extensionTypeFil = _ref.extensionTypeFilters,
        extensionTypeFilters = _ref$extensionTypeFil === void 0 ? DEFAULT_TYPE_FILTERS : _ref$extensionTypeFil,
        _ref$showNotActivated = _ref.showNotActivated,
        showNotActivated = _ref$showNotActivated === void 0 ? DEFAULT_SHOW_NOT_ACTIVATED : _ref$showNotActivated,
        _ref$allowSettings = _ref.allowSettings,
        allowSettings = _ref$allowSettings === void 0 ? DEFAULT_ALLOW_SETTINGS : _ref$allowSettings,
        options = _objectWithoutProperties(_ref, ["client", "extensionFeatures", "storage", "ttl", "polling", "showDisabled", "extensionTypeFilters", "showNotActivated", "allowSettings"]);

    _classCallCheck(this, CompanyContacts);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      client: client,
      storage: storage,
      ttl: ttl,
      polling: polling,
      getReducer: allowSettings ? _getDataFetcherReducer.getDataFetcherReducer : function (types) {
        var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return (0, _getDataFetcherReducer.getDataFetcherReducer)(types, _objectSpread(_objectSpread({}, reducers), {}, {
          showDisabled: (0, _getReducers.getShowDisabledReducer)(types, showDisabled),
          showNotActivated: (0, _getReducers.getShowNotActivatedReducer)(types, showNotActivated),
          extensionTypeFilters: (0, _getReducers.getExtensionTypeFiltersReducer)(types, extensionTypeFilters)
        }));
      },
      getDataReducer: _getReducers.getDataReducer,
      getTimestampReducer: _getReducers.getTimestampReducer,
      subscriptionFilters: [_subscriptionFilters["default"].companyContacts],
      subscriptionHandler: function () {
        var _subscriptionHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(message) {
          var _iterator, _step, contact;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(_this.ready && message && contactsRegExp.test(message.event) && message.body && message.body.contacts)) {
                    _context.next = 18;
                    break;
                  }

                  _iterator = _createForOfIteratorHelper(message.body.contacts);
                  _context.prev = 2;

                  _iterator.s();

                case 4:
                  if ((_step = _iterator.n()).done) {
                    _context.next = 10;
                    break;
                  }

                  contact = _step.value;
                  _context.next = 8;
                  return _this._processContact(contact);

                case 8:
                  _context.next = 4;
                  break;

                case 10:
                  _context.next = 15;
                  break;

                case 12:
                  _context.prev = 12;
                  _context.t0 = _context["catch"](2);

                  _iterator.e(_context.t0);

                case 15:
                  _context.prev = 15;

                  _iterator.f();

                  return _context.finish(15);

                case 18:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[2, 12, 15, 18]]);
        }));

        function subscriptionHandler(_x) {
          return _subscriptionHandler.apply(this, arguments);
        }

        return subscriptionHandler;
      }(),
      fetchFunction: function fetchFunction() {
        return (0, _fetchList["default"])(function (params) {
          return _this._client.account().directory().contacts().list(params);
        });
      },
      readyCheckFn: function readyCheckFn() {
        return _this._extensionFeatures.ready;
      }
    }));

    _initializerDefineProperty(_this, "_extensionFilter", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "ivrContacts", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "filteredContacts", _descriptor3, _assertThisInitialized(_this));

    _this._allowSettings = allowSettings;

    if (_this._allowSettings) {
      _this._storage = (0, _ensureExist["default"])(storage, 'storage');
      _this._settingsStorageKey = 'CompanyContacts-settings';

      _this._storage.registerReducer({
        key: _this._settingsStorageKey,
        reducer: (0, _redux.combineReducers)({
          showDisabled: (0, _getReducers.getShowDisabledReducer)(_this.actionTypes, showDisabled),
          showNotActivated: (0, _getReducers.getShowNotActivatedReducer)(_this.actionTypes, showNotActivated),
          extensionTypeFilters: (0, _getReducers.getExtensionTypeFiltersReducer)(_this.actionTypes, extensionTypeFilters)
        })
      });
    }

    _this._extensionFeatures = extensionFeatures;
    return _this;
  }

  _createClass(CompanyContacts, [{
    key: "_processContact",
    value: function () {
      var _processContact2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
        var eventType, oldEtag, newEtag, contact;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                eventType = _ref2.eventType, oldEtag = _ref2.oldEtag, newEtag = _ref2.newEtag, contact = _objectWithoutProperties(_ref2, ["eventType", "oldEtag", "newEtag"]);
                _context2.t0 = eventType;
                _context2.next = _context2.t0 === 'Create' ? 4 : _context2.t0 === 'Update' ? 4 : _context2.t0 === 'Delete' ? 6 : 8;
                break;

              case 4:
                this.store.dispatch({
                  type: this.actionTypes.upsert,
                  contact: contact,
                  timestamp: Date.now()
                });
                return _context2.abrupt("break", 8);

              case 6:
                this.store.dispatch({
                  type: this.actionTypes["delete"],
                  contact: contact,
                  timestamp: Date.now()
                });
                return _context2.abrupt("break", 8);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _processContact(_x2) {
        return _processContact2.apply(this, arguments);
      }

      return _processContact;
    }()
    /**
     * @deprecated consider using numberValidate module's isAvailableExtension
     * TODO: Currently we don't have clearly defined business rule on
     * what extension numbers are considered available for dialing.
     * @param {String} extensionNumber
     * @returns {Boolean}
     */

  }, {
    key: "isAvailableExtension",
    value: function isAvailableExtension(extensionNumber) {
      return !!(0, _ramda.find)(function (item) {
        return item.extensionNumber === extensionNumber;
      }, this.filteredContacts.concat(this.ivrContacts));
    }
  }, {
    key: "_name",
    get: function get() {
      return 'CompanyContacts';
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      return _actionTypes.actionTypes;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      var _this$_extensionFeatu, _this$_extensionFeatu2, _this$_extensionFeatu3;

      return (_this$_extensionFeatu = (_this$_extensionFeatu2 = this._extensionFeatures.features) === null || _this$_extensionFeatu2 === void 0 ? void 0 : (_this$_extensionFeatu3 = _this$_extensionFeatu2.ReadExtensions) === null || _this$_extensionFeatu3 === void 0 ? void 0 : _this$_extensionFeatu3.available) !== null && _this$_extensionFeatu !== void 0 ? _this$_extensionFeatu : false;
    }
  }, {
    key: "allowSettings",
    get: function get() {
      return this._allowSettings;
    }
  }, {
    key: "showDisabled",
    get: function get() {
      if (this.allowSettings) {
        return this._storage.getItem(this._settingsStorageKey).showDisabled;
      }

      return this.state.showDisabled;
    }
  }, {
    key: "showNotActivated",
    get: function get() {
      if (this.allowSettings) {
        return this._storage.getItem(this._settingsStorageKey).showNotActivated;
      }

      return this.state.showNotActivated;
    }
  }, {
    key: "extensionTypeFilters",
    get: function get() {
      if (this.allowSettings) {
        return this._storage.getItem(this._settingsStorageKey).extensionTypeFilters;
      }

      return this.state.extensionTypeFilters;
    }
  }]);

  return CompanyContacts;
}(_DataFetcher2["default"]), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_extensionFilter", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return [function () {
      return _this2.showDisabled;
    }, function () {
      return _this2.showNotActivated;
    }, function () {
      return _this2.extensionTypeFilters;
    }, function (showDisabled, showNotActivated, filters) {
      var typeFilter = (0, _ramda.reduce)(function (acc, item) {
        acc[item] = true;
        return acc;
      }, {}, filters);
      return (0, _ramda.filter)(function (item) {
        return !(!showDisabled && item.status === _extensionStatusTypes.extensionStatusTypes.disabled || !showNotActivated && item.status === _extensionStatusTypes.extensionStatusTypes.notActivated || !typeFilter[item.type]);
      });
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ivrContacts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return [function () {
      return _this3.data;
    }, function (data) {
      return data.filter(function (item) {
        return item.type === _extensionTypes["default"].ivrMenu;
      }).map(function (item) {
        var phoneNumber = {
          phoneType: _phoneTypes.phoneTypes.extension,
          phoneNumber: item.extensionNumber
        };
        var phoneNumbers = [];

        if (!item.phoneNumbers) {
          phoneNumbers = [phoneNumber];
        } else {
          phoneNumbers = item.phoneNumbers.concat([phoneNumber]);
        }

        return _objectSpread(_objectSpread({}, item), {}, {
          phoneNumbers: phoneNumbers
        });
      });
    }];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "filteredContacts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return [function () {
      return _this4.data;
    }, function () {
      return _this4._extensionFilter;
    }, function (data, extensionFilter) {
      return extensionFilter(data);
    }];
  }
})), _class2)) || _class);
exports["default"] = CompanyContacts;
//# sourceMappingURL=index.js.map
