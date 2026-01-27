"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingtoneConfiguration = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _AudioSettings = require("@ringcentral-integration/commons/modules/AudioSettings");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _Webphone = require("../Webphone");
var _const = require("./const");
var _helper = require("./helper");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _class, _class2, _descriptor, _descriptor2;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var RingtoneConfiguration = exports.RingtoneConfiguration = (_dec = (0, _nextCore.injectable)({
  name: 'RingtoneConfiguration'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('RingtoneConfigurationOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _Webphone.Webphone === "undefined" ? Object : _Webphone.Webphone, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof RingtoneConfigurationOptions === "undefined" ? Object : RingtoneConfigurationOptions]), _dec5 = (0, _nextCore.delegate)('server'), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", []), _dec8 = Reflect.metadata("design:type", String), _dec9 = Reflect.metadata("design:type", Array), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [String]), _dec10 = (0, _nextCore.delegate)('server'), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [String]), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [typeof RingtoneItem === "undefined" ? Object : RingtoneItem]), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [String]), _dec17 = (0, _services.track)(_trackEvents.trackEvents.uploadRingtone), _dec18 = (0, _nextCore.delegate)('server'), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [typeof RingtoneItem === "undefined" ? Object : RingtoneItem, Boolean]), _dec21 = (0, _services.track)(_trackEvents.trackEvents.deleteRingtone), _dec22 = (0, _nextCore.delegate)('server'), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [String]), _dec25 = (0, _nextCore.delegate)('server'), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", []), _dec28 = (0, _nextCore.delegate)('server'), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [typeof I18nKey === "undefined" ? Object : I18nKey, Number]), _dec31 = (0, _nextCore.computed)(function (that) {
  return [that.enableCustomRingtone, that.customRingtoneList];
}), _dec32 = Reflect.metadata("design:type", Function), _dec33 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function RingtoneConfiguration(_webphone, _storage, _toast, _ringtoneConfigurationOptions) {
    var _this;
    _classCallCheck(this, RingtoneConfiguration);
    _this = _callSuper(this, RingtoneConfiguration);
    _this._webphone = _webphone;
    _this._storage = _storage;
    _this._toast = _toast;
    _this._ringtoneConfigurationOptions = _ringtoneConfigurationOptions;
    _initializerDefineProperty(_this, "selectedRingtoneId", _descriptor, _this);
    _initializerDefineProperty(_this, "customRingtoneList", _descriptor2, _this);
    _this._storage.enable(_this);
    return _this;
  }
  _inherits(RingtoneConfiguration, _RcModule);
  return _createClass(RingtoneConfiguration, [{
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this.updateIncomingRingtone();
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "_setSelectedRingtoneId",
    value: function _setSelectedRingtoneId(id) {
      this.selectedRingtoneId = id;
    }
  }, {
    key: "setSelectedRingtoneId",
    value: function () {
      var _setSelectedRingtoneId2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._setSelectedRingtoneId(id);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setSelectedRingtoneId(_x) {
        return _setSelectedRingtoneId2.apply(this, arguments);
      }
      return setSelectedRingtoneId;
    }()
  }, {
    key: "_pushCustomRingtone",
    value: function _pushCustomRingtone(ringtone) {
      this.customRingtoneList.push(ringtone);
    }
  }, {
    key: "_removeCustomRingtone",
    value: function _removeCustomRingtone(id) {
      this.customRingtoneList = this.customRingtoneList.filter(function (ringtone) {
        return ringtone.id !== id;
      });
    }
  }, {
    key: "uploadCustomRingtone",
    value: function () {
      var _uploadCustomRingtone = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(ringtone, showAlert) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this._pushCustomRingtone(ringtone);
              if (showAlert) {
                this._toast.success({
                  message: (0, _i18n.t)('ringtoneAdded'),
                  allowDuplicates: false,
                  group: this.identifier
                });
              }
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function uploadCustomRingtone(_x2, _x3) {
        return _uploadCustomRingtone.apply(this, arguments);
      }
      return uploadCustomRingtone;
    }()
  }, {
    key: "removeCustomRingtone",
    value: function () {
      var _removeCustomRingtone2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id) {
        var hasCustomRingtone;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              hasCustomRingtone = this.customRingtoneList.find(function (ringtone) {
                return ringtone.id === id;
              });
              if (!id || !hasCustomRingtone) {
                this.showDangerAlert(_AudioSettings.audioSettingsErrors.deleteRingtoneFailed);
              }
              this._removeCustomRingtone(id);
              // if the remove one the selected ringtone, set the first default ringtone as selected
              if (id === this.selectedRingtoneId) {
                this.setSelectedRingtoneId(this.defaultRingtoneList[0].id);
                this.updateIncomingRingtone();
              }
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function removeCustomRingtone(_x4) {
        return _removeCustomRingtone2.apply(this, arguments);
      }
      return removeCustomRingtone;
    }()
  }, {
    key: "updateIncomingRingtone",
    value: function () {
      var _updateIncomingRingtone = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var selectedRingtoneAudio;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              selectedRingtoneAudio = this.getSelectedRingtoneAudio();
              if (selectedRingtoneAudio && selectedRingtoneAudio.dataUrl !== this._webphone.incomingAudio) {
                this._webphone.setIncomingAudioIntoStorage(selectedRingtoneAudio);
                this._webphone.loadClientAudio();
              }
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function updateIncomingRingtone() {
        return _updateIncomingRingtone.apply(this, arguments);
      }
      return updateIncomingRingtone;
    }()
  }, {
    key: "showDangerAlert",
    value: function () {
      var _showDangerAlert = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(i18nKey, ttl) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              this._toast.danger({
                message: (0, _i18n.t)(i18nKey),
                allowDuplicates: false,
                group: this.identifier,
                ttl: ttl
              });
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function showDangerAlert(_x5, _x6) {
        return _showDangerAlert.apply(this, arguments);
      }
      return showDangerAlert;
    }()
  }, {
    key: "getSelectedRingtoneAudio",
    value: function getSelectedRingtoneAudio() {
      var _this2 = this;
      var ringtone = this.fullRingtoneList.find(function (ringtone) {
        return ringtone.id === _this2.selectedRingtoneId;
      });
      if (!(ringtone === null || ringtone === void 0 ? void 0 : ringtone.url)) {
        if ((ringtone === null || ringtone === void 0 ? void 0 : ringtone.type) === 'default' && (ringtone === null || ringtone === void 0 ? void 0 : ringtone.id) === _const.RINGS_TYPE.Off) {
          return {
            fileName: _const.RINGS_TYPE.Off,
            dataUrl: ''
          };
        }
        return null;
      }
      return {
        fileName: (0, _helper.getFileNameWithoutExt)(ringtone.name),
        dataUrl: ringtone.url
      };
    }
  }, {
    key: "defaultRingtoneList",
    get: function get() {
      var _this$_ringtoneConfig, _this$_ringtoneConfig2;
      return ((_this$_ringtoneConfig = (_this$_ringtoneConfig2 = this._ringtoneConfigurationOptions) === null || _this$_ringtoneConfig2 === void 0 ? void 0 : _this$_ringtoneConfig2.defaultRingtoneList) !== null && _this$_ringtoneConfig !== void 0 ? _this$_ringtoneConfig : _const.DEFAULT_RINGTONE_LIST).map(function (item) {
        return _objectSpread(_objectSpread({}, item), {}, {
          type: 'default',
          name: item.id
        });
      });
    }
  }, {
    key: "customRingtoneSortedList",
    get: function get() {
      return this.customRingtoneList.sort(function (a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }
  }, {
    key: "fullRingtoneList",
    get: function get() {
      return [].concat(_toConsumableArray(this.customRingtoneSortedList), _toConsumableArray(this.defaultRingtoneList));
    }
  }, {
    key: "enableCustomRingtone",
    get: function get() {
      var _this$_ringtoneConfig3, _this$_ringtoneConfig4;
      return (_this$_ringtoneConfig3 = (_this$_ringtoneConfig4 = this._ringtoneConfigurationOptions) === null || _this$_ringtoneConfig4 === void 0 ? void 0 : _this$_ringtoneConfig4.enableCustomRingtone) !== null && _this$_ringtoneConfig3 !== void 0 ? _this$_ringtoneConfig3 : true;
    }
  }, {
    key: "isUploadRingtoneDisabled",
    get: function get() {
      var _this$customRingtoneL;
      return this.enableCustomRingtone && ((_this$customRingtoneL = this.customRingtoneList) === null || _this$customRingtoneL === void 0 ? void 0 : _this$customRingtoneL.length) >= _const.MAX_CUSTOM_RINGTONE_COUNT;
    }
  }]);
}(_nextCore.RcModule), _applyDecoratedDescriptor(_class2.prototype, "onInit", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "onInit"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectedRingtoneId", [_nextCore.userStorage, _nextCore.state, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return this.defaultRingtoneList[0].id;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "customRingtoneList", [_nextCore.userStorage, _nextCore.state, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setSelectedRingtoneId", [_nextCore.action, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSelectedRingtoneId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSelectedRingtoneId", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "setSelectedRingtoneId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_pushCustomRingtone", [_nextCore.action, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "_pushCustomRingtone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeCustomRingtone", [_nextCore.action, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeCustomRingtone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uploadCustomRingtone", [_dec17, _dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "uploadCustomRingtone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeCustomRingtone", [_dec21, _dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "removeCustomRingtone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateIncomingRingtone", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "updateIncomingRingtone"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showDangerAlert", [_dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "showDangerAlert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isUploadRingtoneDisabled", [_dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "isUploadRingtoneDisabled"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=RingtoneConfiguration.js.map
