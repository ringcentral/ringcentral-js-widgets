"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsEnum = exports.HintsType = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var TabsEnum = _ObjectMap.ObjectMap.fromKeys(['personal', 'company', 'thirdParty']);

exports.TabsEnum = TabsEnum;

var HintsType = _ObjectMap.ObjectMap.fromKeys(['thirdPartyRecordsTitle', 'thirdPartyNoRecordsTitle', 'thirdPartyNoRecordsContent', 'personalNoRecordsTitle', 'personalNoRecordsContent', 'noFilterOrSearchRecordsTitle', 'noFilterOrSearchRecordsContent', 'searchBarContent']);

exports.HintsType = HintsType;
//# sourceMappingURL=ContactSearchPanelEnum.js.map
