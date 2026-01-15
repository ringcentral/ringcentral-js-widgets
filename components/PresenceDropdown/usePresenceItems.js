"use strict";

require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePresenceItems = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _presenceStatus = require("@ringcentral-integration/commons/enums/presenceStatus.enum");
var _Presence = require("@ringcentral-integration/commons/modules/Presence");
var _react = _interopRequireDefault(require("react"));
var _PresenceItem = require("../PresenceItem");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var usePresenceItems = exports.usePresenceItems = function usePresenceItems(_ref) {
  var onChange = _ref.onChange,
    currentLocale = _ref.currentLocale,
    userStatus = _ref.userStatus,
    dndStatusProp = _ref.dndStatus;
  var items = [{
    type: 'available',
    userStatus: _presenceStatus.presenceStatus.available,
    selected: userStatus === _presenceStatus.presenceStatus.available && dndStatusProp !== _Presence.dndStatus.doNotAcceptAnyCalls
  }, {
    type: 'busy',
    userStatus: _presenceStatus.presenceStatus.busy,
    selected: userStatus === _presenceStatus.presenceStatus.busy && dndStatusProp !== _Presence.dndStatus.doNotAcceptAnyCalls
  }, {
    type: 'DND',
    userStatus: _presenceStatus.presenceStatus.busy,
    dndStatus: _Presence.dndStatus.doNotAcceptAnyCalls,
    selected: dndStatusProp === _Presence.dndStatus.doNotAcceptAnyCalls
  }, {
    type: 'offline',
    userStatus: _presenceStatus.presenceStatus.offline,
    selected: userStatus === _presenceStatus.presenceStatus.offline && dndStatusProp !== _Presence.dndStatus.doNotAcceptAnyCalls
  }];
  var selectedItem;
  var elements = items.map(function (item, key) {
    if (item.selected) {
      selectedItem = item;
    }
    return /*#__PURE__*/_react["default"].createElement(_PresenceItem.PresenceItem, _extends({
      key: key,
      dndStatus: _Presence.dndStatus.takeAllCalls,
      currentLocale: currentLocale
      // @ts-expect-error TS(2345): Argument of type 'RcPresenceType | undefined' is n... Remove this comment to see the full error message
      ,
      onClick: function onClick() {
        return onChange(item.type);
      }
    }, item));
  });
  return {
    selectedItem: selectedItem,
    elements: elements
  };
};
//# sourceMappingURL=usePresenceItems.js.map
