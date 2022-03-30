"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSearchUI = void 0;

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.regexp.search");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.date.now");

var _di = require("@ringcentral-integration/commons/lib/di");

var _core = require("@ringcentral-integration/core");

var _debounceThrottle = require("@ringcentral-integration/commons/lib/debounce-throttle");

var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");

var _dec, _dec2, _dec3, _class, _class2, _descriptor;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var ContactSearchUI = (_dec = (0, _di.Module)({
  name: 'ContactSearchUI',
  deps: ['Locale', 'AccountContacts', 'AddressBook', 'RegionSettings', {
    dep: 'ContactSearch',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var filterString = _ref.filterString;
  return [filterString];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var filterString = _ref2.filterString;
  return [filterString];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ContactSearchUI, _RcUIModuleV);

  var _super = _createSuper(ContactSearchUI);

  function ContactSearchUI(deps) {
    var _this;

    _classCallCheck(this, ContactSearchUI);

    _this = _super.call(this, {
      deps: deps
    });
    _this._companyContactsCache = {};
    _this._personalContactsCache = {};

    _initializerDefineProperty(_this, "filterString", _descriptor, _assertThisInitialized(_this));

    _this._debouncedSetFilterString = (0, _debounceThrottle.debounce)({
      fn: _this._setFilterString,
      threshold: 800
    });

    _this.formatPhone = function (phoneNumber) {
      return (0, _formatNumber.formatNumber)({
        phoneNumber: phoneNumber,
        areaCode: _this._deps.regionSettings.areaCode,
        countryCode: _this._deps.regionSettings.countryCode
      });
    };

    return _this;
  }

  _createClass(ContactSearchUI, [{
    key: "_setFilterString",
    value: function _setFilterString(filterString) {
      this.filterString = filterString;
    }
  }, {
    key: "getFilteredCompanyContacts",
    value: function getFilteredCompanyContacts(searchFilter) {
      var lowCaseString = searchFilter.toLowerCase();

      if (this._companyContactsCache[lowCaseString]) {
        return this._companyContactsCache[lowCaseString];
      }

      var startTime = Date.now();

      var filterResult = this._deps.accountContacts.filterContacts(lowCaseString);

      var accountFilterEnd = Date.now();
      var maps = filterResult.map(function (_ref3) {
        var id = _ref3.id,
            name = _ref3.name,
            phoneNumbers = _ref3.phoneNumbers,
            type = _ref3.type;
        var isNameInclude = name.toLowerCase().includes(lowCaseString);
        var filteredNumbers = isNameInclude ? phoneNumbers : phoneNumbers.filter(function (_ref4) {
          var phoneNumber = _ref4.phoneNumber;
          return phoneNumber.includes(lowCaseString);
        });
        return filteredNumbers.map(function (_ref5, index) {
          var phoneType = _ref5.phoneType,
              phoneNumber = _ref5.phoneNumber;
          return {
            id: id,
            name: name,
            type: type,
            phoneType: phoneType,
            phoneNumber: phoneNumber,
            isPrimary: index === 0
          };
        });
      });
      var result = maps.reduce(function (accumulator, currentValue) {
        return accumulator.concat(currentValue);
      }, []);
      var formatFilterEnd = Date.now();
      var accountFilterTime = ((accountFilterEnd - startTime) / 1000).toFixed(2);
      var formatFilterTime = ((formatFilterEnd - accountFilterEnd) / 1000).toFixed(2);
      console.log("exec time Company: ".concat(accountFilterTime, " s, and ui filter: ").concat(formatFilterTime));
      this._companyContactsCache[lowCaseString] = result;
      return result;
    }
  }, {
    key: "getFilteredPersonalContacts",
    value: function getFilteredPersonalContacts(searchFilter) {
      var lowCaseString = searchFilter.toLowerCase();

      if (this._personalContactsCache[lowCaseString]) {
        return this._personalContactsCache[lowCaseString];
      }

      var filterResult = this._deps.addressBook.filterContacts(lowCaseString);

      var maps = filterResult.map(function (_ref6) {
        var id = _ref6.id,
            name = _ref6.name,
            phoneNumbers = _ref6.phoneNumbers,
            type = _ref6.type;
        // const uniqueTypeNumbers = uniqBy((item) => item.phoneType, phoneNumbers);
        var isNameInclude = name.toLowerCase().includes(lowCaseString);
        var filteredNumbers = isNameInclude ? phoneNumbers : phoneNumbers.filter(function (_ref7) {
          var phoneNumber = _ref7.phoneNumber;
          return phoneNumber.includes(lowCaseString);
        });
        return filteredNumbers.map(function (_ref8, index) {
          var phoneType = _ref8.phoneType,
              phoneNumber = _ref8.phoneNumber;
          return {
            id: id,
            name: name,
            type: type,
            phoneType: phoneType,
            phoneNumber: phoneNumber,
            isPrimary: index === 0
          };
        });
      });
      var result = maps.reduce(function (accumulator, currentValue) {
        return accumulator.concat(currentValue);
      }, []);
      this._personalContactsCache[lowCaseString] = result;
      return result;
    }
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
    key: "getUIProps",
    value: function getUIProps(_ref9) {
      var userInput = _ref9.userInput,
          inputRef = _ref9.inputRef;
      return {
        currentLocale: this._deps.locale.currentLocale,
        companyContacts: this.companyContacts,
        personalContacts: this.personalContacts,
        userInput: userInput,
        inputRef: inputRef
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref10) {
      var _this3 = this;

      var optionClickHandler = _ref10.optionClickHandler;
      return {
        optionClickHandler: optionClickHandler,
        searchHandler: function () {
          var _searchHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchString) {
            var _this3$_deps$contactS, _this3$_deps$contactS2;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return (_this3$_deps$contactS = _this3._deps.contactSearch) === null || _this3$_deps$contactS === void 0 ? void 0 : _this3$_deps$contactS.search({
                      searchString: searchString
                    });

                  case 2:
                    return _context.abrupt("return", (_this3$_deps$contactS2 = _this3._deps.contactSearch) === null || _this3$_deps$contactS2 === void 0 ? void 0 : _this3$_deps$contactS2.sortedResult.slice(0, 50));

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function searchHandler(_x) {
            return _searchHandler.apply(this, arguments);
          }

          return searchHandler;
        }(),
        setFilterString: function setFilterString(filterString) {
          return _this3._debouncedSetFilterString(filterString);
        },
        formatPhone: this.formatPhone
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
  }]);

  return ContactSearchUI;
}(_core.RcUIModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "filterString", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setFilterString", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setFilterString"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "companyContacts", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "companyContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "personalContacts", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "personalContacts"), _class2.prototype)), _class2)) || _class);
exports.ContactSearchUI = ContactSearchUI;
//# sourceMappingURL=ContactSearchUI.js.map
