const REGEXP_BASE64_DATA_URL =
  /^(data:\w+\/[a-zA-Z+\-.]+;base64,)?(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/i;

export function isBase64DataUrl(value: string) {
  return REGEXP_BASE64_DATA_URL.test(value);
}

export function decodeBase64DataUrl(dataURL: string) {
  if (isBase64DataUrl(dataURL)) {
    return atob(dataURL.split('base64,')[1]);
  }

  return '';
}
