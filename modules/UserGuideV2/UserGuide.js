"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserGuide = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

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

var _core = require("@ringcentral-integration/core");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _di = require("../../lib/di");

var _Analytics = require("../Analytics");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var SUPPORTED_LOCALES = {
  'en-US': 'en-US',
  'fr-CA': 'fr-CA'
};
var UserGuide = (_dec = (0, _di.Module)({
  name: 'UserGuide',
  deps: ['Auth', 'Locale', 'Storage', 'Webphone', 'RolesAndPermissions', {
    dep: 'UserGuideOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(function (that, options) {
  if (options.curIdx === 0 && options.playing) {
    return [_Analytics.trackEvents.whatsNew];
  }
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.locale.ready, that.allGuides, that._deps.locale.currentLocale];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(UserGuide, _RcModuleV);

  var _super = _createSuper(UserGuide);

  function UserGuide(deps) {
    var _this;

    _classCallCheck(this, UserGuide);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'UserGuide'
    }); // TODO: refactor providing context without DI

    _this._context = void 0;

    _initializerDefineProperty(_this, "allGuides", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "carouselState", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "preLoadImageStatus", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "firstLogin", _descriptor4, _assertThisInitialized(_this));

    _this._context = deps.context;
    return _this;
  }

  _createClass(UserGuide, [{
    key: "setPreLoadImageStatus",
    value: function setPreLoadImageStatus() {
      this.preLoadImageStatus = true;
    }
  }, {
    key: "setGuides",
    value: function setGuides(guides) {
      this.allGuides = guides;
    }
  }, {
    key: "setCarousel",
    value: function setCarousel(_ref) {
      var firstLogin = _ref.firstLogin,
          carouselState = _objectWithoutProperties(_ref, ["firstLogin"]);

      this.carouselState = carouselState;
      this.firstLogin = firstLogin;
    }
  }, {
    key: "onInitSuccess",
    value: function () {
      var _onInitSuccess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.initUserGuide();

              case 2:
                _context.next = 4;
                return this.preLoadImage();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onInitSuccess() {
        return _onInitSuccess.apply(this, arguments);
      }

      return onInitSuccess;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(this.pending && this._deps.auth.ready && this._deps.locale.ready && this._deps.storage.ready && this._deps.rolesAndPermissions.ready && this._deps.auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(this.ready && (!this._deps.auth.ready || !this._deps.locale.ready || !this._deps.storage.ready || !this._deps.rolesAndPermissions.ready));
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      // When there is an incoming call,
      // the guide should be dismissed
      (0, _core.watch)(this, function () {
        return _this2._deps.webphone.ringSession;
      }, function (ringSession) {
        if (_this2._deps.webphone.ready && ringSession) {
          _this2.dismiss();
        }
      });
    }
  }, {
    key: "_preLoadImage",
    value: function () {
      var _preLoadImage2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return new Promise(function (resolve, reject) {
                  var img = new Image();
                  img.src = url;
                  img.onload = resolve;
                  img.onerror = reject;
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function _preLoadImage(_x) {
        return _preLoadImage2.apply(this, arguments);
      }

      return _preLoadImage;
    }()
  }, {
    key: "preLoadImage",
    value: function () {
      var _preLoadImage3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var url;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = this.guides[0];

                if (!url) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 4;
                return this._preLoadImage(url);

              case 4:
                this.setPreLoadImageStatus();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function preLoadImage() {
        return _preLoadImage3.apply(this, arguments);
      }

      return preLoadImage;
    }()
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
    value: function () {
      var _dismiss = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.updateCarousel({
                  curIdx: 0,
                  entered: false,
                  playing: false,
                  firstLogin: false
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function dismiss() {
        return _dismiss.apply(this, arguments);
      }

      return dismiss;
    }()
  }, {
    key: "loadGuides",
    value: function () {
      var _loadGuides = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(guides) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (guides) {
                  this.setGuides(guides);
                }

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function loadGuides(_x2) {
        return _loadGuides.apply(this, arguments);
      }

      return loadGuides;
    }()
  }, {
    key: "updateCarousel",
    value: function () {
      var _updateCarousel = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref2) {
        var curIdx, entered, playing, _ref2$firstLogin, firstLogin;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                curIdx = _ref2.curIdx, entered = _ref2.entered, playing = _ref2.playing, _ref2$firstLogin = _ref2.firstLogin, firstLogin = _ref2$firstLogin === void 0 ? this.firstLogin : _ref2$firstLogin;
                this.setCarousel({
                  curIdx: curIdx,
                  entered: entered,
                  playing: playing,
                  firstLogin: firstLogin
                });

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateCarousel(_x3) {
        return _updateCarousel.apply(this, arguments);
      }

      return updateCarousel;
    }()
  }, {
    key: "initUserGuide",
    value: function () {
      var _initUserGuide = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var prevGuides, guides;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this._deps.rolesAndPermissions.hasUserGuidePermission) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return");

              case 2:
                prevGuides = this.allGuides;
                guides = this.resolveGuides(); // Determine if it needs to be displayed when first log in,
                // the principles behind this is to use webpack's file hash,
                // i.e. if any of the guide files is changed, the file name hash
                // will be changed as well, in this case, it will be displayed.

                _context7.next = 6;
                return this.loadGuides(guides);

              case 6:
                if (JSON.stringify(guides) !== JSON.stringify(prevGuides)) {
                  this.start({
                    firstLogin: true
                  });
                }

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function initUserGuide() {
        return _initUserGuide.apply(this, arguments);
      }

      return initUserGuide;
    }()
  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _ref3,
            _ref3$firstLogin,
            firstLogin,
            _args8 = arguments;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _ref3 = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {}, _ref3$firstLogin = _ref3.firstLogin, firstLogin = _ref3$firstLogin === void 0 ? false : _ref3$firstLogin;
                // Start guides only when images are ready
                this.setCarousel({
                  curIdx: 0,
                  entered: true,
                  playing: true,
                  firstLogin: firstLogin
                });

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "guides",
    get: function get() {
      if (!this._deps.locale.ready) return [];

      if (this.allGuides) {
        var currentGuides = this.allGuides[this._deps.locale.currentLocale];
        if (currentGuides && currentGuides.length > 0) return currentGuides;
        return this.allGuides[SUPPORTED_LOCALES['en-US']] || [];
      }

      return [];
    }
  }, {
    key: "started",
    get: function get() {
      return this.carouselState.entered && this.carouselState.playing;
    }
  }]);

  return UserGuide;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "allGuides", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "carouselState", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      curIdx: 0,
      entered: false,
      playing: false
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "preLoadImageStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "firstLogin", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setPreLoadImageStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setPreLoadImageStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setGuides", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setGuides"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCarousel", [_dec2, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCarousel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_preLoadImage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_preLoadImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "preLoadImage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "preLoadImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismiss", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "dismiss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadGuides", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadGuides"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCarousel", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCarousel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "initUserGuide", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "initUserGuide"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "start", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "start"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "guides", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "guides"), _class2.prototype)), _class2)) || _class);
exports.UserGuide = UserGuide;
//# sourceMappingURL=UserGuide.js.map
