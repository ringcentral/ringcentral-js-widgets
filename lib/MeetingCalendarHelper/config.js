"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rcvTeleconference = exports.rcvAttTeleconference = exports.MEETING_URI_REGEXP = void 0;
var MEETING_URI_REGEXP = {
  EMAIL: /w?(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
  RCM: /(https?):\/\/((((meetings|rcm\.rcdev)\.(ringcentral|btcloudphone\.bt|businessconnect\.telus))|(meetings-officeathand\.att)|(rcm.rcdev.ringcentral))\.com|((\w+\.)*(meetzoom|zoom)\.us))(\/\w+)?(\/(\d+))(\?pwd=\w+)?/i,
  RCV: /(https?):\/\/(((verizon\.)?(v\.ringcentral)|(meetings\.officeathand\.att)|(video\.(unifyoffice|cloudoffice\.avaya|rainbowoffice))|((glpci1xmn|itlcixmn|xmnup)-rxe-1-v(-(vodafone|avaya|atos|rainbow|bt|telus))?\.lab\.nordigy)|((vi11|amrupams-shr)-(1|2)-v(-(att|bt|telus))?\.lab\.nordigy))\.(com|ru|biz))(\/{1,2}\w+)*(\/{1,2}(\d+))(\?pw=\w{32})?/i
};
exports.MEETING_URI_REGEXP = MEETING_URI_REGEXP;
var rcvAttTeleconference = 'https://meetings.officeathand.att.com/teleconference';
exports.rcvAttTeleconference = rcvAttTeleconference;
var rcvTeleconference = 'https://v.ringcentral.com/teleconference/'; // gsuite is using export at bottom

exports.rcvTeleconference = rcvTeleconference;
//# sourceMappingURL=config.js.map
