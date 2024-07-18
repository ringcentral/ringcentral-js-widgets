import { RcMock, PubnubMock } from '@ringcentral-integration/mock';

const rcMock = new RcMock({ subscription: new PubnubMock() });
rcMock.init();
fetch('http://example.com/restapi/v1.0/account/~/extension/~/caller-id');
expect(rcMock.fetchMock).toHaveFetchedTimes(
  1,
  'http://example.com/restapi/v1.0/account/~/extension/~/caller-id',
);
