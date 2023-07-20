import {
  CONTENT_TYPE_TO_EXTENSION,
  EXTENSION_TO_CONTENT_TYPE,
} from './constant';

/**
 * get file name with extension.
 */
export function getFilename(fullPath: string) {
  return fullPath.substring(fullPath.lastIndexOf('/') + 1);
}

/**
 * remove file path extension.
 */
export const removeExtension = (str: string) => {
  return str.split('.').slice(0, -1).join('.');
};

/**
 * get file extension.
 */
export const getFileExtension = (fileName: string) => {
  const splitArrays = fileName.toLowerCase().split('.');
  return splitArrays.length > 1 ? splitArrays.pop()! : '';
};

/**
 * get file extension from content type
 *
 * @example
 * ```ts
 * console.log(getFileExtensionFromContentType('image/gif')) // gif
 * ```
 */
export const getFileExtensionFromContentType = (contentType?: string) => {
  return contentType
    ? CONTENT_TYPE_TO_EXTENSION[contentType.toLowerCase()] ??
        contentType.split('/')[1]
    : undefined;
};

/**
 * get content type from file extension
 *
 * @example
 * ```ts
 * console.log(getFileContentTypeFromExtension('gif')) // image/gif
 * ```
 */
export const getFileContentTypeFromExtension = (extensionName?: string) => {
  return extensionName
    ? EXTENSION_TO_CONTENT_TYPE[extensionName.toLowerCase()]
    : undefined;
};
