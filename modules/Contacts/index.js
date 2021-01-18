"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DefaultContactListPageSize = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.date.now");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _selector = require("../../lib/selector");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _isBlank = _interopRequireDefault(require("../../lib/isBlank"));

var _contactHelper = require("../../lib/contactHelper");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getContactsReducer = _interopRequireDefault(require("./getContactsReducer"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DefaultContactListPageSize = 20;
/**
 * @class
 * @description Contacts managing module
 */

exports.DefaultContactListPageSize = DefaultContactListPageSize;
var Contacts = (_dec = (0, _di.Module)({
  deps: ['Auth', {
    dep: 'ContactSources',
    optional: true
  }, {
    dep: 'ContactsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModule) {
  _inherits(Contacts, _RcModule);

  var _super = _createSuper(Contacts);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   */
  function Contacts(_ref) {
    var _this;

    var auth = _ref.auth,
        _ref$contactSources = _ref.contactSources,
        contactSources = _ref$contactSources === void 0 ? [] : _ref$contactSources,
        options = _objectWithoutProperties(_ref, ["auth", "contactSources"]);

    _classCallCheck(this, Contacts);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes["default"]
    }));

    _initializerDefineProperty(_this, "sourceNames", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "allContacts", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "contactGroups", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "filteredContacts", _descriptor4, _assertThisInitialized(_this));

    _this._auth = _ensureExist["default"].call(_assertThisInitialized(_this), auth, 'auth');
    _this._reducer = (0, _getContactsReducer["default"])(_this.actionTypes);
    _this._contactSources = new Map();
    _this._sourcesLastStatus = new Map();
    _this._sourcesUpdatedAt = Date.now();

    var _iterator = _createForOfIteratorHelper(contactSources),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var source = _step.value;

        _this.addSource(source);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return _this;
  }

  _createClass(Contacts, [{
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
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this._shouldReset()) {
        this._resetModuleStatus();
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._auth.loggedIn && this.sourceModuleReady && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !this.sourceModuleReady) && this.ready;
    }
  }, {
    key: "_resetModuleStatus",
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "updateFilter",
    value: function updateFilter(_ref2) {
      var sourceFilter = _ref2.sourceFilter,
          searchFilter = _ref2.searchFilter;
      this.store.dispatch({
        type: this.actionTypes.updateFilter,
        sourceFilter: sourceFilter,
        searchFilter: searchFilter
      });
    }
  }, {
    key: "addSource",
    value: function addSource(source) {
      if (!source.sourceName) {
        throw new Error('[Contacts > ContactSource > sourceName] is required');
      }

      if (this._contactSources.has(source.sourceName)) {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > sourceName] already exists"));
      }

      if (source.getPresence && typeof source.getPresence !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > getPresence] must be a function"));
      }

      if (source.getProfileImage && typeof source.getProfileImage !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > getProfileImage] must be a function"));
      }

      if (source.findContact && typeof source.findContact !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > findContact] must be a function"));
      }

      if (source.filterContacts && typeof source.filterContacts !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > filterContacts] must be a function"));
      }

      if (source.searchForPhoneNumbers && typeof source.searchForPhoneNumbers !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > searchForPhoneNumbers] must be a function"));
      }

      if (source.matchContactsByPhoneNumber && typeof source.matchContactsByPhoneNumber !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > matchContactsByPhoneNumber] must be a function"));
      }

      this._contactSources.set(source.sourceName, source);

      this._sourcesLastStatus.set(source.sourceName, {});

      this._sourcesUpdatedAt = Date.now();
    }
  }, {
    key: "checkSourceUpdated",
    value: function checkSourceUpdated() {
      var updated = false;

      for (var _i = 0, _Array$from = Array.from(this._contactSources.keys()); _i < _Array$from.length; _i++) {
        var sourceName = _Array$from[_i];

        var source = this._contactSources.get(sourceName);

        var lastStatus = this._sourcesLastStatus.get(sourceName);

        if (lastStatus.ready !== source.sourceReady || lastStatus.data !== source.contacts) {
          updated = true;

          this._sourcesLastStatus.set(sourceName, {
            ready: source.sourceReady,
            data: source.contacts
          });
        }
      }

      if (updated) {
        this._sourcesUpdatedAt = Date.now();
      }

      return this._sourcesUpdatedAt;
    }
  }, {
    key: "findContact",
    value: function () {
      var _findContact = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
        var sourceName, contactId, contact, source;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sourceName = _ref3.sourceName, contactId = _ref3.contactId;
                contact = null;
                source = this._contactSources.get(sourceName);

                if (!(source && typeof source.findContact === 'function')) {
                  _context.next = 13;
                  break;
                }

                _context.prev = 4;
                _context.next = 7;
                return source.findContact(contactId);

              case 7:
                contact = _context.sent;
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                console.error("[Contacts > ContactSource(".concat(source.sourceName, ") > findContact] ").concat(_context.t0));

              case 13:
                return _context.abrupt("return", contact);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 10]]);
      }));

      function findContact(_x) {
        return _findContact.apply(this, arguments);
      }

      return findContact;
    }()
  }, {
    key: "filterContacts",
    value: function () {
      var _filterContacts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchFilter) {
        var sources, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sources = Array.from(this._contactSources.values()).filter(function (source) {
                  return typeof source.filterContacts === 'function';
                });
                result = [];
                _context2.next = 4;
                return Promise.all(sources.map(function (source) {
                  var promise = Promise.resolve(source.filterContacts(searchFilter));
                  return promise.then(function (items) {
                    result = result.concat(items);
                  })["catch"](function (error) {
                    console.error("[Contacts > ContactSource(".concat(source.sourceName, ") > filterContacts] ").concat(error));
                  });
                }));

              case 4:
                return _context2.abrupt("return", result);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function filterContacts(_x2) {
        return _filterContacts.apply(this, arguments);
      }

      return filterContacts;
    }()
  }, {
    key: "searchForPhoneNumbers",
    value: function () {
      var _searchForPhoneNumbers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchString) {
        var sources, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sources = Array.from(this._contactSources.values()).filter(function (source) {
                  return typeof source.searchForPhoneNumbers === 'function';
                });
                result = [];
                _context3.next = 4;
                return Promise.all(sources.map(function (source) {
                  var promise = Promise.resolve(source.searchForPhoneNumbers(searchString));
                  return promise.then(function (items) {
                    result = result.concat(items);
                  })["catch"](function (error) {
                    console.error("[Contacts > ContactSource(".concat(source.sourceName, ") > searchForPhoneNumbers] ").concat(error));
                  });
                }));

              case 4:
                return _context3.abrupt("return", result);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function searchForPhoneNumbers(_x3) {
        return _searchForPhoneNumbers.apply(this, arguments);
      }

      return searchForPhoneNumbers;
    }()
  }, {
    key: "matchContactsByPhoneNumber",
    value: function () {
      var _matchContactsByPhoneNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(phoneNumber) {
        var sources, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                sources = Array.from(this._contactSources.values()).filter(function (source) {
                  return typeof source.matchContactsByPhoneNumber === 'function';
                });
                result = [];
                _context4.next = 4;
                return Promise.all(sources.map(function (source) {
                  var promise = Promise.resolve(source.matchContactsByPhoneNumber(phoneNumber));
                  return promise.then(function (items) {
                    result = result.concat(items);
                  })["catch"](function (error) {
                    console.error("[Contacts > ContactSource(".concat(source.sourceName, ") > matchContactsByPhoneNumber] ").concat(error));
                  });
                }));

              case 4:
                return _context4.abrupt("return", result);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function matchContactsByPhoneNumber(_x4) {
        return _matchContactsByPhoneNumber.apply(this, arguments);
      }

      return matchContactsByPhoneNumber;
    }()
  }, {
    key: "matchContacts",
    value: function () {
      var _matchContacts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref4) {
        var _this3 = this;

        var phoneNumbers, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                phoneNumbers = _ref4.phoneNumbers;
                result = {};
                _context5.next = 4;
                return Promise.all(phoneNumbers.map(function (phoneNumber) {
                  var promise = _this3.matchContactsByPhoneNumber(phoneNumber);

                  return promise.then(function (items) {
                    result[phoneNumber] = items;
                  });
                }));

              case 4:
                return _context5.abrupt("return", result);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function matchContacts(_x5) {
        return _matchContacts.apply(this, arguments);
      }

      return matchContacts;
    }()
  }, {
    key: "find",
    value: function find(_ref5) {
      var type = _ref5.type,
          id = _ref5.id;
      var contactId = (id || '').toString();

      var source = this._contactSources.get(type);

      if (source) {
        return source.contacts.find(function (x) {
          return x.id.toString() === contactId;
        });
      }

      return null;
    }
  }, {
    key: "getProfileImage",
    value: function () {
      var _getProfileImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(contact) {
        var useCache,
            source,
            result,
            _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                useCache = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : true;
                source = this._contactSources.get(contact && contact.type);

                if (!(source && source.getProfileImage)) {
                  _context6.next = 7;
                  break;
                }

                _context6.next = 5;
                return source.getProfileImage(contact, useCache);

              case 5:
                result = _context6.sent;
                return _context6.abrupt("return", result);

              case 7:
                return _context6.abrupt("return", null);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getProfileImage(_x6) {
        return _getProfileImage.apply(this, arguments);
      }

      return getProfileImage;
    }()
  }, {
    key: "getPresence",
    value: function () {
      var _getPresence = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(contact) {
        var useCache,
            source,
            result,
            _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                useCache = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : true;
                source = this._contactSources.get(contact && contact.type);

                if (!(source && source.getPresence)) {
                  _context7.next = 7;
                  break;
                }

                _context7.next = 5;
                return source.getPresence(contact, useCache);

              case 5:
                result = _context7.sent;
                return _context7.abrupt("return", result);

              case 7:
                return _context7.abrupt("return", null);

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getPresence(_x7) {
        return _getPresence.apply(this, arguments);
      }

      return getPresence;
    }()
  }, {
    key: "sync",
    value: function () {
      var _sync = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _i2,
            _Array$from2,
            sourceName,
            source,
            _args8 = arguments;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _i2 = 0, _Array$from2 = Array.from(this._contactSources.keys());

              case 1:
                if (!(_i2 < _Array$from2.length)) {
                  _context8.next = 10;
                  break;
                }

                sourceName = _Array$from2[_i2];
                source = this._contactSources.get(sourceName);

                if (!(typeof source.sync === 'function')) {
                  _context8.next = 7;
                  break;
                }

                _context8.next = 7;
                return source.sync.apply(source, _args8);

              case 7:
                _i2++;
                _context8.next = 1;
                break;

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function sync() {
        return _sync.apply(this, arguments);
      }

      return sync;
    }()
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "sourceModuleReady",
    get: function get() {
      var ready = true;

      for (var _i3 = 0, _Array$from3 = Array.from(this._contactSources.keys()); _i3 < _Array$from3.length; _i3++) {
        var sourceName = _Array$from3[_i3];

        var source = this._contactSources.get(sourceName);

        if (!source.ready) {
          ready = false;
        }
      }

      return ready;
    }
  }, {
    key: "companyContacts",
    get: function get() {
      var source = this._contactSources.get('company');

      if (source) {
        return source.contacts;
      }

      return [];
    }
  }, {
    key: "personalContacts",
    get: function get() {
      var source = this._contactSources.get('personal');

      if (source) {
        return source.contacts;
      }

      return [];
    }
  }, {
    key: "searchFilter",
    get: function get() {
      return this.state.searchFilter;
    }
  }, {
    key: "sourceFilter",
    get: function get() {
      return this.state.sourceFilter;
    }
  }]);

  return Contacts;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "updateFilter", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getProfileImage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfileImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sync", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "sync"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "sourceNames", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return [function () {
      return _this4._contactSources.size;
    }, function () {
      return _this4.checkSourceUpdated();
    }, function () {
      var names = [_contactHelper.AllContactSourceName];

      for (var _i4 = 0, _Array$from4 = Array.from(_this4._contactSources.keys()); _i4 < _Array$from4.length; _i4++) {
        var sourceName = _Array$from4[_i4];

        var source = _this4._contactSources.get(sourceName);

        if (source.sourceReady) {
          names.push(sourceName);
        }
      }

      return names;
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "allContacts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return [function () {
      return _this5.checkSourceUpdated();
    }, function () {
      var contacts = [];

      for (var _i5 = 0, _Array$from5 = Array.from(_this5._contactSources.keys()); _i5 < _Array$from5.length; _i5++) {
        var sourceName = _Array$from5[_i5];

        var source = _this5._contactSources.get(sourceName);

        if (source.sourceReady) {
          contacts = contacts.concat(source.contacts);
        }
      }

      return contacts;
    }];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "contactGroups", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return [function () {
      return _this6.filteredContacts;
    }, function (filteredContacts) {
      return (0, _contactHelper.groupByFirstLetterOfName)((0, _contactHelper.sortContactItemsByName)((0, _contactHelper.uniqueContactItems)(filteredContacts)));
    }];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "filteredContacts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return [function () {
      return _this7.searchFilter;
    }, function () {
      return _this7.sourceFilter;
    }, function () {
      return _this7.checkSourceUpdated();
    }, function (searchFilter, sourceFilter) {
      var contacts;

      if ((0, _isBlank["default"])(searchFilter) && (sourceFilter === _contactHelper.AllContactSourceName || (0, _isBlank["default"])(sourceFilter))) {
        return _this7.allContacts;
      }

      if (sourceFilter !== _contactHelper.AllContactSourceName && !(0, _isBlank["default"])(sourceFilter)) {
        var source = _this7._contactSources.get(sourceFilter);

        if (source && source.sourceReady) {
          /* eslint { "prefer-destructuring": 0 } */
          contacts = source.contacts;
        } else {
          contacts = [];
        }
      } else {
        contacts = _this7.allContacts;
      }

      if (!(0, _isBlank["default"])(searchFilter)) {
        contacts = (0, _contactHelper.getFilterContacts)(contacts, searchFilter);
      }

      return contacts;
    }];
  }
})), _class2)) || _class);
exports["default"] = Contacts;
//# sourceMappingURL=index.js.map
