import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { ComposeText } from '../../modules/ComposeTextV2';
import { mockModuleGenerator } from '../lib/mockModule';

class MockModule {
  _ready = true;
  get ready() {
    return this._ready;
  }
}

class MockAlert extends MockModule {
  args: any = null;
  warning(...args: any[]) {
    this.args = args;
  }
}

class MockStorage extends MockModule {
  registerReducer() {}

  getItem() {
    return null;
  }
}

class MockMessageSender extends MockModule {
  async send(...args) {
    return args;
  }

  get senderNumbersList() {
    return [{ phoneNumber: '+1234567890' }];
  }
}

class MockNumberValidate extends MockModule {
  validateFormat() {
    return {
      result: true,
    };
  }
}

class MockAuth extends MockModule {
  get isFreshLogin() {
    return false;
  }

  get loggedIn() {
    return true;
  }
}

class MockAppFeatures extends MockModule {}

class MockContactSearch extends MockModule {
  get searchResult() {
    return [];
  }
}

const getMockModule = () =>
  mockModuleGenerator({
    toNumbers: [{ phoneNumber: '+16579990000' }],
    senderNumber: '+1234567890',
    messageText: 'ttttt',
    attachments: [],
    typingToNumber: '',
    alertMessageSending: () => {},
    dismissMessageSending: () => {},
    _deps: {},
  });

@autorun(test)
@title('ComposeText Module should send SMS successfully')
export class SendSMSSuccessfully extends Step {
  run() {
    return (
      <Scenario desc="Send SMS successfully">
        <Given
          desc="An ComposeText instance"
          action={async (_: any, context: any) => {
            const composeText = new ComposeText({
              alert: new MockAlert() as any,
              auth: new MockAuth() as any,
              storage: new MockStorage() as any,
              messageSender: new MockMessageSender() as any,
              numberValidate: new MockNumberValidate() as any,
              appFeatures: new MockAppFeatures() as any,
              contactSearch: new MockContactSearch() as any,
              composeTextOptions: {} as any,
            });
            context.instance = composeText;
          }}
        />
        <When
          desc="Execute send"
          action={async (_: any, context: any) => {
            context.mockModule = getMockModule();
            context.mockModule._deps.messageSender =
              context.instance._deps.messageSender;
            context.reps = await ComposeText.prototype.send.call(
              context.mockModule,
              context.mockModule.messageText,
              context.mockModule.attachments,
            );
          }}
        />
        <Then
          desc="should call send with right params"
          action={(_: any, context: any) => {
            expect(context.reps[0].attachments).toBe(
              context.mockModule.attachments,
            );
            expect(context.reps[0].text).toBe(context.mockModule.messageText);
            expect(context.reps[0].toNumbers.length).toBe(1);
            expect(context.reps[0].toNumbers[0]).toBe(
              context.mockModule.toNumbers[0].phoneNumber,
            );
          }}
        />
      </Scenario>
    );
  }
}
