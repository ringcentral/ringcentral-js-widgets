"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTabMap = void 0;
var _springIcon = require("@ringcentral/spring-icon");
var defaultTabMap = exports.defaultTabMap = {
  dialer: {
    symbol: _springIcon.CallMd,
    activeSymbol: _springIcon.CallFilledMd
  },
  text: {
    symbol: _springIcon.Smsmd,
    activeSymbol: _springIcon.SmsFilledMd
  },
  fax: {
    symbol: _springIcon.FaxMd,
    activeSymbol: _springIcon.FaxFilledMd
  },
  settings: {
    symbol: _springIcon.SettingsMd,
    activeSymbol: _springIcon.SettingsFilledMd
  },
  video: {
    symbol: _springIcon.VideoMd,
    activeSymbol: _springIcon.VideoFilledMd
  }
};
//# sourceMappingURL=tabs.js.map
