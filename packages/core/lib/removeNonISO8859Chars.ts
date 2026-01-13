export const removeNonISO8859Chars = (str: string) => {
  if (typeof str !== 'string') {
    return str;
  }
  // Match all non-ISO-8859-1 characters and replace them with the empty string.
  // eslint-disable-next-line no-control-regex
  return str.replace(/[^\u0000-\u00FF]/g, '');
};

export const removeSDKNonISO8859Chars = <T extends { appName?: string }>(
  sdkConfig: T,
) => {
  // issue: https://github.com/ringcentral/ringcentral-js/issues/272
  if (typeof sdkConfig.appName === 'string') {
    sdkConfig.appName = removeNonISO8859Chars(sdkConfig.appName);
  }
  return sdkConfig;
};
