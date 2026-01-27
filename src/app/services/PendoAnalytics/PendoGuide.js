"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pendoTemplateStyles = exports.PendoGuide = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _Auth = require("../Auth");
var _PendoAnalytics = require("./PendoAnalytics");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
/**
 * For use data in pendo, use below methods
app.modules.PendoAnalytics.track('Int_settings-rating-display')
app.modules.PendoAnalytics.track('Int_settings-rating-submit')
app.modules.PendoAnalytics.track('Int_positive-rating-show')
app.modules.PendoAnalytics.track('Int_positive-rating-dismiss')
app.modules.PendoAnalytics.track('Int_positive-rating-submit')
app.modules.PendoAnalytics.track('Int_experience-feedback-show')
app.modules.PendoAnalytics.track('Int_experience-feedback-dismiss')
app.modules.PendoAnalytics.track('Int_experience-feedback-submit-great')
app.modules.PendoAnalytics.track('Int_experience-feedback-submit-can-be-better')
app.modules.PendoAnalytics.flushNow()
 */

// for tailwind can scan the template styles
var pendoTemplateStyles = exports.pendoTemplateStyles = 'top-0 right-1';
var TEN_MIN = 1000 * 60 * 10;
var PendoGuide = exports.PendoGuide = (_dec = (0, _nextCore.injectable)({
  name: 'PendoGuide'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('PendoGuideOptions')(target, undefined, 5);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _Auth.Auth === "undefined" ? Object : _Auth.Auth, typeof _services.Brand === "undefined" ? Object : _services.Brand, typeof _PendoAnalytics.PendoAnalytics === "undefined" ? Object : _PendoAnalytics.PendoAnalytics, typeof _services.Toast === "undefined" ? Object : _services.Toast, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof PendoGuideOptions === "undefined" ? Object : PendoGuideOptions]), _dec5 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof Record === "undefined" ? Object : Record]), _dec8 = (0, _nextCore.delegate)('server'), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [typeof Record === "undefined" ? Object : Record]), _dec1 = (0, _nextCore.delegate)('clients'), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [Object]), _dec12 = (0, _nextCore.delegate)('clients'), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function PendoGuide(_auth, _brand, _pendoAnalytics, _toast, _portManager, _pendoGuideOptions) {
    var _this;
    _classCallCheck(this, PendoGuide);
    _this = _callSuper(this, PendoGuide);
    _this._auth = _auth;
    _this._brand = _brand;
    _this._pendoAnalytics = _pendoAnalytics;
    _this._toast = _toast;
    _this._portManager = _portManager;
    _this._pendoGuideOptions = _pendoGuideOptions;
    /**
     * the state of the guides, the key is the guide name, the value is the existence of the guide
     *
     * the guide name is the name of the guide in the pendo, which is the same as the name of the guide in the pendo guide list
     *
     * the loaded names define in the `_pendoGuideOptions.checkGuideNames`
     *
     * which will be useful when you need check does the user have the ability to show the guide without trigger the guide display
     */
    _initializerDefineProperty(_this, "guidesExistence", _descriptor, _this);
    /**
     * only save the value inside memory is fine, because the guide need complex behavior to display, we just want a small period of time to avoid display the same guide again due to the pendo events still not be processed and accumulated
     */
    _this.everDisplayedTimestamp = {
      positiveRating: 0,
      experienceFeedback: 0
    };
    /**
     * Observable that emits Pendo guide events, the event will send from our custom pendo template
     *
     * libs/pendo-guides-template/templates/rating.html
     */
    _this.guideEvent$ = (0, _rxjs.defer)(function () {
      if (_this._pendoAnalytics.enable) {
        return (0, _rxjs.fromEvent)(document, 'pendo-event').pipe((0, _rxjs.map)(function (e) {
          var data = e.detail;
          if (data.eventName && data.metadata) {
            return data;
          }
          return null;
        }), (0, _rxjs.filter)(Boolean));
      }
      return _rxjs.EMPTY;
    }).pipe((0, _rxjs.share)());
    _this.guideEvent$.pipe((0, _rxjs.tap)(function (event) {
      var eventName = event.eventName,
        metadata = event.metadata;
      _this.logger.info('receive pendo event', event);
      switch (eventName) {
        case 'experience-feedback-submit-great':
        case 'experience-feedback-submit-can-be-better':
          _this._pendoAnalytics.track("Int_".concat(eventName));
          if (metadata.showToast) {
            _this._toast.success({
              message: (0, _i18n.t)('submitFeedbackSuccess')
            });
          }
          break;
        case 'settings-rating-submit':
        case 'positive-rating-submit':
          if (metadata.showToast) {
            _this._toast.success({
              message: (0, _i18n.t)('submitFeedbackSuccess')
            });
          }
          break;
        case 'settings-rating-display':
        case 'positive-rating-show':
        case 'positive-rating-dismiss':
        case 'experience-feedback-show':
        case 'experience-feedback-dismiss':
          _this._pendoAnalytics.track("Int_".concat(eventName));
          break;
        default:
          if (process.env.NODE_ENV !== 'production') {
            _this.logger.warn('unknown pendo event, although we also track the event to pendo, but that will be better to have a record here, add the type above and add case to handle it will be better', eventName);
          }
          // rest of events also submit to pendo analytics for we can change events name dynamically without change the code and wait deploy
          _this._pendoAnalytics.track("Int_".concat(eventName));
          break;
      }
    }), _nextCore.takeUntilAppDestroy).subscribe();

    // when logout, clear the everDisplayedTimestamp
    _this._auth.beforeLogout$.pipe((0, _rxjs.tap)(function () {
      _this.everDisplayedTimestamp = {
        positiveRating: 0,
        experienceFeedback: 0
      };
    }), _nextCore.takeUntilAppDestroy).subscribe();
    if (_this._portManager.shared) {
      _this._portManager.onMainTab(function () {
        _this.loadOurPendoGuides();
      });
    } else {
      _this.loadOurPendoGuides();
    }
    return _this;
  }
  _inherits(PendoGuide, _RcModule);
  return _createClass(PendoGuide, [{
    key: "_setGuidesExistence",
    value: function _setGuidesExistence(guides) {
      Object.assign(this.guidesExistence, guides);
    }
  }, {
    key: "setGuidesExistence",
    value: function () {
      var _setGuidesExistence2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(guides) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setGuidesExistence(guides);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setGuidesExistence(_x) {
        return _setGuidesExistence2.apply(this, arguments);
      }
      return setGuidesExistence;
    }()
  }, {
    key: "setEverDisplayed",
    value: function () {
      var _setEverDisplayed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(guideName) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this.everDisplayedTimestamp[guideName] = Date.now();
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setEverDisplayed(_x2) {
        return _setEverDisplayed.apply(this, arguments);
      }
      return setEverDisplayed;
    }()
  }, {
    key: "loadOurPendoGuides",
    value: function loadOurPendoGuides() {
      var _this2 = this;
      this._pendoAnalytics.guidesLoaded$.pipe((0, _rxjs.tap)(function () {
        _this2.syncGuidesExistence();
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "syncGuidesExistence",
    value: function syncGuidesExistence() {
      var _this$_pendoGuideOpti,
        _this3 = this;
      if ((_this$_pendoGuideOpti = this._pendoGuideOptions) === null || _this$_pendoGuideOpti === void 0 ? void 0 : _this$_pendoGuideOpti.checkGuideNames) {
        var guidesExistence = this._pendoGuideOptions.checkGuideNames.reduce(function (acc, guideName) {
          acc[guideName] = _this3.getPendoGuideExistence(guideName);
          return acc;
        }, {});
        this.setGuidesExistence(guidesExistence);
      }
    }
  }, {
    key: "genPendoNamePrefix",
    value: function genPendoNamePrefix() {
      var appName = this._brand.defaultConfig.appName;
      return "[Int]: (".concat(appName, ")");
    }
  }, {
    key: "genPendoGuideName",
    value: function genPendoGuideName(name) {
      return "".concat(this.genPendoNamePrefix(), " ").concat(name);
    }
  }, {
    key: "getPendoGuideExistence",
    value: function getPendoGuideExistence(guideName) {
      var _this$_pendoAnalytics, _this$_pendoAnalytics2;
      return Boolean((_this$_pendoAnalytics = this._pendoAnalytics.pendo) === null || _this$_pendoAnalytics === void 0 ? void 0 : (_this$_pendoAnalytics2 = _this$_pendoAnalytics.findGuideByName) === null || _this$_pendoAnalytics2 === void 0 ? void 0 : _this$_pendoAnalytics2.call(_this$_pendoAnalytics, this.genPendoGuideName(guideName)));
    }

    /**
     * Refresh Pendo guides and show a guide by its ID
     * @param guide Object containing guide id and name
     * @returns Promise that resolves to boolean indicating success
     */
  }, {
    key: "_showGuide",
    value: (function () {
      var _showGuide2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(guide) {
        var pendo, result, _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (document.hasFocus()) {
                _context3.n = 1;
                break;
              }
              this.logger.info('Document not be focus, skip that guide display');
              return _context3.a(2, false);
            case 1:
              _context3.p = 1;
              // Check if Pendo is available
              pendo = this._pendoAnalytics.pendo;
              if (pendo) {
                _context3.n = 2;
                break;
              }
              return _context3.a(2, false);
            case 2:
              this.logger.info('trigger opened guide', guide);
              result = 'id' in guide ? pendo.showGuideById(guide.id) : pendo.showGuideByName(guide.name);
              this.logger.info('Guide opened result', result);
              return _context3.a(2, result);
            case 3:
              _context3.p = 3;
              _t = _context3.v;
              this.logger.error('Failed to open Pendo guide', {
                guide: guide,
                error: _t
              });
              return _context3.a(2, false);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function _showGuide(_x3) {
        return _showGuide2.apply(this, arguments);
      }
      return _showGuide;
    }())
  }, {
    key: "experienceGuideProcess",
    value: function () {
      var _experienceGuideProcess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this.refreshGuides();
            case 1:
              this.showPositiveRatingGuide();
              this.showExperienceFeedbackGuide();
            case 2:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function experienceGuideProcess() {
        return _experienceGuideProcess.apply(this, arguments);
      }
      return experienceGuideProcess;
    }()
  }, {
    key: "showGuideByNameWithPrefix",
    value: function () {
      var _showGuideByNameWithPrefix = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(name) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              return _context5.a(2, this._showGuide({
                name: this.genPendoGuideName(name)
              }));
          }
        }, _callee5, this);
      }));
      function showGuideByNameWithPrefix(_x4) {
        return _showGuideByNameWithPrefix.apply(this, arguments);
      }
      return showGuideByNameWithPrefix;
    }()
  }, {
    key: "refreshGuides",
    value: function () {
      var _refreshGuides = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return this._pendoAnalytics.refreshGuides();
            case 1:
              // after refresh guides, we need to sync the guides existence to the guidesState
              this.syncGuidesExistence();
            case 2:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function refreshGuides() {
        return _refreshGuides.apply(this, arguments);
      }
      return refreshGuides;
    }()
    /**
     * * we use static guide name here, for different project can use the same name without add additional guide id config settings
     */
    /**
     * @link https://app.pendo.io/s/6255039312297984/guides/yzDNMrhXW3KaBZ4xfx12yNvaN58
     */
  }, {
    key: "showPositiveRatingGuide",
    value: (function () {
      var _showPositiveRatingGuide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var positiveRating, result;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              positiveRating = this.everDisplayedTimestamp.positiveRating;
              if (!(positiveRating && positiveRating > Date.now() - TEN_MIN)) {
                _context7.n = 1;
                break;
              }
              this.logger.info('Positive rating guide ever displayed, not display again in 10 minutes');
              return _context7.a(2, false);
            case 1:
              _context7.n = 2;
              return this.showGuideByNameWithPrefix('positive-rating');
            case 2:
              result = _context7.v;
              if (result) this.setEverDisplayed('positiveRating');
              return _context7.a(2, result);
          }
        }, _callee7, this);
      }));
      function showPositiveRatingGuide() {
        return _showPositiveRatingGuide.apply(this, arguments);
      }
      return showPositiveRatingGuide;
    }()
    /**
     * Show the experience feedback guide
     *
     * @link https://app.pendo.io/s/6255039312297984/guides/hnIXRpoFTY4rI0yzdmGnhHqkpsQ
     */
    )
  }, {
    key: "showExperienceFeedbackGuide",
    value: (function () {
      var _showExperienceFeedbackGuide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var experienceFeedback, result;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              experienceFeedback = this.everDisplayedTimestamp.experienceFeedback;
              if (!(experienceFeedback && experienceFeedback > Date.now() - TEN_MIN)) {
                _context8.n = 1;
                break;
              }
              this.logger.info('Experience feedback guide ever displayed, not display again in 10 minutes');
              return _context8.a(2, false);
            case 1:
              _context8.n = 2;
              return this.showGuideByNameWithPrefix('experience-feedback');
            case 2:
              result = _context8.v;
              if (result) this.setEverDisplayed('experienceFeedback');
              return _context8.a(2, result);
          }
        }, _callee8, this);
      }));
      function showExperienceFeedbackGuide() {
        return _showExperienceFeedbackGuide.apply(this, arguments);
      }
      return showExperienceFeedbackGuide;
    }()
    /**
     * Show the experience feedback guide
     *
     * @link https://app.pendo.io/s/6255039312297984/guides/hnIXRpoFTY4rI0yzdmGnhHqkpsQ
     */
    )
  }, {
    key: "showSettingsRatingGuide",
    value: (function () {
      var _showSettingsRatingGuide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              return _context9.a(2, this.showGuideByNameWithPrefix('settings-rating'));
          }
        }, _callee9, this);
      }));
      function showSettingsRatingGuide() {
        return _showSettingsRatingGuide.apply(this, arguments);
      }
      return showSettingsRatingGuide;
    }())
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "guidesExistence", [_nextCore.userStorage, _nextCore.state, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setGuidesExistence", [_nextCore.action, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "_setGuidesExistence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setGuidesExistence", [_dec8, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "setGuidesExistence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setEverDisplayed", [_dec1, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "setEverDisplayed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "experienceGuideProcess", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "experienceGuideProcess"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=PendoGuide.js.map
