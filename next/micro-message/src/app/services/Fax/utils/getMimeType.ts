import { getFileExtension } from '@ringcentral-integration/utils';

import { SUPPORTED_FAX_EXT_MIME_TYPE_MAP } from '../supportedTypes';

export const getMimeType = (fileExt: string): string | undefined => {
  return SUPPORTED_FAX_EXT_MIME_TYPE_MAP.get(fileExt);
};

export const getMimeTypeByFile = (file: File) => {
  const fileExt = getFileExtension(file.name);
  return getMimeType(fileExt) || file.type || fileExt;
};
