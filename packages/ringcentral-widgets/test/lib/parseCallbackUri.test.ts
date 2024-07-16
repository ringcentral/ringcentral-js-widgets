import parseCallbackUri from '../../lib/parseCallbackUri';

test('parseCallbackUri should correctly parse callback URI', () => {
  const callbackUri =
    'https://example.com/callback?param1=value1&param2=value2#token=abc123';

  const result = parseCallbackUri(callbackUri);

  expect(result).toEqual({
    param1: 'value1',
    param2: 'value2',
    token: 'abc123',
  });
});

test('parseCallbackUri should throw an error if "error" parameter exists', () => {
  const callbackUri =
    'https://example.com/callback?error=invalid_request&error_description=Invalid%20request';

  expect(() => {
    parseCallbackUri(callbackUri);
  }).toThrow('invalid_request');

  try {
    parseCallbackUri(callbackUri);
  } catch (error) {
    expect(error.error_description).toBe('Invalid request');
  }
});
