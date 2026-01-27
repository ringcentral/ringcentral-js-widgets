"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCallActionButtons = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.to-string.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _Swap = _interopRequireDefault(require("@ringcentral/juno-icon/es6/Swap.js"));
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _components = require("../../components");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var useCallActionButtons = exports.useCallActionButtons = function useCallActionButtons(actions, onEffect, options) {
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var actionMap = (0, _react.useMemo)(function () {
    return {
      mute: function mute() {
        return {
          label: t('mute'),
          symbol: _springIcon.MicrophoneMd
        };
      },
      unmute: function unmute() {
        return {
          label: t('unmute'),
          symbol: _springIcon.MicrophoneOffMd,
          color: 'primary',
          variant: 'inverted'
        };
      },
      hold: function hold() {
        return {
          label: t('hold'),
          symbol: _springIcon.HoldFilledMd
        };
      },
      unHold: function unHold() {
        return {
          label: t('unHold'),
          symbol: _springIcon.HoldFilledMd,
          color: 'primary',
          variant: 'inverted'
        };
      },
      transfer: function transfer() {
        return {
          label: t('transfer'),
          symbol: _springIcon.TransferCallMd
        };
      },
      flip: function flip() {
        return {
          label: t('flip'),
          symbol: _springIcon.FlipMd
        };
      },
      callList: function callList() {
        return {
          label: t('callList'),
          symbol: _springIcon.CallListMd
        };
      },
      park: function park() {
        return {
          label: t('park'),
          symbol: _springIcon.ParkCallMd
        };
      },
      keypad: function keypad() {
        return {
          label: t('keypad'),
          symbol: _springIcon.DialpadMd
        };
      },
      audio: function audio() {
        return {
          label: t('audio'),
          symbol: _springIcon.VolumeMd
        };
      },
      stopRecord: function stopRecord() {
        return {
          label: t('stopRecord'),
          symbol: _springIcon.StopMd,
          color: 'danger',
          variant: 'inverted'
        };
      },
      record: function record() {
        return {
          label: t('record'),
          symbol: _springIcon.RecordMd
        };
      },
      merge: function merge() {
        return {
          label: t('mergeToConference'),
          tooltip: t('mergeTooltip'),
          symbol: _springIcon.MergeCallsMd
        };
      },
      answer: function answer() {
        return {
          color: 'success',
          label: t('answer'),
          symbol: _springIcon.CallFilledMd,
          variant: 'contained'
        };
      },
      voicemail: function voicemail() {
        return {
          label: t('voicemail'),
          color: 'danger',
          symbol: _springIcon.VoicemailMd,
          variant: 'contained'
        };
      },
      hangUp: function hangUp() {
        return {
          label: t('end'),
          tooltip: t((options === null || options === void 0 ? void 0 : options.isConferenceCall) ? 'leaveCall' : 'endCall'),
          color: 'danger',
          symbol: _springIcon.CallFilledMd,
          variant: 'contained',
          className: 'sui-call-button-end'
        };
      },
      add: function add() {
        return {
          label: t('add'),
          symbol: _springIcon.PlusMd
        };
      },
      endAndAnswer: function endAndAnswer() {
        return {
          label: t('endAndAnswer'),
          symbol: _springIcon.PlusMd,
          Component: function Component(props) {
            return /*#__PURE__*/_react["default"].createElement(_components.EndAndAnswerButton, _extends({
              size: "small"
            }, props));
          }
        };
      },
      holdAndAnswer: function holdAndAnswer() {
        return {
          label: t('holdAndAnswer'),
          symbol: _springIcon.PlusMd,
          Component: function Component(props) {
            return /*#__PURE__*/_react["default"].createElement(_components.AnswerAndHoldButton, _extends({
              size: "small"
            }, props));
          }
        };
      },
      forward: function forward() {
        return {
          label: t('forward'),
          symbol: _springIcon.ForwardMd
        };
      },
      reply: function reply() {
        return {
          label: t('reply'),
          symbol: _springIcon.ReplyMd
        };
      },
      ignoreQueue: function ignoreQueue() {
        return {
          label: t('ignore'),
          symbol: _springIcon.MinusMd,
          color: 'danger',
          variant: 'contained'
        };
      },
      ignore: function ignore() {
        return {
          label: t('ignore'),
          symbol: _springIcon.MinusMd
        };
      },
      swap: function swap() {
        return {
          label: t('swap'),
          // TODO: replace with spring icon, once it's ready
          symbol: _Swap["default"]
        };
      },
      "switch": function _switch() {
        return {
          label: t('switch'),
          // TODO: change the spring icon, once we have the switch button
          symbol: _springIcon.FlipMd
        };
      },
      aiNotes: function aiNotes() {
        return {
          label: t('notes'),
          symbol: _springIcon.SmartNotesMd
        };
      },
      stopNotes: function stopNotes() {
        return {
          label: t('stopNotes'),
          color: 'danger',
          symbol: _springIcon.SmartNotesMd
        };
      }
    };
  }, [options === null || options === void 0 ? void 0 : options.isConferenceCall, t]);
  var effect = (0, _springUi.useEventCallback)(onEffect);
  return (0, _react.useMemo)(function () {
    return actions.map(function (action) {
      var actionType = action.type;
      var disabled = action.disabled;
      var propsGetter = actionMap[actionType];
      if (process.env.NODE_ENV !== 'production' && !propsGetter) {
        throw new Error("actionType \"".concat(actionType, "\" not exist"));
      }
      var item = _objectSpread(_objectSpread({
        actionType: actionType,
        disabled: disabled,
        color: 'secondary',
        iconSize: 'medium'
      }, propsGetter === null || propsGetter === void 0 ? void 0 : propsGetter()), {}, {
        onClick: function onClick(e) {
          effect(actionType);
          e.stopPropagation();
        }
      });
      return item;
    });
  }, [actionMap, actions, effect]);
};
//# sourceMappingURL=useCallActionButtons.js.map
