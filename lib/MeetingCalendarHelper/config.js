"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rcvTeleconference = exports.rcvAttTeleconference = exports.MEETING_URI_REGEXP = void 0;
var MEETING_URI_REGEXP = {
  EMAIL: /w?(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
  RCM: /(http|https):\/\/((((meetings|rcm\.rcdev)\.(ringcentral|btcloudphone\.bt|businessconnect\.telus))|(meetings-officeathand\.att))\.com|((\w+\.)*(meetzoom|zoom)\.us))(\/\w+)?(\/(\d+))(\?pwd=\w+)?/i,
  RCV: /(http|https):\/\/(((v\.ringcentral)|(meetings\.officeathand\.att)|((glpci1xmn|xmnup)-rxe-1-v(-(avaya|atos))?\.lab\.nordigy)|(amrupams-shr-1-v\.lab\.nordigy)|(vi11-1-v\.lab\.nordigy)|(vi11-1-v-att\.lab\.nordigy))\.(com|ru))(\/{1,2}\w+)*(\/{1,2}(\d+))(\?pw=\w{32})?/i
};
exports.MEETING_URI_REGEXP = MEETING_URI_REGEXP;
var rcvAttTeleconference = 'https://meetings.officeathand.att.com/teleconference';
exports.rcvAttTeleconference = rcvAttTeleconference;
var rcvTeleconference = 'https://v.ringcentral.com/teleconference/';
exports.rcvTeleconference = rcvTeleconference;
//# sourceMappingURL=config.js.map
