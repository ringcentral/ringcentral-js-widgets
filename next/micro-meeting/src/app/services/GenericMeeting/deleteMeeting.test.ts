import { ExtensionInfo } from '@ringcentral-integration/micro-auth/src/app/services';
import { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import {
  Initiator,
  SharedAppOptions,
  testBed,
} from '@ringcentral-integration/next-core';

import {
  createMeetingOperationError,
  Meeting,
  meetingOperationErrorReason,
} from '../Meeting';
import { RcVideo } from '../RcVideo';
import { VideoConfiguration } from '../VideoConfiguration';

import { GenericMeeting } from './GenericMeeting';

const createGenericMeeting = ({
  isRCM,
  isRCV = !isRCM,
}: {
  isRCM: boolean;
  isRCV?: boolean;
}) => {
  const deleteMeeting = jest.fn();
  const meetingGetMeeting = jest.fn();
  const meetingUpdateMeeting = jest.fn();
  const rcVideoGetMeeting = jest.fn();
  const rcVideoUpdateMeeting = jest.fn();
  const genericMeeting = testBed({
    main: GenericMeeting,
    modules: [
      {
        provide: VideoConfiguration,
        useValue: { isRCM, isRCV },
      },
      { provide: ExtensionInfo, useValue: {} },
      { provide: Brand, useValue: {} },
      {
        provide: Meeting,
        useValue: {
          deleteMeeting,
          getMeeting: meetingGetMeeting,
          updateMeeting: meetingUpdateMeeting,
        },
      },
      {
        provide: RcVideo,
        useValue: {
          getMeeting: rcVideoGetMeeting,
          updateMeeting: rcVideoUpdateMeeting,
        },
      },
      {
        provide: SharedAppOptions,
        useValue: {
          name: 'generic-meeting-delete-result-test',
          type: 'Base',
        },
      },
      {
        provide: Initiator,
        useValue: { beforeInitialize: jest.fn() },
      },
    ],
  }).instance;

  return {
    deleteMeeting,
    genericMeeting,
    meetingGetMeeting,
    meetingUpdateMeeting,
    rcVideoGetMeeting,
    rcVideoUpdateMeeting,
  };
};

describe('GenericMeeting delete result', () => {
  it('returns the RCM delete result with caller-owned error options', async () => {
    const { deleteMeeting, genericMeeting } = createGenericMeeting({
      isRCM: true,
    });
    const operationError = createMeetingOperationError(
      meetingOperationErrorReason.internal,
      [{ level: 'danger', message: 'Remote delete failed.' }],
    );
    deleteMeeting.mockResolvedValue(operationError);

    await expect(
      genericMeeting.deleteMeeting('meeting-id', { errorHandling: 'result' }),
    ).resolves.toBe(operationError);
    expect(deleteMeeting).toHaveBeenCalledWith('meeting-id', {
      errorHandling: 'result',
    });
  });

  it('keeps RCV deletion as a no-op', async () => {
    const { deleteMeeting, genericMeeting } = createGenericMeeting({
      isRCM: false,
    });

    await expect(
      genericMeeting.deleteMeeting('meeting-id', { errorHandling: 'result' }),
    ).resolves.toBeUndefined();
    expect(deleteMeeting).not.toHaveBeenCalled();
  });

  it('routes meeting lookups to the RCM service with caller-owned options', async () => {
    const { genericMeeting, meetingGetMeeting, rcVideoGetMeeting } =
      createGenericMeeting({
        isRCM: true,
      });
    const result = { id: 'meeting-id' };
    meetingGetMeeting.mockResolvedValue(result);

    await expect(
      genericMeeting.getMeeting('meeting-id', { errorHandling: 'result' }),
    ).resolves.toBe(result);
    expect(meetingGetMeeting).toHaveBeenCalledWith('meeting-id', {
      errorHandling: 'result',
    });
    expect(rcVideoGetMeeting).not.toHaveBeenCalled();
  });

  it('routes meeting lookups to the RCV service with caller-owned options', async () => {
    const { genericMeeting, meetingGetMeeting, rcVideoGetMeeting } =
      createGenericMeeting({
        isRCM: false,
      });
    const result = { shortId: 'meeting-short-id' };
    rcVideoGetMeeting.mockResolvedValue(result);

    await expect(
      genericMeeting.getMeeting('meeting-short-id', {
        errorHandling: 'result',
      }),
    ).resolves.toBe(result);
    expect(rcVideoGetMeeting).toHaveBeenCalledWith(
      'meeting-short-id',
      undefined,
      undefined,
      { errorHandling: 'result' },
    );
    expect(meetingGetMeeting).not.toHaveBeenCalled();
  });

  it('throws when no meeting provider is configured', async () => {
    const { genericMeeting } = createGenericMeeting({
      isRCM: false,
      isRCV: false,
    });

    await expect(genericMeeting.getMeeting('meeting-id')).rejects.toThrow(
      'Unknown meeting provider, please check the module runtime',
    );
  });

  it('preserves caller-owned update errors', async () => {
    const { genericMeeting, meetingUpdateMeeting } = createGenericMeeting({
      isRCM: true,
    });
    const operationError = createMeetingOperationError(
      meetingOperationErrorReason.internal,
      [{ level: 'danger', message: 'Remote update failed.' }],
    );
    meetingUpdateMeeting.mockResolvedValue(operationError);

    await expect(
      genericMeeting.updateMeeting(
        'meeting-id',
        { topic: 'Updated topic' } as never,
        { errorHandling: 'result' },
      ),
    ).resolves.toBe(operationError);
  });

  it('appends scheduleOriginalInfo to successful updates', async () => {
    const { genericMeeting, meetingUpdateMeeting } = createGenericMeeting({
      isRCM: true,
    });
    const meeting = { topic: 'Updated topic' } as never;
    const result = { id: 'meeting-id' };
    meetingUpdateMeeting.mockResolvedValue(result);

    await expect(
      genericMeeting.updateMeeting('meeting-id', meeting),
    ).resolves.toBe(result);
    expect(result).toMatchObject({
      id: 'meeting-id',
      scheduleOriginalInfo: meeting,
    });
  });
});
