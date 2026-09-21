import { SECRET_MARKER_V2 } from '@ringcentral-integration/next-core';

const EXTENSION_INFO_PATH =
  /^\/restapi\/v1\.0\/account\/[^/]+\/extension\/[^/]+\/?$/;

const isExtensionInfoUrl = (requestUrl: string) => {
  try {
    return EXTENSION_INFO_PATH.test(
      new URL(requestUrl, 'https://localhost').pathname,
    );
  } catch {
    return false;
  }
};

/** Removes an extension's display name before its response is logged. */
export const sanitizeResponseBodyForLog = (
  requestUrl: string | undefined,
  responseBody: unknown,
) => {
  if (!requestUrl || !isExtensionInfoUrl(requestUrl)) {
    return responseBody;
  }

  if (typeof responseBody !== 'string' || responseBody.length === 0) {
    return responseBody;
  }

  try {
    const extensionInfo = JSON.parse(responseBody);

    if (
      extensionInfo === null ||
      typeof extensionInfo !== 'object' ||
      Array.isArray(extensionInfo)
    ) {
      return SECRET_MARKER_V2;
    }

    return JSON.stringify({
      ...extensionInfo,
      name: SECRET_MARKER_V2,
    });
  } catch {
    return SECRET_MARKER_V2;
  }
};
