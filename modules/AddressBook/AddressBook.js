"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.some");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.keys");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_FETCH_INTERVAL = exports.DEFAULT_CONTACTS_PER_PAGE = exports.AddressBook = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _ramda = require("ramda");
var _availabilityTypes = require("../../enums/availabilityTypes");
var _phoneSources = require("../../enums/phoneSources");
var _contactHelper = require("../../lib/contactHelper");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _DataFetcherV = require("../DataFetcherV2");
var _helpers = require("./helpers");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_FETCH_INTERVAL = 1000;
exports.DEFAULT_FETCH_INTERVAL = DEFAULT_FETCH_INTERVAL;
var DEFAULT_CONTACTS_PER_PAGE = 250;

// reference: https://developers.ringcentral.com/api-reference/External-Contacts/syncAddressBook
exports.DEFAULT_CONTACTS_PER_PAGE = DEFAULT_CONTACTS_PER_PAGE;
var INVALID_TOKEN_ERROR_CODES = [
// 400 CMN-101 Parameter [${parameterName}] value is invalid.
'CMN-101'];
var AddressBook = (_dec = (0, _di.Module)({
  name: 'AddressBook',
  deps: ['Client', 'ExtensionFeatures', 'DataFetcherV2', 'Storage', {
    dep: 'AddressBookOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var data = _ref2.data;
  return [data];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.contacts];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_ref3) {
  _inherits(AddressBook, _ref3);
  var _super = _createSuper(AddressBook);
  function AddressBook(deps) {
    var _deps$addressBookOpti, _deps$addressBookOpti2, _this$_deps$addressBo;
    var _this;
    _classCallCheck(this, AddressBook);
    _this = _super.call(this, {
      deps: deps,
      enableCache: !((_deps$addressBookOpti = (_deps$addressBookOpti2 = deps.addressBookOptions) === null || _deps$addressBookOpti2 === void 0 ? void 0 : _deps$addressBookOpti2.disableCache) !== null && _deps$addressBookOpti !== void 0 ? _deps$addressBookOpti : false),
      storageKey: 'AddressBook'
    });
    _initializerDefineProperty(_this, "addressBookData", _descriptor, _assertThisInitialized(_this));
    var _ref4 = (_this$_deps$addressBo = _this._deps.addressBookOptions) !== null && _this$_deps$addressBo !== void 0 ? _this$_deps$addressBo : {},
      _ref4$polling = _ref4.polling,
      polling = _ref4$polling === void 0 ? true : _ref4$polling;
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, _this._deps.addressBookOptions), {}, {
      key: 'addressBook',
      polling: polling,
      cleanOnReset: true,
      permissionCheckFunction: function permissionCheckFunction() {
        var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3;
        return (_this$_deps$extension = (_this$_deps$extension2 = _this._deps.extensionFeatures.features) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.ReadPersonalContacts) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.available) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : false;
      },
      readyCheckFunction: function readyCheckFunction() {
        return _this._deps.extensionFeatures.ready;
      },
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var data;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this._sync();
                case 2:
                  data = _context.sent;
                  _this.setAddressBookData(data);
                  return _context.abrupt("return", {});
                case 5:
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
      }()
    }));
    _this._deps.dataFetcherV2.register(_this._source);
    return _this;
  }
  _createClass(AddressBook, [{
    key: "setAddressBookData",
    value: function setAddressBookData(data) {
      this.addressBookData = data;
    }
  }, {
    key: "onInit",
    value: function onInit() {
      // for compatibility with old version cache
      var data = this._deps.dataFetcherV2.getData(this._source);
      if (data === null || data === void 0 ? void 0 : data.syncToken) {
        this._deps.dataFetcherV2.updateData(this._source, {}, Date.now());
        this.setAddressBookData(data);
      }
    } // just a workaround for the update performance issue
    // TODO: refactor with type
  }, {
    key: "_fetch",
    value: function () {
      var _fetch2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(perPage, syncToken, pageId) {
        var params;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = (0, _helpers.getSyncParams)({
                  perPage: perPage,
                  syncToken: syncToken,
                  pageId: pageId
                });
                _context2.t0 = _helpers.processAddressBookResponse;
                _context2.next = 4;
                return this._deps.client.account().extension().addressBookSync().list(params);
              case 4:
                _context2.t1 = _context2.sent;
                return _context2.abrupt("return", (0, _context2.t0)(_context2.t1));
              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _fetch(_x, _x2, _x3) {
        return _fetch2.apply(this, arguments);
      }
      return _fetch;
    }()
  }, {
    key: "_processISyncData",
    value: function _processISyncData(records) {
      if ((records === null || records === void 0 ? void 0 : records.length) > 0) {
        var _this$data$records, _this$data;
        var updatedRecords = [];
        // @ts-expect-error TS(2344): Type 'number | undefined' does not satisfy the con... Remove this comment to see the full error message
        var processedIDMap = {};
        (0, _ramda.forEach)(function (record) {
          if (record.availability === _availabilityTypes.availabilityTypes.alive) {
            // Only keep entries that is 'alive', omit 'purged' and 'deleted'
            updatedRecords.push(record);
          }
          // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
          processedIDMap[record.id] = true;
        }, records);
        (0, _ramda.forEach)(function (record) {
          // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
          if (!processedIDMap[record.id]) {
            // record has no updates
            updatedRecords.push(record);
          }
        }, (_this$data$records = (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.records) !== null && _this$data$records !== void 0 ? _this$data$records : []);
        return updatedRecords;
      }
      return this.data.records;
    }
  }, {
    key: "_fetchAll",
    value: function () {
      var _fetchAll2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(syncToken) {
        var _response$records;
        var perPage, records, response, _response$records2;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                perPage = this._perPage;
                records = [];
                _context3.next = 4;
                return this._fetch(perPage, syncToken);
              case 4:
                response = _context3.sent;
                records = records.concat((_response$records = response.records) !== null && _response$records !== void 0 ? _response$records : []);
              case 6:
                if (!response.nextPageId) {
                  _context3.next = 15;
                  break;
                }
                _context3.next = 9;
                return (0, _utils.sleep)(this._fetchInterval);
              case 9:
                _context3.next = 11;
                return this._fetch(perPage, syncToken, response.nextPageId);
              case 11:
                response = _context3.sent;
                records = records.concat((_response$records2 = response.records) !== null && _response$records2 !== void 0 ? _response$records2 : []);
                _context3.next = 6;
                break;
              case 15:
                if (response.syncInfo.syncType === 'ISync') {
                  // @ts-expect-error TS(2322): Type 'PersonalContactResource[] | undefined' is no... Remove this comment to see the full error message
                  records = this._processISyncData(records);
                }
                return _context3.abrupt("return", {
                  syncToken: response.syncInfo.syncToken,
                  records: records
                });
              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function _fetchAll(_x4) {
        return _fetchAll2.apply(this, arguments);
      }
      return _fetchAll;
    }()
  }, {
    key: "_sync",
    value: function () {
      var _sync2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var data, _error$response, _error$response2, _responseResult$error, _error$response3, error, responseResult, _data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this._fetchAll(this.syncToken);
              case 3:
                data = _context4.sent;
                return _context4.abrupt("return", data);
              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                error = _context4.t0; // 403 Forbidden
                if (!(((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 403)) {
                  _context4.next = 12;
                  break;
                }
                return _context4.abrupt("return", {});
              case 12:
                _context4.next = 14;
                return (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.clone().json();
              case 14:
                responseResult = _context4.sent;
                if (!(responseResult === null || responseResult === void 0 ? void 0 : (_responseResult$error = responseResult.errors) === null || _responseResult$error === void 0 ? void 0 : _responseResult$error.some(function () {
                  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    _ref5$errorCode = _ref5.errorCode,
                    errorCode = _ref5$errorCode === void 0 ? '' : _ref5$errorCode;
                  return INVALID_TOKEN_ERROR_CODES.includes(errorCode);
                }))) {
                  _context4.next = 20;
                  break;
                }
                _context4.next = 18;
                return this._fetchAll();
              case 18:
                _data = _context4.sent;
                return _context4.abrupt("return", _data);
              case 20:
                // exception
                console.error('[AddressBook] > _sync', (_error$response3 = error.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.status, error);
                throw error;
              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 7]]);
      }));
      function _sync() {
        return _sync2.apply(this, arguments);
      }
      return _sync;
    }() // interface of ContactSource
  }, {
    key: "sync",
    value: function () {
      var _sync3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._deps.dataFetcherV2.fetchData(this._source);
              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function sync() {
        return _sync3.apply(this, arguments);
      }
      return sync;
    }() // interface of ContactSource
  }, {
    key: "findContact",
    value: function findContact(contactId) {
      return this.contacts.find(function (x) {
        return x.id === contactId;
      });
    } // interface of ContactSource
  }, {
    key: "filterContacts",
    value: function filterContacts(searchFilter) {
      return (0, _contactHelper.getFilterContacts)(this.contacts, searchFilter);
    } // interface of ContactSource
  }, {
    key: "searchForPhoneNumbers",
    value: function searchForPhoneNumbers(searchString) {
      return (0, _contactHelper.getSearchForPhoneNumbers)({
        contacts: this.contacts,
        searchString: searchString,
        entityType: _phoneSources.phoneSources.contact
      });
    } // interface of ContactSource
  }, {
    key: "matchContactsByPhoneNumber",
    value: function matchContactsByPhoneNumber(phoneNumber) {
      return (0, _contactHelper.getMatchContactsByPhoneNumber)({
        contacts: this.contacts,
        phoneNumber: phoneNumber,
        entityType: _phoneSources.phoneSources.rcContact
      });
    } // interface of ContactSource
  }, {
    key: "data",
    get: function get() {
      return this.addressBookData;
    }
  }, {
    key: "_fetchInterval",
    get: function get() {
      var _this$_deps$addressBo2, _this$_deps$addressBo3;
      return (_this$_deps$addressBo2 = (_this$_deps$addressBo3 = this._deps.addressBookOptions) === null || _this$_deps$addressBo3 === void 0 ? void 0 : _this$_deps$addressBo3.fetchInterval) !== null && _this$_deps$addressBo2 !== void 0 ? _this$_deps$addressBo2 : DEFAULT_FETCH_INTERVAL;
    }
  }, {
    key: "_perPage",
    get: function get() {
      var _this$_deps$addressBo4, _this$_deps$addressBo5;
      return (_this$_deps$addressBo4 = (_this$_deps$addressBo5 = this._deps.addressBookOptions) === null || _this$_deps$addressBo5 === void 0 ? void 0 : _this$_deps$addressBo5.perPage) !== null && _this$_deps$addressBo4 !== void 0 ? _this$_deps$addressBo4 : DEFAULT_CONTACTS_PER_PAGE;
    }
  }, {
    key: "syncToken",
    get: function get() {
      var _this$data2;
      return (_this$data2 = this.data) === null || _this$data2 === void 0 ? void 0 : _this$data2.syncToken;
    }
  }, {
    key: "sourceName",
    get: function get() {
      return 'personal';
    } // interface of ContactSource
  }, {
    key: "contacts",
    get: function get() {
      var _this2 = this,
        _this$data$records2,
        _this$data3;
      return (0, _ramda.map)(function (rawContact) {
        var _rawContact$firstName, _rawContact$lastName;
        var contact = _objectSpread(_objectSpread({}, rawContact), {}, {
          type: _this2.sourceName,
          phoneNumbers: [],
          emails: [],
          id: "".concat(rawContact.id),
          name: "".concat((_rawContact$firstName = rawContact.firstName) !== null && _rawContact$firstName !== void 0 ? _rawContact$firstName : '', " ").concat((_rawContact$lastName = rawContact.lastName) !== null && _rawContact$lastName !== void 0 ? _rawContact$lastName : '')
        });
        if (rawContact.email) {
          contact.emails.push(rawContact.email);
        }
        if (rawContact.email2) {
          contact.emails.push(rawContact.email2);
        }
        if (rawContact.email3) {
          contact.emails.push(rawContact.email3);
        }
        (0, _ramda.forEach)(function (key) {
          if (/Phone|Fax/.test(key) && typeof contact[key] === 'string') {
            (0, _contactHelper.addPhoneToContact)(contact, contact[key], key);
          }
        }, Object.keys(contact));
        return contact;
      }, (_this$data$records2 = (_this$data3 = this.data) === null || _this$data3 === void 0 ? void 0 : _this$data3.records) !== null && _this$data$records2 !== void 0 ? _this$data$records2 : []);
    } // interface of ContactSource
  }, {
    key: "rawContacts",
    get: function get() {
      var _this$data$records3, _this$data4;
      return (_this$data$records3 = (_this$data4 = this.data) === null || _this$data4 === void 0 ? void 0 : _this$data4.records) !== null && _this$data$records3 !== void 0 ? _this$data$records3 : [];
    }
  }, {
    key: "rcPersonalMapping",
    get: function get() {
      var rcPersonalMapping = {};
      this.contacts.forEach(function (item) {
        rcPersonalMapping[item.id] = item;
      });
      return rcPersonalMapping;
    } // interface of ContactSource
  }, {
    key: "sourceReady",
    get: function get() {
      return this.ready;
    }
  }]);
  return AddressBook;
}(_DataFetcherV.DataFetcherV2Consumer), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "addressBookData", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setAddressBookData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAddressBookData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sync", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "contacts", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "contacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rawContacts", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "rawContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rcPersonalMapping", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "rcPersonalMapping"), _class2.prototype)), _class2)) || _class);
exports.AddressBook = AddressBook;
//# sourceMappingURL=AddressBook.js.map
