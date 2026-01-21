import { COVER_US_LIST } from './FaxCover';
import { SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_LIST } from './supportedTypes';

export const FAX_CONTENT_LIMIT = {
  MAX_ATTACHMENT_STORAGE_SIZE: 50 * 1024 * 1024, // 50 MB
  MAX_ATTACHMENT_STORAGE_SIZE_IN_MB: 50,
};

export const FAX_ATTACHMENTS_ACCEPT =
  SUPPORTED_FAX_ATTACHMENTS_IN_LOWERCASE_LIST.map((ext) => `.${ext}`).join(',');

export const FAX_COVER_NONE_VALUE: number = COVER_US_LIST[0].id;
