import { SECRET_MARKER_V2 } from './piiV2';

export const DEFAULT_LOG_HASH_SALT = `${Date.now().toString(36)}-${Math.random()
  .toString(36)
  .slice(2)}`;
export const NORMALIZED_KEY_CACHE_LIMIT = 500;
export const EMPTY_WORDS: string[] = [];
export const DEFAULT_SANITIZE_OPTIONS = {};

// original source: `@ringcentral/fiji-core-foundation`
export const SENSITIVE_WORDS = [
  'psw',
  'password',
  'meetingPassword',
  'meetingPasswordPSTN',
  'meetingPasswordMasked',
  'dialInPassword',
  'first_name',
  'last_name',
  'hostName',
  'joinUri',
  'phoneNumber',
  'customerName',
  'street',
  'city',
  'street2',
  'state',
  'stateIsoCode',
  'stateName',
  'country',
  'countryIsoCode',
  'countryName',
  'zoom_password',
  'h323_password',
  'firstName',
  'lastName',
  'name',
  'formattedPhoneNumber',
  'calendarIds',
  'zip',
  'emergencyName',
  'from',
  'fromName',
  'to',
  'toName',
  'coverPageText',
  '__customCoverOptions',
  'customCoverOptions',
  'display_name',
  'rc_phone_numbers',
  'sanitized_rc_first_name',
  'sanitized_rc_last_name',
  'homepage',
  'department',
  'job_title',
  'formattedNumber',
  'location',
  'locationCode',
  'summary',
  'userName',
  'username',
  'quoted_post',
  'reminder_text',
  'message_text',
  'companyName',
  'dialInNumber',
  'headshotUrl',
  'primaryNumber',
  'displayName',
  'avatarUrl',
  'avatar',
  'avatar_url',
  'macAddress',
  'fromNum',
  'toNum',
  'targetNumber',
] as const;

export const MASK_WORDS = [
  'access_token',
  'refresh_token',
  'bearer',
  'Bearer',
  'Token',
  'token',
  't',
  'tokenUrl',
  'Authorization',
  'authorization',
  'X-RC-Access-Token-Data',
  'syncToken',
  'email',
  'subscriberEmail',
  'searchable_email',
  'email_friendly_abbreviation',
  'submitterEmail',
  'calendarId',
  'subject',
  'discoveryToken',
  'join_url',
  'text',
  'rc_access_token_data',
  'X-Authorization',
  'x-authorization',
  'title',
  'domainKey',
  'clientId',
  'siteKey',
  'appKey',
  'apiKey',
  'appId',
] as const;

export const EXTRA_SENSITIVE_WORDS = [
  'phone',
  'phones',
  'number',
  'numbers',
  'phoneNumbers',
  'sourcePhoneNumber',
  'fromNumber',
  'toNumber',
  'selectedFromNumber',
  'fallbackFromNumber',
  'availableFromNumbers',
  'callerId',
  'callerIdNumber',
  'fromTag',
  'toTag',
  'callerIdName',
  'businessPhone',
  'mobilePhone',
  'extensionNumber',
  'emailAddress',
  'address',
  'postalCode',
  'sipInfo',
  'contact',
  'contacts',
  'matchedContact',
  'zendeskContacts',
  'conversation',
  'message',
  'originalMessage',
  'body',
  'notes',
  'transcript',
  'transcriptions',
  'comment',
  'comments',
  'description',
  'call',
  'activeCall',
  'callData',
  'callLogData',
  'callerIdByFeature',
  'taskInfo',
  'prevTask',
  'requestBody',
  'accountConfigurationResponse',
  'extensionInfo',
  'disabledGroupMessage',
  'entity',
  'entities',
  'record',
  'records',
  'ticket',
  'tickets',
  'cookie',
  'cookies',
  'setCookie',
] as const;

export const EXTRA_MASK_WORDS = [
  'accessToken',
  'refreshToken',
  'idToken',
  'jwt',
  'secret',
  'clientSecret',
  'xAuthorization',
  'wsAccessToken',
  'endpointId',
  'url',
  'uri',
  'href',
  'callbackUri',
  'baseUri',
  'basicURL',
  'sdkUrl',
  'contentUri',
  'contentUrl',
  'recordingUri',
  'recordingUrl',
  'wsUrl',
  'workerUrl',
  'workletUrl',
  'accountId',
  'rcAccountId',
  'crmAccountId',
  'userId',
  'ownerId',
  'extensionId',
  'userBrandId',
  'brandId',
  'subscriberId',
  'agentId',
  'sessionId',
  'telephonySessionId',
  'conversationId',
  'conversationLogId',
  'messageId',
  'requestMessageId',
  'partyId',
  'crmTaskId',
  'whoId',
  'whatId',
  'latestEntityId',
  'rcMappedTeamsId',
  'currentHubId',
  'contextId',
  'connectionId',
  'ticketId',
  'assetId',
  'deviceId',
  'newDeviceId',
  'previousDeviceId',
  'pluginId',
  'widgetId',
  'widgetIds',
  'tabId',
  'windowId',
  'currentWindowId',
  'identify',
] as const;

// Raised well above the old depth of 5 so real API responses keep their shape.
// A separate node budget caps total work so a pathological payload cannot hang
// the synchronous logger pipeline.
// ponytail: scalar-length budget deferred until a measured huge-string problem;
// circular refs are already bounded by `seen` and recursion by DEFAULT_DEPTH.
export const DEFAULT_DEPTH = 40;
export const MAX_SANITIZE_NODES = 100000;
export const toSnakeKey = (key: string) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase();

export const createTextFieldKeys = (keys: string[]) =>
  Array.from(
    new Set(
      keys.flatMap((key) => {
        const snakeKey = toSnakeKey(key);

        return [key, snakeKey, snakeKey.replace(/_/g, '-')];
      }),
    ),
  ).sort((left, right) => right.length - left.length);

export const createScopedTextFieldKeys = (
  containerWords: readonly string[],
  fieldWords: readonly string[],
) =>
  containerWords.flatMap((container) =>
    fieldWords.flatMap((field) => [
      `${container}.${field}`,
      `${container}_${field}`,
    ]),
  );

export const TEXT_FIELD_KEYS = createTextFieldKeys([
  ...SENSITIVE_WORDS,
  ...MASK_WORDS,
  ...EXTRA_SENSITIVE_WORDS,
  ...EXTRA_MASK_WORDS,
]);
export const DIAGNOSTIC_SAFE_KEYS = [
  'name',
  'state',
  'country',
  'countryIsoCode',
  'countryName',
  'from',
  'to',
  'location',
  'locationCode',
  'message',
  'originalMessage',
  'brandId',
  'assetId',
  'baseUri',
  'url',
  'uri',
  'href',
] as const;
export const PII_CONTAINER_WORDS = [
  'contact',
  'contacts',
  'matchedContact',
  'zendeskContacts',
  'user',
  'users',
  'owner',
  'owners',
  'agent',
  'agents',
  'extension',
  'extensions',
  'profile',
  'profiles',
  'userProfile',
  'userProfiles',
  'conversation',
  'call',
  'activeCall',
  'callData',
  'callLogData',
  'callerIdByFeature',
  'taskInfo',
  'prevTask',
  'accountConfigurationResponse',
  'extensionInfo',
  'entity',
  'entities',
  'record',
  'records',
  'ticket',
  'tickets',
] as const;
export const ADDRESS_CONTAINER_WORDS = [
  'address',
  'addresses',
  'emergencyAddress',
  'homeAddress',
  'businessAddress',
  'billingAddress',
  'serviceAddress',
  'shippingAddress',
] as const;
export const ADDRESS_SCOPED_SENSITIVE_WORDS = [
  'id',
  'street',
  'street2',
  'city',
  'state',
  'stateIsoCode',
  'stateName',
  'country',
  'countryIsoCode',
  'countryName',
  'zip',
  'postalCode',
  'extensionNumber',
  'emergencyName',
  'name',
  'location',
  'locationCode',
  'address',
  'uri',
  'url',
  'href',
] as const;
export const SECRET_WORDS = [
  'psw',
  'password',
  'meetingPassword',
  'meetingPasswordPSTN',
  'meetingPasswordMasked',
  'dialInPassword',
  'zoom_password',
  'h323_password',
  'secret',
  'clientSecret',
  'apiKey',
  'appKey',
  'siteKey',
  'domainKey',
  'cookie',
  'cookies',
  'setCookie',
] as const;
export const TOKEN_WORDS = [
  'access_token',
  'refresh_token',
  'bearer',
  'Bearer',
  'Token',
  'token',
  'tokenUrl',
  'Authorization',
  'authorization',
  'X-RC-Access-Token-Data',
  'syncToken',
  'discoveryToken',
  'rc_access_token_data',
  'X-Authorization',
  'x-authorization',
  'accessToken',
  'refreshToken',
  'idToken',
  'jwt',
  'xAuthorization',
  'wsAccessToken',
] as const;
export const PHONE_WORDS = [
  'phone',
  'phones',
  'phoneNumber',
  'phoneNumbers',
  'formattedPhoneNumber',
  'formattedNumber',
  'sourcePhoneNumber',
  'fromNumber',
  'toNumber',
  'selectedFromNumber',
  'fallbackFromNumber',
  'availableFromNumbers',
  'callerId',
  'callerIdNumber',
  'businessPhone',
  'mobilePhone',
  'primaryNumber',
  'dialInNumber',
  'rc_phone_numbers',
  'fromNum',
  'toNum',
  'targetNumber',
] as const;
export const PERSON_NAME_WORDS = [
  'first_name',
  'last_name',
  'firstName',
  'lastName',
  'customerName',
  'hostName',
  'fromName',
  'toName',
  'callerIdName',
  'emergencyName',
  'display_name',
  'displayName',
  'sanitized_rc_first_name',
  'sanitized_rc_last_name',
  'companyName',
] as const;
export const USERNAME_WORDS = ['userName', 'username'] as const;
// Unambiguous address leaves only. state/country stay address-scoped so
// diagnostic FSM/geo labels remain readable outside address containers.
export const ADDRESS_LEAF_WORDS = [
  'street',
  'street2',
  'city',
  'zip',
  'postalCode',
  'address',
] as const;
export const EMAIL_WORDS = [
  'email',
  'subscriberEmail',
  'searchable_email',
  'email_friendly_abbreviation',
  'submitterEmail',
  'emailAddress',
] as const;
// Free-text SSN only matches hyphenated US form (see Phase 3 lock). Bare
// 9-digit runs stay phone/ID — apps rarely log SSNs; intl nationals collide.
export const SSN_WORDS = [
  'ssn',
  'socialSecurityNumber',
  'socialSecurity',
] as const;
export const CREDIT_CARD_WORDS = [
  'creditCard',
  'creditCardNumber',
  'cardNumber',
  'ccNumber',
] as const;
export const HASH_IDENTIFIER_WORDS = [
  'endpointId',
  'clientId',
  'accountId',
  'rcAccountId',
  'crmAccountId',
  'userId',
  'ownerId',
  'extensionId',
  'userBrandId',
  'subscriberId',
  'agentId',
  'sessionId',
  'telephonySessionId',
  'conversationId',
  'conversationLogId',
  'contactId',
  'messageId',
  'requestMessageId',
  'partyId',
  'crmTaskId',
  'whoId',
  'whatId',
  'latestEntityId',
  'rcMappedTeamsId',
  'currentHubId',
  'contextId',
  'connectionId',
  'groupId',
  'desktopSessionId',
  'ticketId',
  'deviceId',
  'newDeviceId',
  'previousDeviceId',
  'pluginId',
  'widgetId',
  'widgetIds',
  'tabId',
  'windowId',
  'currentWindowId',
  'identify',
] as const;
export const URL_VALUE_KEYS = new Set(
  [
    'url',
    'uri',
    'href',
    'callbackUri',
    'baseUri',
    'basicURL',
    'sdkUrl',
    'contentUri',
    'contentUrl',
    'recordingUri',
    'recordingUrl',
    'wsUrl',
    'workerUrl',
    'workletUrl',
  ].map((word) => word.toLowerCase()),
);
export const URL_PATH_ID_PARENT_WORDS = [
  'account',
  'accounts',
  'extension',
  'extensions',
  'user',
  'users',
  'contact',
  'contacts',
  'device',
  'devices',
  'message-store',
  'messageStore',
  'recording',
  'recordings',
  'conversation',
  'conversations',
  'session',
  'sessions',
  'party',
  'parties',
  'ticket',
  'tickets',
  'address',
  'addresses',
] as const;
export const DIAGNOSTIC_ALLOWED_WORDS = [
  ...DIAGNOSTIC_SAFE_KEYS,
  'notes',
  'details',
  'reason',
  'status',
  'statusCode',
  'code',
  'type',
  'kind',
  'category',
  'module',
  'serviceName',
  'action',
  'actionName',
  'event',
  'eventName',
  'feature',
  'value',
  'enabled',
  'isSilent',
  'count',
  'totalCount',
  'descriptorCount',
  'lazyDescriptorCount',
  'lazyDescriptorDownloadedCount',
  'modulesInstanceCount',
  'modulesActiveCount',
  'phoneContactCount',
  'possibleNumberCount',
  'formattedNumberCount',
  'DBCnt',
] as const;
export const PII_SCOPED_TEXT_FILTER_WORDS = [
  'name',
  'from',
  'to',
  'text',
  'title',
  'subject',
  'message',
] as const;
export const PII_SCOPED_TEXT_HASH_WORDS = ['id'] as const;
export const PII_SCOPED_TEXT_FILTER_KEYS = createScopedTextFieldKeys(
  PII_CONTAINER_WORDS,
  PII_SCOPED_TEXT_FILTER_WORDS,
);
export const PII_SCOPED_TEXT_HASH_KEYS = createScopedTextFieldKeys(
  PII_CONTAINER_WORDS,
  PII_SCOPED_TEXT_HASH_WORDS,
);
export const ADDRESS_SCOPED_TEXT_FILTER_KEYS = createScopedTextFieldKeys(
  ADDRESS_CONTAINER_WORDS,
  ADDRESS_SCOPED_SENSITIVE_WORDS,
);
export const EMAIL_REGEX =
  /[A-Z0-9._%+-]{1,254}@[A-Z0-9.-]{1,253}\.[A-Z]{2,63}/gi;
export const IPV4_REGEX =
  /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g;
export const PHONE_REGEX = /(?:\+?\d[\d ().-]{6,}\d)/g;
export const QUERY_PARAM_REGEX = /([?&#])([^=?&#\s"'<>]+)=([^&#\s"'<>{}]*)/g;
export const QUERY_PARAM_OPERATIONAL_KEYS = new Set([
  'status',
  'page',
  'perpage',
  'limit',
  'offset',
  'sort',
  'order',
  'direction',
  'type',
]);
export const QUERY_PARAM_NUMERIC_KEYS = new Set([
  'page',
  'perpage',
  'limit',
  'offset',
]);
export const QUERY_PARAM_SAFE_ENUM_VALUES = new Map<
  string,
  ReadonlySet<string>
>([
  [
    'status',
    new Set([
      'active',
      'completed',
      'disabled',
      'enabled',
      'failed',
      'inactive',
      'ok',
      'pending',
      'success',
    ]),
  ],
  ['direction', new Set(['asc', 'desc', 'inbound', 'outbound'])],
  ['order', new Set(['asc', 'desc'])],
  [
    'sort',
    new Set(['asc', 'desc', 'created', 'date', 'name', 'time', 'updated']),
  ],
  [
    'type',
    new Set([
      'all',
      'audio',
      'fax',
      'inbound',
      'outbound',
      'sms',
      'video',
      'voice',
    ]),
  ],
]);
export const COOKIE_HEADER_REGEX =
  /(^|[\r\n])((?:set-cookie|cookie)\s*:\s*)[^\r\n]*/gi;
export const BEARER_TOKEN_REGEX = /Bearer\s+([-A-Z0-9._~+/=]+)/gi;
export const BEARER_TOKEN_SIGNAL_REGEX = /Bearer\s/i;
// Compact JWT: header is base64url(`{"…`) → typically starts with eyJ.
export const JWT_COMPACT_REGEX =
  /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/g;
export const JWT_COMPACT_SIGNAL_REGEX = /eyJ[A-Za-z0-9_-]+\./;
// Phase 3 lock: hyphenated US SSN only in free text (not bare 9 digits).
export const SSN_HYPHENATED_REGEX = /(?<!\d)\d{3}-\d{2}-\d{4}(?!\d)/g;
export const CREDIT_CARD_CANDIDATE_REGEX = /(?<!\d)(?:\d[ -]*?){13,19}(?!\d)/g;
export const MAC_ADDRESS_REGEX =
  /\b(?:[0-9a-fA-F]{2}[:-]){5}[0-9a-fA-F]{2}\b|\b(?:[0-9a-fA-F]{4}\.){2}[0-9a-fA-F]{4}\b/g;
// Loose IPv6 span finder; each match is validated before redaction.
export const IPV6_CANDIDATE_REGEX = /[0-9a-fA-F:.]+(?:%\w+)?/g;
export const DIGIT_REGEX = /\d/;
export const PHONE_CANDIDATE_REGEX = /(?:\+?\d[\d ().-]{6,}\d)/;
export const IPV4_CANDIDATE_REGEX = /\d{1,3}\.\d{1,3}/;
export const COOKIE_HEADER_SIGNAL_REGEX =
  /(^|[\r\n])(?:set-cookie|cookie)\s*:/i;
export const UUID_SEGMENT_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const NUMERIC_ID_SEGMENT_REGEX = /^\d{3,}$/;
export const SEND_SIP_MESSAGE_FLAG = /sending WebSocket | sending tcp/i;
export const RECV_SIP_MESSAGE_FLAG =
  /received WebSocket | received tcp socket/i;
export const SIP_URI = 'sip:';
export const SIP_VIA = 'Via:';
export const VIA_RECEIVED = 'received=';
export const SDP_CANDIDATE = 'a=candidate:';
export const SDP_IPV4 = ' IP4';
export const SDP_IPV6 = ' IP6';
export const TRACK_EVENT_LOG_NAME = 'track event';
export const TRACK_EVENT_NAME_INDEX = 1;
export const TRACK_EVENT_PROPS_INDEX = 2;
export const TRACK_EVENT_PROPS_PARENT_KEY = 'trackProps';
export const TRACK_EVENT_LABEL_KEYS = new Set(['message', 'location']);

export const URI_SCHEME_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz0123456789+.-';

export const isUriSchemeCharacter = (character: string) =>
  URI_SCHEME_CHARACTERS.includes(character.toLowerCase());

export const isUriSchemeStart = (character: string) =>
  character >= 'a' && character <= 'z';

export const findUriSchemeStart = (value: string, separatorIndex: number) => {
  let schemeStart = separatorIndex - 1;
  while (schemeStart >= 0 && isUriSchemeCharacter(value[schemeStart])) {
    schemeStart -= 1;
  }
  schemeStart += 1;

  while (
    schemeStart < separatorIndex &&
    !isUriSchemeStart(value[schemeStart].toLowerCase())
  ) {
    schemeStart += 1;
  }

  return schemeStart === separatorIndex ? -1 : schemeStart;
};

export const findUriUserinfoEnd = (value: string, userInfoStart: number) => {
  let atIndex = userInfoStart;
  while (atIndex < value.length) {
    const character = value[atIndex];
    if (character === '@') return atIndex;
    if (
      character === '/' ||
      /\s/.test(character) ||
      character === '"' ||
      character === "'" ||
      character === '<' ||
      character === '>'
    ) {
      return -1;
    }
    atIndex += 1;
  }
  return atIndex;
};

export function maskUriUserinfo(value: string) {
  let result = '';
  let copyStart = 0;
  let searchStart = 0;
  let separatorIndex = value.indexOf('://', searchStart);

  while (separatorIndex >= 0) {
    const schemeStart = findUriSchemeStart(value, separatorIndex);
    if (schemeStart < 0) {
      searchStart = separatorIndex + 3;
      separatorIndex = value.indexOf('://', searchStart);
      continue;
    }

    const userInfoStart = separatorIndex + 3;
    const atIndex = findUriUserinfoEnd(value, userInfoStart);

    if (atIndex <= userInfoStart) {
      searchStart = userInfoStart;
      separatorIndex = value.indexOf('://', searchStart);
      continue;
    }

    result += value.slice(copyStart, userInfoStart) + SECRET_MARKER_V2 + '@';
    copyStart = atIndex + 1;
    searchStart = copyStart;
    separatorIndex = value.indexOf('://', searchStart);
  }

  return copyStart === 0 ? value : result + value.slice(copyStart);
}

export const SIP_STRING_RULES = [
  /"([^"]+)" <sip:/,
  /"([^"]+)"<sip:/,
  /P-Asserted-Identity: "([^"]+)"/,
  /"password":{([^}]+)}/,
  /Phn="([^"]+)"/,
  /Nm="([^"]+)"/,
  /ToNm="([^"]+)"/,
  /callerIdName=([^;]+)/,
  /p-rc-source-ip: (.*)/,
];

export const SIP_PHONE_RULES = [
  /"phoneNumber": "([^}]+)"/,
  /umber":"([^"]+)"/,
  /Phn="([^"]+)"/,
  /ToPhn="([^"]+)"/,
  /To="([^"]+)"/,
  /From="([^"]+)"/,
];

export const normalizedKeyCache = new Map<string, string>();

export const normalizeKey = (key: string) => {
  const cachedValue = normalizedKeyCache.get(key);

  if (cachedValue !== undefined) {
    return cachedValue;
  }

  const normalizedValue = key.replace(/[-_\s]/g, '').toLowerCase();

  if (normalizedKeyCache.size >= NORMALIZED_KEY_CACHE_LIMIT) {
    normalizedKeyCache.clear();
  }

  normalizedKeyCache.set(key, normalizedValue);

  return normalizedValue;
};

export const createKeySet = (words: string[]) =>
  new Set(words.map((word) => normalizeKey(word)));

export const diagnosticSafeKeys = createKeySet([...DIAGNOSTIC_SAFE_KEYS]);
export const piiContainerKeys = createKeySet([...PII_CONTAINER_WORDS]);
export const addressContainerKeys = createKeySet([...ADDRESS_CONTAINER_WORDS]);
export const secretKeys = createKeySet([...SECRET_WORDS]);
export const tokenKeys = createKeySet([...TOKEN_WORDS]);
export const emailKeys = createKeySet([...EMAIL_WORDS]);
export const phoneKeys = createKeySet([...PHONE_WORDS]);
export const personNameKeys = createKeySet([...PERSON_NAME_WORDS]);
export const usernameKeys = createKeySet([...USERNAME_WORDS]);
export const addressLeafKeys = createKeySet([...ADDRESS_LEAF_WORDS]);
export const ssnKeys = createKeySet([...SSN_WORDS]);
export const creditCardKeys = createKeySet([...CREDIT_CARD_WORDS]);
export const hashIdentifierKeys = createKeySet([...HASH_IDENTIFIER_WORDS]);
export const urlPathIdParentSegments = createKeySet([
  ...URL_PATH_ID_PARENT_WORDS,
]);
export const diagnosticAllowedKeys = createKeySet([
  ...DIAGNOSTIC_ALLOWED_WORDS,
]);
export const piiScopedTextFilterKeys = createKeySet([
  ...PII_SCOPED_TEXT_FILTER_KEYS,
]);
export const piiScopedTextHashKeys = createKeySet([
  ...PII_SCOPED_TEXT_HASH_KEYS,
]);
export const addressScopedTextFilterKeys = createKeySet([
  ...ADDRESS_SCOPED_TEXT_FILTER_KEYS,
]);
export const macKeys = createKeySet(['macAddress', 'mac']);
export const ipKeys = createKeySet(['ip', 'ipv4', 'ipv6', 'relatedAddress']);

export const shouldUseAsDirectSensitiveKey = (key: string) => {
  const normalizedKey = normalizeKey(key);

  return (
    !diagnosticSafeKeys.has(normalizedKey) &&
    !piiContainerKeys.has(normalizedKey)
  );
};

export const defaultSensitiveKeys = createKeySet([
  ...SENSITIVE_WORDS.filter(shouldUseAsDirectSensitiveKey),
  ...EXTRA_SENSITIVE_WORDS.filter(shouldUseAsDirectSensitiveKey),
]);
export const defaultMaskKeys = createKeySet(
  [...MASK_WORDS, ...EXTRA_MASK_WORDS].filter(
    (key) =>
      shouldUseAsDirectSensitiveKey(key) &&
      !hashIdentifierKeys.has(normalizeKey(key)) &&
      !URL_VALUE_KEYS.has(normalizeKey(key)),
  ),
);

export const escapeRegExp = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const TEXT_SANITIZE_FIELD_KEYS = createTextFieldKeys(
  [
    ...TEXT_FIELD_KEYS,
    ...ADDRESS_CONTAINER_WORDS,
    ...SECRET_WORDS,
    ...TOKEN_WORDS,
    ...EMAIL_WORDS,
    ...SSN_WORDS,
    ...CREDIT_CARD_WORDS,
    ...HASH_IDENTIFIER_WORDS,
    'macAddress',
    'mac',
    'ip',
    'ipv4',
    'ipv6',
    'relatedAddress',
    ...PII_SCOPED_TEXT_FILTER_KEYS,
    ...PII_SCOPED_TEXT_HASH_KEYS,
    ...ADDRESS_SCOPED_TEXT_FILTER_KEYS,
    ...Array.from(URL_VALUE_KEYS),
  ].filter((key) => {
    const normalizedKey = normalizeKey(key);

    return (
      shouldUseAsDirectSensitiveKey(key) ||
      secretKeys.has(normalizedKey) ||
      tokenKeys.has(normalizedKey) ||
      emailKeys.has(normalizedKey) ||
      ssnKeys.has(normalizedKey) ||
      creditCardKeys.has(normalizedKey) ||
      hashIdentifierKeys.has(normalizedKey) ||
      macKeys.has(normalizedKey) ||
      ipKeys.has(normalizedKey) ||
      URL_VALUE_KEYS.has(normalizedKey)
    );
  }),
);
export const textKeyPattern =
  TEXT_SANITIZE_FIELD_KEYS.map(escapeRegExp).join('|');
export const textKeyPrefix = '(^|[^A-Za-z0-9_$-])';
export const doubleQuotedTextKeyValueRegex = new RegExp(
  `${textKeyPrefix}(["']?)(${textKeyPattern})\\2(\\s*[:=]\\s*)"((?:\\\\.|[^"\\\\])*)"`,
  'gi',
);
export const singleQuotedTextKeyValueRegex = new RegExp(
  `${textKeyPrefix}(["']?)(${textKeyPattern})\\2(\\s*[:=]\\s*)'((?:\\\\.|[^'\\\\])*)'`,
  'gi',
);
export const unquotedTextKeyValueTerminator =
  '(?=\\s+["\']?[A-Za-z][A-Za-z0-9_$.-]*["\']?\\s*[:=]|[,;&\\r\\n}]|$)';
export const unquotedTextKeyValueRegex = new RegExp(
  `${textKeyPrefix}(["']?)(${textKeyPattern})\\2(\\s*[:=]\\s*)(?!\\s*["'])([^,;\\r\\n}"'}]*?)${unquotedTextKeyValueTerminator}`,
  'gi',
);
export const addressContextTextKeyPattern = createTextFieldKeys([
  ...ADDRESS_CONTAINER_WORDS,
  ...ADDRESS_SCOPED_SENSITIVE_WORDS,
])
  .map(escapeRegExp)
  .join('|');
export const addressContainerTextKeyPattern = createTextFieldKeys([
  ...ADDRESS_CONTAINER_WORDS,
])
  .map(escapeRegExp)
  .join('|');
export const addressContainerTextKeyValueRegex = new RegExp(
  `${textKeyPrefix}(["']?)(${addressContainerTextKeyPattern})\\2\\s*[:=]`,
  'i',
);
export const addressContextDoubleQuotedTextKeyValueRegex = new RegExp(
  `${textKeyPrefix}(["']?)(${addressContextTextKeyPattern})\\2(\\s*[:=]\\s*)"((?:\\\\.|[^"\\\\])*)"`,
  'gi',
);
export const addressContextSingleQuotedTextKeyValueRegex = new RegExp(
  `${textKeyPrefix}(["']?)(${addressContextTextKeyPattern})\\2(\\s*[:=]\\s*)'((?:\\\\.|[^'\\\\])*)'`,
  'gi',
);
export const addressContextUnquotedTextKeyValueRegex = new RegExp(
  `${textKeyPrefix}(["']?)(${addressContextTextKeyPattern})\\2(\\s*[:=]\\s*)(?!\\s*["'])([^,;\\r\\n}"'}]*?)${unquotedTextKeyValueTerminator}`,
  'gi',
);
