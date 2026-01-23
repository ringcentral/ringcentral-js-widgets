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
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHistoryActionButtons = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = require("react");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * hooks for history action buttons data source
 *
 * ```tsx
 * useHistoryActionButtons(
 *  [
 *   { type: 'addEntity' },
 *   { type: 'viewEntity' },
 *   { type: 'delete' },
 * ],
 * (actionType) => {
 *    console.log(actionType);
 * });
 * ```
 */
var useHistoryActionButtons = exports.useHistoryActionButtons = function useHistoryActionButtons(actions, onEffect) {
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var actionMap = (0, _react.useMemo)(function () {
    return {
      addEntity: function addEntity() {
        return {
          label: t('addEntity'),
          symbol: _springIcon.InviteMd
        };
      },
      addRecord: function addRecord(action) {
        return {
          label: t('addRecord'),
          symbol: _springIcon.PlusMd,
          isSubmenu: action === null || action === void 0 ? void 0 : action.isSubmenu,
          submenuActions: action === null || action === void 0 ? void 0 : action.submenuActions
        };
      },
      viewEntity: function viewEntity(action) {
        return {
          label: (action === null || action === void 0 ? void 0 : action.label) || t('viewDetails'),
          symbol: _springIcon.ContactsMd
        };
      },
      "delete": function _delete() {
        return {
          label: t('delete'),
          symbol: _springIcon.TrashMd
        };
      },
      call: function call() {
        return {
          label: t('call'),
          symbol: _springIcon.CallMd
        };
      },
      text: function text() {
        return {
          label: t('text'),
          symbol: _springIcon.Smsmd
        };
      },
      viewFax: function viewFax() {
        return {
          label: t('viewFax'),
          symbol: _springIcon.ShowMd
        };
      },
      downloadFax: function downloadFax() {
        return {
          component: 'a',
          label: t('downloadFax'),
          symbol: _springIcon.DownloadMd,
          target: '_blank',
          download: true,
          rel: 'noreferrer'
        };
      },
      downloadVoicemail: function downloadVoicemail() {
        return {
          component: 'a',
          label: t('downloadVoicemail'),
          symbol: _springIcon.DownloadMd,
          target: '_blank',
          download: true,
          rel: 'noreferrer'
        };
      },
      copyNumber: function copyNumber() {
        return {
          label: t('copyNumber'),
          symbol: _springIcon.CopyMd
        };
      },
      mark: function mark() {
        return {
          label: t('mark'),
          symbol: _springIcon.MarkUnreadMd
        };
      },
      unmark: function unmark() {
        return {
          label: t('unmark'),
          symbol: _springIcon.MarkUnreadFilledMd
        };
      },
      createLog: function createLog() {
        return {
          label: t('createLog'),
          symbol: _springIcon.DispositionMd
        };
      },
      selectRecordsForAutoLog: function selectRecordsForAutoLog() {
        return {
          label: t('selectRecordsForAutoLog'),
          symbol: _springIcon.DispositionMd
        };
      },
      viewLog: function viewLog(action) {
        return {
          label: action === null || action === void 0 ? void 0 : action.label,
          symbol: _springIcon.ArrowRightUpMd
        };
      },
      resolveThread: function resolveThread() {
        return {
          label: t('resolveThread'),
          symbol: _springIcon.CheckBoldMd
        };
      },
      assignToMe: function assignToMe() {
        return {
          label: t('assignToMe'),
          symbol: _springIcon.TextReplyMd
        };
      },
      reassignThread: function reassignThread() {
        return {
          label: t('reassignThread'),
          symbol: _springIcon.ReassignMd
        };
      },
      assignThread: function assignThread() {
        return {
          label: t('assignThread'),
          symbol: _springIcon.ReassignMd
        };
      },
      unassignThread: function unassignThread() {
        return {
          label: t('unassignThread'),
          symbol: _springIcon.MinusMd
        };
      }
    };
  }, [t]);
  var effect = (0, _springUi.useEventCallback)(onEffect);
  return (0, _react.useMemo)(function () {
    return actions.map(function (action) {
      var actionType = action.type;
      var disabled = action.disabled;
      var href = action.href;
      var isSubmenu = action.isSubmenu;
      var submenuActions = action.submenuActions;
      var propsGetter = actionMap[actionType];
      if (process.env.NODE_ENV !== 'production' && !propsGetter) {
        throw new Error("actionType \"".concat(actionType, "\" not exist"));
      }
      var actionButtonProps = propsGetter === null || propsGetter === void 0 ? void 0 : propsGetter(action);
      var item = _objectSpread(_objectSpread({
        actionType: actionType,
        disabled: disabled,
        shape: 'squircle',
        variant: 'outlined',
        color: 'secondary',
        size: 'medium'
      }, actionButtonProps), {}, {
        onClick: function onClick(e) {
          effect(actionType, e);
          e.stopPropagation();
        }
      });
      if ((actionButtonProps === null || actionButtonProps === void 0 ? void 0 : actionButtonProps.component) === 'a') {
        item.href = href;
      }
      if (isSubmenu && submenuActions) {
        item.isSubmenu = true;
        item.submenuActions = submenuActions.map(function (subAction) {
          return _objectSpread(_objectSpread({}, subAction), {}, {
            onClick: function onClick(e) {
              var _subAction$onClick;
              var result = (_subAction$onClick = subAction.onClick) === null || _subAction$onClick === void 0 ? void 0 : _subAction$onClick.call(subAction, e);

              // when the action is prevented, don't call the effect
              if (!result) {
                effect(subAction.actionType, e);
              }
              e.stopPropagation();
            }
          });
        });
      }
      return item;
    });
  }, [actionMap, actions, effect]);
};
//# sourceMappingURL=useHistoryActionButtons.js.map
