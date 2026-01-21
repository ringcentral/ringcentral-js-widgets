// https://developers.ringcentral.com/guide/messaging/sms/sending-images
export const SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE = [
  'image/tiff',
  'image/gif',
  'image/jpeg',
  'image/bmp',
  'image/png',
  'image/svg+xml',
  'text/vcard',
  'video/mp4',
  'video/mpeg',
  'audio/mpeg',
  'application/zip',
];

export const ENHANCED_MMS_MIME_TYPES_IN_LOWERCASE = [
  'application/pdf',
  'application/rtf',
  'image/webp',
  'video/3gpp',
  'video/mov',
  'video/quicktime',
  'video/webm',
  'video/x-ms-wmv',
  'video/x-flv',
  'video/x-msvideo',
  'audio/ogg',
  'audio/oga',
  'audio/ogx',
  '.ogx', // added this extension as a workaround to support uploading ogx files.
  'application/ogg',
  'audio/x-wav',
  'audio/wav',
  'audio/mp4',
  'audio/amr',
  'text/csv',
  'text/calendar',
  'text/plain',
];
