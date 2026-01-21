import {
  CompanyContacts,
  ContactMatcher,
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';

import { ProxyExecutor } from './';

describe('ProxyExecutor', () => {
  let proxyExecutor: ProxyExecutor;
  const mockPortManager = jest.fn();
  const mockCompanyContacts = jest.fn();
  const mockCoworker = {
    isMain: true,
    isCoworker: true,
    addProxyModules: jest.fn(),
    addIgnoreSyncStateKeys: jest.fn(),
    transport: {
      emit: jest.fn(),
      listen: jest.fn().mockImplementation((event, callback) => {
        callback();
      }),
    },
  };
  const mockContactMatcher = {
    ready: true,
    asyncGetQueries: jest.fn(),
    triggerMatch: jest.fn(),
    _getQueries: jest.fn(),
  };
  const mockContactSearch = jest.fn();
  const mockStorage = jest.fn();
  jest.mock('@ringcentral-integration/micro-contacts/src/app/services', () => ({
    ...jest.requireActual(
      '@ringcentral-integration/micro-contacts/src/app/services',
    ),
    CompanyContacts: jest.fn(() => mockCompanyContacts),
  }));
  jest.spyOn(ProxyExecutor.prototype, 'handleContactMatch' as never);

  beforeEach(() => {
    proxyExecutor = new ProxyExecutor(
      mockPortManager,
      mockCoworker,
      mockContactMatcher,
      mockContactSearch,
      mockStorage,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('ProxyExecutor', () => {
    it('Should add proxyModules and addIgnoreSyncStateKeys into Coworkers', () => {
      expect(mockCoworker.addProxyModules).toHaveBeenCalledWith([
        ContactMatcher,
        ContactSearch,
        CompanyContacts,
      ]);
      expect(mockCoworker.addIgnoreSyncStateKeys).toHaveBeenCalledWith([
        'status',
      ]);
      expect(ProxyExecutor.prototype.handleContactMatch).toHaveBeenCalled();
      expect(mockCoworker.transport.listen).toHaveBeenCalledWith(
        'getQueries',
        expect.any(Function),
      );
      expect(mockContactMatcher._getQueries).toHaveBeenCalled();

      mockContactMatcher.asyncGetQueries();
      expect(mockCoworker.transport.emit).toHaveBeenCalledWith('getQueries');
    });
  });
});
