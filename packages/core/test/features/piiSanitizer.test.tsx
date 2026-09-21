import {
  BINARY_MARKER_V2,
  CIRCULAR_VALUE,
  MASK_WORDS,
  PiiLoggerMiddlewares,
  SECRET_MARKER_V2,
  SERIALIZED_LOG_SANITIZATION_POLICY_KEY,
  SENSITIVE_WORDS,
  diagnosticLogValue,
  logParamsWithSanitizationPolicy,
  registerLogSanitizationPolicy,
  resetPiiDeviceKeyForTests,
  sanitizeLogData,
  sanitizeLogParams,
  sanitizeLogText,
  sanitizeSerializedLogParams,
  setPiiDeviceKeyForTests,
} from '../../lib/logger/logger';

const RESTRICTED_ADDRESS = '[Restricted:v2;address]';
const piiV2 = (type: string) =>
  new RegExp(`^\\[PII:v2;${type};[^;]*;[A-Z2-7]{13}\\]$`);

describe('piiSanitizer', () => {
  beforeEach(() => {
    resetPiiDeviceKeyForTests();
    setPiiDeviceKeyForTests(new Uint8Array(32).fill(7));
  });

  it('keeps Fiji foundation sensitive and mask word lists in sync', () => {
    expect(SENSITIVE_WORDS).toEqual([
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
    ]);
    expect(MASK_WORDS).toEqual([
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
    ]);
  });

  it('masks Fiji sensitive and mask-word fields without mutating input', () => {
    const source = {
      access_token: 'abcdef123456',
      firstName: 'Michael',
      nested: {
        phoneNumber: '+16505551234',
        email: 'michael@example.com',
        path: '/callback?code=abc&token=secret',
      },
      callInfo: {
        fromName: 'Alice',
        toNumber: '+14155550100',
        callId: '354952773_117014483@10.22.66.89',
      },
      transport: {
        localCandidates: [
          {
            ip: '10.22.66.89',
            relatedAddress: '192.168.1.10',
          },
          {
            ip: '127.0.0.1',
            relatedAddress: '0.0.0.0',
          },
        ],
      },
      sipCallId: '354952773_117014483@10.22.66.89',
    };

    const sanitized = sanitizeLogData(source) as typeof source;

    expect(source.firstName).toBe('Michael');
    expect(sanitized.firstName).toMatch(piiV2('person-name'));
    expect(sanitized.access_token).not.toContain('abcdef123456');
    expect(sanitized.nested.phoneNumber).toMatch(piiV2('phone'));
    expect(sanitized.nested.email).not.toContain('michael');
    expect(sanitized.nested.path).toContain('code=[Secret:v2]');
    expect(sanitized.nested.path).toContain('token=[Secret:v2]');
    expect(sanitized.callInfo.fromName).toMatch(piiV2('person-name'));
    expect(sanitized.callInfo.toNumber).toMatch(piiV2('phone'));
    expect(sanitized.callInfo.callId).toMatch(/@\[PII:v2;ipv4;/);
    expect(sanitized.transport.localCandidates[0].ip).toMatch(piiV2('ipv4'));
    expect(sanitized.transport.localCandidates[0].relatedAddress).toMatch(
      piiV2('ipv4'),
    );
    expect(sanitized.transport.localCandidates[1].ip).toBe('127.0.0.1');
    expect(sanitized.transport.localCandidates[1].relatedAddress).toBe(
      '0.0.0.0',
    );
    expect(sanitized.sipCallId).toMatch(/@\[PII:v2;ipv4;/);
  });

  it('masks URL query, email, phone, token, IP, and SIP text', () => {
    const text = [
      'sending WebSocket SIP/2.0',
      'From: "Alice Smith" <sip:+16505551234@10.22.66.89>',
      'P-Asserted-Identity: "Alice Smith"',
      'Call-ID: abc@10.22.66.89',
      'LocalAddr: IP=10.22.66.89:5060',
      'url=/callback?access_token=secret&email=alice@example.com',
      'Authorization=Bearer token-value',
      'Call customer at 1.650.555.1234',
      'User-Agent=RingCentral/25.2.1 Chrome/125.0.0.0',
      'Adapter socket http://127.0.0.1:5050/status',
    ].join('\r\n');

    const sanitized = sanitizeLogText(text);

    expect(sanitized).not.toContain('Alice Smith');
    expect(sanitized).not.toContain('+16505551234');
    expect(sanitized).not.toContain('10.22.66.89');
    expect(sanitized).not.toContain('secret');
    expect(sanitized).not.toContain('alice@example.com');
    expect(sanitized).not.toContain('token-value');
    expect(sanitized).not.toContain('1.650.555.1234');
    expect(sanitized).toContain('Chrome/125.0.0.0');
    expect(sanitized).toContain('127.0.0.1:5050');
  });

  it('preserves operational query values while sanitizing other values', () => {
    const sanitized = sanitizeLogText(
      '/restapi/v1.0/account/~/extension/~/phone-number?status=Enabled&perPage=1000&page=2&access_token=secret&phoneNumber=%2B16505551234&search=alice%40example.com&status=Alice%20Smith&type=customer-defined',
    );

    expect(sanitized).toContain(
      '?status=Enabled&perPage=1000&page=2&access_token=[Secret:v2]&',
    );
    expect(sanitized).toContain('phoneNumber=[PII:v2;phone;');
    expect(sanitized).toContain('search=[Secret:v2]');
    expect(sanitized).not.toContain('Alice%20Smith');
    expect(sanitized).not.toContain('customer-defined');
  });

  it('sanitizes phone number object arrays field by field', () => {
    const sanitized = sanitizeLogData({
      phoneNumbers: [
        {
          phoneNumber: '+16505551234',
          formattedPhoneNumber: '+1 (650) 555-1234',
          phoneType: 'Mobile',
          usageType: 'DirectNumber',
          smsAvailabilityStatus: 'Available',
          fromName: 'Alice Smith',
          id: 'phone-123',
          extensionNumber: '101',
        },
      ],
    }) as {
      phoneNumbers: Array<Record<string, string>>;
    };
    const [phone] = sanitized.phoneNumbers;

    expect(phone.phoneNumber).toMatch(piiV2('phone'));
    expect(phone.formattedPhoneNumber).toMatch(piiV2('phone'));
    expect(phone.phoneType).toBe('Mobile');
    expect(phone.usageType).toBe('DirectNumber');
    expect(phone.smsAvailabilityStatus).toBe('Available');
    expect(phone.fromName).toMatch(piiV2('person-name'));
    expect(phone.id).toMatch(piiV2('user-id'));
    expect(phone.extensionNumber).toBe(SECRET_MARKER_V2);
  });

  it('masks text key-value PII with spaces and quoted values', () => {
    const text = [
      'fromName=Alice Smith',
      'address=20 Main St city=Belmont',
      '{"fromName":"Alice Smith","Authorization":"Basic dXNlcjpwYXNz"}',
      '{"id_token":"raw-id-token","ws_access_token":"raw-ws-token"}',
      '{"contentUri":"https://example.com/restapi/v1.0/account/123456/extension/789/message-store/555/content?token=secret"}',
      "customerName: 'Alice Smith'",
      'Authorization: Basic dXNlcjpwYXNz',
      'groupId=group-123 desktopSessionId=desktop-session-123 connectionId=connection-123',
      'contact.name=Alice user.id=user-123 userProfile.name=Profile Name contactId=contact-789',
      'payload.contact.name=Nested Alice payload.address.city=Belmont',
      'sourcePhoneNumber=+16505550130',
    ].join('\n');

    const sanitized = sanitizeLogText(text);

    expect(sanitized).toMatch(/fromName=\[PII:v2;person-name;/);
    expect(sanitized).toContain('address=[Restricted:v2;address]');
    expect(sanitized).toContain('city=[Restricted:v2;address]');
    expect(sanitized).toMatch(/"fromName":"\[PII:v2;person-name;/);
    expect(sanitized).toContain('"Authorization":"Basic [Secret:v2]"');
    expect(sanitized).toMatch(/"id_token":"\[PII:v2;jwt;/);
    expect(sanitized).toMatch(/"ws_access_token":"\[PII:v2;access-token;/);
    expect(sanitized).toMatch(
      /"contentUri":"https:\/\/example\.com\/restapi\/v1\.0\/account\/\[PII:v2;user-id;[^\]]+\]\/extension\/\[PII:v2;user-id;[^\]]+\]\/message-store\/\[PII:v2;user-id;[^\]]+\]\/content\?token=\[Secret:v2\]"/,
    );
    expect(sanitized).toMatch(/customerName: '\[PII:v2;person-name;/);
    expect(sanitized).toContain('Authorization: Basic [Secret:v2]');
    expect(sanitized).toMatch(/groupId=\[PII:v2;user-id;/);
    expect(sanitized).toMatch(/desktopSessionId=\[PII:v2;user-id;/);
    expect(sanitized).toMatch(/connectionId=\[PII:v2;user-id;/);
    expect(sanitized).toMatch(/contact\.name=\[PII:v2;person-name;/);
    expect(sanitized).toMatch(/user\.id=\[PII:v2;user-id;/);
    expect(sanitized).toMatch(/userProfile\.name=\[PII:v2;person-name;/);
    expect(sanitized).toMatch(/contactId=\[PII:v2;user-id;/);
    expect(sanitized).toMatch(/payload\.contact\.name=\[PII:v2;person-name;/);
    expect(sanitized).toContain('payload.address.city=[Restricted:v2;address]');
    expect(sanitized).toMatch(/sourcePhoneNumber=\[PII:v2;phone;/);
    expect(sanitized).not.toContain('Alice Smith');
    expect(sanitized).not.toContain('20 Main St');
    expect(sanitized).not.toContain('Belmont');
    expect(sanitized).not.toContain('dXNlcjpwYXNz');
    expect(sanitized).not.toContain('raw-id-token');
    expect(sanitized).not.toContain('raw-ws-token');
    expect(sanitized).not.toContain('group-123');
    expect(sanitized).not.toContain('desktop-session-123');
    expect(sanitized).not.toContain('connection-123');
    expect(sanitized).not.toContain('user-123');
    expect(sanitized).not.toContain('Profile Name');
    expect(sanitized).not.toContain('contact-789');
    expect(sanitized).not.toContain('Nested Alice');
    expect(sanitized).not.toContain('+16505550130');
  });

  it('filters cookie fields and cookie header text', () => {
    const source = {
      cookie: 'sid=raw-cookie',
      cookies: { sid: 'raw-cookie-map' },
      Cookie: 'sid=raw-cookie-header',
      'Set-Cookie': 'sid=raw-set-cookie',
      setCookie: 'sid=raw-set-cookie-camel',
    };
    const text = [
      'Cookie: sid=raw-cookie-header; rc=raw-cookie-other',
      'Set-Cookie: sid=raw-set-cookie-header; Path=/; HttpOnly',
      '{"Cookie":"raw-cookie-json","Set-Cookie":"raw-set-cookie-json"}',
    ].join('\n');

    const sanitized = sanitizeLogData(source);
    const sanitizedText = sanitizeLogText(text);

    expect(sanitized.cookie).toBe(SECRET_MARKER_V2);
    // Container-valued cookie keeps its shape while hiding every leaf value.
    expect(sanitized.cookies).toEqual({ sid: SECRET_MARKER_V2 });
    expect(sanitized.Cookie).toBe(SECRET_MARKER_V2);
    expect(sanitized['Set-Cookie']).toBe(SECRET_MARKER_V2);
    expect(sanitized.setCookie).toBe(SECRET_MARKER_V2);
    expect(JSON.stringify(sanitized)).not.toContain('raw-cookie-map');
    expect(sanitizedText).not.toContain('raw-cookie-header');
    expect(sanitizedText).not.toContain('raw-cookie-other');
    expect(sanitizedText).not.toContain('raw-set-cookie-header');
    expect(sanitizedText).not.toContain('raw-cookie-json');
    expect(sanitizedText).not.toContain('raw-set-cookie-json');
  });

  it('masks app-specific PII fields while keeping structured diagnostics useful', () => {
    const source = {
      id_token: 'raw-id-token',
      ws_access_token: 'raw-ws-token',
      endpoint_id: 'endpoint-123',
      extension_number: '101',
      number: '+16505550123',
      sourcePhoneNumber: '+16505550130',
      selectedFromNumber: '+16505550124',
      url: 'https://example.com/callback?code=abc&state=state-value',
      sessionId: 'telephony-session-123',
      telephonySessionId: 'telephony-session-456',
      conversationId: 'conversation-123',
      contactId: 'contact-789',
      ticketId: 'ticket-456',
      requestMessageId: 'request-message-789',
      accountId: 'account-123',
      ownerId: 'owner-123',
      brandId: '1210',
      assetId: 'asset-static-name',
      buildNumber: '12345',
      descriptorCount: 10,
      modulesActiveCount: 42,
      isSilent: false,
      baseUri:
        'https://platform.ringcentral.com/restapi/v1.0/account/123456?access_token=secret',
      basicURL:
        'https://alice:basic-secret@platform.ringcentral.com/restapi/v1.0/account/123456?token=secret',
      callbackUri: 'https://example.com/oauth?state=state-value',
      recordingUri:
        'https://platform.ringcentral.com/restapi/v1.0/account/123456/extension/789/recording/555/content?access_token=secret',
      sdkUrl:
        'https://cdn.example.com/assets/chunk/abcdef1234/app.js?token=secret',
      message: 'hello from michael@example.com',
      notes: 'Customer asked to call +16505550125',
      transcript: 'Alice said hello',
      contact: {
        id: 'contact-123',
        name: 'Alice',
        phone: '+16505550126',
      },
      user: {
        id: 'user-123',
        name: 'Alice User',
        email: 'alice.user@example.com',
      },
      extension: {
        id: 'extension-123',
        name: 'Alice Extension',
        extensionNumber: '101',
      },
      owner: {
        id: 'owner-456',
        name: 'Owner Name',
      },
      userProfile: {
        name: 'Profile Name',
      },
      contacts: [
        'Alice Smith',
        {
          id: 'contact-456',
          name: 'Bob',
          phone: '+16505550129',
        },
      ],
      addresses: [
        '20 Main St',
        {
          street: '30 Main St',
          city: 'Belmont',
        },
      ],
      ticket: {
        id: 'ticket-123',
        description: 'customer address 20 Main St',
      },
      call: {
        fromNumber: '+16505550127',
        toNumber: '+16505550128',
      },
    };

    const sanitized = sanitizeLogData(source) as typeof source;
    const sanitizedContact = sanitized.contacts[1] as {
      id: string;
      name: string;
      phone: string;
    };
    const sanitizedAddress = sanitized.addresses[1] as {
      street: string;
      city: string;
    };

    expect(sanitized.id_token).not.toContain('raw-id-token');
    expect(sanitized.ws_access_token).not.toContain('raw-ws-token');
    expect(sanitized.endpoint_id).not.toContain('endpoint-123');
    expect(sanitized.extension_number).toBe(SECRET_MARKER_V2);
    expect(sanitized.number).toBe(SECRET_MARKER_V2);
    expect(sanitized.sourcePhoneNumber).toMatch(piiV2('phone'));
    expect(sanitized.selectedFromNumber).toMatch(piiV2('phone'));
    expect(sanitized.url).not.toContain('code=abc');
    expect(sanitized.sessionId).not.toContain('telephony-session-123');
    expect(sanitized.telephonySessionId).not.toContain('telephony-session-456');
    expect(sanitized.conversationId).not.toContain('conversation-123');
    expect(sanitized.contactId).toMatch(piiV2('user-id'));
    expect(sanitized.contactId).not.toContain('contact-789');
    expect(sanitized.ticketId).not.toContain('ticket-456');
    expect(sanitized.requestMessageId).not.toContain('request-message-789');
    expect(sanitized.accountId).not.toContain('account-123');
    expect(sanitized.ownerId).not.toContain('owner-123');
    expect(sanitized.brandId).toBe('1210');
    expect(sanitized.assetId).toBe('asset-static-name');
    expect(sanitized.buildNumber).toBe('12345');
    expect(sanitized.descriptorCount).toBe(10);
    expect(sanitized.modulesActiveCount).toBe(42);
    expect(sanitized.isSilent).toBe(false);
    expect(sanitized.baseUri).toMatch(
      /account\/\[PII:v2;user-id;[^\]]+\]\?access_token=\[Secret:v2\]/,
    );
    expect(sanitized.baseUri).not.toContain('/123456');
    expect(sanitized.basicURL).toContain('[Secret:v2]@');
    expect(sanitized.basicURL).toContain('platform.ringcentral.com');
    expect(sanitized.basicURL).toContain('token=[Secret:v2]');
    expect(sanitized.basicURL).not.toContain('alice');
    expect(sanitized.basicURL).not.toContain('basic-secret');
    expect(sanitized.callbackUri).not.toContain('state-value');
    expect(sanitized.recordingUri).toMatch(
      /account\/\[PII:v2;user-id;[^\]]+\]\/extension\/\[PII:v2;user-id;[^\]]+\]\/recording\/\[PII:v2;user-id;[^\]]+\]\/content\?access_token=\[Secret:v2\]/,
    );
    expect(sanitized.recordingUri).not.toContain('/123456/');
    expect(sanitized.recordingUri).not.toContain('/789/');
    expect(sanitized.recordingUri).not.toContain('/555/');
    expect(sanitized.sdkUrl).toContain('/abcdef1234/');
    expect(sanitized.sdkUrl).toContain('token=[Secret:v2]');
    expect(sanitized.message).toContain('hello from');
    expect(sanitized.message).not.toContain('michael@example.com');
    expect(sanitized.notes).toBe(SECRET_MARKER_V2);
    expect(sanitized.transcript).toBe(SECRET_MARKER_V2);
    expect(sanitized.contact.id).not.toContain('contact-123');
    expect(sanitized.contact.name).toMatch(piiV2('person-name'));
    expect(sanitized.contact.phone).toMatch(piiV2('phone'));
    expect(sanitized.user.id).not.toContain('user-123');
    expect(sanitized.user.name).toMatch(piiV2('person-name'));
    expect(sanitized.user.email).not.toContain('alice.user');
    expect(sanitized.extension.id).not.toContain('extension-123');
    expect(sanitized.extension.name).toMatch(piiV2('person-name'));
    expect(sanitized.extension.extensionNumber).toBe(SECRET_MARKER_V2);
    expect(sanitized.owner.id).not.toContain('owner-456');
    expect(sanitized.owner.name).toMatch(piiV2('person-name'));
    expect(sanitized.userProfile.name).toMatch(piiV2('person-name'));
    expect(sanitized.contacts[0]).toBe(SECRET_MARKER_V2);
    expect(sanitizedContact.id).not.toContain('contact-456');
    expect(sanitizedContact.name).toMatch(piiV2('person-name'));
    expect(sanitizedContact.phone).toMatch(piiV2('phone'));
    expect(sanitized.addresses[0]).toBe(RESTRICTED_ADDRESS);
    expect(sanitizedAddress.street).toBe(RESTRICTED_ADDRESS);
    expect(sanitizedAddress.city).toBe(RESTRICTED_ADDRESS);
    expect(sanitized.ticket.id).not.toContain('ticket-123');
    expect(sanitized.ticket.description).toBe(SECRET_MARKER_V2);
    expect(sanitized.call.fromNumber).toMatch(piiV2('phone'));
    expect(sanitized.call.toNumber).toMatch(piiV2('phone'));
  });

  it('keeps diagnostic text fields readable without substring key matches', () => {
    const text = [
      'buildNumber=12345 buildCommit=abcdef123456 electronAppVersionNumber=1.2.3',
      'descriptorCount=10 lazyDescriptorCount=11 modulesInstanceCount=42 phoneContactCount=100 totalCount=5 count=3',
      'name=PerfTracker serviceName=WebPhone state=registered from=idle to=ready message=failed to fetch',
      'brandId=1210 assetId=rc-static baseUri=https://platform.ringcentral.com/restapi',
      'font-weight: bold',
    ].join('\n');

    const sanitized = sanitizeLogText(text);

    expect(sanitized).toContain('buildNumber=12345');
    expect(sanitized).toContain('buildCommit=abcdef123456');
    expect(sanitized).toContain('electronAppVersionNumber=1.2.3');
    expect(sanitized).toContain('descriptorCount=10');
    expect(sanitized).toContain('lazyDescriptorCount=11');
    expect(sanitized).toContain('modulesInstanceCount=42');
    expect(sanitized).toContain('phoneContactCount=100');
    expect(sanitized).toContain('totalCount=5');
    expect(sanitized).toContain('count=3');
    expect(sanitized).toContain('name=PerfTracker');
    expect(sanitized).toContain('serviceName=WebPhone');
    expect(sanitized).toContain('state=registered');
    expect(sanitized).toContain('from=idle');
    expect(sanitized).toContain('to=ready');
    expect(sanitized).toContain('message=failed to fetch');
    expect(sanitized).toContain('brandId=1210');
    expect(sanitized).toContain('assetId=rc-static');
    expect(sanitized).toContain(
      'baseUri=https://platform.ringcentral.com/restapi',
    );
    expect(sanitized).toContain('font-weight: bold');
    expect(sanitized).not.toContain('buildNumber=[Secret:v2]');
    expect(sanitized).not.toContain('descriptorCount=[Secret:v2]');
  });

  it('keeps structured module, feature, state, and error diagnostics readable', () => {
    const sanitized = sanitizeLogData({
      PerfTracker: {
        name: 'API latency',
        value: 123,
      },
      feature: {
        name: 'RCExtensionFeaturesVoipCalling',
        enabled: true,
      },
      rtcAccountFsm: {
        from: 'idle',
        to: 'registered',
        state: 'connected',
      },
      error: {
        name: 'IncorrectConfiguration',
        message: 'failed to fetch token=secret for michael@example.com',
      },
      UserAgent:
        'RingCentral/25.2.1 SDK/5.0.0 Chrome/125.0.0.0 Windows NT 10.0',
    });

    expect(sanitized.PerfTracker.name).toBe('API latency');
    expect(sanitized.PerfTracker.value).toBe(123);
    expect(sanitized.feature.name).toBe('RCExtensionFeaturesVoipCalling');
    expect(sanitized.feature.enabled).toBe(true);
    expect(sanitized.rtcAccountFsm.from).toBe('idle');
    expect(sanitized.rtcAccountFsm.to).toBe('registered');
    expect(sanitized.rtcAccountFsm.state).toBe('connected');
    expect(sanitized.error.name).toBe('IncorrectConfiguration');
    expect(sanitized.error.message).toContain('failed to fetch');
    expect(sanitized.error.message).not.toContain('secret');
    expect(sanitized.error.message).not.toContain('michael@example.com');
    expect(sanitized.UserAgent).toContain('RingCentral/25.2.1');
    expect(sanitized.UserAgent).toContain('Chrome/125.0.0.0');
  });

  it('sanitizes enumerable Error fields by key', () => {
    const error = new Error(
      'failed token=secret for michael@example.com +16505550123',
    ) as Error & {
      password: string;
      accessToken: string;
      phoneNumber: string;
      callbackUri: string;
      details: {
        contact: {
          name: string;
          phoneNumber: string;
        };
      };
    };

    error.password = 'open-sesame';
    error.accessToken = 'raw-access-token';
    error.phoneNumber = '+16505550124';
    error.callbackUri =
      'https://platform.ringcentral.com/restapi/v1.0/account/123456?token=secret';
    error.details = {
      contact: {
        name: 'Alice',
        phoneNumber: '+16505550125',
      },
    };

    const sanitized = sanitizeLogData(error) as typeof error;

    expect(sanitized.message).toContain('failed');
    expect(sanitized.message).not.toContain('secret');
    expect(sanitized.message).not.toContain('michael@example.com');
    expect(sanitized.message).not.toContain('+16505550123');
    expect(sanitized.password).toBe(SECRET_MARKER_V2);
    expect(sanitized.accessToken).toMatch(piiV2('access-token'));
    expect(sanitized.phoneNumber).toMatch(piiV2('phone'));
    expect(sanitized.callbackUri).not.toContain('/123456');
    expect(sanitized.callbackUri).toContain('token=[Secret:v2]');
    expect(sanitized.details.contact.name).toMatch(piiV2('person-name'));
    expect(sanitized.details.contact.phoneNumber).toMatch(piiV2('phone'));
  });

  it('lets diagnosticLogValue keep safe diagnostic values but not secrets or PII', () => {
    const plain = sanitizeLogData({
      notes: 'worker restarted',
      details: {
        notes: 'nested diagnostic note',
      },
    });
    const sanitized = sanitizeLogData(
      diagnosticLogValue({
        name: 'PerfTracker',
        count: 3,
        notes: 'worker restarted for michael@example.com',
        details: {
          notes: 'nested diagnostic note',
          phoneNumber: '+16505550124',
        },
        requestBody: {
          customField: 'raw profile text',
          unknownEmail: 'alice@example.com',
        },
        body: 'raw body text for Alice +16505550123',
        transcript: 'caller said account is 123456',
        comment: 'customer moved to 20 Main St',
        description: 'case description for +16505550124',
        number: 16505551234,
        accountId: 'account-123',
        callbackUri:
          'https://platform.ringcentral.com/restapi/v1.0/account/123456?token=secret',
        extensionNumber: 101,
        postalCode: 94002,
        state: 'registered',
        Authorization: 'Bearer token-value',
        phoneNumber: '+16505550123',
        message: 'request failed for michael@example.com',
      }),
    );
    const fieldWrapped = sanitizeLogData({
      notes: diagnosticLogValue('field diagnostic for michael@example.com'),
      phoneNumber: diagnosticLogValue('+16505550125'),
    });
    const riskyDiagnostic = {
      text: 'private text for Alice at 20 Main St +16505550123',
      subject: 'private subject for Alice Smith',
      title: 'private title for Alice',
      summary: 'met Alice at 20 Main St',
      coverPageText: 'fax for Alice Smith at 20 Main St',
      customCoverOptions: { text: 'cover for Alice' },
      rc_phone_numbers: ['+16505550123'],
      sipInfo: 'sip:+16505550123@example.com',
    };
    const riskyPlain = sanitizeLogData(riskyDiagnostic);
    const riskyWrapped = sanitizeLogData(diagnosticLogValue(riskyDiagnostic));

    expect(plain.notes).toBe(SECRET_MARKER_V2);
    expect(plain.details.notes).toBe(SECRET_MARKER_V2);
    expect(sanitized.name).toBe('PerfTracker');
    expect(sanitized.count).toBe(3);
    expect(sanitized.notes).toContain('worker restarted');
    expect(sanitized.notes).not.toContain('michael@example.com');
    expect(sanitized.details.notes).toBe('nested diagnostic note');
    expect(sanitized.details.phoneNumber).toMatch(piiV2('phone'));
    // Phase 2: a container under a sensitive key keeps its shape; only the
    // PII-bearing leaf is redacted, safe diagnostic fields survive.
    expect(sanitized.requestBody).toMatchObject({
      customField: 'raw profile text',
    });
    expect(
      (sanitized.requestBody as { unknownEmail: string }).unknownEmail,
    ).toMatch(piiV2('email'));
    expect(JSON.stringify(sanitized.requestBody)).not.toContain(
      'alice@example.com',
    );
    expect(sanitized.body).toBe(SECRET_MARKER_V2);
    expect(sanitized.transcript).toBe(SECRET_MARKER_V2);
    expect(sanitized.comment).toBe(SECRET_MARKER_V2);
    expect(sanitized.description).toBe(SECRET_MARKER_V2);
    expect(sanitized.number).toBe(SECRET_MARKER_V2);
    expect(sanitized.accountId).not.toContain('account-123');
    expect(sanitized.callbackUri).not.toContain('/123456');
    expect(sanitized.callbackUri).toContain('token=[Secret:v2]');
    expect(sanitized.extensionNumber).toBe(SECRET_MARKER_V2);
    expect(sanitized.postalCode).toBe(RESTRICTED_ADDRESS);
    expect(sanitized.state).toBe('registered');
    expect(sanitized.Authorization).toMatch(/^Bearer \[PII:v2;access-token;/);
    expect(sanitized.phoneNumber).toMatch(piiV2('phone'));
    expect(sanitized.message).toContain('request failed');
    expect(sanitized.message).not.toContain('michael@example.com');
    expect(fieldWrapped.notes).toContain('field diagnostic');
    expect(fieldWrapped.notes).not.toContain('michael@example.com');
    expect(fieldWrapped.phoneNumber).toMatch(piiV2('phone'));
    expect(riskyWrapped).toEqual(riskyPlain);
    expect(JSON.stringify(riskyWrapped)).not.toContain('Alice');
    expect(JSON.stringify(riskyWrapped)).not.toContain('20 Main St');
    expect(JSON.stringify(riskyWrapped)).not.toContain('+16505550123');
  });

  it('does not keep diagnosticLogValue bypass after worker-style cloning', () => {
    const wrapped = diagnosticLogValue({
      notes: 'worker restarted',
      details: {
        notes: 'nested diagnostic note',
      },
      phoneNumber: '+16505550123',
    });
    const sameRuntime = sanitizeLogData(wrapped) as {
      notes: string;
      details: { notes: string };
      phoneNumber: string;
    };
    const cloned =
      typeof globalThis.structuredClone === 'function'
        ? globalThis.structuredClone(wrapped)
        : JSON.parse(JSON.stringify(wrapped));
    const sanitizedClone = sanitizeLogData(cloned) as {
      value: {
        notes: string;
        details: { notes: string };
        phoneNumber: string;
      };
    };

    expect(sameRuntime.notes).toBe('worker restarted');
    expect(sameRuntime.details.notes).toBe('nested diagnostic note');
    expect(sameRuntime.phoneNumber).toMatch(piiV2('phone'));
    expect(sanitizedClone.value.notes).toBe(SECRET_MARKER_V2);
    expect(sanitizedClone.value.details.notes).toBe(SECRET_MARKER_V2);
    expect(sanitizedClone.value.phoneNumber).toMatch(piiV2('phone'));
  });

  it('does not let plain payloads spoof diagnosticLogValue', () => {
    const sanitized = sanitizeLogData({
      __rcLogDiagnosticValue: true,
      value: {
        number: 16505551234,
        extensionNumber: 101,
        password: 'secret',
      },
    });

    expect(sanitized.value.number).toBe(SECRET_MARKER_V2);
    expect(sanitized.value.extensionNumber).toBe(SECRET_MARKER_V2);
    expect(sanitized.value.password).toBe(SECRET_MARKER_V2);
  });

  it('preserves registered metadata subtrees without bypassing hard PII rules', () => {
    const policy = registerLogSanitizationPolicy({
      hashPaths: [['config', 'userSessionId']],
      id: 'test.configuration-metadata.v1',
      metadataPaths: [['objects', '*'], ['config']],
    });
    const source = {
      config: {
        icon: 'https://icon-user:icon-password@example.com/contacts/123456789?token=raw-token',
        secret: 'open-sesame',
        userSessionId: 'raw-session-id',
      },
      objects: {
        Contact: [
          {
            apiName: 'Name',
            displayName: 'Full Name',
            email: 'Email',
            phoneNumber: 'Phone',
          },
        ],
      },
      record: {
        displayName: 'Alice Smith',
        phoneNumber: '+16505550123',
      },
    };
    const middleware = new PiiLoggerMiddlewares();
    const payload = JSON.parse(
      middleware.handleParams([
        logParamsWithSanitizationPolicy(policy.id, [
          'configuration response',
          source,
        ]),
      ]),
    );

    expect(payload[0]).toBe('configuration response');
    expect(payload[1].objects).toEqual(source.objects);
    expect(payload[1].config.secret).toBe(SECRET_MARKER_V2);
    expect(payload[1].config.userSessionId).toMatch(piiV2('user-id'));
    expect(payload[1].config.icon).toMatch(
      /https:\/\/\[Secret:v2\]@example\.com\/contacts\/\[PII:v2;user-id;/,
    );
    expect(payload[1].config.icon).toContain('token=[Secret:v2]');
    expect(payload[1].record.displayName).toMatch(piiV2('person-name'));
    expect(payload[1].record.phoneNumber).toMatch(piiV2('phone'));
    expect(payload[2]).toEqual({
      [SERIALIZED_LOG_SANITIZATION_POLICY_KEY]: {
        id: policy.id,
        version: 1,
      },
    });
    expect(source.config.secret).toBe('open-sesame');
  });

  it('does not let unknown, cloned, or conflicting policies widen metadata access', () => {
    const policy = registerLogSanitizationPolicy({
      depth: 7,
      id: 'test.fixed-metadata.v1',
      metadataPaths: [['safeMetadata']],
    });
    const conflictingPolicy = registerLogSanitizationPolicy({
      depth: 10,
      id: policy.id,
      metadataPaths: [['unsafeMetadata']],
    });
    const unknownPayload = sanitizeLogParams([
      logParamsWithSanitizationPolicy('test.unknown-policy.v1', [
        { displayName: 'Alice Smith' },
      ]),
    ]);
    const wrapped = logParamsWithSanitizationPolicy(policy.id, [
      { unsafeMetadata: { displayName: 'Alice Smith' } },
    ]);
    const cloned = JSON.parse(JSON.stringify(wrapped));
    const clonedPayload = sanitizeLogParams([cloned]) as Array<{
      params: Array<{ unsafeMetadata: { displayName: string } }>;
    }>;

    expect(conflictingPolicy.metadataPaths).toEqual([['safeMetadata']]);
    expect(conflictingPolicy.depth).toBe(7);
    expect(unknownPayload[0].displayName).toMatch(piiV2('person-name'));
    expect(clonedPayload[0].params[0].unsafeMetadata.displayName).toMatch(
      piiV2('person-name'),
    );
  });

  it('replays a persisted policy and rejects spoofed policy markers', () => {
    const policy = registerLogSanitizationPolicy({
      id: 'test.persisted-metadata.v1',
      metadataPaths: [['objects', '*']],
    });
    const middleware = new PiiLoggerMiddlewares();
    const persistedParams = JSON.parse(
      middleware.handleParams([
        logParamsWithSanitizationPolicy(policy.id, [
          {
            objects: {
              Contact: [{ displayName: 'Full Name' }],
            },
          },
        ]),
      ]),
    );

    persistedParams[0].objects.Contact[0].secret = 'injected-secret';

    expect(sanitizeSerializedLogParams(persistedParams)).toEqual([
      {
        objects: {
          Contact: [
            {
              displayName: 'Full Name',
              secret: SECRET_MARKER_V2,
            },
          ],
        },
      },
    ]);

    const spoofedParams = JSON.parse(
      middleware.handleParams([
        {
          objects: {
            Contact: [{ displayName: 'Alice Smith' }],
          },
        },
        {
          [SERIALIZED_LOG_SANITIZATION_POLICY_KEY]: {
            id: policy.id,
            version: 1,
          },
        },
      ]),
    );

    expect(sanitizeSerializedLogParams(spoofedParams)).toBeUndefined();
    expect(spoofedParams[1][SERIALIZED_LOG_SANITIZATION_POLICY_KEY]).toBe(
      SECRET_MARKER_V2,
    );
  });

  it('filters address and E911 state and country fields by path', () => {
    const sanitized = sanitizeLogData({
      emergencyAddress: {
        street: '20 Main St',
        city: 'Belmont',
        state: 'CA',
        country: 'US',
        zip: '94002',
        uri: '/restapi/v1.0/account/123/extension/456/emergency-address',
      },
      address: {
        id: 'address-123',
        street: '20 Main St',
        city: 'Belmont',
        state: 'CA',
        country: 'US',
        zip: '94002',
        href: 'https://example.com/address?token=secret',
      },
      countryInfo: {
        name: 'United States',
      },
    });

    expect(sanitized.emergencyAddress.state).toBe(RESTRICTED_ADDRESS);
    expect(sanitized.emergencyAddress.country).toBe(RESTRICTED_ADDRESS);
    expect(sanitized.emergencyAddress.uri).toMatch(
      /account\/\[PII:v2;user-id;/,
    );
    expect(sanitized.address.state).toBe(RESTRICTED_ADDRESS);
    expect(sanitized.address.country).toBe(RESTRICTED_ADDRESS);
    expect(sanitized.address.id).toMatch(piiV2('user-id'));
    expect(sanitized.address.href).toContain('example.com/address');
    expect(sanitized.address.href).toContain('token=[Secret:v2]');
    expect(sanitized.countryInfo.name).toBe('United States');
  });

  it('filters flat address text fields only when an address container is present', () => {
    const sanitized = sanitizeLogText(
      [
        'emergencyAddress={street=20 Main St} city=Belmont state=CA country=US zip=94002 extensionNumber=101 uri=/restapi/v1.0/account/123/extension/456/emergency-address',
        'address.id=address-123',
        'rtc state=registered country=US message=ready',
      ].join('\n'),
    );
    const [addressLine, addressIdLine, diagnosticLine] = sanitized.split('\n');

    expect(addressLine).toContain('emergencyAddress=[Restricted:v2;address]');
    expect(addressLine).toContain('city=[Restricted:v2;address]');
    expect(addressLine).toContain('state=[Restricted:v2;address]');
    expect(addressLine).toContain('country=[Restricted:v2;address]');
    expect(addressLine).toContain('zip=[Restricted:v2;address]');
    expect(addressLine).toContain('extensionNumber=[Restricted:v2;address]');
    expect(addressLine).toContain('uri=[Restricted:v2;address]');
    expect(addressLine).not.toContain('Belmont');
    expect(addressLine).not.toContain('CA');
    expect(addressLine).not.toContain('US');
    expect(addressLine).not.toContain('94002');
    expect(addressIdLine).toMatch(/address\.id=\[PII:v2;user-id;/);
    expect(addressIdLine).not.toContain('address-123');
    expect(diagnosticLine).toContain('state=registered');
    expect(diagnosticLine).toContain('country=US');
    expect(diagnosticLine).toContain('message=ready');

    const jsonText = sanitizeLogText(
      '{"emergencyAddress":{"street":"20 Main St","city":"Belmont","state":"CA","country":"US","zip":"94002","uri":"/restapi/v1.0/account/123/extension/456/emergency-address"}}',
    );

    expect(jsonText).toContain('"street":"[Restricted:v2;address]"');
    expect(jsonText).toContain('"city":"[Restricted:v2;address]"');
    expect(jsonText).toContain('"state":"[Restricted:v2;address]"');
    expect(jsonText).toContain('"country":"[Restricted:v2;address]"');
    expect(jsonText).toContain('"zip":"[Restricted:v2;address]"');
    expect(jsonText).toContain('"uri":"[Restricted:v2;address]"');
    expect(jsonText).not.toContain('20 Main St');
    expect(jsonText).not.toContain('Belmont');
    expect(jsonText).not.toContain('CA');
    expect(jsonText).not.toContain('US');
    expect(jsonText).not.toContain('94002');

    const prettyJsonText = sanitizeLogText(
      [
        '{',
        '  "emergencyAddress": {',
        '    "street": "20 Main St",',
        '    "city": "Belmont",',
        '    "state": "CA",',
        '    "country": "US",',
        '    "zip": "94002",',
        '    "uri": "/restapi/v1.0/account/123/extension/456/emergency-address"',
        '  }',
        '}',
      ].join('\n'),
    );

    expect(prettyJsonText).toContain('"state": "[Restricted:v2;address]"');
    expect(prettyJsonText).toContain('"country": "[Restricted:v2;address]"');
    expect(prettyJsonText).toContain('"uri": "[Restricted:v2;address]"');
    expect(prettyJsonText).not.toContain('CA');
    expect(prettyJsonText).not.toContain('US');
    expect(prettyJsonText).not.toContain('/restapi/v1.0/account/123');

    const multilineText = sanitizeLogText(
      [
        'emergencyAddress={',
        '  street=20 Main St',
        '  city=Belmont',
        '  state=CA',
        '  country=US',
        '  zip=94002',
        '  uri=/restapi/v1.0/account/123/extension/456/emergency-address',
        '}',
      ].join('\n'),
    );

    expect(multilineText).toContain('state=[Restricted:v2;address]');
    expect(multilineText).toContain('country=[Restricted:v2;address]');
    expect(multilineText).toContain('uri=[Restricted:v2;address]');
    expect(multilineText).not.toContain('Belmont');
    expect(multilineText).not.toContain('CA');
    expect(multilineText).not.toContain('US');
    expect(multilineText).not.toContain('/restapi/v1.0/account/123');
  });

  it('keeps analytics event labels and non-PII tracking labels readable', () => {
    const middleware = new PiiLoggerMiddlewares();
    const payload = JSON.parse(
      middleware.handleParams([
        'track event',
        'Call: Place RingOut call/Click to Dial',
        {
          Location: 'Dialer',
          location: 'SMS compose',
          message: 'User without RC Admin Permission tries to login',
          email: 'alice@example.com',
          payload: {
            message: 'customer alice@example.com called +16505550123',
          },
        },
        1747450901523,
      ]),
    );

    expect(payload[1]).toBe('Call: Place RingOut call/Click to Dial');
    expect(payload[2].Location).toBe('Dialer');
    expect(payload[2].location).toBe('SMS compose');
    expect(payload[2].message).toBe(
      'User without RC Admin Permission tries to login',
    );
    expect(payload[2].email).not.toContain('alice@example.com');
    expect(payload[2].payload.message).toContain('customer');
    expect(payload[2].payload.message).not.toContain('alice@example.com');
    expect(payload[2].payload.message).not.toContain('+16505550123');
  });

  it('still masks PII inside analytics labels that are kept readable', () => {
    const middleware = new PiiLoggerMiddlewares();
    const payload = JSON.parse(
      middleware.handleParams([
        'track event',
        'Call: john@example.com +16505550123',
        {
          location: 'customer john@example.com',
          message: 'call +16505550123',
        },
      ]),
    );

    expect(payload[1]).not.toContain('john@example.com');
    expect(payload[1]).not.toContain('+16505550123');
    expect(payload[2].location).not.toContain('john@example.com');
    expect(payload[2].message).not.toContain('+16505550123');
  });

  it('sanitizes repeated top-level log param references independently', () => {
    const sharedParam = {
      password: 'open-sesame',
      message: 'ready',
    };
    const payload = sanitizeLogParams([sharedParam, sharedParam]) as Array<{
      password: string;
      message: string;
    }>;

    expect(payload).toEqual([
      {
        password: SECRET_MARKER_V2,
        message: 'ready',
      },
      {
        password: SECRET_MARKER_V2,
        message: 'ready',
      },
    ]);
  });

  it('keeps circular protection within one log param', () => {
    const circularParam: {
      password: string;
      self?: unknown;
    } = {
      password: 'open-sesame',
    };

    circularParam.self = circularParam;

    const [payload] = sanitizeLogParams([circularParam]) as Array<{
      password: string;
      self: string;
    }>;

    expect(payload.password).toBe(SECRET_MARKER_V2);
    expect(payload.self).toBe(CIRCULAR_VALUE);
  });

  it('preserves structured shape and redacts only PII leaves', () => {
    const sanitized = sanitizeLogData({
      requestBody: {
        contact: {
          id: '123456789',
          phone: '+16505551234',
        },
        retry: 2,
        mode: 'manual',
      },
      records: [{ status: 'ok', id: 'rec-123' }],
    }) as {
      requestBody: {
        contact: { id: string; phone: string };
        retry: number;
        mode: string;
      };
      records: Array<{ status: string; id: string }>;
    };

    expect(sanitized.requestBody.retry).toBe(2);
    expect(sanitized.requestBody.mode).toBe('manual');
    expect(sanitized.requestBody.contact.id).toMatch(piiV2('user-id'));
    expect(sanitized.requestBody.contact.phone).toMatch(piiV2('phone'));
    expect(Array.isArray(sanitized.records)).toBe(true);
    expect(sanitized.records).toHaveLength(1);
    expect(sanitized.records[0].status).toBe('ok');
    expect(sanitized.records[0].id).toMatch(piiV2('user-id'));
  });

  it('sanitizes serialized request bodies by format', () => {
    const json = sanitizeLogData({
      requestBody: JSON.stringify({
        phoneNumber: '+16505551234',
        retry: 2,
        mode: 'manual',
      }),
    }) as { requestBody: string };
    const jsonBody = JSON.parse(json.requestBody);

    expect(jsonBody.phoneNumber).toMatch(piiV2('phone'));
    expect(jsonBody.retry).toBe(2);
    expect(jsonBody.mode).toBe('manual');

    const form = sanitizeLogData({
      requestBody:
        'phoneNumber=%2B16505551234&email=alice%40example.com&alice%40example.com=ok&retry=2',
    }) as { requestBody: string };
    const formBody = new URLSearchParams(form.requestBody);

    expect(formBody.get('phoneNumber')).toMatch(piiV2('phone'));
    expect(formBody.get('email')).toMatch(piiV2('email'));
    const sanitizedEmailKey = Array.from(formBody.keys()).find(
      (key) => key !== 'email' && piiV2('email').test(key),
    );
    expect(sanitizedEmailKey).toMatch(piiV2('email'));
    expect(formBody.get(sanitizedEmailKey!)).toBe('ok');
    expect(form.requestBody).not.toContain('alice%40example.com=ok');
    expect(formBody.get('retry')).toBe('2');

    const multipart = sanitizeLogData({
      requestBody: [
        '--boundary',
        'Content-Disposition: form-data; name="request"',
        'Content-Type: application/json',
        '',
        '{"phoneNumber":"+16505551234","retry":2}',
        '--boundary',
        'Content-Disposition: form-data; name="attachment"; filename="call.txt"',
        'Content-Type: application/octet-stream',
        'Content-Transfer-Encoding: base64',
        '',
        'KzE2NTA1NTUxMjM0',
        '--boundary--',
      ].join('\r\n'),
    }) as { requestBody: string };

    expect(multipart.requestBody).toContain('"phoneNumber":"[PII:v2;phone;');
    expect(multipart.requestBody).toContain('"retry":2');
    expect(multipart.requestBody).not.toContain('KzE2NTA1NTUxMjM0');
    expect(multipart.requestBody).toContain(BINARY_MARKER_V2);
    expect(multipart.requestBody).toContain('--boundary');

    const plain = sanitizeLogData({
      requestBody: 'attempted API call with +16505551234',
    }) as { requestBody: string };

    expect(plain.requestBody).not.toContain('+16505551234');

    const response = sanitizeLogData({
      responseBody: JSON.stringify({ phoneNumber: '+16505551234', retry: 2 }),
    }) as { responseBody: string };
    expect(response.responseBody).toContain('"retry":2');
    expect(response.responseBody).toMatch(/"phoneNumber":"\[PII:v2;phone;/);

    const binaryResponse = sanitizeLogData({
      responseBody: new Uint8Array([0, 1, 2]),
    }) as { responseBody: string };
    expect(binaryResponse.responseBody).toBe(BINARY_MARKER_V2);

    const largeResponse = sanitizeLogData({
      responseBody: 'x'.repeat(1024 * 1024 + 1),
    }) as { responseBody: string };
    expect(largeResponse.responseBody).toBe(BINARY_MARKER_V2);
  });

  it('sanitizes multipart headers and applies field and inherited secret policies', () => {
    const multipart = sanitizeLogData({
      requestBody: [
        '--boundary',
        'Authorization: Basic dXNlcjpwYXNzd29yZA==',
        'Cookie: session=secret',
        'X-API-Key: shortsecret',
        'Content-ID: alice@example.com',
        'Content-Disposition: form-data; name=password',
        '',
        'open-sesame',
        '--boundary',
        'Content-Disposition: form-data; name="password"',
        'Content-Type: application/json',
        '',
        '{"value":"open-sesame"}',
        '--boundary',
        "Content-Disposition: form-data; name=attachment; filename*=UTF-8''alice%40example.com",
        'Content-Type: application/octet-stream',
        '',
        'opaque-file-content',
        '--boundary--',
      ].join('\r\n'),
    }) as { requestBody: string };

    expect(multipart.requestBody).not.toContain('dXNlcjpwYXNzd29yZA==');
    expect(multipart.requestBody).not.toContain('session=secret');
    expect(multipart.requestBody).not.toContain('shortsecret');
    expect(multipart.requestBody).not.toContain('alice@example.com');
    expect(multipart.requestBody).not.toContain('alice%40example.com');
    expect(multipart.requestBody).not.toContain('open-sesame');
    expect(multipart.requestBody).toContain(SECRET_MARKER_V2);
    expect(multipart.requestBody).toContain(BINARY_MARKER_V2);

    const inheritedSecret = sanitizeLogData({
      password: { requestBody: 'open-sesame' },
    }) as { password: { requestBody: string } };
    expect(inheritedSecret.password.requestBody).toBe(SECRET_MARKER_V2);
  });

  it('keeps multipart JSON within the configured depth', () => {
    const sanitized = sanitizeLogData(
      {
        requestBody: [
          '--boundary',
          'Content-Disposition: form-data; name=request',
          'Content-Type: application/json',
          '',
          '{"safe":"ok"}',
          '--boundary--',
        ].join('\r\n'),
      },
      [],
      { depth: 2 },
    ) as { requestBody: string };

    expect(sanitized.requestBody).toContain('{"safe":"ok"}');
    expect(sanitized.requestBody).not.toContain('[OverDepth]');
  });

  it('rejects oversized multipart bodies before parsing', () => {
    const sanitized = sanitizeLogData({
      requestBody: [
        '--boundary',
        'Content-Disposition: form-data; name=payload',
        '',
        'x'.repeat(1024 * 1024),
        '--boundary--',
      ].join('\r\n'),
    }) as { requestBody: string };

    expect(sanitized.requestBody).toBe(BINARY_MARKER_V2);
  });

  it('retains nesting deeper than the legacy depth of 5', () => {
    let deep: Record<string, unknown> = { leaf: 'diagnostic' };
    for (let level = 0; level < 8; level += 1) {
      deep = { nested: deep };
    }

    let cursor = sanitizeLogData(deep) as Record<string, any>;
    for (let level = 0; level < 8; level += 1) {
      expect(cursor.nested).toBeDefined();
      cursor = cursor.nested;
    }
    expect(cursor.leaf).toBe('diagnostic');
  });

  it('renames PII-bearing object keys while keeping their values', () => {
    const sanitized = sanitizeLogData({
      contactsByEmail: {
        'alice@example.com': { status: 'matched' },
      },
    }) as { contactsByEmail: Record<string, { status: string }> };

    const keys = Object.keys(sanitized.contactsByEmail);
    expect(keys).toHaveLength(1);
    expect(keys[0]).toMatch(piiV2('email'));
    expect(keys[0]).not.toContain('alice@example.com');
    expect(sanitized.contactsByEmail[keys[0]]).toEqual({ status: 'matched' });
  });

  it('keeps own output keys distinct from object prototype keys', () => {
    const sanitized = sanitizeLogData(
      JSON.parse(
        '{"constructor":"constructor-value","toString":"toString-value","__proto__":{"status":"ok"}}',
      ),
    ) as Record<string, unknown>;

    expect(sanitized.constructor).toBe('constructor-value');
    expect(sanitized.toString).toBe('toString-value');
    expect(Object.prototype.hasOwnProperty.call(sanitized, '__proto__')).toBe(
      true,
    );
    expect(sanitized.__proto__).toEqual({ status: 'ok' });
  });

  it('replaces a throwing field with a marker without dropping siblings', () => {
    const source: Record<string, unknown> = { safe: 'ok' };
    Object.defineProperty(source, 'boom', {
      enumerable: true,
      get() {
        throw new Error('inaccessible');
      },
    });

    const sanitized = sanitizeLogData(source) as {
      safe: string;
      boom: string;
    };

    expect(sanitized.safe).toBe('ok');
    expect(sanitized.boom).toBe('[Unavailable:v2]');
  });

  it('normalizes BigInt, Map, and Set without breaking serialization', () => {
    const sanitized = sanitizeLogData({
      big: BigInt('9007199254740993'),
      settings: new Map<string, unknown>([['mode', 'manual']]),
      flags: new Set(['a', 'b']),
    }) as unknown as { big: string; settings: unknown; flags: unknown };

    expect(() => JSON.stringify(sanitized)).not.toThrow();
    expect(sanitized.big).toBe('9007199254740993');
    expect(sanitized.settings).toEqual([['mode', 'manual']]);
    expect(sanitized.flags).toEqual(['a', 'b']);
  });

  it('keeps URL path ID markers stable across re-sanitize', () => {
    const policy = registerLogSanitizationPolicy({
      id: 'test.url-path-idempotent.v1',
      metadataPaths: [
        ['success', '_objectTypeIconsMap'],
        ['success', '_reportUrl'],
      ],
    });
    const source = {
      error: null,
      success: {
        _objectTypeIconsMap: {
          Contact: {
            icon: 'https://icon-user:icon-password@example.com/contacts/123456789?token=raw-icon-token',
          },
        },
        _reportUrl:
          'https://report-user:report-password@example.com/reports/987654321?sessionId=raw-report-session',
      },
    };

    const middleware = new PiiLoggerMiddlewares();
    const persisted = JSON.parse(
      middleware.handleParams([
        logParamsWithSanitizationPolicy(policy.id, [
          'Interaction.vfRequest.response',
          'req-1',
          'getConfigInfos',
          source,
          0,
        ]),
      ]),
    );
    const replayed = sanitizeSerializedLogParams(persisted) as [
      string,
      string,
      string,
      typeof source,
      number,
    ];

    const firstIcon = persisted[3].success._objectTypeIconsMap.Contact.icon;
    const firstReport = persisted[3].success._reportUrl;
    const secondIcon = replayed[3].success._objectTypeIconsMap.Contact.icon;
    const secondReport = replayed[3].success._reportUrl;

    expect(firstIcon).toMatch(
      /^https:\/\/\[Secret:v2\]@example\.com\/contacts\/\[PII:v2;user-id;123\*\*\*789;[A-Z2-7]{13}\]\?token=\[Secret:v2\]$/,
    );
    expect(firstIcon).not.toContain('%5B');
    expect(firstReport).toMatch(
      /^https:\/\/\[Secret:v2\]@example\.com\/reports\/\[PII:v2;user-id;987\*\*\*321;[A-Z2-7]{13}\]\?sessionId=\[PII:v2;user-id;[^\]]+\]$/,
    );
    expect(secondIcon).toBe(firstIcon);
    expect(secondReport).toBe(firstReport);
  });

  it('serializes sanitized logger params', () => {
    const middleware = new PiiLoggerMiddlewares();
    const payload = JSON.parse(
      middleware.handleParams([
        'request /callback?code=abc',
        {
          password: 'open-sesame',
          Authorization: 'Bearer token-value',
        },
      ]),
    );

    expect(payload[0]).toContain('code=[Secret:v2]');
    expect(payload[1].password).toBe(SECRET_MARKER_V2);
    expect(payload[1].Authorization).not.toContain('token-value');
  });

  it('applies text field policy before generic PII detection', () => {
    const sanitized = sanitizeLogText(
      'password=alice@example.com accountId=1234567890',
    );

    expect(sanitized).toContain('password=[Secret:v2]');
    expect(sanitized).toMatch(/accountId=\[PII:v2;user-id;/);
    expect(sanitized).not.toContain('alice@example.com');
    expect(sanitized).not.toMatch(/accountId=\[PII:v2;phone;/);
  });

  it('keeps bearer markers stable across repeated sanitization', () => {
    const firstPass = sanitizeLogText('Authorization: Bearer token-value');

    expect(sanitizeLogText(firstPass)).toBe(firstPass);
  });

  it('keeps plausible epoch millis out of free-text phone matching', () => {
    const expireTime = Date.UTC(2026, 7, 17, 12);
    const body = JSON.stringify({
      expireTime,
      phone: '+16505551234',
    });

    const sanitized = sanitizeLogText(body);
    const parsed = JSON.parse(sanitized) as {
      expireTime: number;
      phone: string;
    };

    expect(parsed.expireTime).toBe(expireTime);
    expect(parsed.phone).toMatch(piiV2('phone'));
    expect(sanitized).not.toContain('+16505551234');
  });

  it('keeps Luhn-valid epoch millis parseable in JSON', () => {
    const sanitized = sanitizeLogText('{"expiresAt":1767225600009}');

    expect(JSON.parse(sanitized)).toEqual({
      expiresAt: 1767225600009,
    });
  });

  it('quotes markers that replace bare JSON numbers in free text', () => {
    const body = '{"accountId":871817004,"extensionId":871817005}';
    const sanitized = sanitizeLogText(body);
    const parsed = JSON.parse(sanitized) as {
      accountId: string;
      extensionId: string;
    };

    expect(parsed.accountId).toMatch(piiV2('user-id'));
    expect(parsed.extensionId).toMatch(piiV2('user-id'));
    expect(sanitized).not.toContain('871817004');
    expect(sanitized).not.toContain('871817005');
  });

  it('redacts number-typed account and extension ids in structured data', () => {
    const sanitized = sanitizeLogData({
      accountId: 871817004,
      extensionId: 871817005,
      expireTime: Date.UTC(2026, 7, 17, 12),
      count: 42,
    }) as {
      accountId: string;
      extensionId: string;
      expireTime: number;
      count: number;
    };

    expect(sanitized.accountId).toMatch(piiV2('user-id'));
    expect(sanitized.extensionId).toMatch(piiV2('user-id'));
    expect(sanitized.expireTime).toBe(Date.UTC(2026, 7, 17, 12));
    expect(sanitized.count).toBe(42);
  });

  it('propagates sensitive policy into containers', () => {
    const sanitized = sanitizeLogData(
      {
        firstName: ['Alice'],
        customSensitive: { nested: { value: 'Alice' } },
      },
      ['customSensitive'],
    ) as {
      firstName: string[];
      customSensitive: { nested: { value: string } };
    };

    expect(sanitized.firstName[0]).toBe(SECRET_MARKER_V2);
    expect(sanitized.customSensitive.nested.value).toBe(SECRET_MARKER_V2);
  });

  it('still treats out-of-range 13-digit runs outside card policy as non-phone when bare', () => {
    // Bare 13-19 digit runs are reserved for card/Luhn (or left readable).
    // Use a failing-Luhn 16-digit PAN-shaped value — must stay readable.
    const sanitized = sanitizeLogText('callback 4111111111111112 done');

    expect(sanitized).toContain('4111111111111112');
    expect(sanitized).not.toMatch(/\[PII:v2;phone;/);
    expect(sanitized).not.toContain('[Restricted:v2;credit-card]');
  });

  it('redacts hyphenated SSN, Luhn cards, JWT, IPv6, MAC, and URI credentials', () => {
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signaturepart';
    const source = {
      ssn: '123-45-6789',
      socialSecurityNumber: '987654321',
      creditCardNumber: '4111111111111111',
      cardNumber: '4111 1111 1111 1111',
      ipv6: '2001:db8::1',
      ip: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
      macAddress: '00:1A:2B:3C:4D:5E',
      mac: '001A.2B3C.4D5E',
      note: [
        'ssn free 123-45-6789',
        'bare nine 123456789',
        'card 4111111111111111',
        'bad card 4111111111111112',
        `jwt ${jwt}`,
        'v6 2001:db8::1',
        'mac AA:BB:CC:DD:EE:FF',
        'ftp://user:secret@files.example.com/path',
        'intl +442071838750',
      ].join('\n'),
    };

    const sanitized = sanitizeLogData(source) as typeof source;

    expect(sanitized.ssn).toBe('[Restricted:v2;ssn]');
    expect(sanitized.socialSecurityNumber).toBe('[Restricted:v2;ssn]');
    expect(sanitized.creditCardNumber).toBe('[Restricted:v2;credit-card]');
    expect(sanitized.cardNumber).toBe('[Restricted:v2;credit-card]');
    expect(sanitized.ipv6).toMatch(piiV2('ipv6'));
    expect(sanitized.ip).toMatch(piiV2('ipv6'));
    expect(sanitized.macAddress).toMatch(piiV2('mac'));
    expect(sanitized.mac).toMatch(piiV2('mac'));

    expect(sanitized.note).toContain('[Restricted:v2;ssn]');
    expect(sanitized.note).toContain('bare nine 123456789');
    expect(sanitized.note).toContain('[Restricted:v2;credit-card]');
    expect(sanitized.note).toContain('bad card 4111111111111112');
    expect(sanitized.note).toMatch(/\[PII:v2;jwt;/);
    expect(sanitized.note).not.toContain(jwt);
    expect(sanitized.note).toMatch(/\[PII:v2;ipv6;/);
    expect(sanitized.note).not.toContain('2001:db8::1');
    expect(sanitized.note).toMatch(/\[PII:v2;mac;/);
    expect(sanitized.note).not.toContain('AA:BB:CC:DD:EE:FF');
    expect(sanitized.note).toContain(
      `ftp://${SECRET_MARKER_V2}@files.example.com/path`,
    );
    expect(sanitized.note).toMatch(/\[PII:v2;phone;/);
    expect(sanitized.note).not.toContain('+442071838750');
    expect(sanitized.note).not.toContain('123-45-6789');
    expect(sanitized.note).not.toContain('4111111111111111');
  });

  it('keeps Phase 3 free-text SSN detection format-gated', () => {
    const sanitized = sanitizeLogText(
      'id=123456789 phone=+16505551234 ssn=123-45-6789',
    );

    expect(sanitized).toContain('id=123456789');
    expect(sanitized).toMatch(/phone=\[PII:v2;phone;/);
    expect(sanitized).toContain('ssn=[Restricted:v2;ssn]');
    expect(sanitized).not.toContain('123-45-6789');
  });

  it('keeps IPv4 and IPv6 loopback addresses readable', () => {
    const sanitized = sanitizeLogText(
      'local 127.0.0.1 v6 ::1 mapped ::ffff:127.0.0.1 remote 2001:db8::1',
    );

    expect(sanitized).toContain('127.0.0.1');
    expect(sanitized).toContain('::1');
    // IPv4-mapped loopback: dotted quad kept by IPv4 localhost policy; IPv6
    // scanner must not truncate `::ffff:127` out of the mapped form.
    expect(sanitized).toContain('::ffff:127.0.0.1');
    expect(sanitized).toMatch(/\[PII:v2;ipv6;/);
    expect(sanitized).not.toContain('2001:db8::1');
  });

  it('redacts IPv6 addresses before sentence punctuation', () => {
    const sanitized = sanitizeLogText('peer 2001:db8::1.');

    expect(sanitized).toMatch(/peer \[PII:v2;ipv6;/);
    expect(sanitized).toContain('].');
    expect(sanitized).not.toContain('2001:db8::1');
  });

  it('keeps pathological sanitizer inputs bounded', () => {
    const padding = 'a'.repeat(32_000);

    expect(() =>
      sanitizeLogText(`address:${' '.repeat(32_000)}X`),
    ).not.toThrow();
    expect(() => sanitizeLogText(`${padding}@${padding}`)).not.toThrow();
    expect(() => sanitizeLogText(`${'9'.repeat(32_000)}x.`)).not.toThrow();
    expect(() =>
      sanitizeLogData({ url: `https://${padding}#\n` }),
    ).not.toThrow();
    expect(() => sanitizeLogData({ url: `//${padding}#\n` })).not.toThrow();
  });
});
