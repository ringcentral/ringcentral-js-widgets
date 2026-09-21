import { AccountContacts } from '../../src/app/services/AccountContacts';

const createAccountContacts = () => {
  const presence = {
    dndStatus: 'TakeAllCalls',
    presenceStatus: 'Available',
    telephonyStatus: 'NoCall',
    userStatus: 'Available',
    meetingStatus: 'Disconnected',
  };
  const accountContactsViewableManager = {
    link: jest.fn(),
    unlink: jest.fn(),
    presenceMap: {
      102: presence,
    },
    presenceTtl: 1000,
  };
  const accountContacts = new AccountContacts(
    {
      getProfileImageSync: jest.fn(),
    } as never,
    {
      multipart: {
        get: jest.fn(),
      },
    } as never,
    accountContactsViewableManager as never,
    {
      id: 101,
      isMultipleSiteEnabled: false,
    } as never,
    {
      isCDCEnabled: false,
    } as never,
    {
      maxExtensionNumberLength: 6,
    } as never,
    {
      ready: true,
      filteredContacts: [],
      ivrContacts: [],
    } as never,
  );

  return {
    accountContacts,
    accountContactsViewableManager,
    presence,
  };
};

describe('AccountContacts', () => {
  it('links viewable contact and returns cached presence', () => {
    const { accountContacts, accountContactsViewableManager, presence } =
      createAccountContacts();

    expect(
      accountContacts.getPresenceSync({
        id: '102',
        type: 'company',
        account: {
          id: 'account-1',
        },
      } as never),
    ).toBe(presence);
    expect(accountContactsViewableManager.link).toHaveBeenCalledWith({
      accountId: 'account-1',
      extensionId: '102',
    });
  });

  it('unlinks viewable contact presence', () => {
    const { accountContacts, accountContactsViewableManager } =
      createAccountContacts();

    accountContacts.unlinkPresence({
      id: '102',
      type: 'company',
      account: {
        id: 'account-1',
      },
    } as never);

    expect(accountContactsViewableManager.unlink).toHaveBeenCalledWith({
      accountId: 'account-1',
      extensionId: '102',
    });
  });

  it('ignores non-company contacts', () => {
    const { accountContacts, accountContactsViewableManager } =
      createAccountContacts();

    expect(
      accountContacts.getPresenceSync({
        id: '102',
        type: 'personal',
        account: {
          id: 'account-1',
        },
      } as never),
    ).toBeNull();
    expect(accountContactsViewableManager.link).not.toHaveBeenCalled();
  });
});
