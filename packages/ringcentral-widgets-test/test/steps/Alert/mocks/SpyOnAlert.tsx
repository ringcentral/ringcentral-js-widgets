import { Alert } from '@ringcentral-integration/commons/modules/Alert';

import { StepFunction } from '../../../lib/step';

let spyOnAlert: jest.SpyInstance;

export const ClearAlertSpy: StepFunction = () => {
  spyOnAlert?.mockRestore();
};

export interface SpyOnAlertWithMessagesProps {
  /**
   * that messages array you want to bind
   */
  messages: string[];
  /**
   * callback when message be match
   */
  onShowMessage: (
    /**
     * that option call this alert
     */
    option: Parameters<typeof Alert.prototype.alert>[0],
    /**
     * original alert method
     */
    exec: () => Promise<string>,
  ) => Promise<string>;
}

/**
 * spy on alert method, make alert can inject some other method before or after trigger
 */
export const SpyOnAlertWithMessages: StepFunction<SpyOnAlertWithMessagesProps> =
  async ({ messages, onShowMessage }) => {
    const originalAlert = Alert.prototype.alert;

    spyOnAlert = jest
      .spyOn(Alert.prototype, 'alert')
      // eslint-disable-next-line func-names
      .mockImplementation(function (this: Alert, option) {
        const { message } = option;

        const exec = () => originalAlert.call(this, option);

        if (messages.includes(message)) {
          return onShowMessage(option, exec);
        }

        return exec();
      });
  };
