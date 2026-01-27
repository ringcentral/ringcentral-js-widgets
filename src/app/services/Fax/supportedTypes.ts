// refer from J: project/phone/core/fax/src/constant.ts
export const SUPPORTED_DOC_EXT_IN_LOWERCASE_LIST = ['doc', 'docx'];

// ref:
// https://support.ringcentral.com/article/Fax-Supported-File-Attachments.html?language=en_US
export const SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_LIST = [
  'pdf',
  'psd',
  'docm',
  'dot',
  'mcw',
  'xls',
  'xlsx',
  'xlsb',
  'xlsm',
  'ppt',
  'pptx',
  'pptm',
  'vsd',
  'vdx',
  'pub',
  'wps',
  'wri',
  'awd',
  'tif',
  'tiff',
  'gif',
  'jpg',
  'jpeg',
  'bmp',
  'png',
  'pcx',
  'tga',
  'rtf',
  'txt',
  'log',
  'h',
  'cpp',
  'c',
  'err',
  'hpp',
  'wk1',
  'wk3',
  'wk4',
  'wq1',
  'xml',
  'html',
  'htm',
  'csv',
].concat(SUPPORTED_DOC_EXT_IN_LOWERCASE_LIST);

const TEXT_PLAIN = 'text/plain';
const APPLICATION_PDF = 'application/pdf';
const APPLICATION = 'application/vnd.lotus-1-2-3';
const APPLICATION_MS = 'application/msword';
const APPLICATION_MSX =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
export const SUPPORTED_FAX_EXT_MIME_TYPE_MAP = new Map<string, string>([
  ['log', TEXT_PLAIN],
  ['pdf', APPLICATION_PDF],
  ['h', TEXT_PLAIN],
  ['cpp', TEXT_PLAIN],
  ['hpp', TEXT_PLAIN],
  ['c', TEXT_PLAIN],
  ['err', TEXT_PLAIN],
  ['wk1', APPLICATION],
  ['wk3', APPLICATION],
  ['wk4', APPLICATION],
  ['pub', 'application/x-mspublisher'],
  ['wri', 'application/x-mswrite'],
  ['psd', 'image/vnd.adobe.photoshop'],
  ['awd', 'application/octet-stream'],
  ['pcx', 'image/x-pcx'],
  ['tga', 'image/x-tga'],
  ['wps', 'application/vnd.ms-works'],
  ['vsd', 'application/vnd.visio'],
  ['wq1', 'application/x-quattro-pro'],
  ['xml', 'application/xml'],
  ['csv', 'text/csv'],
  ['mcw', APPLICATION_MS],
  ['vdx', 'application/vnd.visio'],
  ['doc', APPLICATION_MS],
  ['docx', APPLICATION_MSX],
]);

export const SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_SET = new Set(
  SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_LIST,
);
