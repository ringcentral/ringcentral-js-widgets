import { getFileExtension } from '@ringcentral-integration/utils';

import { SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_SET } from '../supportedTypes';

// ref from J: project/phone/core/fax/src/controller/FaxAttachmentController.ts
export const isSupportedFaxFile = (file: File) => {
  const extName = getFileExtension(file.name);

  return (
    extName &&
    SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_SET.has(extName.toLowerCase()) &&
    file.name.length <= 256
  );
};
