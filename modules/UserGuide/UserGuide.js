"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserGuide = exports.SUPPORTED_LOCALES = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _trackEvents = require("../../enums/trackEvents");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _excluded = ["firstLogin"];
var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var SUPPORTED_LOCALES = exports.SUPPORTED_LOCALES = {
  'en-US': 'en-US',
  'fr-CA': 'fr-CA'
};
function getFileName(fileUrl) {
  var _fileUrl$split$pop;
  return (_fileUrl$split$pop = fileUrl.split('\\').pop()) === null || _fileUrl$split$pop === void 0 ? void 0 : _fileUrl$split$pop.split('/').pop();
}

// Since file name has included file MD5, any file name change means file change
function anyFileDiff(urls1, urls2) {
  var files1 = (urls1 !== null && urls1 !== void 0 ? urls1 : []).map(function (url) {
    return getFileName(url);
  });
  var files2 = (urls2 !== null && urls2 !== void 0 ? urls2 : []).map(function (url) {
    return getFileName(url);
  });
  return JSON.stringify(files1) !== JSON.stringify(files2);
}
var UserGuide = exports.UserGuide = (_dec = (0, _di.Module)({
  name: 'UserGuide',
  deps: ['Auth', 'Locale', 'Storage', 'Webphone', 'AppFeatures', 'Brand', {
    dep: 'UserGuideOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(function (that, options) {
  if (options.curIdx === 0 && options.playing) {
    return [_trackEvents.trackEvents.whatsNew];
  }
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.locale.ready, that.allGuides[that._deps.brand.code], that._deps.locale.currentLocale];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function UserGuide(deps) {
    var _this;
    _classCallCheck(this, UserGuide);
    _this = _callSuper(this, UserGuide, [{
      deps: deps,
      enableCache: true,
      storageKey: 'UserGuide'
    }]);
    _initializerDefineProperty(_this, "allGuides", _descriptor, _this);
    _initializerDefineProperty(_this, "carouselState", _descriptor2, _this);
    _initializerDefineProperty(_this, "preLoadImageStatus", _descriptor3, _this);
    _initializerDefineProperty(_this, "firstLogin", _descriptor4, _this);
    return _this;
  }
  _inherits(UserGuide, _RcModuleV);
  return _createClass(UserGuide, [{
    key: "setPreLoadImageStatus",
    value: function setPreLoadImageStatus() {
      this.preLoadImageStatus = true;
    }
  }, {
    key: "setGuides",
    value: function setGuides(guides) {
      var _this$allGuides$this$;
      var oldGuides = (_this$allGuides$this$ = this.allGuides[this._deps.brand.code]) !== null && _this$allGuides$this$ !== void 0 ? _this$allGuides$this$ : {};
      this.allGuides[this._deps.brand.code] = guides;
      for (var _i = 0, _Object$keys = Object.keys(SUPPORTED_LOCALES); _i < _Object$keys.length; _i++) {
        var locale = _Object$keys[_i];
        if (anyFileDiff(guides[locale], oldGuides[locale])) {
          this.start({
            firstLogin: true
          });
          break;
        }
      }
    }
  }, {
    key: "_migrateGuides",
    value: function _migrateGuides() {
      var _this2 = this;
      if (!this.allGuides[this._deps.brand.code]) {
        this.allGuides[this._deps.brand.code] = {};
      }
      Object.keys(SUPPORTED_LOCALES).forEach(function (locale) {
        var allGuides = _this2.allGuides;
        if (allGuides[locale]) {
          _this2.allGuides[_this2._deps.brand.code][locale] = allGuides[locale];
          delete allGuides[locale];
        }
      });
    }
  }, {
    key: "setCarousel",
    value: function setCarousel(_ref) {
      var firstLogin = _ref.firstLogin,
        carouselState = _objectWithoutProperties(_ref, _excluded);
      this.carouselState = carouselState;
      this.firstLogin = firstLogin;
    }
  }, {
    key: "onInitSuccess",
    value: function () {
      var _onInitSuccess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!this.hasPermission) {
                _context.n = 1;
                break;
              }
              _context.n = 1;
              return this.initUserGuide();
            case 1:
              return _context.a(2);
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
      return !!(this.pending && this._deps.auth.ready && this._deps.auth.loggedIn && this._deps.locale.ready && this._deps.storage.ready && this._deps.appFeatures.ready && this._deps.brand.ready);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(this.ready && (!this._deps.auth.ready || !this._deps.locale.ready || !this._deps.storage.ready || !this._deps.appFeatures.ready || !this._deps.brand.ready));
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this3 = this;
      this._migrateGuides();
      // When there is an incoming call,
      // the guide should be dismissed
      (0, _core.watch)(this, function () {
        return _this3._deps.webphone.ringSession;
      }, function (ringSession) {
        if (_this3._deps.webphone.ready && ringSession) {
          _this3.dismiss();
        }
      });
      (0, _core.watch)(this, function () {
        return _this3._deps.brand.brandConfig;
      }, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!_this3.hasPermission) {
                _context2.n = 1;
                break;
              }
              _context2.n = 1;
              return _this3.initUserGuide();
            case 1:
              return _context2.a(2);
          }
        }, _callee2);
      })));
    }
  }, {
    key: "_preLoadImage",
    value: function () {
      var _preLoadImage2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(url) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return new Promise(function (resolve, reject) {
                var img = new Image();
                img.src = url;
                img.onload = resolve;
                img.onerror = reject;
              });
            case 1:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      function _preLoadImage(_x) {
        return _preLoadImage2.apply(this, arguments);
      }
      return _preLoadImage;
    }()
  }, {
    key: "preLoadImage",
    value: function () {
      var _preLoadImage3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var url, _t;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              url = this.guides[0];
              if (!url) {
                _context4.n = 4;
                break;
              }
              _context4.p = 1;
              _context4.n = 2;
              return this._preLoadImage(url);
            case 2:
              _context4.n = 4;
              break;
            case 3:
              _context4.p = 3;
              _t = _context4.v;
              console.warn('[UserGuide] Preload image failed', _t);
            case 4:
              this.setPreLoadImageStatus();
            case 5:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function preLoadImage() {
        return _preLoadImage3.apply(this, arguments);
      }
      return preLoadImage;
    }()
  }, {
    key: "resolveGuides",
    value: function resolveGuides() {
      var _this$_deps$brand$bra;
      var images = ((_this$_deps$brand$bra = this._deps.brand.brandConfig.assets) === null || _this$_deps$brand$bra === void 0 ? void 0 : _this$_deps$brand$bra.guides) || [];
      var locales = Object.keys(SUPPORTED_LOCALES);
      return images.reduce(function (acc, curr) {
        locales.forEach(function (locale) {
          if (!acc[locale]) {
            acc[locale] = [];
          }
          if ((0, _ramda.includes)(locale, curr)) {
            acc[locale].push(curr);
          }
        });
        return acc;
      }, {});
    }
  }, {
    key: "dismiss",
    value: function () {
      var _dismiss = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (this.carouselState.curIdx !== 0 || this.carouselState.playing || this.carouselState.entered || this.firstLogin) {
                this.updateCarousel({
                  curIdx: 0,
                  entered: false,
                  playing: false,
                  firstLogin: false
                });
              }
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function dismiss() {
        return _dismiss.apply(this, arguments);
      }
      return dismiss;
    }()
  }, {
    key: "updateCarousel",
    value: function () {
      var _updateCarousel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(_ref3) {
        var curIdx, entered, playing, _ref3$firstLogin, firstLogin;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              curIdx = _ref3.curIdx, entered = _ref3.entered, playing = _ref3.playing, _ref3$firstLogin = _ref3.firstLogin, firstLogin = _ref3$firstLogin === void 0 ? this.firstLogin : _ref3$firstLogin;
              this.setCarousel({
                curIdx: curIdx,
                entered: entered,
                playing: playing,
                firstLogin: firstLogin
              });
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function updateCarousel(_x2) {
        return _updateCarousel.apply(this, arguments);
      }
      return updateCarousel;
    }()
  }, {
    key: "hasPermission",
    get: function get() {
      // For extensions without calling or read message permissions, most of the content in
      // the user guide is not applicable to them. So we should not show the user guide for
      // these extensions.
      return this._deps.appFeatures.isCallingEnabled || this._deps.appFeatures.hasReadMessagesPermission;
    }
  }, {
    key: "initUserGuide",
    value: function () {
      var _initUserGuide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var guides;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              guides = this.resolveGuides(); // Determine if it needs to be displayed when first log in,
              // the principles behind this is to use webpack's file hash,
              // i.e. if any of the guide files is changed, the file name hash
              // will be changed as well, in this case, it will be displayed.
              if (!guides) {
                _context7.n = 1;
                break;
              }
              this.setGuides(guides);
              _context7.n = 1;
              return this.preLoadImage();
            case 1:
              return _context7.a(2);
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
      var _start = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var _ref4,
          _ref4$firstLogin,
          firstLogin,
          _args8 = arguments;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _ref4 = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {}, _ref4$firstLogin = _ref4.firstLogin, firstLogin = _ref4$firstLogin === void 0 ? false : _ref4$firstLogin;
              // Start guides only when images are ready
              this.setCarousel({
                curIdx: 0,
                entered: true,
                playing: true,
                firstLogin: firstLogin
              });
            case 1:
              return _context8.a(2);
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
      if (!this._deps.locale.ready || !this._deps.auth.loggedIn) {
        return [];
      }
      var brandGuides = this.allGuides[this._deps.brand.code];
      if (brandGuides) {
        var currentGuides = brandGuides[this._deps.locale.currentLocale];
        if (currentGuides && currentGuides.length > 0) {
          return currentGuides;
        }
        return brandGuides[SUPPORTED_LOCALES['en-US']] || [];
      }
      return [];
    }
  }, {
    key: "started",
    get: function get() {
      return this.carouselState.entered && this.carouselState.playing;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "allGuides", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "setPreLoadImageStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setPreLoadImageStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setGuides", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setGuides"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_migrateGuides", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_migrateGuides"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCarousel", [_dec2, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCarousel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_preLoadImage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_preLoadImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "preLoadImage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "preLoadImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismiss", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "dismiss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCarousel", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCarousel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "initUserGuide", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "initUserGuide"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "start", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "start"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "guides", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "guides"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=UserGuide.js.map
