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
var _PresenceItem = require("./PresenceItem");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var usePresenceItems = exports.usePresenceItems = function usePresenceItems(_ref) {
  var onChange = _ref.onChange,
    presenceStatusProp = _ref.presenceStatus,
    dndStatusProp = _ref.dndStatus,
    divider = _ref.divider,
    className = _ref.className;
  var items = [{
    type: 'available',
    variant: 'available',
    presenceStatus: _presenceStatus.presenceStatus.available,
    selected: presenceStatusProp === _presenceStatus.presenceStatus.available && dndStatusProp !== _Presence.dndStatus.doNotAcceptAnyCalls
  }, {
    type: 'busy',
    variant: 'busy',
    presenceStatus: _presenceStatus.presenceStatus.busy,
    selected: presenceStatusProp === _presenceStatus.presenceStatus.busy && dndStatusProp !== _Presence.dndStatus.doNotAcceptAnyCalls
  }, {
    type: 'DND',
    variant: 'dnd',
    presenceStatus: _presenceStatus.presenceStatus.busy,
    dndStatus: _Presence.dndStatus.doNotAcceptAnyCalls,
    selected: dndStatusProp === _Presence.dndStatus.doNotAcceptAnyCalls
  }, {
    type: 'offline',
    variant: 'unavailable',
    presenceStatus: _presenceStatus.presenceStatus.offline,
    selected: presenceStatusProp === _presenceStatus.presenceStatus.offline && dndStatusProp !== _Presence.dndStatus.doNotAcceptAnyCalls
  }];
  var selectedItem;
  var elements = items.map(function (item, key) {
    if (item.selected) {
      selectedItem = item;
    }
    return /*#__PURE__*/_react["default"].createElement(_PresenceItem.PresenceItem, _extends({
      key: key,
      dndStatus: _Presence.dndStatus.takeAllCalls,
      onClick: function onClick() {
        return onChange(item.type);
      },
      divider: divider,
      className: className
    }, item));
  });
  return {
    selectedItem: selectedItem,
    elements: elements
  };
};
//# sourceMappingURL=usePresenceItems.js.map
