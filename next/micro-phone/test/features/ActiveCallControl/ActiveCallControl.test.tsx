import { SleepDetector } from '@ringcentral-integration/micro-core/src/app/services';
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

import { ActiveCallControl, Webphone } from '../../../src/app/services';
import { LoginWithMock } from '../../steps/Entry';

@autorun(test)
@it
@title('UT for ActiveCallControl')
class ActiveCallControlUT extends Step {
  run() {
    return (
      <Scenario desc="UT for ActiveCallControl">
        <Given
          desc="App started with user logged in"
          action={[
            <LoginWithMock />,
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest.spyOn(activeCallControl['_toast'], 'warning');
              jest.spyOn(activeCallControl['_toast'], 'danger');
            }) as StepFunction,
          ]}
        />
        <Then
          desc="RingMessage utils work as expected"
          action={[
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(activeCallControl, 'checkIfConferenceCall')
                .mockImplementation(async () => {
                  return true;
                });

              activeCallControl.addRingMessage('example', {
                serverId: 'example',
              });

              expect(activeCallControl['ringMessages']).toEqual({
                example: {
                  serverId: 'example',
                },
              });

              activeCallControl.removeRingMessage('example');

              expect(activeCallControl['ringMessages']).toEqual({});
              activeCallControl.removeActiveSession();
              expect(activeCallControl.data.activeSessionId).toBeNull();
            }) as StepFunction,
          ]}
        />
        <Then
          desc="mute utils work as expected"
          action={[
            // general error
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as never,
                )
                .mockImplementation(() => {
                  throw new Error('general error');
                });

              await activeCallControl.mute('example');
            }) as StepFunction,
            <CheckToastWarningMessage message="Unexpected server error. Please try again later." />,
            // normal process
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as any,
                )
                .mockImplementation(() => 'example');

              const muteSpy = jest.fn();

              jest
                .spyOn(activeCallControl, '_getSessionById' as any)
                .mockImplementation(() => {
                  return {
                    mute: muteSpy,
                  };
                });

              await activeCallControl.mute('example');
              expect(muteSpy).toHaveBeenCalled();
              await Promise.resolve();
              expect(activeCallControl.data.busyTimestamp).toBe(0);
            }) as StepFunction,
            // 409 api error
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as never,
                )
                .mockImplementation(() => {
                  const customError = new Error('409 error');

                  Object.defineProperty(customError, 'response', {
                    value: {
                      clone: () => {
                        return {
                          text: () => 'Incorrect State example',
                        };
                      },
                    },
                    configurable: true,
                    writable: true,
                  });
                  throw customError;
                });

              await activeCallControl.mute('example');
            }) as StepFunction,
            <CheckToastWarningMessage message="This call had been muted on other device. Please unmute the call before you control in this App." />,
          ]}
        />
        <Then
          desc="unmute utils work as expected"
          action={[
            // general error
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as never,
                )
                .mockImplementation(() => {
                  throw new Error('general error');
                });

              await activeCallControl.unmute('example');
            }) as StepFunction,
            <CheckToastWarningMessage message="Unexpected server error. Please try again later." />,
            // normal process
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as any,
                )
                .mockImplementation(() => 'example');

              const unmuteSpy = jest.fn();

              jest
                .spyOn(activeCallControl, '_getSessionById' as any)
                .mockImplementation(() => {
                  return {
                    unmute: unmuteSpy,
                  };
                });

              await activeCallControl.unmute('example');
              expect(unmuteSpy).toHaveBeenCalled();
              await Promise.resolve();
              expect(activeCallControl.data.busyTimestamp).toBe(0);
            }) as StepFunction,
            // 409 api error
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as never,
                )
                .mockImplementation(() => {
                  const customError = new Error('409 error');

                  Object.defineProperty(customError, 'response', {
                    value: {
                      clone: () => {
                        return {
                          text: () => 'Incorrect State example',
                        };
                      },
                    },
                    configurable: true,
                    writable: true,
                  });
                  throw customError;
                });

              await activeCallControl.unmute('example');
            }) as StepFunction,
            <CheckToastWarningMessage message="This call had been unmuted on other device. Please mute the call before you control in this App." />,
          ]}
        />
        <Then
          desc="startRecord utils work as expected"
          action={[
            // general error
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as never,
                )
                .mockImplementation(() => {
                  const customError = new Error('409 error');

                  Object.defineProperty(customError, 'response', {
                    value: {
                      clone: () => {
                        return {
                          json: () => {
                            return {
                              errors: [
                                {
                                  errorCode: 500,
                                },
                              ],
                            };
                          },
                        };
                      },
                    },
                    configurable: true,
                    writable: true,
                  });
                  throw customError;
                });

              await activeCallControl.startRecord('example');
            }) as StepFunction,
            <CheckToastWarningMessage message="You cannot record the call at the moment. Error code: 500" />,
            // normal process
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;
              const webphone = app.container.got(Webphone)!;

              jest.spyOn(webphone, 'startRecord');

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as any,
                )
                .mockImplementation(() => 'example');

              jest
                .spyOn(activeCallControl, '_getSessionById' as any)
                .mockImplementation(() => {
                  return {
                    origin: { type: 'Conference' },
                  };
                });

              const result = await activeCallControl.startRecord('example');
              expect(webphone.startRecord).toHaveBeenCalled();
              await Promise.resolve();
              expect(activeCallControl.data.busyTimestamp).toBe(0);
              expect(result).toBeTruthy();

              const createRecordSpy = jest.fn();
              const resumeRecordSpy = jest.fn();
              jest
                .spyOn(activeCallControl, '_getSessionById' as any)
                .mockImplementation(() => {
                  return {
                    origin: { type: 'Conference2' },
                    createRecord: createRecordSpy,
                    resumeRecord: resumeRecordSpy,
                  };
                });

              jest
                .spyOn(activeCallControl, 'getRecordingId')
                .mockImplementation(() => {
                  return 'example2';
                });

              const result2 = await activeCallControl.startRecord('example');
              expect(result2).toBeTruthy();
              expect(resumeRecordSpy).toHaveBeenCalled();

              jest
                .spyOn(activeCallControl, 'getRecordingId')
                .mockImplementation(() => {
                  return null;
                });

              const result3 = await activeCallControl.startRecord('example');
              expect(result3).toBeTruthy();
              expect(createRecordSpy).toHaveBeenCalled();
            }) as StepFunction,
          ]}
        />
        <Then
          desc="stopRecord utils work as expected"
          action={[
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;
              const webphone = app.container.got(Webphone)!;
              jest.spyOn(webphone, 'stopRecord');

              const pauseRecordSpy = jest.fn();
              jest
                .spyOn(activeCallControl, '_getSessionById' as any)
                .mockImplementation(() => {
                  return {
                    origin: { type: 'Conference' },
                    pauseRecord: pauseRecordSpy,
                  };
                });

              await activeCallControl.stopRecord('example');

              expect(webphone.stopRecord).toHaveBeenCalledWith(
                'example',
                expect.any(Function),
              );

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as any,
                )
                .mockImplementation(() => null);

              jest
                .spyOn(activeCallControl, 'getRecordingId')
                .mockImplementation(() => {
                  return 'recordingId';
                });
              await activeCallControl.stopRecord('example');

              expect(pauseRecordSpy).toHaveBeenCalledWith('recordingId');
            }) as StepFunction,
          ]}
        />
        <Then
          desc="hangUp utils work as expected"
          action={[
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as any,
                )
                .mockImplementation(() => null);

              const dropSpy = jest.fn();
              jest
                .spyOn(activeCallControl, '_getSessionById' as any)
                .mockImplementation(() => {
                  return {
                    origin: { type: 'Conference' },
                    drop: dropSpy,
                  };
                });

              const hangup = activeCallControl.hangUp('example');
              await Promise.resolve(hangup);
              expect(dropSpy).toHaveBeenCalled();

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as any,
                )
                .mockImplementation(() => 'example');

              const webphone = app.container.got(Webphone)!;
              jest.spyOn(webphone, 'hangup');

              const webphoneHangup = activeCallControl.hangUp('example');
              await Promise.resolve(webphoneHangup);

              expect(webphone.hangup).toHaveBeenCalledWith(
                'example',
                expect.any(Function),
              );

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as never,
                )
                .mockImplementation(() => {
                  const customError = new Error();

                  throw customError;
                });
              await activeCallControl.hangUp('example');
            }) as StepFunction,
            <CheckToastWarningMessage message="Unexpected server error. Please try again later." />,
          ]}
        />
        <Then
          desc="Hold utils work as expected"
          action={[
            // general error
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as never,
                )
                .mockImplementation(() => {
                  throw new Error('general error');
                });

              await activeCallControl.hold('example');
            }) as StepFunction,
            <CheckToastWarningMessage message="Unexpected server error. Please try again later." />,
            // normal process
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as any,
                )
                .mockImplementation(() => 'example');

              const holdSpy = jest.fn();

              jest
                .spyOn(activeCallControl, '_getSessionById' as any)
                .mockImplementation(() => {
                  return {
                    hold: holdSpy,
                  };
                });
              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as any,
                )
                .mockImplementation(() => undefined);

              await activeCallControl.hold('example');
              expect(holdSpy).toHaveBeenCalled();
              await Promise.resolve();
              expect(activeCallControl.data.busyTimestamp).toBe(0);
            }) as StepFunction,
            // 409 api error
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(
                  activeCallControl,
                  '_getCurrentDeviceCallsBySessionId' as never,
                )
                .mockImplementation(() => {
                  const customError = new Error('409 error');

                  Object.defineProperty(customError, 'response', {
                    value: {
                      clone: () => {
                        return {
                          text: () => 'Incorrect State example',
                        };
                      },
                    },
                    configurable: true,
                    writable: true,
                  });
                  throw customError;
                });

              await activeCallControl.hold('example');
            }) as StepFunction,
            <CheckToastWarningMessage message="This call had been unheld on other device. Please hold the call before you control in this App." />,
          ]}
        />
        <Then
          desc="Switch utils work as expected"
          action={[
            // general error
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(activeCallControl, 'getSession' as never)
                .mockImplementation(() => {
                  throw new Error('general error');
                });

              await activeCallControl.switch('example');
            }) as StepFunction,
            <CheckToastWarningMessage message="Unexpected server error. Please try again later." />,
            // normal process
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;

              jest
                .spyOn(activeCallControl, 'getSession' as any)
                .mockImplementation(() => ({ sessionId: 'example' }));

              const switchedSpy = jest.fn();

              activeCallControl._onCallSwitchedFunc = switchedSpy;
              activeCallControl['_webphone']!.switchCall = jest
                .fn()
                .mockReturnValue(true);
              await activeCallControl.switch('example');
              expect(switchedSpy).toHaveBeenCalled();
              await Promise.resolve();
              expect(activeCallControl.data.busyTimestamp).toBe(0);
            }) as StepFunction,
          ]}
        />
        <Then
          desc="fetchData is called again after sleep is detected"
          action={[
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;
              const sleepDetector = app.container.got(SleepDetector)!;

              const fetchDataSpy = jest
                .spyOn(activeCallControl, 'fetchData')
                .mockImplementation(async () => {});

              sleepDetector['_detector']['_emitter'].emit(
                sleepDetector.events.detected,
                Date.now(),
                Date.now(),
                80 * 1000,
              );
              expect(fetchDataSpy).toHaveBeenCalledTimes(1);

              fetchDataSpy.mockRestore();
            }) as StepFunction,
          ]}
        />
        <Then
          desc="fetchData is called again after WebSocket recovery"
          action={[
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;
              const subscription = app.container.got(
                'Subscription' as never,
              ) as any;

              const fetchDataSpy = jest
                .spyOn(activeCallControl, 'fetchData')
                .mockImplementation(async () => {});

              subscription._recovered$.next();
              await Promise.resolve();
              expect(fetchDataSpy).toHaveBeenCalledTimes(1);

              fetchDataSpy.mockRestore();
            }) as StepFunction,
          ]}
        />
      </Scenario>
    );
  }
}

const CheckToastWarningMessage: StepFunction<{ message: string }> = async (
  { message },
  { app },
) => {
  const activeCallControl = app.container.got(ActiveCallControl)!;
  const warning = jest.mocked(activeCallControl['_toast'].warning);
  const danger = jest.mocked(activeCallControl['_toast'].danger);
  const calls = [...warning.mock.calls, ...danger.mock.calls];

  expect(calls).toContainEqual([expect.objectContaining({ message })]);
  warning.mockClear();
  danger.mockClear();
};
