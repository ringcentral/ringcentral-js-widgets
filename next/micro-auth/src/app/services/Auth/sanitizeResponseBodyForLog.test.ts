import { sanitizeResponseBodyForLog } from './sanitizeResponseBodyForLog';

describe('sanitizeResponseBodyForLog', () => {
  const extensionResponseBody = JSON.stringify({
    contact: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    name: 'John Doe701',
    status: 'Enabled',
  });

  it.each([
    'https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~',
    'https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~/',
    'https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~?view=Full',
    'https://platform.ringcentral.com/restapi/v1.0/account/871817004/extension/871817005',
  ])('filters the extension display name for %s', (requestUrl) => {
    const sanitized = sanitizeResponseBodyForLog(
      requestUrl,
      extensionResponseBody,
    );

    expect(JSON.parse(sanitized as string)).toEqual({
      contact: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
      name: '[Secret:v2]',
      status: 'Enabled',
    });
    expect(sanitized).not.toContain('John Doe701');
  });

  it.each([
    'https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~/profile-image',
    'https://platform.ringcentral.com/restapi/v1.0/account/~/extension',
    'https://platform.ringcentral.com/restapi/v1.0/dictionary/timezone/58',
  ])('keeps response bodies from other endpoints unchanged for %s', (url) => {
    const diagnosticResponseBody = JSON.stringify({ name: 'PerfTracker' });

    expect(sanitizeResponseBodyForLog(url, diagnosticResponseBody)).toBe(
      diagnosticResponseBody,
    );
  });

  it('filters an unparseable extension response body', () => {
    expect(
      sanitizeResponseBodyForLog(
        'https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~',
        'John Doe701',
      ),
    ).toBe('[Secret:v2]');
  });
});
