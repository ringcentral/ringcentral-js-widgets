import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import {
  createRepeatTrackingManager,
  type RepeatTrackingItems,
} from '@ringcentral-integration/utils';

describe('createRepeatTrackingManager', () => {
  const mockSendToServer = jest.fn().mockResolvedValue(undefined);
  const mockValidate = jest.fn().mockReturnValue(true);

  const defaultOptions = {
    sendToServer: mockSendToServer,
    ttl: 1000,
    groupKey: 'accountId',
    itemKey: 'extensionId',
    validate: mockValidate,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create manager with default options', () => {
    const manager = createRepeatTrackingManager(defaultOptions);
    expect(manager).toBeDefined();
    expect(manager.link).toBeDefined();
    expect(manager.unlink).toBeDefined();
    expect(manager.setListenerDataFromClient).toBeDefined();
    expect(manager.fromClientListener).toBeDefined();
    expect(manager.fromServerListener).toBeDefined();
    expect(manager.clear).toBeDefined();
  });

  it('should handle linking items', async () => {
    const manager = createRepeatTrackingManager(defaultOptions);
    const subscription = manager.fromClientListener().subscribe();

    manager.link({ accountId: 'acc1', extensionId: 'ext1' });
    manager.link({ accountId: 'acc1', extensionId: 'ext2' });

    jest.advanceTimersByTime(1000);

    expect(mockSendToServer).toHaveBeenCalledWith([['acc1', ['ext1', 'ext2']]]);

    subscription.unsubscribe();
  });

  it('should handle unlinking items', async () => {
    const manager = createRepeatTrackingManager(defaultOptions);
    const subscription = manager.fromClientListener().subscribe();

    manager.link({ accountId: 'acc1', extensionId: 'ext1' });
    manager.link({ accountId: 'acc1', extensionId: 'ext2' });

    jest.advanceTimersByTime(1000);

    manager.unlink({ accountId: 'acc1', extensionId: 'ext1' });

    jest.advanceTimersByTime(5000);

    expect(mockSendToServer).toHaveBeenLastCalledWith([['acc1', ['ext2']]]);

    manager.unlink({ accountId: 'acc1', extensionId: 'ext2' });

    jest.advanceTimersByTime(5000);

    expect(mockSendToServer).toHaveBeenLastCalledWith([]);

    subscription.unsubscribe();
  });

  it('should handle client data updates', () => {
    const manager = createRepeatTrackingManager(defaultOptions);
    const clientData = [['acc1', ['ext1', 'ext2']]] as RepeatTrackingItems[];

    manager.setListenerDataFromClient('client1', clientData);

    const mockServerRequest = jest.fn().mockResolvedValue(['ext1', 'ext2']);
    const subscription = manager
      .fromServerListener(mockServerRequest)
      .subscribe();

    expect(mockServerRequest).toHaveBeenCalledWith([
      ['acc1', ['ext1', 'ext2']],
    ]);

    subscription.unsubscribe();
  });

  it('should respect maxBatchRequestCount', () => {
    const manager = createRepeatTrackingManager({
      ...defaultOptions,
      maxBatchRequestCount: 2,
    });

    const clientData = [
      ['acc1', ['ext1', 'ext2', 'ext3']],
    ] as RepeatTrackingItems[];
    manager.setListenerDataFromClient('client1', clientData);

    const mockServerRequest = jest.fn().mockResolvedValue(['ext1', 'ext2']);
    const subscription = manager
      .fromServerListener(mockServerRequest)
      .subscribe();

    expect(mockServerRequest).toHaveBeenCalledWith([
      ['acc1', ['ext1', 'ext2']],
      ['acc1', ['ext3']],
    ]);

    subscription.unsubscribe();
  });

  it('should clear all tracking data', () => {
    const manager = createRepeatTrackingManager(defaultOptions);
    const clientData = [['acc1', ['ext1', 'ext2']]] as RepeatTrackingItems[];

    manager.setListenerDataFromClient('client1', clientData);
    manager.clear();

    const mockServerRequest = jest.fn().mockResolvedValue([]);
    const subscription = manager
      .fromServerListener(mockServerRequest)
      .subscribe();

    expect(mockServerRequest).not.toHaveBeenCalled();

    subscription.unsubscribe();
  });

  it('should respect TTL for cache', async () => {
    const manager = createRepeatTrackingManager({
      ...defaultOptions,
      ttl: 2000,
    });

    const clientData = [['acc1', ['ext1']]] as RepeatTrackingItems[];
    manager.setListenerDataFromClient('client1', clientData);

    const mockServerRequest = jest.fn().mockResolvedValue(['ext1']);
    const subscription = manager
      .fromServerListener(mockServerRequest)
      .subscribe();

    // First call
    expect(mockServerRequest).toHaveBeenCalledTimes(1);

    await waitForRenderReady();
    // Should not call before TTL
    jest.advanceTimersByTime(1000);
    expect(mockServerRequest).toHaveBeenCalledTimes(1);

    // Should call after TTL
    jest.advanceTimersByTime(1000);
    expect(mockServerRequest).toHaveBeenCalledTimes(2);

    subscription.unsubscribe();
  });
});
