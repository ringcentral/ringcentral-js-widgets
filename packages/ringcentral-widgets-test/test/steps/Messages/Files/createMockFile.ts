import { getFileExtension } from '@ringcentral-integration/utils';

const mimeTypes: { [key: string]: string } = {
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  bmp: 'image/bmp',
  tiff: 'image/tiff',
  tif: 'image/tiff',
  svg: 'image/svg+xml',
  vcf: 'text/vcard',
  vcard: 'text/vcard',
  rtf: 'application/rtf',
  '3gp': 'video/3gpp',
  mp4: 'video/mp4',
  mpeg: 'video/mpeg',
  avi: 'video/x-msvideo',
  mp3: 'audio/mpeg',
  zip: 'application/zip',
  gzip: 'application/gzip',
  mov: 'video/quicktime',
  ogg: 'video/ogg',
  oga: 'audio/ogg',
  wmv: 'x-ms-wmv',
  flv: 'x-flv',
  txt: 'text/plain',
  html: 'text/html',
  gz: 'application/gzip',
  amr: 'audio/amr',
  msvideo: 'video/msvideo',
  pdf: 'application/pdf',
  wav: 'audio/wav',
  webp: 'image/webp',
  webm: 'video/webm',
  csv: 'text/csv',
  ics: 'text/calendar',
  m4a: 'audio/mp4',
};

const getMimeType = (extension: string): string | undefined => {
  return mimeTypes[extension] || undefined;
};

/**
 * 1KB Unit
 */
export const KB = 1024;

/**
 * 1 MB unit
 */
export const MB = 1024 * KB;

export const createMockFile = (fileName: string, fileSize: number = MB) => {
  const ext = getFileExtension(fileName);
  const type = getMimeType(ext)!;
  const file = new File([''], fileName, {
    type,
  });
  Object.defineProperty(file, 'size', { value: fileSize });
  Object.defineProperty(file, 'type', { value: type });
  return file;
};
