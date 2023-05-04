import {
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  MESSAGE_MAX_LENGTH,
  MessageSender,
  messageSenderMessages,
  messageSenderStatus,
  MULTIPART_MESSAGE_MAX_LENGTH,
} from '../../modules/MessageSender';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    sendStatus: messageSenderStatus.idle,
  });

class MockAlert {
  args: any = null;
  warning(...args: any[]) {
    this.args = args;
  }
}

class MockClient {
  args: any = null;
  account() {
    return {
      extension: () => {
        return {
          companyPager: () => {
            return {
              post: async (args: any) => {
                this.args = args;
                return { foo: 1 };
              },
            };
          },
          sms: () => {
            return {
              post: async (args: any) => {
                this.args = args;
                return { foo: 1 };
              },
            };
          },
        };
      },
    };
  }
}

class MockNumberValidate {
  validateNumbers(numbers: any) {
    return {
      result: true,
      numbers: numbers.map((n: string) => ({
        e164: n,
      })),
    };
  }

  isCompanyExtension() {
    return true;
  }
}

class MockExtensionPhoneNumber {
  get smsSenderNumbers() {
    return [
      {
        phoneNumber: '+16579999999',
      },
    ];
  }
}

@autorun(test)
@title('Message Sender Module "sendStatus" state with setSendStatus: ${status}')
export class SendStatus extends Step {
  @examples(`
    | status         |
    | 'idle'         |
    | 'sending'      |
    | 'validating'   |
  `)
  run() {
    return (
      <Scenario desc="Check send status">
        <Given
          desc="An MessageSender instance with options"
          action={(_: any, context: any) => {
            const messageSender = new MessageSender({
              alert: {} as any,
              client: {} as any,
              extensionInfo: {} as any,
              extensionPhoneNumber: {} as any,
              numberValidate: {} as any,
              availabilityMonitor: {} as any,
              messageSenderOptions: {} as any,
              accountInfo: { maxExtensionNumberLength: 8 } as any,
              appFeatures: {} as any,
            });
            context.instance = messageSender;
            expect(messageSender.sendStatus).toEqual(messageSenderStatus.idle);
          }}
        />
        <When
          desc="Execute 'setSendStatus' with ${status}"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            MessageSender.prototype.setSendStatus.call(
              context.mockModule,
              context.example.status,
            );
          }}
        />
        <Then
          desc="sendStatus should be ${status}"
          action={(_: any, context: any) => {
            expect(context.mockModule.sendStatus).toBe(context.example.status);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title(
  'Message Sender Module should alert textEmpty when send with ${blankType} text',
)
export class BlankSendText extends Step {
  @examples(`
    | blankType         |
    | 'undefined'         |
    | 'blank'      |
    | 'whitespace'   |
  `)
  run() {
    return (
      <Scenario desc="Check send status">
        <Given
          desc="An MessageSender instance"
          action={(_: any, context: any) => {
            const messageSender = new MessageSender({
              alert: new MockAlert() as any,
              client: {} as any,
              extensionInfo: {} as any,
              extensionPhoneNumber: {} as any,
              numberValidate: {} as any,
              availabilityMonitor: {} as any,
              messageSenderOptions: {} as any,
              accountInfo: { maxExtensionNumberLength: 8 } as any,
              appFeatures: {} as any,
            });
            messageSender._validateToNumbers = jest.fn();
            context.instance = messageSender;
          }}
        />
        <When
          desc="Execute send with ${blankType} text and multipart true"
          action={async (_: any, context: any) => {
            context.mockModule = getMockModule();
            let text;
            switch (context.example.blackType) {
              case 'undefined':
                text = undefined;
                break;
              case 5:
                text = '';
                break;
              case 10:
                text = '    ';
                break;
              default:
                break;
            }
            context.params = {
              fromNumber: '123',
              toNumbers: ['123'],
              multipart: true,
              text,
            };
            await context.instance.send(context.params);
          }}
        />
        <Then
          desc="should show alert text blank"
          action={(_: any, context: any) => {
            expect(context.instance._deps.alert.args[0].message).toBe(
              messageSenderMessages.textEmpty,
            );
            expect(context.instance._validateToNumbers.mock.calls.length).toBe(
              0,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title(
  'Message Sender Module should alert textTooLong when send with long text',
)
export class LongSendText extends Step {
  run() {
    return (
      <Scenario desc="Text Too Long">
        <Given
          desc="An MessageSender instance"
          action={(_: any, context: any) => {
            const messageSender = new MessageSender({
              alert: new MockAlert() as any,
              client: {} as any,
              extensionInfo: {} as any,
              extensionPhoneNumber: {} as any,
              numberValidate: {} as any,
              availabilityMonitor: {} as any,
              messageSenderOptions: {} as any,
              accountInfo: { maxExtensionNumberLength: 8 } as any,
              appFeatures: {} as any,
            });
            messageSender._validateToNumbers = jest.fn();
            context.instance = messageSender;
          }}
        />
        <When
          desc="Execute send with long text and multipart false"
          action={async (_: any, context: any) => {
            context.mockModule = getMockModule();
            const text = 't'.repeat(MESSAGE_MAX_LENGTH + 1);
            context.params = {
              fromNumber: '123',
              toNumbers: ['123'],
              multipart: false,
              text,
            };
            await context.instance.send(context.params);
          }}
        />
        <Then
          desc="should show alert textTooLong"
          action={(_: any, context: any) => {
            expect(context.instance._deps.alert.args[0].message).toBe(
              messageSenderMessages.textTooLong,
            );
            expect(context.instance._validateToNumbers.mock.calls.length).toBe(
              0,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title(
  'Message Sender Module should alert multipartTextTooLong when send with long text',
)
export class LongSendTextWithMultipart extends Step {
  run() {
    return (
      <Scenario desc="Multipart Text Too Long">
        <Given
          desc="An MessageSender instance"
          action={(_: any, context: any) => {
            const messageSender = new MessageSender({
              alert: new MockAlert() as any,
              client: {} as any,
              extensionInfo: {} as any,
              extensionPhoneNumber: {} as any,
              numberValidate: {} as any,
              availabilityMonitor: {} as any,
              messageSenderOptions: {} as any,
              accountInfo: { maxExtensionNumberLength: 8 } as any,
              appFeatures: {} as any,
            });
            messageSender._validateToNumbers = jest.fn();
            context.instance = messageSender;
          }}
        />
        <When
          desc="Execute send with long text and multipart true"
          action={async (_: any, context: any) => {
            context.mockModule = getMockModule();
            const text = 't'.repeat(MULTIPART_MESSAGE_MAX_LENGTH + 1);
            context.params = {
              fromNumber: '123',
              toNumbers: ['123'],
              multipart: true,
              text,
            };
            await context.instance.send(context.params);
          }}
        />
        <Then
          desc="should show alert multipartTextTooLong"
          action={(_: any, context: any) => {
            expect(context.instance._deps.alert.args[0].message).toBe(
              messageSenderMessages.multipartTextTooLong,
            );
            expect(context.instance._validateToNumbers.mock.calls.length).toBe(
              0,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title(
  'Message Sender Module should alert recipientsEmpty when to numbers empty',
)
export class NoToNumbers extends Step {
  run() {
    return (
      <Scenario desc="recipientsEmpty is empty">
        <Given
          desc="An MessageSender instance"
          action={(_: any, context: any) => {
            const messageSender = new MessageSender({
              alert: new MockAlert() as any,
              client: {} as any,
              extensionInfo: {} as any,
              extensionPhoneNumber: {} as any,
              numberValidate: {} as any,
              availabilityMonitor: {} as any,
              messageSenderOptions: {} as any,
              accountInfo: { maxExtensionNumberLength: 8 } as any,
              appFeatures: {} as any,
            });
            messageSender._sendSms = jest.fn();
            messageSender._sendPager = jest.fn();
            context.instance = messageSender;
          }}
        />
        <When
          desc="Execute send with empty toNumbers"
          action={async (_: any, context: any) => {
            context.mockModule = getMockModule();
            context.params = {
              fromNumber: '123',
              toNumbers: [],
              multipart: false,
              text: 'ttt',
            };
            await context.instance.send(context.params);
          }}
        />
        <Then
          desc="should show alert recipientsEmpty"
          action={(_: any, context: any) => {
            expect(context.instance._deps.alert.args[0].message).toBe(
              messageSenderMessages.recipientsEmpty,
            );
            expect(context.instance._sendPager.mock.calls.length).toBe(0);
            expect(context.instance._sendSms.mock.calls.length).toBe(0);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Message Sender Module should send pager successfully')
export class SendPagerSuccessfully extends Step {
  run() {
    return (
      <Scenario desc="Send pager successfully">
        <Given
          desc="An MessageSender instance"
          action={(_: any, context: any) => {
            const messageSender = new MessageSender({
              alert: new MockAlert() as any,
              client: new MockClient() as any,
              extensionInfo: {} as any,
              extensionPhoneNumber: {} as any,
              numberValidate: new MockNumberValidate() as any,
              availabilityMonitor: {
                checkIfHAError() {
                  return false;
                },
              } as any,
              messageSenderOptions: {} as any,
              accountInfo: { maxExtensionNumberLength: 8 } as any,
              appFeatures: {} as any,
            });
            Object.assign(
              messageSender,
              mockModuleGenerator({
                _sendSms: jest.fn(),
                _validateSenderNumber: jest.fn(),
              } as any),
            );
            context.instance = messageSender;
          }}
        />
        <When
          desc="Execute send with empty toNumbers"
          action={async (_: any, context: any) => {
            context.mockModule = getMockModule();
            context.params = {
              fromNumber: '123',
              toNumbers: ['101'],
              multipart: false,
              text: 'ttt',
            };
            context.reps = await context.instance.send(context.params);
          }}
        />
        <Then
          desc="should show alert recipientsEmpty"
          action={(_: any, context: any) => {
            expect(context.instance._deps.alert.args).toBe(null);
            expect(context.instance._sendSms.mock.calls.length).toBe(0);
            expect(
              context.instance._validateSenderNumber.mock.calls.length,
            ).toBe(0);
            expect(context.reps.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Message Sender Module should send SMS successfully')
export class SendSMSSuccessfully extends Step {
  run() {
    return (
      <Scenario desc="Send SMS successfully">
        <Given
          desc="An MessageSender instance"
          action={(_: any, context: any) => {
            const messageSender = new MessageSender({
              alert: new MockAlert() as any,
              client: new MockClient() as any,
              extensionInfo: {} as any,
              extensionPhoneNumber: new MockExtensionPhoneNumber() as any,
              numberValidate: new MockNumberValidate() as any,
              availabilityMonitor: {
                checkIfHAError() {
                  return false;
                },
              } as any,
              messageSenderOptions: {} as any,
              accountInfo: { maxExtensionNumberLength: 8 } as any,
              appFeatures: {} as any,
            });
            Object.assign(
              messageSender,
              mockModuleGenerator({
                _sendPager: jest.fn(),
              } as any),
            );
            context.instance = messageSender;
          }}
        />
        <When
          desc="Execute send with empty toNumbers"
          action={async (_: any, context: any) => {
            context.mockModule = getMockModule();
            context.params = {
              fromNumber: '+16579999999',
              toNumbers: ['+16579998888'],
              multipart: false,
              text: 'ttt',
            };
            context.reps = await context.instance.send(context.params);
          }}
        />
        <Then
          desc="should show alert recipientsEmpty"
          action={(_: any, context: any) => {
            expect(context.instance._deps.alert.args).toBe(null);
            expect(context.instance._sendPager.mock.calls.length).toBe(0);
            expect(context.reps.length).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Message Sender Module should send SMS and Pager successfully')
export class SendSMSAndPagerSuccessfully extends Step {
  run() {
    return (
      <Scenario desc="Send SMS and Pager successfully">
        <Given
          desc="An MessageSender instance"
          action={(_: any, context: any) => {
            const messageSender = new MessageSender({
              alert: new MockAlert() as any,
              client: new MockClient() as any,
              extensionInfo: {} as any,
              extensionPhoneNumber: new MockExtensionPhoneNumber() as any,
              numberValidate: new MockNumberValidate() as any,
              availabilityMonitor: {
                checkIfHAError() {
                  return false;
                },
              } as any,
              messageSenderOptions: {} as any,
              accountInfo: { maxExtensionNumberLength: 8 } as any,
              appFeatures: {} as any,
            });
            Object.assign(messageSender, mockModuleGenerator({}));
            context.instance = messageSender;
          }}
        />
        <When
          desc="Execute send with empty toNumbers"
          action={async (_: any, context: any) => {
            context.params = {
              fromNumber: '+16579999999',
              toNumbers: ['+16579998888', '101'],
              multipart: false,
              text: 'ttt',
            };
            context.reps = await context.instance.send(context.params);
          }}
        />
        <Then
          desc="should show alert recipientsEmpty"
          action={(_: any, context: any) => {
            expect(context.instance._deps.alert.args).toBe(null);
            expect(context.reps.length).toBe(2);
          }}
        />
      </Scenario>
    );
  }
}
