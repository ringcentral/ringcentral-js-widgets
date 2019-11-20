"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _di = require("../../lib/di");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getUserGuideReducer = _interopRequireWildcard(require("./getUserGuideReducer"));

var _dec, _class, _class2;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Support localization
 */
var SUPPORTED_LOCALES = {
  'en-US': 'en-US',
  'fr-CA': 'fr-CA'
};
var UserGuide = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Locale', 'Storage', 'Webphone', 'RolesAndPermissions', {
    dep: 'UserGuideOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(UserGuide, _RcModule);

  function UserGuide(_ref) {
    var _this;

    var auth = _ref.auth,
        locale = _ref.locale,
        storage = _ref.storage,
        webphone = _ref.webphone,
        rolesAndPermissions = _ref.rolesAndPermissions,
        options = _objectWithoutProperties(_ref, ["auth", "locale", "storage", "webphone", "rolesAndPermissions"]);

    _classCallCheck(this, UserGuide);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UserGuide).call(this, _objectSpread({
      actionTypes: _actionTypes["default"]
    }, options)));
    _this._auth = auth;
    _this._locale = locale;
    _this._storage = storage;
    _this._webphone = webphone;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._reducer = (0, _getUserGuideReducer["default"])(_this.actionTypes);
    _this._context = options.context;
    _this._storageKey = 'userGuide';
    _this._guideReducer = (0, _getUserGuideReducer.getGuidesReducer)(_this.actionTypes);

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: _this._guideReducer
    });

    return _this;
  }

  _createClass(UserGuide, [{
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
      return regeneratorRuntime.async(function _onStateChange$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(this.pending && this._auth.ready && this._locale.ready && this._storage.ready && this._rolesAndPermissions.ready && this._auth.loggedIn)) {
                _context.next = 8;
                break;
              }

              this.store.dispatch({
                type: this.actionTypes.initSuccess
              });
              _context.next = 4;
              return regeneratorRuntime.awrap(this.initUserGuide());

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(this.preLoadImage());

            case 6:
              _context.next = 9;
              break;

            case 8:
              if (this.ready && (!this._auth.ready || !this._locale.ready || !this._storage.ready || !this._rolesAndPermissions.ready)) {
                this.store.dispatch({
                  type: this.actionTypes.resetSuccess
                });
              }

            case 9:
              // When there is an incoming call,
              // the guide should be dismissed
              if (this._webphone.ready && this._webphone.ringSession && this._webphone.ringSession !== this._lastRingSession) {
                this._lastRingSession = this._webphone.ringSession;
                this.dismiss();
              }

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_preLoadImage",
    value: function _preLoadImage(url) {
      return regeneratorRuntime.async(function _preLoadImage$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                var img = new Image();
                img.src = url;
                img.onload = resolve;
                img.onerror = resolve;
              }));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "preLoadImage",
    value: function preLoadImage() {
      var url;
      return regeneratorRuntime.async(function preLoadImage$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = this.guides[0];

              if (!url) {
                _context3.next = 4;
                break;
              }

              _context3.next = 4;
              return regeneratorRuntime.awrap(this._preLoadImage(url));

            case 4:
              this.store.dispatch({
                type: this.actionTypes.preLoadImageStatus
              });

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
    /**
     * Using webpack `require.context` to load guides files.
     * Image files will be ordered by file name ascendingly.
     * @return {Map<String, Array<URI>>}
     */

  }, {
    key: "resolveGuides",
    value: function resolveGuides() {
      var _this3 = this;

      if (this._context && typeof this._context === 'function') {
        var locales = Object.keys(SUPPORTED_LOCALES);
        return this._context.keys().sort().map(function (key) {
          return _this3._context(key);
        }).reduce(function (prev, curr) {
          locales.forEach(function (locale) {
            if (!prev[locale]) prev[locale] = [];

            if ((0, _ramda.contains)(locale, curr)) {
              prev[locale].push(curr);
            }
          });
          return prev;
        }, {});
      }

      return {};
    }
  }, {
    key: "dismiss",
    value: function dismiss() {
      this.updateCarousel({
        curIdx: 0,
        entered: false,
        playing: false,
        firstLogin: false
      });
    }
  }, {
    key: "loadGuides",
    value: function loadGuides(guides) {
      return regeneratorRuntime.async(function loadGuides$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (guides) {
                this.store.dispatch({
                  type: this.actionTypes.loadGuides,
                  guides: guides
                });
              }

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateCarousel",
    value: function updateCarousel(_ref2) {
      var curIdx, entered, playing, _ref2$firstLogin, firstLogin;

      return regeneratorRuntime.async(function updateCarousel$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              curIdx = _ref2.curIdx, entered = _ref2.entered, playing = _ref2.playing, _ref2$firstLogin = _ref2.firstLogin, firstLogin = _ref2$firstLogin === void 0 ? this.state.firstLogin : _ref2$firstLogin;
              this.store.dispatch({
                type: this.actionTypes.updateCarousel,
                curIdx: curIdx,
                entered: entered,
                playing: playing,
                firstLogin: firstLogin
              });

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "initUserGuide",
    value: function initUserGuide() {
      var prevGuides, guides;
      return regeneratorRuntime.async(function initUserGuide$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (this._rolesAndPermissions.hasUserGuidePermission) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return");

            case 2:
              // eslint-disable-next-line
              prevGuides = this.allGuides;
              guides = this.resolveGuides(); // Determine if it needs to be displayed when first log in,
              // the principles behind this is to use webpack's file hash,
              // i.e. if any of the guide files is changed, the file name hash
              // will be changed as well, in this case, it will be displayed.

              _context6.next = 6;
              return regeneratorRuntime.awrap(this.loadGuides(guides));

            case 6:
              if (JSON.stringify(guides) !== JSON.stringify(prevGuides)) {
                this.start({
                  firstLogin: true
                });
              }

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "start",
    value: function start() {
      var _ref3,
          _ref3$firstLogin,
          firstLogin,
          _args7 = arguments;

      return regeneratorRuntime.async(function start$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _ref3 = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {}, _ref3$firstLogin = _ref3.firstLogin, firstLogin = _ref3$firstLogin === void 0 ? false : _ref3$firstLogin;
              // Start guides only when images are ready
              this.store.dispatch({
                type: this.actionTypes.updateCarousel,
                curIdx: 0,
                entered: true,
                playing: true,
                firstLogin: firstLogin
              });

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "guides",
    get: function get() {
      if (!this._locale.ready) return [];

      if (this.allGuides) {
        var currentGuides = this.allGuides[this._locale.currentLocale];
        if (currentGuides && currentGuides.length > 0) return currentGuides;
        return this.allGuides[SUPPORTED_LOCALES['en-US']] || [];
      }

      return [];
    }
  }, {
    key: "allGuides",
    get: function get() {
      if (!this._storage.ready) return null;
      return this._storage.getItem(this._storageKey);
    }
  }, {
    key: "carouselState",
    get: function get() {
      return this.state.carouselState;
    }
  }, {
    key: "started",
    get: function get() {
      return this.carouselState.entered && this.carouselState.playing;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "preLoadImageStatus",
    get: function get() {
      return this.state.preLoadImageStatus;
    }
  }]);

  return UserGuide;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "_preLoadImage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_preLoadImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "preLoadImage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "preLoadImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismiss", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "dismiss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadGuides", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadGuides"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCarousel", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCarousel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "initUserGuide", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "initUserGuide"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "start", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "start"), _class2.prototype)), _class2)) || _class);
exports["default"] = UserGuide;
//# sourceMappingURL=index.js.map
