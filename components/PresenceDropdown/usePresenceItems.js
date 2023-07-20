"use strict";

require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.assign");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePresenceItems = void 0;
var _react = _interopRequireDefault(require("react"));
var _presenceStatus = require("@ringcentral-integration/commons/enums/presenceStatus.enum");
var _Presence = require("@ringcentral-integration/commons/modules/Presence");
var _PresenceItem = require("../PresenceItem");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var usePresenceItems = function usePresenceItems(_ref) {
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
exports.usePresenceItems = usePresenceItems;
//# sourceMappingURL=usePresenceItems.js.map
