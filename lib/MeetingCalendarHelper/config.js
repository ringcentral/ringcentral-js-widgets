"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MEETING_URI_REGEXP_EMAIL = void 0;

/** Domain of RCV
 *  Rainbow：xmnup-rxe-1-v-rainbow.lab.nordigy.ru (test env); video.rainbowoffice.com (prod env)
 *  Avaya: xmnup-rxe-1-v-avaya.lab.nordigy.ru (test env); video.cloudoffice.avaya.com (prod env)
 *  RC: xmnup-rxe-1-v.lab.nordigy.ru	(test env); v.ringcentral.com (prod env)
 *  RND-VI3-AMS + RND-VI11-AMS: 	"vi11-1-v.lab.nordigy.ru | vi11-2-v.lab.nordigy.ru" (test env has two domain)
 *  AT&T:	vi11-1-v-att.lab.nordigy.ru (test env) ;	meetings.officeathand.att.com (prod env)
 *  Atos:	xmnup-rxe-1-v-atos.lab.nordigy.ru(test env); video-atos.ringcentral.com (prod env)
 */
var MEETING_URI_REGEXP_EMAIL = /w?(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/; // gsuite is using export at bottom

exports.MEETING_URI_REGEXP_EMAIL = MEETING_URI_REGEXP_EMAIL;
//# sourceMappingURL=config.js.map
