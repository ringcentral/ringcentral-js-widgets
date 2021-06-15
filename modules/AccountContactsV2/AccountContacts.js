"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountContacts = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.now");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

var _core = require("@ringcentral-integration/core");

var _ramda = require("ramda");

var _phoneSources = require("../../enums/phoneSources");

var _phoneTypes = require("../../enums/phoneTypes");

var _batchApiHelper = require("../../lib/batchApiHelper");

var _contactHelper = require("../../lib/contactHelper");

var _di = require("../../lib/di");

var _isBlank = _interopRequireDefault(require("../../lib/isBlank"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var MaximumBatchGetPresence = 30;
var DEFAULT_TTL = 30 * 60 * 1000; // 30 mins

var DEFAULT_PRESENCETTL = 10 * 60 * 1000; // 10 mins

var DEFAULT_AVATARTTL = 2 * 60 * 60 * 1000; // 2 hour

var DEFAULT_AVATARQUERYINTERVAL = 2 * 1000; // 2 seconds

var AccountContacts = (_dec = (0, _di.Module)({
  name: 'AccountContacts',
  deps: ['Client', 'ExtensionInfo', {
    dep: 'CompanyContacts'
  }, {
    dep: 'AccountContactsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var _deps = _ref._deps,
      presences = _ref.presences,
      profileImages = _ref.profileImages;
  return [_deps.companyContacts.filteredContacts, profileImages, presences];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.companyContacts.filteredContacts];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(AccountContacts, _RcModuleV);

  var _super = _createSuper(AccountContacts);

  function AccountContacts(deps) {
    var _this;

    _classCallCheck(this, AccountContacts);

    _this = _super.call(this, {
      deps: deps
    });
    _this._getPresenceContexts = void 0;
    _this._enqueueTimeoutId = void 0;

    _initializerDefineProperty(_this, "profileImages", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "presences", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(AccountContacts, [{
    key: "fetchImageSuccess",
    value: function fetchImageSuccess(_ref2) {
      var _this2 = this;

      var imageId = _ref2.imageId,
          imageUrl = _ref2.imageUrl,
          ttl = _ref2.ttl;
      var data = {};
      Object.keys(this.profileImages).forEach(function (key) {
        if (Date.now() - _this2.profileImages[key].timestamp < ttl) {
          data[key] = _this2.profileImages[key];
        } else {
          URL.revokeObjectURL(_this2.profileImages[key].imageUrl);
        }
      });
      this.profileImages = data;
      this.profileImages[imageId] = {
        imageUrl: imageUrl,
        timestamp: Date.now()
      };
    }
  }, {
    key: "batchFetchPresenceSuccess",
    value: function batchFetchPresenceSuccess(_ref3) {
      var _this3 = this;

      var _ref3$presenceMap = _ref3.presenceMap,
          presenceMap = _ref3$presenceMap === void 0 ? {} : _ref3$presenceMap,
          ttl = _ref3.ttl;
      var data = {};
      Object.keys(this.presences).forEach(function (key) {
        if (Date.now() - _this3.presences[key].timestamp < ttl) {
          data[key] = _this3.presences[key];
        }
      });
      this.presences = data;
      Object.keys(presenceMap).forEach(function (key) {
        _this3.presences[key] = {
          presence: presenceMap[key],
          timestamp: Date.now()
        };
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this4 = this;

      Object.keys(this.profileImages).forEach(function (key) {
        URL.revokeObjectURL(_this4.profileImages[key].imageUrl);
      });
      this.profileImages = {};
      this.presences = {};
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.companyContacts.ready && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !this._deps.companyContacts.ready && this.ready;
    } // interface of ContactSource

  }, {
    key: "getProfileImage",
    value: function () {
      var _getProfileImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(contact) {
        var useCache,
            imageId,
            image,
            imageUrl,
            response,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                useCache = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;

                if (!(!contact || !contact.id || contact.type !== 'company' || !contact.hasProfileImage)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", null);

              case 3:
                imageId = contact.id;

                if (!(useCache && this.profileImages[imageId] && Date.now() - this.profileImages[imageId].timestamp < this._avatarTtl)) {
                  _context.next = 7;
                  break;
                }

                image = this.profileImages[imageId].imageUrl;
                return _context.abrupt("return", image);

              case 7:
                imageUrl = null;
                _context.prev = 8;
                _context.next = 11;
                return this._deps.client.account(contact.account.id).extension(contact.id).profileImage('195x195').get();

              case 11:
                response = _context.sent;
                _context.t0 = URL;
                _context.next = 15;
                return response.blob();

              case 15:
                _context.t1 = _context.sent;
                imageUrl = _context.t0.createObjectURL.call(_context.t0, _context.t1);
                this.fetchImageSuccess({
                  imageId: imageId,
                  imageUrl: imageUrl,
                  ttl: this._avatarTtl
                });
                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t2 = _context["catch"](8);
                console.error(_context.t2);

              case 23:
                return _context.abrupt("return", imageUrl);

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 20]]);
      }));

      function getProfileImage(_x) {
        return _getProfileImage.apply(this, arguments);
      }

      return getProfileImage;
    }() // interface of ContactSource

  }, {
    key: "getPresence",
    value: function getPresence(contact) {
      var _this5 = this;

      var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return new Promise(function (resolve) {
        if (!contact || !contact.id || contact.type !== 'company') {
          resolve(null);
          return;
        }

        var presenceId = "".concat(contact.id);

        if (useCache && _this5.presences[presenceId] && Date.now() - _this5.presences[presenceId].timestamp < _this5._presenceTtl) {
          var presence = _this5.presences[presenceId].presence;
          resolve(presence);
          return;
        }

        if (!_this5._getPresenceContexts) {
          _this5._getPresenceContexts = [];
        }

        _this5._getPresenceContexts.push({
          contact: contact,
          resolve: resolve
        });

        clearTimeout(_this5._enqueueTimeoutId);

        if (_this5._getPresenceContexts.length === MaximumBatchGetPresence) {
          _this5._processQueryPresences(_this5._getPresenceContexts);

          _this5._getPresenceContexts = null;
        } else {
          _this5._enqueueTimeoutId = setTimeout(function () {
            _this5._processQueryPresences(_this5._getPresenceContexts);

            _this5._getPresenceContexts = null;
          }, 1000);
        }
      });
    } // interface of ContactSource

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
      return (0, _contactHelper.getFilterContacts)(this.isCDCEnabled ? this.directoryContacts.cdc : this.directoryContacts.all, searchFilter);
    } // interface of ContactSource

  }, {
    key: "searchForPhoneNumbers",
    value: function searchForPhoneNumbers(searchString) {
      var _this$_deps$extension = this._deps.extensionInfo,
          isMultipleSiteEnabled = _this$_deps$extension.isMultipleSiteEnabled,
          site = _this$_deps$extension.site;
      return (0, _contactHelper.getSearchForPhoneNumbers)({
        contacts: this.isCDCEnabled ? this.directoryContacts.cdc : this.directoryContacts.all,
        searchString: searchString,
        entityType: _phoneSources.phoneSources.contact,
        options: {
          isMultipleSiteEnabled: isMultipleSiteEnabled,
          siteCode: site === null || site === void 0 ? void 0 : site.code
        }
      });
    } // interface of ContactSource

  }, {
    key: "matchContactsByPhoneNumber",
    value: function matchContactsByPhoneNumber(phoneNumber) {
      var _this$_deps$extension2 = this._deps.extensionInfo,
          isMultipleSiteEnabled = _this$_deps$extension2.isMultipleSiteEnabled,
          site = _this$_deps$extension2.site;
      return (0, _contactHelper.getMatchContactsByPhoneNumber)({
        contacts: [].concat(_toConsumableArray(this.contacts), _toConsumableArray(this._deps.companyContacts.ivrContacts)),
        phoneNumber: phoneNumber,
        entityType: _phoneSources.phoneSources.rcContact,
        findPhoneNumber: (0, _contactHelper.getFindPhoneNumber)({
          phoneNumber: phoneNumber,
          options: {
            isMultipleSiteEnabled: isMultipleSiteEnabled,
            siteCode: site === null || site === void 0 ? void 0 : site.code
          }
        })
      });
    }
  }, {
    key: "_processQueryPresences",
    value: function () {
      var _processQueryPresences2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(getPresenceContexts) {
        var contacts, responses, presenceMap;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                contacts = getPresenceContexts.map(function (x) {
                  return x.contact;
                });
                _context2.next = 3;
                return this._batchQueryPresences(contacts);

              case 3:
                responses = _context2.sent;
                presenceMap = {};
                getPresenceContexts.forEach(function (ctx) {
                  var response = responses[ctx.contact.id];

                  if (!response) {
                    ctx.resolve(null);
                    return;
                  }

                  var dndStatus = response.dndStatus,
                      presenceStatus = response.presenceStatus,
                      telephonyStatus = response.telephonyStatus,
                      userStatus = response.userStatus;
                  var presenceId = ctx.contact.id;
                  presenceMap[presenceId] = {
                    dndStatus: dndStatus,
                    presenceStatus: presenceStatus,
                    telephonyStatus: telephonyStatus,
                    userStatus: userStatus
                  };
                  ctx.resolve(presenceMap[presenceId]);
                });
                this.batchFetchPresenceSuccess({
                  presenceMap: presenceMap,
                  ttl: this._presenceTtl
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _processQueryPresences(_x2) {
        return _processQueryPresences2.apply(this, arguments);
      }

      return _processQueryPresences;
    }()
  }, {
    key: "_batchQueryPresences",
    value: function () {
      var _batchQueryPresences2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(contacts) {
        var _this6 = this;

        var presenceSet, accountExtensionMap, batchResponses;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                presenceSet = {};
                _context5.prev = 1;
                accountExtensionMap = (0, _ramda.reduce)(function (acc, item) {
                  if (!acc[item.account.id]) {
                    acc[item.account.id] = [];
                  }

                  acc[item.account.id].push(item.id);
                  return acc;
                }, {}, contacts);
                _context5.next = 5;
                return Promise.all((0, _ramda.map)( /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(accountId) {
                    var ids;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!(accountExtensionMap[accountId].length > 1)) {
                              _context4.next = 10;
                              break;
                            }

                            ids = (0, _ramda.join)(',', accountExtensionMap[accountId]); // extract json data now so the data appears in the same format
                            // as single requests

                            _context4.t0 = Promise;
                            _context4.t1 = _ramda.map;

                            _context4.t2 = /*#__PURE__*/function () {
                              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resp) {
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                  while (1) {
                                    switch (_context3.prev = _context3.next) {
                                      case 0:
                                        return _context3.abrupt("return", resp.json());

                                      case 1:
                                      case "end":
                                        return _context3.stop();
                                    }
                                  }
                                }, _callee3);
                              }));

                              return function (_x5) {
                                return _ref5.apply(this, arguments);
                              };
                            }();

                            _context4.next = 7;
                            return (0, _batchApiHelper.batchGetApi)({
                              platform: _this6._deps.client.service.platform(),
                              url: "/restapi/v1.0/account/".concat(accountId, "/extension/").concat(ids, "/presence")
                            });

                          case 7:
                            _context4.t3 = _context4.sent;
                            _context4.t4 = (0, _context4.t1)(_context4.t2, _context4.t3);
                            return _context4.abrupt("return", _context4.t0.all.call(_context4.t0, _context4.t4));

                          case 10:
                            _context4.next = 12;
                            return _this6._deps.client.account(accountId).extension(accountExtensionMap[accountId][0]).presence().get();

                          case 12:
                            _context4.t5 = _context4.sent;
                            return _context4.abrupt("return", [_context4.t5]);

                          case 14:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x4) {
                    return _ref4.apply(this, arguments);
                  };
                }(), (0, _ramda.keys)(accountExtensionMap)));

              case 5:
                batchResponses = _context5.sent;
                // treat all data as batch since the data is normalized
                (0, _ramda.forEach)(function (batch) {
                  return (0, _ramda.forEach)(function (data) {
                    if (data.errorCode) {
                      console.warn(data);
                      return;
                    }

                    var _data = data;
                    var id = _data.extension.id;
                    presenceSet[id] = _data;
                  }, batch);
                }, batchResponses);
                _context5.next = 12;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](1);
                console.error(_context5.t0);

              case 12:
                return _context5.abrupt("return", presenceSet);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 9]]);
      }));

      function _batchQueryPresences(_x3) {
        return _batchQueryPresences2.apply(this, arguments);
      }

      return _batchQueryPresences;
    }() // interface of ContactSource

  }, {
    key: "_ttl",
    get: function get() {
      var _this$_deps$accountCo, _this$_deps$accountCo2;

      return (_this$_deps$accountCo = (_this$_deps$accountCo2 = this._deps.accountContactsOptions) === null || _this$_deps$accountCo2 === void 0 ? void 0 : _this$_deps$accountCo2.ttl) !== null && _this$_deps$accountCo !== void 0 ? _this$_deps$accountCo : DEFAULT_TTL;
    }
  }, {
    key: "_avatarTtl",
    get: function get() {
      var _this$_deps$accountCo3, _this$_deps$accountCo4;

      return (_this$_deps$accountCo3 = (_this$_deps$accountCo4 = this._deps.accountContactsOptions) === null || _this$_deps$accountCo4 === void 0 ? void 0 : _this$_deps$accountCo4.avatarTtl) !== null && _this$_deps$accountCo3 !== void 0 ? _this$_deps$accountCo3 : DEFAULT_AVATARTTL;
    }
  }, {
    key: "_presenceTtl",
    get: function get() {
      var _this$_deps$accountCo5, _this$_deps$accountCo6;

      return (_this$_deps$accountCo5 = (_this$_deps$accountCo6 = this._deps.accountContactsOptions) === null || _this$_deps$accountCo6 === void 0 ? void 0 : _this$_deps$accountCo6.presenceTtl) !== null && _this$_deps$accountCo5 !== void 0 ? _this$_deps$accountCo5 : DEFAULT_PRESENCETTL;
    }
  }, {
    key: "_avatarQueryInterval",
    get: function get() {
      var _this$_deps$accountCo7, _this$_deps$accountCo8;

      return (_this$_deps$accountCo7 = (_this$_deps$accountCo8 = this._deps.accountContactsOptions) === null || _this$_deps$accountCo8 === void 0 ? void 0 : _this$_deps$accountCo8.avatarQueryInterval) !== null && _this$_deps$accountCo7 !== void 0 ? _this$_deps$accountCo7 : DEFAULT_AVATARQUERYINTERVAL;
    }
  }, {
    key: "isCDCEnabled",
    get: function get() {
      var _this$_deps$accountCo9, _this$_deps$accountCo10;

      // TODO: default to true when cdc feature is ready for production.
      return (_this$_deps$accountCo9 = (_this$_deps$accountCo10 = this._deps.accountContactsOptions) === null || _this$_deps$accountCo10 === void 0 ? void 0 : _this$_deps$accountCo10.enableCDC) !== null && _this$_deps$accountCo9 !== void 0 ? _this$_deps$accountCo9 : false;
    }
  }, {
    key: "sourceName",
    get: function get() {
      return 'company';
    } // interface of ContactSource

  }, {
    key: "directoryContacts",
    get: function get() {
      var _this7 = this;

      return (0, _ramda.reduce)(function (result, item) {
        if (!(0, _isBlank["default"])(item.extensionNumber)) {
          var id = "".concat(item.id);

          var contact = _objectSpread(_objectSpread({}, item), {}, {
            type: _this7.sourceName,
            id: id,
            name: item.name ? item.name : "".concat(item.firstName || '', " ").concat(item.lastName || ''),
            emails: [item.email],
            extensionNumber: item.extensionNumber,
            hasProfileImage: !!item.profileImage,
            phoneNumbers: [{
              phoneNumber: item.extensionNumber,
              phoneType: _phoneTypes.phoneTypes.extension
            }],
            profileImageUrl: _this7.profileImages[id] && _this7.profileImages[id].imageUrl,
            presence: _this7.presences[id] && _this7.presences[id].presence,
            contactStatus: item.status
          });

          if (item.phoneNumbers && item.phoneNumbers.length > 0) {
            item.phoneNumbers.forEach(function (phone) {
              if (phone.type) {
                contact.phoneNumbers.push(_objectSpread(_objectSpread({}, phone), {}, {
                  phoneType: _phoneTypes.phoneTypes.direct
                }));
              }
            });
          }

          result.all.push(contact);

          if (!contact.hidden) {
            var _contact$phoneNumbers;

            var cdcContact = _objectSpread(_objectSpread({}, contact), {}, {
              phoneNumbers: (0, _ramda.filter)(function (number) {
                return !number.hidden;
              }, (_contact$phoneNumbers = contact.phoneNumbers) !== null && _contact$phoneNumbers !== void 0 ? _contact$phoneNumbers : [])
            });

            result.cdc.push(cdcContact);
          }
        }

        return result;
      }, {
        all: [],
        cdc: []
      }, this._deps.companyContacts.filteredContacts);
    } // interface of ContactSource

  }, {
    key: "contacts",
    get: function get() {
      return this.directoryContacts.all;
    } // interface of ContactSource

  }, {
    key: "rawContacts",
    get: function get() {
      return this._deps.companyContacts.filteredContacts;
    } // interface of ContactSource

  }, {
    key: "sourceReady",
    get: function get() {
      return this.ready;
    }
  }]);

  return AccountContacts;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "profileImages", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "presences", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "fetchImageSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchImageSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "batchFetchPresenceSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "batchFetchPresenceSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onReset", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "onReset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getProfileImage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfileImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "directoryContacts", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "directoryContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rawContacts", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "rawContacts"), _class2.prototype)), _class2)) || _class);
exports.AccountContacts = AccountContacts;
//# sourceMappingURL=AccountContacts.js.map
