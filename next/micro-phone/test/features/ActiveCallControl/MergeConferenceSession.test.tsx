import {
  autorun,
  Given,
  it,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
} from '@ringcentral-integration/test-utils';
import { PartyStatusCode } from 'ringcentral-call-control/lib/Session';

import { ActiveCallControl } from '../../../src/app/services';
import { LoginWithMock } from '../../steps/Entry';

function createConnectedSession({
  id,
  originType = 'Call',
}: {
  id: string;
  originType?: string;
}) {
  return {
    id,
    sessionId: `${id}-session`,
    origin: { type: originType },
    data: {
      sessionId: `${id}-session`,
      creationTime: '2026-01-01T00:00:00.000Z',
      voiceCallToken: originType === 'Conference' ? 'voice-token' : undefined,
    },
    party: {
      id: `${id}-party`,
      direction: 'Outbound',
      status: { code: PartyStatusCode.answered },
      from: { phoneNumber: '+16505550101' },
      to: { phoneNumber: '+16505550102' },
    },
    otherParties: [],
    recordings: [],
    bringInParty: jest.fn().mockResolvedValue(undefined),
  };
}

function withThemeSystem(
  themeSystem: string | undefined,
  run: () => Promise<void>,
) {
  const originalThemeSystem = process.env.THEME_SYSTEM;

  if (themeSystem === undefined) {
    delete process.env.THEME_SYSTEM;
  } else {
    process.env.THEME_SYSTEM = themeSystem;
  }

  return run().finally(() => {
    if (originalThemeSystem === undefined) {
      delete process.env.THEME_SYSTEM;
    } else {
      process.env.THEME_SYSTEM = originalThemeSystem;
    }
  });
}

function setupMergeConference(
  activeCallControl: ActiveCallControl,
  {
    initVoiceCall = 'resolve',
  }: {
    initVoiceCall?: 'resolve' | 'reject';
  } = {},
) {
  const sessionA = createConnectedSession({ id: 'ts-a' });
  const sessionB = createConnectedSession({ id: 'ts-b' });
  const conferenceSession = createConnectedSession({
    id: 'ts-conf',
    originType: 'Conference',
  });
  const mergingConferenceSessionIds = (activeCallControl as any)
    ._mergingConferenceSessionIds as Set<string>;

  mergingConferenceSessionIds.clear();
  (activeCallControl as any)._rcCallControl = {
    sessions: [sessionA, sessionB],
    createConference: jest.fn().mockResolvedValue(conferenceSession),
  };

  const initVoiceCallSpy = jest.spyOn(
    activeCallControl,
    '_initConferenceVoiceCall',
  );
  if (initVoiceCall === 'reject') {
    initVoiceCallSpy.mockRejectedValue(new Error('voice failed'));
  } else {
    initVoiceCallSpy.mockResolvedValue(undefined as never);
  }

  jest
    .spyOn((activeCallControl as any)._preInsertCall, 'setPreinsert')
    .mockResolvedValue(undefined)
    .mockClear();
  jest
    .spyOn(activeCallControl as any, '_updateSessionsHandler')
    .mockResolvedValue(undefined)
    .mockClear();
  jest
    .spyOn((activeCallControl as any)._toast, 'success')
    .mockImplementation()
    .mockClear();
  jest
    .spyOn((activeCallControl as any)._toast, 'danger')
    .mockImplementation()
    .mockClear();
  jest
    .spyOn(activeCallControl, 'getSession')
    .mockReturnValue(undefined as never)
    .mockClear();

  return {
    conferenceSession,
    mergingConferenceSessionIds,
    sessionA,
    sessionB,
  };
}

@autorun(test)
@it
@title('UT for merging conference session hiding')
class MergeConferenceSessionUT extends Step {
  run() {
    return (
      <Scenario desc="UT for merging conference session hiding">
        <Given
          desc="App started with user logged in"
          action={[<LoginWithMock />]}
        />
        <Then
          desc="updateActiveSessions hides sessions tracked as merging conferences"
          action={
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;
              const visibleSession = createConnectedSession({
                id: 'ts-visible',
              });
              const mergingSession = createConnectedSession({
                id: 'ts-merging',
              });
              const mergingConferenceSessionIds = (activeCallControl as any)
                ._mergingConferenceSessionIds as Set<string>;

              mergingConferenceSessionIds.clear();
              mergingConferenceSessionIds.add(mergingSession.id);
              (activeCallControl as any)._rcCallControl = {
                sessions: [visibleSession, mergingSession],
              };

              await activeCallControl.updateActiveSessions();

              const sessionIds = activeCallControl.data.sessions.map(
                (session) => session.id,
              );
              expect(sessionIds).toContain('ts-visible');
              expect(sessionIds).not.toContain('ts-merging');

              mergingConferenceSessionIds.delete(mergingSession.id);
              await activeCallControl.updateActiveSessions();

              expect(
                activeCallControl.data.sessions.map((session) => session.id),
              ).toEqual(expect.arrayContaining(['ts-visible', 'ts-merging']));
            }) as StepFunction
          }
        />
        <Then
          desc="_createConferenceSession hides the conference on spring-ui and unhides it when voice call init fails"
          action={
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              await withThemeSystem('spring-ui', async () => {
                const { conferenceSession, mergingConferenceSessionIds } =
                  setupMergeConference(activeCallControl);

                await (activeCallControl as any)._createConferenceSession();

                expect(
                  mergingConferenceSessionIds.has(conferenceSession.id),
                ).toBe(true);
              });

              await withThemeSystem('spring-ui', async () => {
                const { conferenceSession, mergingConferenceSessionIds } =
                  setupMergeConference(activeCallControl, {
                    initVoiceCall: 'reject',
                  });

                await expect(
                  (activeCallControl as any)._createConferenceSession(),
                ).rejects.toThrow('voice failed');

                expect(
                  mergingConferenceSessionIds.has(conferenceSession.id),
                ).toBe(false);
              });
            }) as StepFunction
          }
        />
        <Then
          desc="_createConferenceSession does not hide the conference outside spring-ui"
          action={
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              await withThemeSystem(undefined, async () => {
                const { conferenceSession, mergingConferenceSessionIds } =
                  setupMergeConference(activeCallControl);

                await (activeCallControl as any)._createConferenceSession();

                expect(
                  mergingConferenceSessionIds.has(conferenceSession.id),
                ).toBe(false);
              });
            }) as StepFunction
          }
        />
        <Then
          desc="mergeCalls tracks the conference id on spring-ui and publishes it after bring-in completes"
          action={
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              await withThemeSystem('spring-ui', async () => {
                const {
                  conferenceSession,
                  mergingConferenceSessionIds,
                  sessionA,
                  sessionB,
                } = setupMergeConference(activeCallControl);
                const conferenceId = await activeCallControl.mergeCalls(
                  sessionA.id,
                  sessionB.id,
                );

                expect(conferenceId).toBe(conferenceSession.id);
                expect(conferenceSession.bringInParty).toHaveBeenCalledTimes(2);
                expect(
                  (activeCallControl as any)._updateSessionsHandler,
                ).toHaveBeenCalled();
                expect(
                  mergingConferenceSessionIds.has(conferenceSession.id),
                ).toBe(false);
                expect(
                  (activeCallControl as any)._toast.success,
                ).toHaveBeenCalled();
              });
            }) as StepFunction
          }
        />
        <Then
          desc="mergeCalls skips conference id tracking outside spring-ui"
          action={
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              await withThemeSystem(undefined, async () => {
                const {
                  conferenceSession,
                  mergingConferenceSessionIds,
                  sessionA,
                  sessionB,
                } = setupMergeConference(activeCallControl);

                const conferenceId = await activeCallControl.mergeCalls(
                  sessionA.id,
                  sessionB.id,
                );

                expect(conferenceId).toBe(conferenceSession.id);
                expect(
                  (activeCallControl as any)._updateSessionsHandler,
                ).not.toHaveBeenCalled();
                expect(
                  mergingConferenceSessionIds.has(conferenceSession.id),
                ).toBe(false);
              });
            }) as StepFunction
          }
        />
        <Then
          desc="mergeCalls unhides the conference when voice call init fails on spring-ui"
          action={
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;
              const consoleSpy = jest
                .spyOn(console, 'log')
                .mockImplementation();

              try {
                await withThemeSystem('spring-ui', async () => {
                  const {
                    conferenceSession,
                    mergingConferenceSessionIds,
                    sessionA,
                    sessionB,
                  } = setupMergeConference(activeCallControl, {
                    initVoiceCall: 'reject',
                  });

                  const conferenceId = await activeCallControl.mergeCalls(
                    sessionA.id,
                    sessionB.id,
                  );

                  expect(conferenceId).toBeUndefined();
                  expect(
                    mergingConferenceSessionIds.has(conferenceSession.id),
                  ).toBe(false);
                  expect(
                    (activeCallControl as any)._toast.danger,
                  ).toHaveBeenCalled();
                  expect(conferenceSession.bringInParty).not.toHaveBeenCalled();
                });
              } finally {
                consoleSpy.mockRestore();
              }
            }) as StepFunction
          }
        />
      </Scenario>
    );
  }
}
