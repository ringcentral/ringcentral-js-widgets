"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressBook = exports.DEFAULT_CONTACTS_PER_PAGE = exports.DEFAULT_FETCH_INTERVAL = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _ramda = require("ramda");

var _availabilityTypes = require("../../enums/availabilityTypes");

var _phoneSources = require("../../enums/phoneSources");

var _contactHelper = require("../../lib/contactHelper");

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _DataFetcherV = require("../DataFetcherV2");

var _helpers = require("./helpers");

var _dec, _dec2, _dec3, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var DEFAULT_FETCH_INTERVAL = 1000;
exports.DEFAULT_FETCH_INTERVAL = DEFAULT_FETCH_INTERVAL;
var DEFAULT_CONTACTS_PER_PAGE = 250;
exports.DEFAULT_CONTACTS_PER_PAGE = DEFAULT_CONTACTS_PER_PAGE;
var AddressBook = (_dec = (0, _di.Module)({
  name: 'AddressBook',
  deps: ['Client', 'ExtensionFeatures', 'DataFetcherV2', {
    dep: 'AddressBookOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var data = _ref2.data;
  return [data];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(AddressBook, _DataFetcherV2Consume);

  var _super = _createSuper(AddressBook);

  function AddressBook(deps) {
    var _this$_deps$AddressBo;

    var _this;

    _classCallCheck(this, AddressBook);

    _this = _super.call(this, {
      deps: deps
    });

    var _ref3 = (_this$_deps$AddressBo = _this._deps.AddressBookOptions) !== null && _this$_deps$AddressBo !== void 0 ? _this$_deps$AddressBo : {},
        _ref3$polling = _ref3.polling,
        polling = _ref3$polling === void 0 ? true : _ref3$polling;

    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, _this._deps.AddressBookOptions), {}, {
      key: 'addressBook',
      polling: polling,
      cleanOnReset: true,
      permissionCheckFunction: function permissionCheckFunction() {
        var _this$_deps$extension, _this$_deps$extension2;

        return (_this$_deps$extension = (_this$_deps$extension2 = _this._deps.extensionFeatures.features) === null || _this$_deps$extension2 === void 0 ? void 0 : _this$_deps$extension2.ReadPersonalContacts.available) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : false;
      },
      readyCheckFunction: function readyCheckFunction() {
        return _this._deps.extensionFeatures.ready;
      },
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", _this._sync());

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
      }()
    }));

    _this._deps.dataFetcherV2.register(_this._source);

    return _this;
  }

  _createClass(AddressBook, [{
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
        var updatedRecords = [];
        var processedIDMap = {};
        (0, _ramda.forEach)(function (record) {
          if (record.availability === _availabilityTypes.availabilityTypes.alive) {
            // Only keep entries that is 'alive', omit 'purged' and 'deleted'
            updatedRecords.push(record);
          }

          processedIDMap[record.id] = true;
        }, records);
        (0, _ramda.forEach)(function (record) {
          if (!processedIDMap[record.id]) {
            // record has no updates
            updatedRecords.push(record);
          }
        }, this.data.records);
        return updatedRecords;
      }

      return this.data.records;
    }
  }, {
    key: "_sync",
    value: function () {
      var _sync2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _response$records, syncToken, perPage, records, response, _response$records2, _error$response;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                syncToken = this.syncToken;
                perPage = this._perPage;
                records = [];
                _context3.next = 6;
                return this._fetch(perPage, syncToken);

              case 6:
                response = _context3.sent;
                records = records.concat((_response$records = response.records) !== null && _response$records !== void 0 ? _response$records : []);

              case 8:
                if (!response.nextPageId) {
                  _context3.next = 17;
                  break;
                }

                _context3.next = 11;
                return (0, _sleep["default"])(this._fetchInterval);

              case 11:
                _context3.next = 13;
                return this._fetch(perPage, syncToken, response.nextPageId);

              case 13:
                response = _context3.sent;
                records = records.concat((_response$records2 = response.records) !== null && _response$records2 !== void 0 ? _response$records2 : []);
                _context3.next = 8;
                break;

              case 17:
                if (response.syncInfo.syncType === 'ISync') {
                  records = this._processISyncData(records);
                }

                return _context3.abrupt("return", {
                  syncToken: response.syncInfo.syncToken,
                  records: records
                });

              case 21:
                _context3.prev = 21;
                _context3.t0 = _context3["catch"](0);

                if (!((_context3.t0 === null || _context3.t0 === void 0 ? void 0 : (_error$response = _context3.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 403)) {
                  _context3.next = 25;
                  break;
                }

                return _context3.abrupt("return", {});

              case 25:
                throw _context3.t0;

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 21]]);
      }));

      function _sync() {
        return _sync2.apply(this, arguments);
      }

      return _sync;
    }() // interface of ContactSource

  }, {
    key: "sync",
    value: function () {
      var _sync3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._deps.dataFetcherV2.fetchData(this._source);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
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
        entityType: _phoneSources.phoneSources.contact,
        options: null
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
    key: "_fetchInterval",
    get: function get() {
      var _this$_deps$AddressBo2, _this$_deps$AddressBo3;

      return (_this$_deps$AddressBo2 = (_this$_deps$AddressBo3 = this._deps.AddressBookOptions) === null || _this$_deps$AddressBo3 === void 0 ? void 0 : _this$_deps$AddressBo3.fetchInterval) !== null && _this$_deps$AddressBo2 !== void 0 ? _this$_deps$AddressBo2 : DEFAULT_FETCH_INTERVAL;
    }
  }, {
    key: "_perPage",
    get: function get() {
      var _this$_deps$AddressBo4, _this$_deps$AddressBo5;

      return (_this$_deps$AddressBo4 = (_this$_deps$AddressBo5 = this._deps.AddressBookOptions) === null || _this$_deps$AddressBo5 === void 0 ? void 0 : _this$_deps$AddressBo5.perPage) !== null && _this$_deps$AddressBo4 !== void 0 ? _this$_deps$AddressBo4 : DEFAULT_CONTACTS_PER_PAGE;
    }
  }, {
    key: "syncToken",
    get: function get() {
      var _this$data;

      return (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.syncToken;
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
          _this$data$records,
          _this$data2;

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
          if (key.toLocaleLowerCase().indexOf('phone') === -1 || typeof contact[key] !== 'string') {
            return;
          }

          (0, _contactHelper.addPhoneToContact)(contact, contact[key], key);
        }, Object.keys(contact));
        return contact;
      }, (_this$data$records = (_this$data2 = this.data) === null || _this$data2 === void 0 ? void 0 : _this$data2.records) !== null && _this$data$records !== void 0 ? _this$data$records : []);
    } // interface of ContactSource

  }, {
    key: "rawContacts",
    get: function get() {
      var _this$data$records2, _this$data3;

      return (_this$data$records2 = (_this$data3 = this.data) === null || _this$data3 === void 0 ? void 0 : _this$data3.records) !== null && _this$data$records2 !== void 0 ? _this$data$records2 : [];
    } // interface of ContactSource

  }, {
    key: "sourceReady",
    get: function get() {
      return this.ready;
    }
  }]);

  return AddressBook;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "sync", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "contacts", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "contacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rawContacts", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "rawContacts"), _class2.prototype)), _class2)) || _class);
exports.AddressBook = AddressBook;
//# sourceMappingURL=AddressBook.js.map
