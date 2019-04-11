"use strict";

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.date.now");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _redux = require("redux");

var _di = require("../../lib/di");

var _DataFetcher2 = _interopRequireDefault(require("../../lib/DataFetcher"));

var _getDataFetcherReducer = require("../../lib/DataFetcher/getDataFetcherReducer");

var _fetchList = _interopRequireDefault(require("../../lib/fetchList"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _selector = require("../../lib/selector");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getReducers = require("./getReducers");

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _extensionTypes = _interopRequireDefault(require("../../enums/extensionTypes"));

var _extensionStatusTypes = require("../../enums/extensionStatusTypes");

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var contactsRegExp = /.*\/directory\/contacts$/;
var DEFAULT_TTL = 24 * 60 * 60 * 1000;
var DEFAULT_SHOW_DISABLED = false;
var DEFAULT_SHOW_NOT_ACTIVATED = false;
var DEFAULT_ALLOW_SETTINGS = false; // Consider enable all extension types and filter through selector if
// we'll allow users to configure this through settings

var DEFAULT_TYPE_FILTERS = [_extensionTypes.default.digitalUser, _extensionTypes.default.user, _extensionTypes.default.department];
/**
 * @class
 * @description Accound extension list managing module
 */

var CompanyContacts = (_dec = (0, _di.Module)({
  deps: ['Client', 'RolesAndPermissions', {
    dep: 'CompanyContactsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_DataFetcher) {
  _inherits(CompanyContacts, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Number} params.ttl - local cache timestamp, default 24 hours
   */
  function CompanyContacts(_ref) {
    var _context2;

    var _this;

    var client = _ref.client,
        rolesAndPermissions = _ref.rolesAndPermissions,
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
        options = _objectWithoutProperties(_ref, ["client", "rolesAndPermissions", "storage", "ttl", "polling", "showDisabled", "extensionTypeFilters", "showNotActivated", "allowSettings"]);

    _classCallCheck(this, CompanyContacts);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CompanyContacts).call(this, _objectSpread({}, options, {
      client: client,
      storage: storage,
      ttl: ttl,
      polling: polling,
      getReducer: allowSettings ? _getDataFetcherReducer.getDataFetcherReducer : function (types) {
        var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return (0, _getDataFetcherReducer.getDataFetcherReducer)(types, _objectSpread({}, reducers, {
          showDisabled: (0, _getReducers.getShowDisabledReducer)(types, showDisabled),
          showNotActivated: (0, _getReducers.getShowNotActivatedReducer)(types, showNotActivated),
          extensionTypeFilters: (0, _getReducers.getExtensionTypeFiltersReducer)(types, extensionTypeFilters)
        }));
      },
      getDataReducer: _getReducers.getDataReducer,
      getTimestampReducer: _getReducers.getTimestampReducer,
      subscriptionFilters: [_subscriptionFilters.default.companyContacts],
      subscriptionHandler: function () {
        var _subscriptionHandler = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(message) {
          var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, contact;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(_this.ready && message && contactsRegExp.test(message.event) && message.body && message.body.contacts)) {
                    _context.next = 27;
                    break;
                  }

                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 4;
                  _iterator = message.body.contacts[Symbol.iterator]();

                case 6:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context.next = 13;
                    break;
                  }

                  contact = _step.value;
                  _context.next = 10;
                  return _this._processContact(contact);

                case 10:
                  _iteratorNormalCompletion = true;
                  _context.next = 6;
                  break;

                case 13:
                  _context.next = 19;
                  break;

                case 15:
                  _context.prev = 15;
                  _context.t0 = _context["catch"](4);
                  _didIteratorError = true;
                  _iteratorError = _context.t0;

                case 19:
                  _context.prev = 19;
                  _context.prev = 20;

                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }

                case 22:
                  _context.prev = 22;

                  if (!_didIteratorError) {
                    _context.next = 25;
                    break;
                  }

                  throw _iteratorError;

                case 25:
                  return _context.finish(22);

                case 26:
                  return _context.finish(19);

                case 27:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[4, 15, 19, 27], [20,, 22, 26]]);
        }));

        function subscriptionHandler(_x) {
          return _subscriptionHandler.apply(this, arguments);
        }

        return subscriptionHandler;
      }(),
      fetchFunction: function fetchFunction() {
        return (0, _fetchList.default)(function (params) {
          return _this._client.account().directory().contacts().list(params);
        });
      },
      readyCheckFn: function readyCheckFn() {
        return _this._rolesAndPermissions.ready;
      }
    })));

    _initializerDefineProperty(_this, "_extensionFilter", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "filteredContacts", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _this._allowSettings = allowSettings;

    if (_this._allowSettings) {
      _this._storage = (0, _ensureExist.default)(storage, 'storage');
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

    _this._rolesAndPermissions = (_context2 = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context2, rolesAndPermissions, 'rolesAndPermissions');
    return _this;
  }

  _createClass(CompanyContacts, [{
    key: "_processContact",
    value: function () {
      var _processContact2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref2) {
        var eventType, oldEtag, newEtag, contact;
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                eventType = _ref2.eventType, oldEtag = _ref2.oldEtag, newEtag = _ref2.newEtag, contact = _objectWithoutProperties(_ref2, ["eventType", "oldEtag", "newEtag"]);
                _context3.t0 = eventType;
                _context3.next = _context3.t0 === 'Create' ? 4 : _context3.t0 === 'Update' ? 4 : _context3.t0 === 'Delete' ? 6 : 8;
                break;

              case 4:
                this.store.dispatch({
                  type: this.actionTypes.upsert,
                  contact: contact,
                  timestamp: Date.now()
                });
                return _context3.abrupt("break", 8);

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.delete,
                  contact: contact,
                  timestamp: Date.now()
                });
                return _context3.abrupt("break", 8);

              case 8:
              case "end":
                return _context3.stop();
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
      }, this.filteredContacts);
    }
  }, {
    key: "_name",
    get: function get() {
      return 'CompanyContacts';
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      return _actionTypes.default;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return !!this._rolesAndPermissions.permissions.ReadExtensions;
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
}(_DataFetcher2.default), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_extensionFilter", [_selector.selector], {
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
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "filteredContacts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return [function () {
      return _this3.data;
    }, function () {
      return _this3._extensionFilter;
    }, function (data, extensionFilter) {
      return extensionFilter(data);
    }];
  }
})), _class2)) || _class);
exports.default = CompanyContacts;
//# sourceMappingURL=index.js.map
