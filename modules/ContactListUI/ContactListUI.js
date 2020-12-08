"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactListUI = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _dec, _class;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var ContactListUI = (_dec = (0, _di.Module)({
  name: 'ContactListUI',
  deps: ['Locale', 'ExtensionInfo', 'ContactList', {
    dep: 'ContactDetailsUI',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcModuleV) {
  _inherits(ContactListUI, _RcModuleV);

  var _super = _createSuper(ContactListUI);

  function ContactListUI(deps) {
    _classCallCheck(this, ContactListUI);

    return _super.call(this, {
      deps: deps
    });
  }

  _createClass(ContactListUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3, _this$_deps$extension4, _this$_deps$extension5;

      var bottomNotice = _ref.bottomNotice,
          bottomNoticeHeight = _ref.bottomNoticeHeight;
      return {
        currentLocale: this._deps.locale.currentLocale,
        contactSourceNames: this._deps.contactList.sourceNames || [],
        contactGroups: this._deps.contactList.contactGroups || [],
        searchSource: this._deps.contactList.sourceFilter,
        searchString: this._deps.contactList.searchFilter,
        isSearching: this._deps.contactList.isFiltering,
        showSpinner: !(this._deps.locale.ready && this._deps.contactList.ready),
        currentSiteCode: (_this$_deps$extension = (_this$_deps$extension2 = this._deps.extensionInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.site) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.code) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : '',
        isMultipleSiteEnabled: (_this$_deps$extension4 = (_this$_deps$extension5 = this._deps.extensionInfo) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.isMultipleSiteEnabled) !== null && _this$_deps$extension4 !== void 0 ? _this$_deps$extension4 : false,
        bottomNotice: bottomNotice,
        bottomNoticeHeight: bottomNoticeHeight
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;

      var onItemSelect = _ref2.onItemSelect,
          _onVisitPage = _ref2.onVisitPage,
          onRefresh = _ref2.onRefresh;
      return {
        getAvatarUrl: function getAvatarUrl() {
          return null;
        },
        getPresence: function getPresence(contact) {
          return _this._deps.contactList.getPresence(contact);
        },
        onItemSelect: onItemSelect || /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
            var type, id;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    type = _ref3.type, id = _ref3.id;

                    if (_this._deps.contactDetailsUI) {
                      _this._deps.contactDetailsUI.showContactDetails({
                        type: type,
                        id: id
                      });
                    }

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref4.apply(this, arguments);
          };
        }(),
        onSearchContact: function onSearchContact(_ref5) {
          var searchSource = _ref5.searchSource,
              searchString = _ref5.searchString;

          _this._deps.contactList.applyFilters({
            sourceFilter: searchSource,
            searchFilter: searchString
          });
        },
        onVisitPage: function onVisitPage() {
          if (typeof _onVisitPage === 'function') {
            _onVisitPage();
          } // fire filtering contacts if not yet


          if (!_this._deps.contactList.filterStamp) {
            _this._deps.contactList.applyFilters();
          }
        },
        onRefresh: onRefresh
      };
    }
  }]);

  return ContactListUI;
}(_core.RcModuleV2)) || _class);
exports.ContactListUI = ContactListUI;
//# sourceMappingURL=ContactListUI.js.map
