"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MEETING_URI_REGEXP_EMAIL = void 0;
/** Domain of RCV
 *  RC: xmnup-rxe-1-v.rc-lab-mock-domain.com	(test env); v.ringcentral.com (prod env)
 *  RND-VI3-AMS + RND-VI11-AMS: 	"vi11-1-v.rc-lab-mock-domain.com | vi11-2-v.rc-lab-mock-domain.com" (test env has two domain)
 *  AT&T:	vi11-1-v-att.rc-lab-mock-domain.com (test env) ;	meetings.officeathand.att.com (prod env)
 *  Atos:	xmnup-rxe-1-v-atos.rc-lab-mock-domain.com(test env); video-atos.ringcentral.com (prod env)
 */

var MEETING_URI_REGEXP_EMAIL = exports.MEETING_URI_REGEXP_EMAIL = /w?(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;

// gsuite is using export at bottom
//# sourceMappingURL=config.js.map
