import { PlatformMock } from '@ringcentral-integration/mock';

const platformMock = new PlatformMock();
platformMock.post('/restapi/v1.0/number-parser/parse');
fetch('http://example.com/restapi/v1.0/number-parser/parse', {
  body: JSON.stringify({ originalStrings: ['(165) 1223-4567'] }),
  method: 'POST',
});
expect(platformMock.fetchMock).toHaveFetchedTimes(
  1,
  'http://example.com/restapi/v1.0/number-parser/parse',
);
