"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = RCBrandConfig;
exports.ATTBrandConfig = ATTBrandConfig;
exports.TelusBrandConfig = TelusBrandConfig;

function RCBrandConfig() {
  return {
    id: '1210',
    code: 'rc',
    name: 'RingCentral',
    appName: 'RingCentral for Dynamics'
  };
}

function ATTBrandConfig() {
  return {
    id: '3420',
    code: 'att',
    name: 'Office@Hand',
    appName: 'Office@Hand for Dynamics'
  };
}

function TelusBrandConfig() {
  return {
    id: '7310',
    code: 'telus',
    name: 'TELUS Business Connect',
    appName: 'TELUS Business Connect for Dynamics'
  };
}
//# sourceMappingURL=brandConfig.js.map
