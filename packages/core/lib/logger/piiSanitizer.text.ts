import * as sanitizerConstants from './piiSanitizer.constants';
import { createContext } from './piiSanitizer.context';
import { DIAGNOSTIC_LOG_VALUE_MARK } from './piiSanitizer.interface';
import type {
  DiagnosticLogValue,
  SanitizeContext,
} from './piiSanitizer.interface';
import {
  SECRET_MARKER_V2,
  ensurePiiDeviceKey,
  isCanonicalPiiMarker,
  preserveCanonicalMarkers,
  redactAccessToken,
  redactEmail,
  redactIpv4,
  redactIpv6,
  redactPersonName,
  redactPhone,
  redactRestricted,
  redactSecret,
  redactUserId,
  redactUsername,
  redactMac,
} from './piiV2';

const {
  URL_VALUE_KEYS,
  EMAIL_REGEX,
  IPV4_REGEX,
  PHONE_REGEX,
  QUERY_PARAM_REGEX,
  QUERY_PARAM_OPERATIONAL_KEYS,
  QUERY_PARAM_NUMERIC_KEYS,
  QUERY_PARAM_SAFE_ENUM_VALUES,
  COOKIE_HEADER_REGEX,
  BEARER_TOKEN_REGEX,
  BEARER_TOKEN_SIGNAL_REGEX,
  JWT_COMPACT_REGEX,
  JWT_COMPACT_SIGNAL_REGEX,
  SSN_HYPHENATED_REGEX,
  CREDIT_CARD_CANDIDATE_REGEX,
  MAC_ADDRESS_REGEX,
  IPV6_CANDIDATE_REGEX,
  DIGIT_REGEX,
  PHONE_CANDIDATE_REGEX,
  IPV4_CANDIDATE_REGEX,
  COOKIE_HEADER_SIGNAL_REGEX,
  UUID_SEGMENT_REGEX,
  NUMERIC_ID_SEGMENT_REGEX,
  SEND_SIP_MESSAGE_FLAG,
  RECV_SIP_MESSAGE_FLAG,
  SIP_URI,
  SIP_VIA,
  VIA_RECEIVED,
  SDP_CANDIDATE,
  SDP_IPV4,
  SDP_IPV6,
  maskUriUserinfo,
  SIP_STRING_RULES,
  SIP_PHONE_RULES,
  normalizeKey,
  secretKeys,
  tokenKeys,
  emailKeys,
  phoneKeys,
  personNameKeys,
  usernameKeys,
  addressLeafKeys,
  ssnKeys,
  creditCardKeys,
  hashIdentifierKeys,
  urlPathIdParentSegments,
  piiScopedTextFilterKeys,
  piiScopedTextHashKeys,
  addressScopedTextFilterKeys,
  macKeys,
  ipKeys,
  doubleQuotedTextKeyValueRegex,
  singleQuotedTextKeyValueRegex,
  unquotedTextKeyValueRegex,
  addressContainerTextKeyValueRegex,
  addressContextDoubleQuotedTextKeyValueRegex,
  addressContextSingleQuotedTextKeyValueRegex,
  addressContextUnquotedTextKeyValueRegex,
  isUriSchemeCharacter,
} = sanitizerConstants;

export function maskString(value: unknown) {
  const text = String(value);

  if (!text) {
    return text;
  }

  if (text.length <= 2) {
    return '*'.repeat(text.length);
  }

  if (text.length <= 4) {
    return `${text[0]}${'*'.repeat(text.length - 2)}${text[text.length - 1]}`;
  }

  return `${text.slice(0, 2)}${'*'.repeat(
    Math.min(8, text.length - 4),
  )}${text.slice(-2)}`;
}

export function hashLogIdentifier(
  value: unknown,
  _saltOrDeviceKey?: string | Uint8Array,
  deviceKey?: Uint8Array,
) {
  const key =
    _saltOrDeviceKey instanceof Uint8Array
      ? _saltOrDeviceKey
      : deviceKey ?? ensurePiiDeviceKey().key;

  return redactUserId(String(value), key);
}

export function diagnosticLogValue<T>(
  value: T,
  reason?: string,
): DiagnosticLogValue<T> {
  return {
    [DIAGNOSTIC_LOG_VALUE_MARK]: true,
    value,
    ...(reason ? { reason } : {}),
  };
}

export function maskEmail(value: string, deviceKey?: Uint8Array) {
  const key = deviceKey ?? ensurePiiDeviceKey().key;
  if (!value.includes('@')) {
    return maskString(value);
  }

  return redactEmail(value, key);
}

const redactAuthorizationValue = (value: string, deviceKey: Uint8Array) => {
  const basicMatch = /^Basic\s+(\S.*)$/i.exec(value.trim());
  if (basicMatch) {
    return `Basic ${SECRET_MARKER_V2}`;
  }

  const bearerMatch = /^Bearer\s+(\S.*)$/i.exec(value.trim());
  if (bearerMatch) {
    if (
      isCanonicalPiiMarker(bearerMatch[1]) ||
      isPreserveSlotValue(bearerMatch[1])
    ) {
      return `Bearer ${bearerMatch[1]}`;
    }
    return `Bearer ${redactAccessToken(bearerMatch[1], deviceKey)}`;
  }

  return redactAccessToken(value, deviceKey);
};

export const redactTokenValue = (
  key: string,
  value: string,
  deviceKey: Uint8Array,
) => {
  const normalizedKey = normalizeKey(key);
  if (
    normalizedKey === 'authorization' ||
    normalizedKey === 'xauthorization' ||
    normalizedKey === 'x-authorization'
  ) {
    return redactAuthorizationValue(value, deviceKey);
  }

  if (normalizedKey.includes('refresh')) {
    return redactAccessToken(value, deviceKey, 'refresh-token');
  }

  if (normalizedKey === 'jwt' || normalizedKey.includes('idtoken')) {
    return redactAccessToken(value, deviceKey, 'jwt');
  }

  return redactAccessToken(value, deviceKey);
};

export const isDiagnosticLogValue = (
  value: unknown,
): value is DiagnosticLogValue<unknown> =>
  value !== null &&
  typeof value === 'object' &&
  DIAGNOSTIC_LOG_VALUE_MARK in value &&
  'value' in value;

const isDateLikePhoneCandidate = (value: string) =>
  /^\d{4}-\d{1,2}-\d{1,2}(?:[T\s]|$)/.test(value.trim());

// RC product era — plain 13-digit runs outside this window still go through
// phone/ID rules (accountIds can be numeric; free text must not blanket-skip).
const EPOCH_MS_MIN = Date.UTC(2010, 0, 1);
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const isPlausibleEpochMillis = (value: string) => {
  if (!/^\d{13}$/.test(value)) {
    return false;
  }

  const ms = Number(value);
  if (!Number.isSafeInteger(ms)) {
    return false;
  }

  return ms >= EPOCH_MS_MIN && ms <= Date.now() + ONE_YEAR_MS;
};

const isBareJsonNumber = (value: string) =>
  /^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(value.trim());

const isJsonNumberContext = (text: string, offset: number) => {
  let index = offset - 1;
  while (index >= 0 && (text[index] === ' ' || text[index] === '\t')) {
    index -= 1;
  }

  return (
    index >= 0 &&
    (text[index] === ':' || text[index] === ',' || text[index] === '[')
  );
};

// Free-text JSON numbers become string markers — wrap so the blob stays
// parseable (`"expireTime":123` → `"expireTime":"[PII:…]"`). Skip `key=123`
// free-text and already-quoted string values.
const quoteIfJsonNumber = (
  rawValue: string,
  redacted: string,
  text: string,
  offset: number,
) => {
  if (!isBareJsonNumber(rawValue) || !isJsonNumberContext(text, offset)) {
    return redacted;
  }

  return `"${redacted}"`;
};

const VERSION_VALUE_PREFIX_REGEX =
  /(Chrome|Chromium|Firefox|Safari|Edge|Edg|Electron|Node|SDK|Version)\/$/i;

const isVersionValuePrefix = (text: string, offset: number) => {
  const prefix = text.slice(Math.max(0, offset - 24), offset);

  return VERSION_VALUE_PREFIX_REGEX.test(prefix);
};

const isIPv4LikeCandidate = (value: string) => {
  const parts = value.trim().split('.');

  return (
    parts.length === 4 &&
    parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255)
  );
};

const isLocalhostIP = (value: string) => {
  const text = value.trim().toLowerCase();

  return (
    text === '0.0.0.0' ||
    text.startsWith('127.') ||
    text === '::1' ||
    text === '0:0:0:0:0:0:0:1'
  );
};

const isMacAddress = (value: string) => {
  const text = value.trim();

  return (
    /^(?:[0-9a-fA-F]{2}[:-]){5}[0-9a-fA-F]{2}$/.test(text) ||
    /^(?:[0-9a-fA-F]{4}\.){2}[0-9a-fA-F]{4}$/.test(text)
  );
};

const isIpv6Address = (value: string) => {
  const text = value.trim();
  if (!text.includes(':') || isMacAddress(text)) {
    return false;
  }

  const bare = text.split('%')[0];
  if (!/^[0-9a-fA-F:]+$/.test(bare)) {
    return false;
  }

  try {
    // URL hostname parsing validates IPv6 literal syntax.
    return new URL(`http://[${bare}]`).hostname.length > 0;
  } catch {
    return false;
  }
};

const passesLuhn = (digits: string) => {
  let sum = 0;
  let doubleDigit = false;

  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    doubleDigit = !doubleDigit;
  }

  return sum % 10 === 0;
};

const isValidCreditCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }
  // Reject runs that are all zeros / obviously non-PAN.
  if (/^0+$/.test(digits)) {
    return false;
  }
  return passesLuhn(digits);
};

// Card-length bare digit runs: leave readable when Luhn fails; do not phone-mask.
const isCardLengthNonE164DigitRun = (value: string, digits: string) =>
  !value.trim().startsWith('+') &&
  digits.length >= 13 &&
  digits.length <= 19 &&
  !/[().]/.test(value);

const shouldMaskPhoneCandidate = (
  value: string,
  text: string,
  offset: number,
) => {
  if (isDateLikePhoneCandidate(value)) {
    return false;
  }

  const trimmed = value.trim();
  if (isPlausibleEpochMillis(trimmed)) {
    return false;
  }

  const digits = value.replace(/\D/g, '');
  const dotCount = (value.match(/\./g) ?? []).length;

  if (
    !trimmed.startsWith('+') &&
    dotCount >= 3 &&
    (isVersionValuePrefix(text, offset) || isIPv4LikeCandidate(value))
  ) {
    return false;
  }

  if (isCardLengthNonE164DigitRun(trimmed, digits)) {
    return false;
  }

  return trimmed.startsWith('+') ? digits.length >= 7 : digits.length >= 10;
};

const shouldMaskIPCandidate = (value: string, text: string, offset: number) =>
  !isVersionValuePrefix(text, offset) && !isLocalhostIP(value);

const maskIpv4Text = (text: string, key: Uint8Array) => {
  if (!IPV4_REGEX.test(text.trim())) {
    IPV4_REGEX.lastIndex = 0;
    return undefined;
  }

  IPV4_REGEX.lastIndex = 0;
  return text.replace(IPV4_REGEX, (ip) =>
    isLocalhostIP(ip) ? ip : redactIpv4(ip, key),
  );
};

const maskIpv6Candidates = (text: string, key: Uint8Array) =>
  text.replace(IPV6_CANDIDATE_REGEX, (candidate) => {
    let candidateEnd = candidate.length;
    while (candidateEnd > 0 && candidate[candidateEnd - 1] === '.') {
      candidateEnd -= 1;
    }
    const candidateWithoutTrailingPeriods = candidate.slice(0, candidateEnd);
    const trailingPeriods = candidate.slice(candidateEnd);

    if (
      !isIpv6Address(candidateWithoutTrailingPeriods) ||
      isLocalhostIP(candidateWithoutTrailingPeriods)
    ) {
      return candidate;
    }

    return `${redactIpv6(
      candidateWithoutTrailingPeriods,
      key,
    )}${trailingPeriods}`;
  });

export function maskPhone(value: unknown, deviceKey?: Uint8Array) {
  const text = String(value);
  const digits = text.replace(/\D/g, '');
  const key = deviceKey ?? ensurePiiDeviceKey().key;

  if (digits.length <= 4) {
    return redactSecret();
  }

  return redactPhone(text, key);
}

export function maskIP(value: unknown, deviceKey?: Uint8Array) {
  const text = String(value);
  const key = deviceKey ?? ensurePiiDeviceKey().key;
  const trimmed = text.trim();

  const maskedIpv4 = maskIpv4Text(text, key);
  if (maskedIpv4 !== undefined) return maskedIpv4;

  if (isIpv6Address(trimmed)) {
    return isLocalhostIP(trimmed) ? text : redactIpv6(trimmed, key);
  }

  if (text.includes(':')) {
    const replaced = maskIpv6Candidates(text, key);
    if (replaced !== text) {
      return replaced;
    }
  }

  return maskString(text);
}

const decodeQueryValue = (value: string) => {
  try {
    return decodeURIComponent(value.replace(/\+/g, ' '));
  } catch {
    return value;
  }
};

function sanitizeQueryParamValue(
  key: string,
  rawValue: string,
  context: SanitizeContext,
) {
  const value = decodeQueryValue(rawValue);
  const normalizedKey = normalizeKey(key);

  if (secretKeys.has(normalizedKey) || tokenKeys.has(normalizedKey)) {
    return SECRET_MARKER_V2;
  }

  if (QUERY_PARAM_OPERATIONAL_KEYS.has(normalizedKey)) {
    const isSafeNumericValue =
      QUERY_PARAM_NUMERIC_KEYS.has(normalizedKey) && /^\d{1,9}$/.test(value);
    const safeEnumValues = QUERY_PARAM_SAFE_ENUM_VALUES.get(normalizedKey);
    const isSafeEnumValue = safeEnumValues?.has(value.toLowerCase()) ?? false;

    if (!isSafeNumericValue && !isSafeEnumValue) {
      return SECRET_MARKER_V2;
    }

    return rawValue;
  }

  return sanitizeMatchedTextValue(key, value, context);
}

export function maskQuery(
  value: string,
  context: SanitizeContext = createContext(),
) {
  return value.replace(
    QUERY_PARAM_REGEX,
    (_match, prefix: string, key: string, rawValue: string) =>
      `${prefix}${key}=${sanitizeQueryParamValue(key, rawValue, context)}`,
  );
}

export function maskSipUri(uri: string) {
  if (!uri) {
    return uri;
  }

  const pos = uri.search('@');

  if (pos !== -1) {
    const phoneNumber = maskPhone(uri.slice(0, pos));
    let domain = uri.slice(pos);

    if (domain.length > 5) {
      domain = `${domain[0]}*****${domain.slice(6)}`;
    }

    return `${phoneNumber}${domain}`;
  }

  return maskPhone(uri);
}

export function maskCallId(callId: string) {
  const parts = callId.split('@');

  if (parts.length > 1) {
    return `${parts[0]}@${maskIP(parts[1])}`;
  }

  return callId;
}

function maskSdpIPHeader(header: string) {
  const ip4Index = header.search(SDP_IPV4);

  if (ip4Index !== -1) {
    return header.slice(0, ip4Index + SDP_IPV4.length);
  }

  const ip6Index = header.search(SDP_IPV6);

  if (ip6Index !== -1) {
    return header.slice(0, ip6Index + SDP_IPV6.length);
  }

  const candidateIndex = header.search(SDP_CANDIDATE);

  if (candidateIndex !== -1) {
    return header.slice(0, candidateIndex + SDP_CANDIDATE.length);
  }

  if (header.includes(SIP_VIA)) {
    const receivedIndex = header.search(VIA_RECEIVED);

    if (receivedIndex !== -1) {
      return header.slice(0, receivedIndex + VIA_RECEIVED.length);
    }
  }

  return header;
}

const isSipMessage = (message: string) =>
  SEND_SIP_MESSAGE_FLAG.test(message) || RECV_SIP_MESSAGE_FLAG.test(message);

const getPIIData = (header: string, regExp: RegExp) =>
  header.match(regExp)?.[1] ?? '';

export function maskSipMessage(message: string) {
  if (!isSipMessage(message)) {
    return message;
  }

  const headers = message.split('\r\n');

  return headers
    .map((rawHeader) => {
      let header = rawHeader;

      if (header.includes(SIP_URI) && header.includes('@')) {
        const sipUri = header.split(SIP_URI)[1];
        header = header.replace(sipUri, maskSipUri(sipUri));
      }

      SIP_STRING_RULES.forEach((rule) => {
        const data = getPIIData(header, rule);

        if (data.length > 0) {
          header = header.replace(data, maskString(data));
        }
      });

      SIP_PHONE_RULES.forEach((rule) => {
        const data = getPIIData(header, rule);

        if (data.length > 0) {
          header = header.replace(data, maskPhone(data));
        }
      });

      const localAddr = header.includes('LocalAddr: IP=')
        ? getPIIData(header, /LocalAddr: IP=([^"]+):/)
        : '';

      if (localAddr.length > 0) {
        header = header.replace(localAddr, maskIP(localAddr));
      }

      if (header.includes('Call') && header.includes('@')) {
        header = maskCallId(header);
      }

      return maskSdpIPHeader(header);
    })
    .join('\r\n');
}

export function sanitizeLogText(value: string) {
  return sanitizeLogTextWithContext(value, createContext());
}

const PRESERVE_SLOT_PREFIX = '\u0000PII';
const PRESERVE_SLOT_SUFFIX = '\u0000';

const isPreserveSlotValue = (value: string) =>
  value.startsWith(PRESERVE_SLOT_PREFIX) &&
  value.endsWith(PRESERVE_SLOT_SUFFIX) &&
  /^\d+\.\d+$/.test(
    value.slice(PRESERVE_SLOT_PREFIX.length, -PRESERVE_SLOT_SUFFIX.length),
  );

function sanitizeDirectMatchedTextValue(
  key: string,
  normalizedKey: string,
  rawValue: string,
  context: SanitizeContext,
): string | undefined {
  if (secretKeys.has(normalizedKey)) {
    return redactSecret();
  }

  if (tokenKeys.has(normalizedKey)) {
    return redactTokenValue(key, rawValue, context.deviceKey);
  }

  if (emailKeys.has(normalizedKey)) {
    return redactEmail(rawValue, context.deviceKey);
  }

  if (phoneKeys.has(normalizedKey)) {
    return redactPhone(rawValue, context.deviceKey);
  }

  if (usernameKeys.has(normalizedKey)) {
    return redactUsername(rawValue, context.deviceKey);
  }

  if (personNameKeys.has(normalizedKey)) {
    return redactPersonName(rawValue, context.deviceKey);
  }

  if (addressLeafKeys.has(normalizedKey)) {
    return redactRestricted('address');
  }

  if (ssnKeys.has(normalizedKey)) {
    return redactRestricted('ssn');
  }

  if (creditCardKeys.has(normalizedKey)) {
    return redactRestricted('credit-card');
  }

  if (macKeys.has(normalizedKey)) {
    return redactMac(rawValue, context.deviceKey);
  }

  if (ipKeys.has(normalizedKey)) {
    return maskIP(rawValue, context.deviceKey);
  }

  if (hashIdentifierKeys.has(normalizedKey)) {
    return redactUserId(rawValue, context.deviceKey);
  }

  if (piiScopedTextHashKeys.has(normalizedKey)) {
    return redactUserId(rawValue, context.deviceKey);
  }

  return undefined;
}

function sanitizeScopedMatchedTextValue(
  key: string,
  normalizedKey: string,
  rawValue: string,
  context: SanitizeContext,
): string | undefined {
  if (piiScopedTextFilterKeys.has(normalizedKey)) {
    const leaf = normalizedKey.split('.').pop() ?? '';
    if (leaf === 'name' || personNameKeys.has(leaf)) {
      return redactPersonName(rawValue, context.deviceKey);
    }
    return redactSecret();
  }

  if (addressScopedTextFilterKeys.has(normalizedKey)) {
    const leaf = normalizedKey.split('.').pop() ?? '';
    if (leaf === 'id') {
      return redactUserId(rawValue, context.deviceKey);
    }
    if (leaf === 'name' || personNameKeys.has(leaf)) {
      return redactPersonName(rawValue, context.deviceKey);
    }
    if (leaf === 'uri' || leaf === 'url' || leaf === 'href') {
      return sanitizeUrlValue(key, rawValue, context);
    }
    return redactRestricted('address');
  }

  return undefined;
}

function sanitizeMatchedTextValue(
  key: string,
  rawValue: string,
  context: SanitizeContext,
) {
  // Exact slotted/canonical values only — longer captures may still contain
  // raw PII before a later slot on the same line (e.g. `token=secret for …`).
  if (isCanonicalPiiMarker(rawValue) || isPreserveSlotValue(rawValue)) {
    return rawValue;
  }

  const normalizedKey = normalizeKey(key);

  const directValue = sanitizeDirectMatchedTextValue(
    key,
    normalizedKey,
    rawValue,
    context,
  );
  if (directValue !== undefined) return directValue;

  const scopedValue = sanitizeScopedMatchedTextValue(
    key,
    normalizedKey,
    rawValue,
    context,
  );
  if (scopedValue !== undefined) return scopedValue;

  if (URL_VALUE_KEYS.has(normalizedKey)) {
    return sanitizeUrlValue(key, rawValue, context);
  }

  if (context.maskKeys.has(normalizedKey)) {
    return maskString(sanitizeLabelText(rawValue, context));
  }

  return redactSecret();
}

export function sanitizeLogTextWithContext(
  value: string,
  context: SanitizeContext,
) {
  if (isCanonicalPiiMarker(value)) {
    return value;
  }

  if (!hasTextSanitizeSignal(value)) {
    return value;
  }

  return preserveCanonicalMarkers(value, (unprotected) => {
    const addressContextLineIndexes = hasAddressContextSignal(unprotected)
      ? getAddressContextLineIndexes(unprotected)
      : undefined;

    // Apply field policy before generic scans can turn a sensitive value into
    // a less restrictive correlatable marker.
    let sanitizedValue = unprotected;
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      text.replace(
        doubleQuotedTextKeyValueRegex,
        (_match, prefix, keyQuote, key, separator, rawValue) =>
          `${prefix}${keyQuote}${key}${keyQuote}${separator}"${sanitizeMatchedTextValue(
            key,
            rawValue,
            context,
          )}"`,
      ),
    );
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      text.replace(
        singleQuotedTextKeyValueRegex,
        (_match, prefix, keyQuote, key, separator, rawValue) =>
          `${prefix}${keyQuote}${key}${keyQuote}${separator}'${sanitizeMatchedTextValue(
            key,
            rawValue,
            context,
          )}'`,
      ),
    );
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      text.replace(
        unquotedTextKeyValueRegex,
        (match, prefix, keyQuote, key, separator, rawValue, offset) => {
          const trimmed = rawValue.trim();
          const valueOffset = offset + match.length - rawValue.length;
          const sanitized = sanitizeMatchedTextValue(key, trimmed, context);
          return `${prefix}${keyQuote}${key}${keyQuote}${separator}${quoteIfJsonNumber(
            trimmed,
            sanitized,
            text,
            valueOffset,
          )}`;
        },
      ),
    );
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      sanitizeLabelText(text, context),
    );

    return addressContextLineIndexes === undefined
      ? sanitizedValue
      : preserveCanonicalMarkers(sanitizedValue, (text) =>
          sanitizeAddressContextText(text, addressContextLineIndexes),
        );
  });
}

function sanitizeAddressContextLine(line: string) {
  return line
    .replace(
      addressContextDoubleQuotedTextKeyValueRegex,
      (_match, prefix, keyQuote, key, separator) =>
        `${prefix}${keyQuote}${key}${keyQuote}${separator}"${redactRestricted(
          'address',
        )}"`,
    )
    .replace(
      addressContextSingleQuotedTextKeyValueRegex,
      (_match, prefix, keyQuote, key, separator) =>
        `${prefix}${keyQuote}${key}${keyQuote}${separator}'${redactRestricted(
          'address',
        )}'`,
    )
    .replace(
      addressContextUnquotedTextKeyValueRegex,
      (_match, prefix, keyQuote, key, separator) =>
        `${prefix}${keyQuote}${key}${keyQuote}${separator}${redactRestricted(
          'address',
        )}`,
    );
}

function sanitizeAddressContextText(
  value: string,
  addressContextLineIndexes: Set<number>,
) {
  let lineIndex = 0;

  return value
    .split(/(\r\n|\r|\n)/)
    .map((part) => {
      if (part === '\r\n' || part === '\r' || part === '\n') {
        return part;
      }

      const shouldSanitize =
        addressContextLineIndexes.has(lineIndex) ||
        addressContainerTextKeyValueRegex.test(part);
      lineIndex += 1;

      return shouldSanitize ? sanitizeAddressContextLine(part) : part;
    })
    .join('');
}

const getLineIndentLength = (line: string) => line.search(/\S|$/);

const getBlockDepthDelta = (line: string) =>
  (line.match(/[{[]/g) ?? []).length - (line.match(/[}\]]/g) ?? []).length;

const isAsciiLetter = (character: string) => {
  const code = character.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
};

const hasAddressContextSuffix = (line: string) => {
  const separatorIndex = Math.max(line.lastIndexOf(':'), line.lastIndexOf('='));
  if (separatorIndex < 0) return false;

  const suffix = line.slice(separatorIndex + 1).trim();
  return suffix === '' || suffix === '{' || suffix === '[';
};

function getAddressContextLineIndexes(value: string) {
  const lineIndexes = new Set<number>();
  let blockDepth = 0;
  let contextIndent: number | undefined;

  value.split(/\r\n|\r|\n/).forEach((line, index) => {
    const trimmedLine = line.trim();
    const hasContent = trimmedLine.length > 0;
    const indent = getLineIndentLength(line);
    const startsAddressContext = addressContainerTextKeyValueRegex.test(line);

    if (
      contextIndent !== undefined &&
      hasContent &&
      indent <= contextIndent &&
      !startsAddressContext
    ) {
      contextIndent = undefined;
    }

    const isIndentedAddressContext =
      contextIndent !== undefined && hasContent && indent > contextIndent;

    if (startsAddressContext || blockDepth > 0 || isIndentedAddressContext) {
      lineIndexes.add(index);
    }

    if (startsAddressContext) {
      const blockDepthDelta = getBlockDepthDelta(line);
      blockDepth = Math.max(blockDepth + blockDepthDelta, 0);

      if (blockDepthDelta <= 0 && hasAddressContextSuffix(line)) {
        contextIndent = indent;
      }

      return;
    }

    if (blockDepth > 0) {
      blockDepth = Math.max(blockDepth + getBlockDepthDelta(line), 0);
    }
  });

  return lineIndexes;
}

function decodeUrlPathSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function shouldHashUrlPathSegment(
  decodedSegment: string,
  previousDecodedSegment: string | undefined,
) {
  // Already-redacted path segments must stay byte-stable across re-sanitize.
  if (isCanonicalPiiMarker(decodedSegment)) {
    return false;
  }

  const normalizedSegment = normalizeKey(decodedSegment);

  if (!normalizedSegment) {
    return false;
  }

  const normalizedPreviousSegment =
    previousDecodedSegment === undefined
      ? ''
      : normalizeKey(previousDecodedSegment);

  return (
    urlPathIdParentSegments.has(normalizedPreviousSegment) ||
    UUID_SEGMENT_REGEX.test(decodedSegment) ||
    NUMERIC_ID_SEGMENT_REGEX.test(decodedSegment)
  );
}

function sanitizeUrlPath(path: string, context: SanitizeContext) {
  const segments = path.split('/');
  const decodedSegments = segments.map((segment) =>
    decodeUrlPathSegment(segment),
  );

  return segments
    .map((segment, index) =>
      shouldHashUrlPathSegment(
        decodedSegments[index],
        decodedSegments[index - 1],
      )
        ? hashLogIdentifier(decodedSegments[index], context.deviceKey)
        : segment,
    )
    .join('/');
}

function getUrlParts(value: string) {
  let authorityStartIndex: number;

  if (value.startsWith('//')) {
    authorityStartIndex = 2;
  } else {
    const schemeDelimiterIndex = value.indexOf('://');
    if (schemeDelimiterIndex <= 0 || !isAsciiLetter(value[0])) {
      return undefined;
    }

    for (let index = 1; index < schemeDelimiterIndex; index += 1) {
      if (!isUriSchemeCharacter(value[index])) return undefined;
    }

    authorityStartIndex = schemeDelimiterIndex + 3;
  }

  let authorityEndIndex = value.length;
  for (let index = authorityStartIndex; index < value.length; index += 1) {
    if ('/?#'.includes(value[index])) {
      authorityEndIndex = index;
      break;
    }
  }

  let pathEndIndex = value.length;
  for (let index = authorityEndIndex; index < value.length; index += 1) {
    if ('?#'.includes(value[index])) {
      pathEndIndex = index;
      break;
    }
  }

  return {
    prefix: value.slice(0, authorityEndIndex),
    path: value.slice(authorityEndIndex, pathEndIndex),
    suffix: value.slice(pathEndIndex),
  };
}

function sanitizeUrlPathIdentifiers(value: string, context: SanitizeContext) {
  const urlParts = getUrlParts(value);

  if (urlParts) {
    const { prefix, path, suffix } = urlParts;

    return `${sanitizeUrlPrefix(prefix)}${sanitizeUrlPath(
      path,
      context,
    )}${suffix}`;
  }

  const suffixIndex = value.search(/[?#]/);
  const path = suffixIndex === -1 ? value : value.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? '' : value.slice(suffixIndex);

  if (!path.includes('/')) {
    return value;
  }

  return `${sanitizeUrlPath(path, context)}${suffix}`;
}

function sanitizeUrlPrefix(prefix: string) {
  const authorityStartIndex = prefix.indexOf('//') + 2;

  if (authorityStartIndex < 2) {
    return prefix;
  }

  const credentialEndIndex = prefix.lastIndexOf('@');

  if (credentialEndIndex < authorityStartIndex) {
    return prefix;
  }

  const authorityPrefix = prefix.slice(0, authorityStartIndex);
  const host = prefix.slice(credentialEndIndex + 1);

  return `${authorityPrefix}${SECRET_MARKER_V2}@${host}`;
}

export function sanitizeUrlValue(
  key: string,
  rawValue: string,
  context: SanitizeContext,
) {
  const sanitizedValue = sanitizeLabelText(rawValue, context);

  return sanitizeUrlPathIdentifiers(sanitizedValue, context);
}

const hasQueryParamSignal = (value: string) =>
  value.includes('=') &&
  (value.includes('?') || value.includes('&') || value.includes('#'));

const hasCookieHeaderSignal = (value: string) =>
  value.includes(':') && COOKIE_HEADER_SIGNAL_REGEX.test(value);

const hasIPV4Signal = (value: string) =>
  value.includes('.') && IPV4_CANDIDATE_REGEX.test(value);

const hasIpv6Signal = (value: string) => value.includes(':');

const hasMacSignal = (value: string) =>
  value.includes(':') || value.includes('-') || value.includes('.');

export const hasTextSanitizeSignal = (value: string) =>
  value.includes('@') ||
  value.includes(':') ||
  value.includes('=') ||
  value.includes('?') ||
  value.includes('&') ||
  value.includes('#') ||
  DIGIT_REGEX.test(value) ||
  BEARER_TOKEN_SIGNAL_REGEX.test(value) ||
  JWT_COMPACT_SIGNAL_REGEX.test(value);

const hasAddressContextSignal = (value: string) =>
  value.includes('\n') ||
  value.includes('\r') ||
  addressContainerTextKeyValueRegex.test(value);

function sanitizeLabelProtocolValues(
  value: string,
  context: SanitizeContext | undefined,
  deviceKey: Uint8Array,
) {
  let sanitizedValue = value;

  if (isSipMessage(sanitizedValue)) {
    sanitizedValue = maskSipMessage(sanitizedValue);
  }

  if (hasQueryParamSignal(sanitizedValue)) {
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      maskQuery(text, context),
    );
  }

  if (hasCookieHeaderSignal(sanitizedValue)) {
    sanitizedValue = sanitizedValue.replace(
      COOKIE_HEADER_REGEX,
      (_match, prefix: string, key: string) =>
        `${prefix}${key}${SECRET_MARKER_V2}`,
    );
  }

  // Strip URL userinfo before email scan so `user:pass@host` is not emailed.
  if (sanitizedValue.includes('://') && sanitizedValue.includes('@')) {
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      maskUriUserinfo(text),
    );
  }

  if (BEARER_TOKEN_SIGNAL_REGEX.test(sanitizedValue)) {
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      text.replace(
        BEARER_TOKEN_REGEX,
        (_match, token: string) =>
          `Bearer ${redactAccessToken(token, deviceKey)}`,
      ),
    );
  }

  if (JWT_COMPACT_SIGNAL_REGEX.test(sanitizedValue)) {
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      text.replace(JWT_COMPACT_REGEX, (jwt) =>
        redactAccessToken(jwt, deviceKey, 'jwt'),
      ),
    );
  }

  if (SSN_HYPHENATED_REGEX.test(sanitizedValue)) {
    SSN_HYPHENATED_REGEX.lastIndex = 0;
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      text.replace(SSN_HYPHENATED_REGEX, () => redactRestricted('ssn')),
    );
  }

  return sanitizedValue;
}

function sanitizeLabelCardAndEmailValues(value: string, deviceKey: Uint8Array) {
  let sanitizedValue = value;

  if (CREDIT_CARD_CANDIDATE_REGEX.test(sanitizedValue)) {
    CREDIT_CARD_CANDIDATE_REGEX.lastIndex = 0;
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      text.replace(
        CREDIT_CARD_CANDIDATE_REGEX,
        (candidate, offset, fullText) => {
          if (isPlausibleEpochMillis(candidate)) {
            return candidate;
          }

          const redacted = isValidCreditCardNumber(candidate)
            ? redactRestricted('credit-card')
            : candidate;
          return quoteIfJsonNumber(candidate, redacted, fullText, offset);
        },
      ),
    );
  }

  if (sanitizedValue.includes('@')) {
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      text.replace(EMAIL_REGEX, (email) => redactEmail(email, deviceKey)),
    );
  }

  return sanitizedValue;
}

function sanitizeLabelNetworkValues(value: string, deviceKey: Uint8Array) {
  let sanitizedValue = value;

  if (hasIPV4Signal(sanitizedValue)) {
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      text.replace(IPV4_REGEX, (ip, offset, full) =>
        shouldMaskIPCandidate(ip, full, offset)
          ? redactIpv4(ip, deviceKey)
          : ip,
      ),
    );
  }

  if (hasIpv6Signal(sanitizedValue)) {
    IPV6_CANDIDATE_REGEX.lastIndex = 0;
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      maskIpv6Candidates(text, deviceKey),
    );
  }

  if (hasMacSignal(sanitizedValue)) {
    MAC_ADDRESS_REGEX.lastIndex = 0;
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      text.replace(MAC_ADDRESS_REGEX, (mac) => redactMac(mac, deviceKey)),
    );
  }

  if (PHONE_CANDIDATE_REGEX.test(sanitizedValue)) {
    sanitizedValue = preserveCanonicalMarkers(sanitizedValue, (text) =>
      text.replace(PHONE_REGEX, (phone, offset, full) => {
        if (!shouldMaskPhoneCandidate(phone, full, offset)) {
          return phone;
        }

        return quoteIfJsonNumber(
          phone,
          redactPhone(phone, deviceKey),
          full,
          offset,
        );
      }),
    );
  }

  return sanitizedValue;
}

export function sanitizeLabelText(value: string, context?: SanitizeContext) {
  const deviceKey = context?.deviceKey ?? ensurePiiDeviceKey().key;

  return preserveCanonicalMarkers(value, (unprotected) => {
    const protocolValue = sanitizeLabelProtocolValues(
      unprotected,
      context,
      deviceKey,
    );
    const cardAndEmailValue = sanitizeLabelCardAndEmailValues(
      protocolValue,
      deviceKey,
    );
    return sanitizeLabelNetworkValues(cardAndEmailValue, deviceKey);
  });
}
