import { invertObj } from '../invertObj';

// project/phone/core/rc_item_common/src/utils/RCItemUtils.ts:153
export const CONTENT_TYPE_TO_EXTENSION = {
  'text/vcard': 'vcf',
  'image/tiff': 'tif',
  'image/jpeg': 'jpg',
  'x-ms-wmv': 'wmv',
  'x-flv': 'flv',
  'audio/mpeg': 'mp3',
  'video/mpeg': 'mpeg',
  'video/mp4': 'mp4',
  'text/plain': 'txt',
  'text/html': 'html',
  'image/svg+xml': 'svg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/bmp': 'bmp',
  'application/gzip': 'gz',
  'audio/mp4': 'm4a',
  'audio/amr': 'amr',
  'application/rtf': 'rtf',
  'application/zip': 'zip',
  'video/x-msvideo': 'avi',
  'video/msvideo': 'msvideo',
  'video/x-flv': 'flv',
  'video/quicktime': 'mov',
} as Record<string, string>;

export const EXTENSION_TO_CONTENT_TYPE = invertObj(CONTENT_TYPE_TO_EXTENSION);
