import { SyncTabView } from '../../src/app/views/SyncTabView/SyncTab.view';

const createSyncTabView = () => {
  const router = {
    currentPath: '/messages',
    router: {
      location: {
        state: {
          existingTab: 'existing',
        },
      },
    },
    push: jest.fn(),
  };
  const syncTabView = Object.assign(Object.create(SyncTabView.prototype), {
    _router: router,
    setTabInfo: jest.fn(),
  }) as SyncTabView;

  return {
    syncTabView,
    router,
  };
};

describe('SyncTabView', () => {
  it('sets active tab on the current router path by default', () => {
    const { syncTabView, router } = createSyncTabView();

    syncTabView.setActive('conversationTabs', 'personal');

    expect(router.push).toHaveBeenCalledWith('/messages', {
      existingTab: 'existing',
      conversationTabs: 'personal',
    });
  });

  it('sets active tab on an explicit path when provided', () => {
    const { syncTabView, router } = createSyncTabView();

    syncTabView.setActive('conversationTabs', 'shared', {
      currentPath: '/conversations/thread-1',
    });

    expect(router.push).toHaveBeenCalledWith('/conversations/thread-1', {
      existingTab: 'existing',
      conversationTabs: 'shared',
    });
  });
});
