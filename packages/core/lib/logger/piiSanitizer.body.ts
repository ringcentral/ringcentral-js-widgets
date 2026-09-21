import type {
  MultipartPartBodyContext,
  ParsedMultipartHeaders,
  SanitizeContext,
  SanitizeRequestBodyDependencies,
  SanitizeScope,
} from './piiSanitizer.interface';
import {
  BINARY_MARKER_V2,
  SECRET_MARKER_V2,
  isCanonicalPiiMarker,
} from './piiV2';

const MAX_INLINE_BODY_LENGTH = 1024 * 1024;

export const isBinaryBodyValue = (value: unknown) =>
  (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) ||
  (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(value)) ||
  (typeof Blob !== 'undefined' && value instanceof Blob);

const isOpaqueBodyString = (value: string) => {
  if (value.length > MAX_INLINE_BODY_LENGTH) {
    return true;
  }

  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (
      (code >= 0 && code <= 8) ||
      code === 11 ||
      code === 12 ||
      (code >= 14 && code <= 31) ||
      code === 127 ||
      code === 0xfffd
    ) {
      return true;
    }
  }

  return false;
};

const getMultipartDelimiter = (value: string) => {
  const firstLine = /^--([^\r\n]+)/.exec(value)?.[1];
  if (!firstLine) {
    return undefined;
  }

  const boundary = firstLine.endsWith('--')
    ? firstLine.slice(0, -2)
    : firstLine;
  const delimiter = `--${boundary}`;

  const firstDelimiterIndex = value.indexOf(delimiter);
  return firstDelimiterIndex !== -1 &&
    value.indexOf(delimiter, firstDelimiterIndex + delimiter.length) !== -1
    ? delimiter
    : undefined;
};

const sanitizeRFC5987Filename = (
  value: string,
  context: SanitizeContext,
  sanitizer: SanitizeRequestBodyDependencies,
) =>
  value.replace(
    /(\bfilename\*\s*=\s*)(?:"([^"]*)"|([^;\s]+))/gi,
    (_match, prefix, quotedValue, tokenValue) => {
      const encodedValue = quotedValue ?? tokenValue;
      const encodedParts = /^([^']*)'([^']*)'(.*)$/.exec(encodedValue);
      if (!encodedParts) {
        return `${prefix}${
          quotedValue !== undefined ? '"' : ''
        }${SECRET_MARKER_V2}${quotedValue !== undefined ? '"' : ''}`;
      }

      try {
        const filename = decodeURIComponent(encodedParts[3]);
        const sanitizedFilename = sanitizer.sanitizeLogTextWithContext(
          filename,
          context,
        );
        const replacement = `${encodedParts[1]}'${
          encodedParts[2]
        }'${encodeURIComponent(sanitizedFilename)}`;
        return `${prefix}${quotedValue !== undefined ? '"' : ''}${replacement}${
          quotedValue !== undefined ? '"' : ''
        }`;
      } catch {
        return `${prefix}${
          quotedValue !== undefined ? '"' : ''
        }${SECRET_MARKER_V2}${quotedValue !== undefined ? '"' : ''}`;
      }
    },
  );

const shouldRedactMultipartHeader = (
  headerName: string,
  context: SanitizeContext,
  sanitizer: SanitizeRequestBodyDependencies,
) => {
  const normalizedName = sanitizer.normalizeKey(headerName);

  return (
    context.maskKeys.has(normalizedName) ||
    context.sensitiveKeys.has(normalizedName) ||
    normalizedName.includes('authorization') ||
    normalizedName.includes('apikey') ||
    normalizedName.includes('cookie') ||
    normalizedName.includes('token')
  );
};

const sanitizeMultipartHeaderValue = (
  headerName: string,
  rawValue: string,
  context: SanitizeContext,
  sanitizer: SanitizeRequestBodyDependencies,
) => {
  const leadingWhitespace = rawValue.match(/^\s*/)?.[0] ?? '';
  const value = rawValue.slice(leadingWhitespace.length);
  if (shouldRedactMultipartHeader(headerName, context, sanitizer)) {
    return `${leadingWhitespace}${SECRET_MARKER_V2}`;
  }

  const sanitizedValue = sanitizer.sanitizeLogTextWithContext(value, context);

  return `${leadingWhitespace}${
    headerName === 'content-disposition'
      ? sanitizeRFC5987Filename(sanitizedValue, context, sanitizer)
      : sanitizedValue
  }`;
};

const parseMultipartHeaders = (
  headers: string,
  context: SanitizeContext,
  sanitizer: SanitizeRequestBodyDependencies,
): ParsedMultipartHeaders => {
  const values = new Map<string, string>();
  const sanitizedLines = headers.split(/(\r?\n)/).map((line) => {
    if (/^\r?\n$/.test(line)) {
      return line;
    }

    const separatorIndex = line.indexOf(':');
    if (separatorIndex <= 0) {
      return sanitizer.sanitizeLogTextWithContext(line, context);
    }

    const name = line.slice(0, separatorIndex).trim().toLowerCase();
    const rawValue = line.slice(separatorIndex + 1);
    if (!values.has(name)) {
      values.set(name, rawValue.trim());
    }

    return `${line.slice(0, separatorIndex + 1)}${sanitizeMultipartHeaderValue(
      name,
      rawValue,
      context,
      sanitizer,
    )}`;
  });

  return { values, sanitized: sanitizedLines.join('') };
};

const getMultipartFieldName = (contentDisposition: string) => {
  const match = /(?:^|;)\s*name\s*=\s*(?:"([^"]*)"|([^;\s]+))/i.exec(
    contentDisposition,
  );
  return match?.[1] ?? match?.[2];
};

const hasMultipartFilename = (contentDisposition: string) =>
  /(?:^|;)\s*filename(?:\*)?\s*=/i.test(contentDisposition);

const getTrailingLineBreak = (value: string) => {
  if (value.endsWith('\r\n')) return '\r\n';
  if (value.endsWith('\n')) return '\n';
  return '';
};

const isMultipartBinaryPart = ({
  contentDisposition,
  contentTransferEncoding,
  contentType,
}: Pick<
  MultipartPartBodyContext,
  'contentDisposition' | 'contentTransferEncoding' | 'contentType'
>) =>
  hasMultipartFilename(contentDisposition) ||
  /base64/i.test(contentTransferEncoding) ||
  (!contentType.startsWith('application/json') &&
    !contentType.startsWith('application/x-www-form-urlencoded') &&
    Boolean(contentType) &&
    !contentType.startsWith('text/'));

function sanitizeMultipartJsonBody({
  body,
  bodyKey,
  fieldName,
  context,
  currentDepth,
  scope,
  sanitizer,
}: MultipartPartBodyContext): unknown {
  try {
    const parsed = JSON.parse(body);
    const key = fieldName ?? bodyKey;
    if (parsed !== null && typeof parsed === 'object') {
      return JSON.stringify(
        sanitizer.sanitizeFieldValue({
          key,
          value: parsed,
          context,
          currentDepth,
          scope,
        }),
      );
    }
    return sanitizer.sanitizeFieldValue({
      key,
      value: parsed,
      context,
      currentDepth: currentDepth + 1,
      scope,
    });
  } catch {
    return fieldName
      ? sanitizer.sanitizeFieldValue({
          key: fieldName,
          value: body,
          context,
          currentDepth: currentDepth + 1,
          scope,
        })
      : sanitizer.sanitizeLogTextWithContext(body, context);
  }
}

function sanitizeMultipartPartBody(context: MultipartPartBodyContext): unknown {
  const {
    body,
    bodyKey,
    contentDisposition,
    contentTransferEncoding,
    contentType,
    fieldName,
    context: sanitizeContext,
    currentDepth,
    scope,
    sanitizer,
  } = context;

  if (
    isMultipartBinaryPart({
      contentDisposition,
      contentTransferEncoding,
      contentType,
    })
  ) {
    return BINARY_MARKER_V2;
  }

  if (contentType.startsWith('application/json')) {
    return sanitizeMultipartJsonBody(context);
  }

  if (contentType.startsWith('application/x-www-form-urlencoded')) {
    return sanitizeRequestBodyString({
      value: body,
      context: sanitizeContext,
      currentDepth,
      scope,
      bodyKey,
      sanitizer,
    });
  }

  if (fieldName) {
    return sanitizer.sanitizeFieldValue({
      key: fieldName,
      value: body,
      context: sanitizeContext,
      currentDepth: currentDepth + 1,
      scope,
    });
  }

  return sanitizer.sanitizeLogTextWithContext(body, sanitizeContext);
}

function sanitizeMultipartPart({
  part,
  isFirstPart,
  context,
  currentDepth,
  scope,
  bodyKey,
  sanitizer,
}: {
  part: string;
  isFirstPart: boolean;
  context: SanitizeContext;
  currentDepth: number;
  scope: SanitizeScope;
  bodyKey: string;
  sanitizer: SanitizeRequestBodyDependencies;
}): string {
  if (isFirstPart || part.trim() === '--') {
    return part;
  }

  const separator = /\r?\n\r?\n/.exec(part);
  if (!separator) {
    return sanitizer.sanitizeLogTextWithContext(part, context);
  }

  const headers = part.slice(0, separator.index);
  const bodyWithTrailingLineBreak = part.slice(
    separator.index + separator[0].length,
  );
  const trailingLineBreak = getTrailingLineBreak(bodyWithTrailingLineBreak);
  const body = trailingLineBreak
    ? bodyWithTrailingLineBreak.slice(0, -trailingLineBreak.length)
    : bodyWithTrailingLineBreak;
  const parsedHeaders = parseMultipartHeaders(headers, context, sanitizer);
  const contentDisposition =
    parsedHeaders.values.get('content-disposition') ?? '';
  const contentType = (
    parsedHeaders.values.get('content-type') ?? ''
  ).toLowerCase();
  const fieldName = getMultipartFieldName(contentDisposition);
  const sanitizedBody: unknown = sanitizeMultipartPartBody({
    body,
    bodyKey,
    contentDisposition,
    contentTransferEncoding:
      parsedHeaders.values.get('content-transfer-encoding') ?? '',
    contentType,
    fieldName,
    context,
    currentDepth,
    scope,
    sanitizer,
  });

  return `${parsedHeaders.sanitized}${separator[0]}${String(
    sanitizedBody,
  )}${trailingLineBreak}`;
}

function sanitizeMultipartBody({
  value,
  delimiter,
  context,
  currentDepth,
  scope,
  bodyKey,
  sanitizer,
}: {
  value: string;
  delimiter: string;
  context: SanitizeContext;
  currentDepth: number;
  scope: SanitizeScope;
  bodyKey: string;
  sanitizer: SanitizeRequestBodyDependencies;
}): string {
  const sanitizedParts: string[] = value.split(delimiter).map((part, index) =>
    sanitizeMultipartPart({
      part,
      isFirstPart: index === 0,
      context,
      currentDepth,
      scope,
      bodyKey,
      sanitizer,
    }),
  );

  return sanitizedParts.join(delimiter);
}

const isLikelyUrlEncodedBody = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed || /[\r\n]/.test(trimmed)) {
    return false;
  }

  return trimmed.split('&').every((part) => part.indexOf('=') > 0);
};

const formatSanitizedFormValue = (value: unknown) => {
  if (typeof value !== 'string') {
    return encodeURIComponent(String(value));
  }

  return isCanonicalPiiMarker(value) ? value : encodeURIComponent(value);
};

export function sanitizeRequestBodyString({
  value,
  context,
  currentDepth,
  scope,
  bodyKey = 'requestBody',
  sanitizer,
}: {
  value: string;
  context: SanitizeContext;
  currentDepth: number;
  scope: SanitizeScope;
  bodyKey?: string;
  sanitizer: SanitizeRequestBodyDependencies;
}): unknown {
  if (value.length > MAX_INLINE_BODY_LENGTH) {
    return BINARY_MARKER_V2;
  }

  const trimmed = value.trim();

  const multipartDelimiter = getMultipartDelimiter(value);
  if (multipartDelimiter) {
    return sanitizeMultipartBody({
      value,
      delimiter: multipartDelimiter,
      context,
      currentDepth,
      scope,
      bodyKey,
      sanitizer,
    });
  }

  if (isOpaqueBodyString(value)) {
    return BINARY_MARKER_V2;
  }

  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed !== null && typeof parsed === 'object') {
        return JSON.stringify(
          sanitizer.sanitizeData(
            parsed,
            context,
            currentDepth + 1,
            bodyKey,
            scope,
          ),
        );
      }
    } catch {
      // Fall through to text sanitization for malformed JSON.
    }
  }

  if (isLikelyUrlEncodedBody(value)) {
    const params = new URLSearchParams(value);
    const sanitizedParts: string[] = [];

    params.forEach((fieldValue, key) => {
      const sanitizedValue = sanitizer.sanitizeFieldValue({
        key,
        value: fieldValue,
        context,
        currentDepth: currentDepth + 1,
        scope,
      });
      sanitizedParts.push(
        `${encodeURIComponent(
          sanitizer.sanitizeLabelText(key, context),
        )}=${formatSanitizedFormValue(sanitizedValue)}`,
      );
    });

    return sanitizedParts.join('&');
  }

  return sanitizer.sanitizeLogTextWithContext(value, context);
}
