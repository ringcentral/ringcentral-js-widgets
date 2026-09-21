import {
  AccountInfo,
  Analytics,
  AppFeatures,
  Client,
  ExtensionInfo,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Brand,
  Locale,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  Initiator,
  SharedAppOptions,
  StoragePlugin,
  testBed,
} from '@ringcentral-integration/next-core';

import {
  meetingOperationErrorReason,
  meetingOperationMessageKey,
  meetingOperationMessageSource,
} from '../Meeting';
import { VideoConfiguration } from '../VideoConfiguration';

import { RcVideo } from './RcVideo';
import { videoStatus } from './videoStatus';

const createRcVideo = ({
  client = {},
  rcVideoOptions = {},
}: {
  client?: Record<string, unknown>;
  rcVideoOptions?: { enablePersonalMeeting?: boolean };
} = {}) => {
  const toast = {
    danger: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
  };
  const rcVideo = testBed({
    main: RcVideo,
    modules: [
      { provide: Toast, useValue: toast },
      { provide: Client, useValue: client },
      {
        provide: Brand,
        useValue: { appName: 'RingCentral', id: '1210', name: 'RingCentral' },
      },
      { provide: StoragePlugin, useValue: { enable: jest.fn() } },
      { provide: AccountInfo, useValue: { id: 1001 } },
      {
        provide: ExtensionInfo,
        useValue: { info: { id: 101, name: 'Test User' } },
      },
      { provide: VideoConfiguration, useValue: { isRCV: true } },
      { provide: Locale, useValue: { currentLocale: 'en-US' } },
      { provide: AppFeatures, useValue: { hasRoomConnectorBeta: false } },
      {
        provide: Analytics,
        useValue: {
          getTrackTarget: jest.fn(),
          track: jest.fn(),
        },
      },
      {
        provide: 'RcVideoOptions',
        useValue: rcVideoOptions,
      },
      {
        provide: SharedAppOptions,
        useValue: {
          name: 'rcvideo-operation-result-test',
          type: 'Base',
        },
      },
      {
        provide: Initiator,
        useValue: { beforeInitialize: jest.fn() },
      },
    ],
  }).instance;

  jest
    .spyOn(rcVideo, 'patchBridges')
    .mockRejectedValue(new Error('bridge update failed'));
  jest
    .spyOn(
      rcVideo as unknown as {
        _getDialinNumbers: () => Promise<unknown[]>;
      },
      '_getDialinNumbers',
    )
    .mockResolvedValue([]);
  jest.spyOn(rcVideo, 'getExtensionInfo').mockResolvedValue({
    name: 'Test User',
  });
  jest.spyOn(rcVideo.logger, 'error').mockImplementation();
  jest.spyOn(rcVideo.logger, 'log').mockImplementation();

  return { rcVideo, toast };
};

describe('RcVideo caller-owned operation errors', () => {
  it('treats a missing personal meeting as no PMI without opening a Toast', async () => {
    const get = jest.fn().mockRejectedValue({
      response: {
        status: 400,
      },
    });
    const { rcVideo, toast } = createRcVideo({
      client: {
        service: {
          platform: () => ({ get }),
        },
      },
      rcVideoOptions: {
        enablePersonalMeeting: true,
      },
    });

    await rcVideo.savePersonalMeeting({ shortId: 'stale-pmi-short-id' });

    await expect(rcVideo._initPersonalMeeting()).resolves.toBeUndefined();

    expect(get).toHaveBeenCalledWith('/rcvideo/v1/bridges', {
      accountId: 1001,
      default: true,
      extensionId: 101,
    });
    expect(rcVideo.personalMeeting).toEqual({});
    expect(toast.danger).not.toHaveBeenCalled();
    expect(toast.warning).not.toHaveBeenCalled();
  });

  it('returns create failures without opening a Toast in result mode', async () => {
    const { rcVideo, toast } = createRcVideo();
    jest
      .spyOn(
        rcVideo as unknown as {
          _postBridges: (...args: unknown[]) => Promise<unknown>;
        },
        '_postBridges',
      )
      .mockRejectedValue(new Error('bridge creation failed'));

    const result = await rcVideo.createMeeting(
      { usePersonalMeetingId: false } as never,
      { errorHandling: 'result' },
    );

    expect(result).toMatchObject({
      kind: 'meeting-operation-error',
      notifications: [
        {
          level: 'danger',
          messageKey: meetingOperationMessageKey.internalError,
          messageSource: meetingOperationMessageSource.rcVideo,
        },
        {
          level: 'danger',
          messageKey: meetingOperationMessageKey.offline,
          messageSource: meetingOperationMessageSource.connectivity,
        },
      ],
      reason: meetingOperationErrorReason.internal,
    });
    expect(toast.danger).not.toHaveBeenCalled();
  });

  it('returns lookup failures instead of rejecting in result mode', async () => {
    const { rcVideo, toast } = createRcVideo();

    const result = await rcVideo.getMeeting(
      'meeting-short-id',
      undefined,
      undefined,
      { errorHandling: 'result' },
    );

    expect(result).toMatchObject({
      kind: 'meeting-operation-error',
      reason: meetingOperationErrorReason.internal,
    });
    expect(toast.danger).not.toHaveBeenCalled();
  });

  it('rethrows lookup failures outside result mode', async () => {
    const error = new Error('lookup failed');
    const get = jest.fn().mockRejectedValue(error);
    const { rcVideo } = createRcVideo({
      client: {
        service: {
          platform: () => ({ get }),
        },
      },
    });

    await expect(rcVideo.getMeeting('meeting-short-id')).rejects.toBe(error);
  });

  it('uses the operation locale for a PMI title and invitation', async () => {
    const { rcVideo } = createRcVideo();
    jest.spyOn(rcVideo, 'patchBridges').mockResolvedValue({
      id: 'meeting-id',
      joinUri: 'https://v.ringcentral.com/join/123456789',
      shortId: '123456789',
      usePersonalMeetingId: false,
    } as never);
    const getMeetingInvitation = jest
      .spyOn(rcVideo, 'getMeetingInvitation')
      .mockResolvedValue('localized invitation');

    const result = await rcVideo.updateMeeting(
      'meeting-id',
      {
        id: 'meeting-id',
        name: 'Outlook event title',
        usePersonalMeetingId: true,
      },
      {
        invitationLocale: 'de-DE',
        locale: 'fr-FR',
      },
    );

    expect(rcVideo.patchBridges).toHaveBeenCalledWith(
      'meeting-id',
      expect.objectContaining({
        name: 'Visioconférence de Test User',
      }),
      true,
    );
    expect(getMeetingInvitation).toHaveBeenCalledWith(
      expect.objectContaining({
        currentLocale: 'fr-FR',
      }),
    );
    expect(result).toMatchObject({
      invitationInfo: 'localized invitation',
    });
  });

  it('keeps legacy invitation and service locale fallbacks', async () => {
    const { rcVideo } = createRcVideo();
    jest.spyOn(rcVideo, 'patchBridges').mockResolvedValue({
      id: 'meeting-id',
      joinUri: 'https://v.ringcentral.com/join/123456789',
      shortId: '123456789',
      usePersonalMeetingId: false,
    } as never);
    const getMeetingInvitation = jest
      .spyOn(rcVideo, 'getMeetingInvitation')
      .mockResolvedValue('localized invitation');
    const meeting = {
      id: 'meeting-id',
      usePersonalMeetingId: false,
    };

    await rcVideo.updateMeeting('meeting-id', meeting, {
      invitationLocale: 'zh-CN',
    });
    await rcVideo.updateMeeting('meeting-id', meeting);

    expect(getMeetingInvitation).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ currentLocale: 'zh-CN' }),
    );
    expect(getMeetingInvitation).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ currentLocale: 'en-US' }),
    );
  });

  it('returns update failures without opening a Toast in result mode', async () => {
    const { rcVideo, toast } = createRcVideo();

    const result = await rcVideo.updateMeeting(
      'meeting-id',
      {
        id: 'meeting-id',
        usePersonalMeetingId: false,
      },
      { errorHandling: 'result' },
    );

    expect(result).toMatchObject({
      kind: 'meeting-operation-error',
      reason: meetingOperationErrorReason.internal,
    });
    expect(toast.danger).not.toHaveBeenCalled();
  });

  it('reuses an in-flight create meeting promise', async () => {
    const { rcVideo } = createRcVideo();
    const inFlight = Promise.resolve({ id: 'meeting-id' });

    (
      rcVideo as unknown as {
        _createMeetingPromise: Promise<unknown> | null;
        videoStatus: string;
      }
    )._createMeetingPromise = inFlight;
    (
      rcVideo as unknown as {
        _createMeetingPromise: Promise<unknown> | null;
        videoStatus: string;
      }
    ).videoStatus = videoStatus.creating;

    await expect(
      rcVideo.createMeeting({ usePersonalMeetingId: false } as never),
    ).resolves.toEqual({ id: 'meeting-id' });
  });

  it('handles availability failures after an unreadable response body', async () => {
    const { rcVideo, toast } = createRcVideo();
    const checkIfHAError = jest.fn().mockResolvedValue(true);

    (
      rcVideo as unknown as {
        _availabilityMonitor?: { checkIfHAError: (errors: unknown) => Promise<boolean> };
      }
    )._availabilityMonitor = { checkIfHAError };

    await (
      rcVideo as unknown as {
        _errorHandle: (errors: unknown) => Promise<void>;
      }
    )._errorHandle({
      response: {
        clone: () => ({
          json: jest.fn().mockRejectedValue(new Error('invalid json')),
        }),
      },
    });

    expect(checkIfHAError).toHaveBeenCalled();
    expect(toast.danger).not.toHaveBeenCalled();
    expect(rcVideo.logger.log).toHaveBeenCalledWith(
      'failed to read RCV error response:',
      expect.any(Error),
    );
  });

  it('keeps default update failure Toast behavior', async () => {
    const { rcVideo, toast } = createRcVideo();

    await expect(
      rcVideo.updateMeeting('meeting-id', {
        id: 'meeting-id',
        usePersonalMeetingId: false,
      }),
    ).resolves.toBeNull();

    expect(toast.danger).toHaveBeenCalledWith({
      message: 'Sorry, something went wrong on our end. Try again.',
    });
    expect(toast.danger).toHaveBeenCalledTimes(1);
  });
});
