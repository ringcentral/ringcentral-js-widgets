import {
  Analytics,
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

import { VideoConfiguration } from '../VideoConfiguration';

import { Meeting } from './Meeting';
import {
  isMeetingOperationError,
  meetingOperationMessageKey,
  meetingOperationMessageSource,
  meetingOperationErrorReason,
} from './meetingOperationResult';

const createDeletedMeetingError = () => ({
  response: {
    clone: () => ({
      json: jest.fn().mockResolvedValue({
        errorCode: 'CMN-102',
        message: 'Resource for parameter [meetingId] is not found',
      }),
    }),
  },
});

const createInsufficientPermissionsError = () => ({
  response: {
    clone: () => ({
      json: jest.fn().mockResolvedValue({
        errorCode: 'InsufficientPermissions',
        permissionName: 'Meetings',
      }),
    }),
  },
});

const createUnreadableResponseError = () => ({
  response: {
    clone: () => ({
      json: jest.fn().mockRejectedValue(new Error('invalid json')),
    }),
  },
});

const createMeeting = () => {
  const toast = {
    danger: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
  };
  const get = jest.fn();
  const deleteMeeting = jest.fn();
  const client = {
    account: () => ({
      extension: () => ({
        meeting: () => ({ delete: deleteMeeting, get }),
      }),
    }),
  };
  const meeting = testBed({
    main: Meeting,
    modules: [
      {
        provide: Brand,
        useValue: { appName: 'RingCentral' },
      },
      {
        provide: Toast,
        useValue: toast,
      },
      {
        provide: Client,
        useValue: client,
      },
      {
        provide: Analytics,
        useValue: {
          getTrackTarget: jest.fn(),
          track: jest.fn(),
        },
      },
      {
        provide: ExtensionInfo,
        useValue: { info: { id: 101, name: 'Test User' } },
      },
      {
        provide: StoragePlugin,
        useValue: { enable: jest.fn() },
      },
      {
        provide: VideoConfiguration,
        useValue: { isRCM: true },
      },
      {
        provide: Locale,
        useValue: { currentLocale: 'en-US' },
      },
      {
        provide: SharedAppOptions,
        useValue: {
          name: 'meeting-operation-result-test',
          type: 'Base',
        },
      },
      {
        provide: Initiator,
        useValue: {
          beforeInitialize: jest.fn(),
        },
      },
    ],
  }).instance;

  return { deleteMeeting, get, meeting, toast };
};

const mockUpdateMeetingFailure = (
  meeting: Meeting,
  error: unknown = createDeletedMeetingError(),
) =>
  jest
    .spyOn(
      meeting as unknown as {
        _updateMeeting: (...args: unknown[]) => Promise<unknown>;
      },
      '_updateMeeting',
    )
    .mockRejectedValue(error);

const mockScheduleMeetingFailure = (meeting: Meeting) =>
  jest
    .spyOn(
      meeting as unknown as {
        _scheduleDirectly: (...args: unknown[]) => Promise<unknown>;
      },
      '_scheduleDirectly',
    )
    .mockRejectedValue(createDeletedMeetingError());

describe('Meeting caller-owned operation errors', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('forwards the operation locale with legacy and service fallbacks', async () => {
    const { meeting } = createMeeting();
    const meetingSettings = {} as never;
    const scheduleDirectly = jest
      .spyOn(
        meeting as unknown as {
          _scheduleDirectly: (
            settings: unknown,
            invitationLocale?: string,
          ) => Promise<unknown>;
        },
        '_scheduleDirectly',
      )
      .mockResolvedValue({});
    const updateMeeting = jest
      .spyOn(
        meeting as unknown as {
          _updateMeeting: (
            meetingId: string,
            settings: unknown,
            invitationLocale?: string,
          ) => Promise<unknown>;
        },
        '_updateMeeting',
      )
      .mockResolvedValue({});

    await meeting.schedule(meetingSettings, {
      invitationLocale: 'de-DE',
      isAlertSuccess: false,
      locale: 'fr-FR',
    });
    await meeting.updateMeeting('meeting-id', meetingSettings, {
      invitationLocale: 'zh-CN',
      isAlertSuccess: false,
    });
    await meeting.schedule(meetingSettings, {
      isAlertSuccess: false,
    });

    expect(scheduleDirectly).toHaveBeenCalledWith(meetingSettings, 'fr-FR');
    expect(scheduleDirectly).toHaveBeenLastCalledWith(meetingSettings, 'en-US');
    expect(updateMeeting).toHaveBeenCalledWith(
      'meeting-id',
      meetingSettings,
      'zh-CN',
    );
  });

  it('returns a serializable deleted result without opening a Toast', async () => {
    const { meeting, toast } = createMeeting();
    mockUpdateMeetingFailure(meeting);

    const result = await meeting.updateMeeting('deleted-meeting', {} as never, {
      errorHandling: 'result',
    });

    expect(result).toEqual({
      kind: 'meeting-operation-error',
      notifications: [
        {
          level: 'danger',
          messageKey: meetingOperationMessageKey.meetingIsDeleted,
          messageSource: meetingOperationMessageSource.meeting,
        },
      ],
      reason: meetingOperationErrorReason.deleted,
    });
    expect(isMeetingOperationError(result)).toBe(true);
    expect(toast.danger).not.toHaveBeenCalled();
  });

  it('keeps the existing Toast behavior when result handling is not requested', async () => {
    const { meeting, toast } = createMeeting();
    mockUpdateMeetingFailure(meeting);

    await expect(
      meeting.updateMeeting('deleted-meeting', {} as never),
    ).resolves.toBeNull();

    expect(toast.danger).toHaveBeenCalledWith({
      message: 'Meeting has been deleted',
    });
  });

  it('returns schedule failures through the same serializable result contract', async () => {
    const { meeting, toast } = createMeeting();
    mockScheduleMeetingFailure(meeting);

    const result = await meeting.schedule({} as never, {
      errorHandling: 'result',
    });

    expect(result).toMatchObject({
      kind: 'meeting-operation-error',
      reason: meetingOperationErrorReason.deleted,
    });
    expect(toast.danger).not.toHaveBeenCalled();
  });

  it('returns validation message keys instead of worker-localized copy', async () => {
    const { meeting, toast } = createMeeting();

    const result = await meeting.schedule(
      {
        _requireMeetingPassword: true,
        password: '',
        schedule: { durationInMinutes: -1 },
        topic: '',
      } as never,
      { errorHandling: 'result' },
    );

    expect(result).toEqual({
      kind: 'meeting-operation-error',
      notifications: [
        {
          level: 'warning',
          messageKey: meetingOperationMessageKey.emptyTopic,
          messageSource: meetingOperationMessageSource.meeting,
        },
        {
          level: 'warning',
          messageKey: meetingOperationMessageKey.noPassword,
          messageSource: meetingOperationMessageSource.meeting,
        },
        {
          level: 'warning',
          messageKey: meetingOperationMessageKey.durationIncorrect,
          messageSource: meetingOperationMessageSource.meeting,
        },
      ],
      reason: meetingOperationErrorReason.validation,
    });
    expect(toast.warning).not.toHaveBeenCalled();
  });

  it('keeps localized validation Toasts for default handling', async () => {
    const { meeting, toast } = createMeeting();

    await expect(
      meeting.schedule({
        _requireMeetingPassword: true,
        password: '',
        schedule: { durationInMinutes: -1 },
        topic: '',
      } as never),
    ).resolves.toBeNull();

    expect(toast.warning).toHaveBeenNthCalledWith(1, {
      message: 'Please enter meeting topic.',
    });
    expect(toast.warning).toHaveBeenNthCalledWith(2, {
      message: 'Please provide meeting password.',
    });
    expect(toast.warning).toHaveBeenNthCalledWith(3, {
      message: 'incorrect duration',
    });
  });

  it('returns permission interpolation data without formatting it in the worker', async () => {
    const { meeting, toast } = createMeeting();
    mockUpdateMeetingFailure(meeting, createInsufficientPermissionsError());

    const result = await meeting.updateMeeting('meeting-id', {} as never, {
      errorHandling: 'result',
    });

    expect(result).toMatchObject({
      notifications: [
        {
          level: 'danger',
          messageKey: meetingOperationMessageKey.insufficientPermissions,
          messageParams: {
            application: 'RingCentral',
            permissionName: 'Meetings',
          },
          messageSource: meetingOperationMessageSource.meeting,
        },
      ],
      reason: meetingOperationErrorReason.insufficientPermissions,
    });
    expect(toast.danger).not.toHaveBeenCalled();
  });

  it('keeps permission interpolation in default Toast handling', async () => {
    const { meeting, toast } = createMeeting();
    mockUpdateMeetingFailure(meeting, createInsufficientPermissionsError());

    await expect(
      meeting.updateMeeting('meeting-id', {} as never),
    ).resolves.toBeNull();

    expect(toast.danger).toHaveBeenCalledWith({
      message: 'RingCentral do not have Meetings permission.',
    });
  });

  it('returns lookup failures instead of rejecting the worker request', async () => {
    const { get, meeting, toast } = createMeeting();
    get.mockRejectedValue(createDeletedMeetingError());

    const result = await meeting.getMeeting('deleted-meeting', {
      errorHandling: 'result',
      isAlertError: false,
    });

    expect(result).toMatchObject({
      kind: 'meeting-operation-error',
      reason: meetingOperationErrorReason.deleted,
    });
    expect(toast.danger).not.toHaveBeenCalled();
  });

  it('reuses an in-flight schedule promise', async () => {
    const { meeting } = createMeeting();
    const inFlight = Promise.resolve({ id: 'scheduled-meeting' });

    (
      meeting as unknown as {
        _createMeetingPromise: Promise<unknown> | null;
        isScheduling: boolean;
      }
    )._createMeetingPromise = inFlight;
    (
      meeting as unknown as {
        _createMeetingPromise: Promise<unknown> | null;
        isScheduling: boolean;
      }
    ).isScheduling = true;

    await expect(meeting.schedule()).resolves.toEqual({
      id: 'scheduled-meeting',
    });
  });

  it('reuses an in-flight update promise for the same meeting', async () => {
    const { meeting } = createMeeting();
    const inFlight = Promise.resolve({ id: 'meeting-id' });

    jest
      .spyOn(
        meeting as unknown as {
          _isUpdating: (meetingId: string) => boolean;
        },
        '_isUpdating',
      )
      .mockReturnValue(true);
    (meeting.updateMeeting as unknown as { _promise?: Promise<unknown> })._promise =
      inFlight;

    await expect(meeting.updateMeeting('meeting-id', {} as never)).resolves.toEqual({
      id: 'meeting-id',
    });
  });

  it('handles availability failures after a response parsing fallback', async () => {
    const { meeting, toast } = createMeeting();
    const checkIfHAError = jest.fn().mockResolvedValue(true);

    (
      meeting as unknown as {
        _availabilityMonitor?: { checkIfHAError: (errors: unknown) => Promise<boolean> };
      }
    )._availabilityMonitor = { checkIfHAError };

    await (meeting as unknown as { _errorHandle: (errors: unknown) => Promise<void> })._errorHandle(
      createUnreadableResponseError(),
    );

    expect(checkIfHAError).toHaveBeenCalled();
    expect(toast.danger).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      'failed to read meeting error response:',
      expect.any(Error),
    );
  });

  it('returns true when deleting a meeting succeeds', async () => {
    const { deleteMeeting, meeting } = createMeeting();
    deleteMeeting.mockResolvedValue(undefined);

    await expect(meeting.deleteMeeting('meeting-id')).resolves.toBe(true);
  });

  it('returns delete failures without opening a Toast in result mode', async () => {
    const { deleteMeeting, meeting, toast } = createMeeting();
    deleteMeeting.mockRejectedValue(createDeletedMeetingError());

    const result = await meeting.deleteMeeting('deleted-meeting', {
      errorHandling: 'result',
    });

    expect(result).toMatchObject({
      kind: 'meeting-operation-error',
      reason: meetingOperationErrorReason.deleted,
    });
    expect(toast.danger).not.toHaveBeenCalled();
  });

  it('keeps the existing false result and Toast for default delete failures', async () => {
    const { deleteMeeting, meeting, toast } = createMeeting();
    deleteMeeting.mockRejectedValue(createDeletedMeetingError());

    await expect(meeting.deleteMeeting('deleted-meeting')).resolves.toBe(false);

    expect(toast.danger).toHaveBeenCalledWith({
      message: 'Meeting has been deleted',
    });
  });
});
