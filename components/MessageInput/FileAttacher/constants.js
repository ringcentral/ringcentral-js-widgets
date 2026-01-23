"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE = exports.ENHANCED_MMS_MIME_TYPES_IN_LOWERCASE = void 0;
// https://developers.ringcentral.com/guide/messaging/sms/sending-images
var SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE = exports.SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE = ['image/tiff', 'image/gif', 'image/jpeg', 'image/bmp', 'image/png', 'image/svg+xml', 'text/vcard', 'video/mp4', 'video/mpeg', 'audio/mpeg', 'application/zip'];
var ENHANCED_MMS_MIME_TYPES_IN_LOWERCASE = exports.ENHANCED_MMS_MIME_TYPES_IN_LOWERCASE = ['application/pdf', 'application/rtf', 'image/webp', 'video/3gpp', 'video/mov', 'video/quicktime', 'video/webm', 'video/x-ms-wmv', 'video/x-flv', 'video/x-msvideo', 'audio/ogg', 'audio/oga', 'audio/ogx', '.ogx',
// added this extension as a workaround to support uploading ogx files.
'application/ogg', 'audio/x-wav', 'audio/wav', 'audio/mp4', 'audio/amr', 'text/csv', 'text/calendar', 'text/plain'];
//# sourceMappingURL=constants.js.map
