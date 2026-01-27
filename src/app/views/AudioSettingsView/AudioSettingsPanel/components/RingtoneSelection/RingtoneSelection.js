"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingtoneSelection = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
var _RingtoneConfiguration = require("@ringcentral-integration/commons/modules/RingtoneConfiguration");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _RemoveRingtoneDialog = require("./components/RemoveRingtoneDialog");
var _RingtoneUploadButton = require("./components/RingtoneUploadButton");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var RingtoneSelection = exports.RingtoneSelection = function RingtoneSelection(_ref) {
  var label = _ref.label,
    volume = _ref.volume,
    isDisabled = _ref.isDisabled,
    ringtoneList = _ref.ringtoneList,
    ringtoneDeviceId = _ref.ringtoneDeviceId,
    selectedRingtoneId = _ref.selectedRingtoneId,
    enableCustomRingtone = _ref.enableCustomRingtone,
    isUploadRingtoneDisabled = _ref.isUploadRingtoneDisabled,
    updateCurrentRingtone = _ref.updateCurrentRingtone,
    uploadCustomRingtone = _ref.uploadCustomRingtone,
    removeCustomRingtone = _ref.removeCustomRingtone,
    _showAlert = _ref.showAlert;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    playing = _useState2[0],
    setPlaying = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    playingId = _useState4[0],
    setPlayingId = _useState4[1];
  var ref = (0, _react.useRef)(null);
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    audioUrl = _useState6[0],
    setAudioUrl = _useState6[1];
  var inputElRef = (0, _react.useRef)(null);
  var _useState7 = (0, _react.useState)({
      id: '',
      name: ''
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    ringtonePlanToRemoved = _useState8[0],
    setRingtonePlanToRemoved = _useState8[1];
  var audio = (0, _springUi.useAudio)(function (audio) {
    var resetPlaying = function resetPlaying() {
      setPlaying(false);
      setPlayingId('');
    };
    audio.onplay = function () {
      return setPlaying(true);
    };
    audio.onpause = resetPlaying;
    audio.onended = resetPlaying;
    audio.onerror = resetPlaying;
    if (volume !== undefined) {
      audio.volume = volume;
    }
    if (audioUrl) {
      audio.src = audioUrl;
    }
    if (ringtoneDeviceId) {
      var _audio$setSinkId;
      (_audio$setSinkId = audio.setSinkId) === null || _audio$setSinkId === void 0 ? void 0 : _audio$setSinkId.call(audio, ringtoneDeviceId);
    }
  });
  var turnOffAudio = (0, _react.useCallback)(function () {
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [audio, playing]);
  var customRingtoneNameList = (0, _react.useMemo)(function () {
    var customRingtoneList = ringtoneList.filter(function (ringtone) {
      return ringtone.type === 'custom';
    });
    return customRingtoneList.map(function (ringtone) {
      return ringtone.name;
    });
  }, [ringtoneList]);
  (0, _react.useEffect)(function () {
    if (volume !== undefined) {
      audio.volume = volume;
    }
    if (ringtoneDeviceId) {
      var _audio$setSinkId2;
      (_audio$setSinkId2 = audio.setSinkId) === null || _audio$setSinkId2 === void 0 ? void 0 : _audio$setSinkId2.call(audio, ringtoneDeviceId);
    }
  }, [audio, volume, ringtoneDeviceId]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].ringtoneContainer,
    "data-sign": "ringtoneSelectionContainer"
  }, enableCustomRingtone && /*#__PURE__*/_react["default"].createElement(_RemoveRingtoneDialog.RemoveRingtoneDialog, {
    name: (0, _RingtoneConfiguration.getFileNameWithoutExt)(ringtonePlanToRemoved.name),
    open: !!(ringtonePlanToRemoved.id && ringtonePlanToRemoved.name),
    onCancel: function onCancel() {
      return setRingtonePlanToRemoved({
        id: '',
        name: ''
      });
    },
    onConfirm: function onConfirm() {
      setRingtonePlanToRemoved({
        id: '',
        name: ''
      });
      removeCustomRingtone(ringtonePlanToRemoved.id);
    }
  }), label ? /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    "data-sign": "ringtoneSelectionLabel",
    className: "text-neutral-b0 typography-mainText",
    component: "p"
  }, label) : null, /*#__PURE__*/_react["default"].createElement(_springUi.Select, {
    displayEmpty: true,
    size: "medium",
    className: "w-full [&_.sui-form-field-focus-effect]:border-none",
    classes: {
      content: 'border-none'
    },
    disabled: isDisabled,
    MenuProps: {
      onExitComplete: function onExitComplete() {
        turnOffAudio();
      }
    },
    focused: false,
    ref: ref,
    "data-sign": "ringtoneSelection",
    value: selectedRingtoneId,
    renderValue: function renderValue(id) {
      var label;
      var selected = ringtoneList.find(function (ringtone) {
        return ringtone.id === id;
      });
      if (!selected) {
        label = '';
      } else {
        var type = selected.type,
          name = selected.name;
        label = type === 'default' ? t(id) : (0, _RingtoneConfiguration.getFileNameWithoutExt)(name);
      }
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "text-neutral-b2"
      }, label);
    }
  }, enableCustomRingtone && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
    key: "add",
    "data-sign": "addRingtone",
    className: (0, _clsx["default"])(_styles["default"].addRingtoneItem, 'py-0'),
    onClick: function onClick(e) {
      turnOffAudio();
      e.stopPropagation();
      if (inputElRef.current) {
        inputElRef.current.click();
      }
    },
    disabled: isUploadRingtoneDisabled,
    classes: {
      container: 'w-full gap-3'
    }
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    symbol: _springIcon.PlusMd,
    size: "small"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    className: "flex-1"
  }, t('add'))), /*#__PURE__*/_react["default"].createElement(_springUi.Divider, {
    "aria-hidden": true,
    tabIndex: -1,
    className: _styles["default"].addRingtoneDivider
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-h-60 overflow-y-auto overflow-x-hidden"
  }, ringtoneList.map(function (ringtone) {
    var id = ringtone.id,
      type = ringtone.type,
      name = ringtone.name,
      url = ringtone.url;
    var isDefaultRingtone = type === 'default';
    return /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
      key: id,
      className: _styles["default"].ringtoneItem,
      classes: {
        container: 'w-full flex'
      },
      value: id,
      onClick: function onClick(e) {
        e.stopPropagation();
        if (selectedRingtoneId !== id) {
          updateCurrentRingtone(id);
        }
      }
    }, /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, null, isDefaultRingtone ? t(id) : (0, _RingtoneConfiguration.getFileNameWithoutExt)(name)), /*#__PURE__*/_react["default"].createElement("i", {
      className: "flex-auto"
    }), url && /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center gap-1"
    }, !isDefaultRingtone && /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
      symbol: _springIcon.TrashMd,
      TooltipProps: {
        title: t('delete')
      },
      size: "small",
      variant: "icon",
      "data-sign": "delete",
      className: "text-neutral-b2",
      color: "secondary",
      onClick: function onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        setRingtonePlanToRemoved({
          id: id,
          name: name
        });
      }
    }), /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
      symbol: _springIcon.PlayMd,
      "data-sign": "play",
      TooltipProps: {
        title: t('play')
      },
      size: "small",
      variant: "icon",
      className: "text-neutral-b2",
      color: playing && id === playingId ? 'primary' : 'secondary',
      onClick: (/*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
          var _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                e.stopPropagation();
                _context.p = 1;
                turnOffAudio();
                if (!(ringtoneDeviceId === 'off' || !ringtoneDeviceId)) {
                  _context.n = 2;
                  break;
                }
                return _context.a(2);
              case 2:
                setPlayingId(id);
                audio.src = url;
                setAudioUrl(url);
                audio.play();
                _context.n = 4;
                break;
              case 3:
                _context.p = 3;
                _t = _context.v;
                console.log(_t);
              case 4:
                return _context.a(2);
            }
          }, _callee, null, [[1, 3]]);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }())
    })));
  }))), enableCustomRingtone && /*#__PURE__*/_react["default"].createElement(_RingtoneUploadButton.RingtoneUploadButton, {
    ref: inputElRef,
    customRingtoneNameList: customRingtoneNameList,
    showAlert: function showAlert(message) {
      _showAlert(message);
    },
    onUploadRingtone: function onUploadRingtone(info) {
      uploadCustomRingtone(info);
    }
  }));
};
//# sourceMappingURL=RingtoneSelection.js.map
