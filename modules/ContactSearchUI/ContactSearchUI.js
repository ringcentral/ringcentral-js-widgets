"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSearchUI = void 0;
require("regenerator-runtime/runtime");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _debounceThrottle = require("@ringcentral-integration/commons/lib/debounce-throttle");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _ContactSearchHelper = require("./ContactSearchHelper");
var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
var ContactSearchUI = (_dec = (0, _di.Module)({
  name: 'ContactSearchUI',
  deps: ['Locale', 'AccountContacts', 'AddressBook', 'RegionSettings', 'AccountInfo', 'RouterInteraction', 'Contacts', {
    dep: 'ContactSearch',
    optional: true
  }, {
    dep: 'ContactSearchUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.filterString, that._deps.accountContacts.contacts];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.filterString, that._deps.addressBook.contacts];
}), _dec4 = (0, _core.computed)(function (that) {
  var _that$_deps$contactSe;
  return [(_that$_deps$contactSe = that._deps.contactSearch) === null || _that$_deps$contactSe === void 0 ? void 0 : _that$_deps$contactSe.searchResult];
}), _dec5 = (0, _core.track)(function (that, tab) {
  return [that._deps.routerInteraction.currentPath === '/dialer' ? _trackEvents.trackEvents.changeDailerDirectoryTab : _trackEvents.trackEvents.changeSMSDirectoryTab, {
    tab: tab
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ContactSearchUI, _RcUIModuleV);
  var _super = _createSuper(ContactSearchUI);
  function ContactSearchUI(deps) {
    var _this$_deps, _this$_deps$contactSe;
    var _this;
    _classCallCheck(this, ContactSearchUI);
    _this = _super.call(this, {
      deps: deps
    });
    _this._companyContactsCache = {};
    _this._personalContactsCache = {};
    _this._minimumSearchLength = void 0;
    _this._companyContacts = void 0;
    _initializerDefineProperty(_this, "filterString", _descriptor, _assertThisInitialized(_this));
    _this._debouncedSetFilterString = (0, _debounceThrottle.debounce)({
      fn: _this._setFilterString,
      threshold: 800
    });
    _this._debouncedGetCompanyExtraInfoByIds = (0, _debounceThrottle.debounce)({
      fn: _this.getCompanyExtraInfoByIds,
      threshold: 500
    });
    _this.formatPhone = function (phoneNumber) {
      return (0, _formatNumber.formatNumber)({
        phoneNumber: phoneNumber,
        areaCode: _this._deps.regionSettings.areaCode,
        countryCode: _this._deps.regionSettings.countryCode,
        maxExtensionLength: _this._deps.accountInfo.maxExtensionNumberLength
      });
    };
    _this._minimumSearchLength = (_this$_deps = _this._deps) === null || _this$_deps === void 0 ? void 0 : (_this$_deps$contactSe = _this$_deps.contactSearch) === null || _this$_deps$contactSe === void 0 ? void 0 : _this$_deps$contactSe.minimalSearchLength;
    _this._companyContacts = _this._deps.accountContacts.contacts;
    return _this;
  }
  _createClass(ContactSearchUI, [{
    key: "_setFilterString",
    value: function _setFilterString(filterString) {
      this.filterString = filterString;
    }
  }, {
    key: "getFilteredCompanyContacts",
    value: function getFilteredCompanyContacts() {
      var searchFilter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var lowCaseString = searchFilter.toLowerCase();
      if (this._companyContacts !== this._deps.accountContacts.contacts) {
        this._companyContacts = this._deps.accountContacts.contacts;
      } else if (this._companyContactsCache[lowCaseString]) {
        return this._companyContactsCache[lowCaseString];
      }
      var result = (0, _ContactSearchHelper.getRcFilteredContacts)({
        lowCaseString: lowCaseString,
        contacts: this._deps.accountContacts.contacts
      });
      this._companyContactsCache[lowCaseString] = result;
      return result;
    }
  }, {
    key: "getFilteredPersonalContacts",
    value: function getFilteredPersonalContacts() {
      var searchFilter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var lowCaseString = searchFilter.toLowerCase();
      if (this._personalContactsCache[lowCaseString]) {
        return this._personalContactsCache[lowCaseString];
      }
      var result = (0, _ContactSearchHelper.getRcFilteredContacts)({
        lowCaseString: lowCaseString,
        contacts: this._deps.addressBook.contacts
      });
      this._personalContactsCache[lowCaseString] = result;
      return result;
    }
  }, {
    key: "changeTabTrack",
    value: function changeTabTrack(tab) {}
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _core.watch)(this, function () {
        return _this2._deps.addressBook.contacts;
      }, function () {
        _this2._personalContactsCache = {};
      });
      (0, _core.watch)(this, function () {
        return _this2._deps.accountContacts.contacts;
      }, function () {
        _this2._companyContactsCache = {};
      });
    }
  }, {
    key: "getCompanyExtraInfoByIds",
    value: function getCompanyExtraInfoByIds(ids) {
      for (var i = 0; i < ids.length; i++) {
        var contact = this._deps.accountContacts.rcCompanyMapping[ids[i]];
        if (contact) {
          this._deps.accountContacts.getProfileImage(contact);
        }
      }
    }
  }, {
    key: "getPresence",
    value: function () {
      var _getPresence = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(contact) {
        var useCache,
          presence,
          _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                useCache = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
                _context.next = 3;
                return this._deps.contacts.getPresence(contact, useCache);
              case 3:
                presence = _context.sent;
                return _context.abrupt("return", presence);
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function getPresence(_x) {
        return _getPresence.apply(this, arguments);
      }
      return getPresence;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_deps$contactSe2, _this$_deps$contactSe3, _this$_deps$contactSe4;
      var userInput = _ref.userInput,
        inputRef = _ref.inputRef,
        directlyProceedText = _ref.directlyProceedText;
      // @ts-expect-error TS(2741): Property 'thirdPartySourceName' is missing in type... Remove this comment to see the full error message
      return {
        currentLocale: this._deps.locale.currentLocale,
        companyContacts: this.companyContacts,
        personalContacts: this.personalContacts,
        userInput: userInput,
        inputRef: inputRef,
        centered: (_this$_deps$contactSe2 = (_this$_deps$contactSe3 = this._deps.contactSearchUIOptions) === null || _this$_deps$contactSe3 === void 0 ? void 0 : _this$_deps$contactSe3.centered) !== null && _this$_deps$contactSe2 !== void 0 ? _this$_deps$contactSe2 : false,
        minimumSearchLength: this._minimumSearchLength,
        thirdPartyContacts: this.searchContactList,
        isThirdPartySearching: !((_this$_deps$contactSe4 = this._deps.contactSearch) === null || _this$_deps$contactSe4 === void 0 ? void 0 : _this$_deps$contactSe4.isIdle),
        directlyProceedText: directlyProceedText
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this3 = this;
      var optionClickHandler = _ref2.optionClickHandler;
      return {
        optionClickHandler: optionClickHandler,
        searchHandler: function () {
          var _searchHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchString) {
            var _this3$_deps$contactS;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return (_this3$_deps$contactS = _this3._deps.contactSearch) === null || _this3$_deps$contactS === void 0 ? void 0 : _this3$_deps$contactS.debouncedSearch({
                      searchString: searchString
                    });
                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));
          function searchHandler(_x2) {
            return _searchHandler.apply(this, arguments);
          }
          return searchHandler;
        }(),
        setFilterString: function setFilterString(filterString) {
          _this3._debouncedSetFilterString(filterString);
          if (_this3._minimumSearchLength !== undefined && filterString.length >= _this3._minimumSearchLength) {
            var _this3$_deps$contactS2, _this3$_deps$contactS3;
            (_this3$_deps$contactS2 = _this3._deps.contactSearch) === null || _this3$_deps$contactS2 === void 0 ? void 0 : _this3$_deps$contactS2.setPrepareSearch();
            (_this3$_deps$contactS3 = _this3._deps.contactSearch) === null || _this3$_deps$contactS3 === void 0 ? void 0 : _this3$_deps$contactS3.debouncedSearch({
              searchString: filterString
            });
          }
        },
        // @ts-expect-error TS(2322): Type '(phoneNumber: string) => string | null | und... Remove this comment to see the full error message
        formatPhone: this.formatPhone,
        changeTabTrack: function changeTabTrack(v) {
          _this3.changeTabTrack(v);
        },
        getCompanyExtraInfoByIds: function getCompanyExtraInfoByIds(ids) {
          return _this3._debouncedGetCompanyExtraInfoByIds(ids);
        },
        getPresence: function getPresence(contact, useCache) {
          return _this3.getPresence(contact, useCache);
        }
      };
    }
  }, {
    key: "companyContacts",
    get: function get() {
      return this.getFilteredCompanyContacts(this.filterString);
    }
  }, {
    key: "personalContacts",
    get: function get() {
      return this.getFilteredPersonalContacts(this.filterString);
    }
  }, {
    key: "searchContactList",
    get: function get() {
      var _this$_deps$contactSe5;
      return (_this$_deps$contactSe5 = this._deps.contactSearch) === null || _this$_deps$contactSe5 === void 0 ? void 0 : _this$_deps$contactSe5.searchResult.slice(0, 500);
    }
  }]);
  return ContactSearchUI;
}(_core.RcUIModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "filterString", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setFilterString", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setFilterString"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "companyContacts", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "companyContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "personalContacts", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "personalContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchContactList", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "searchContactList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeTabTrack", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "changeTabTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype)), _class2)) || _class);
exports.ContactSearchUI = ContactSearchUI;
//# sourceMappingURL=ContactSearchUI.js.map
