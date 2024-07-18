import { Module } from '@ringcentral-integration/commons/lib/di';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { RcUIModuleV2 } from '@ringcentral-integration/core';

import type {
  Deps,
  ReplyWithMessageUIPanelProps,
  ReplyWithMessageUIContainerProps,
} from './ReplyWithMessageUI.interface';
import { ReplyWithPattern } from './ReplyWithMessageUI.interface';
import i18n from './i18n';

@Module({
  name: 'ReplyWithMessageUI',
  deps: [
    'Locale',
    'RouterInteraction',
    { dep: 'Webphone', optional: true },
    { dep: 'ActiveCallControl', optional: true },
  ],
})
export class ReplyWithMessageUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  getUIProps(): UIProps<ReplyWithMessageUIPanelProps> {
    const minString = i18n.getString('min', this._deps.locale.currentLocale);
    const hourString = i18n.getString('hour', this._deps.locale.currentLocale);
    return {
      currentLocale: this._deps.locale.currentLocale,
      options: [
        {
          pattern: ReplyWithPattern.inAMeeting,
          text: i18n.getString('inAMeeting', this._deps.locale.currentLocale),
        },
        {
          pattern: ReplyWithPattern.onMyWay,
          text: i18n.getString('onMyWay', this._deps.locale.currentLocale),
        },
        {
          pattern: ReplyWithPattern.callMeBack,
          text: i18n.getString('callMeBackIn', this._deps.locale.currentLocale),
          options: [
            {
              text: `5 ${minString}`,
              timeValue: 5,
              timeUnits: 'Minute',
            },
            { text: `10 ${minString}`, timeValue: 10, timeUnits: 'Minute' },
            { text: `30 ${minString}`, timeValue: 30, timeUnits: 'Minute' },
            { text: `1 ${hourString}`, timeValue: 1, timeUnits: 'Hour' },
          ],
        },
        {
          pattern: ReplyWithPattern.willCallYouBack,
          text: i18n.getString(
            'willCallYouBackIn',
            this._deps.locale.currentLocale,
          ),
          options: [
            {
              text: `5 ${minString}`,
              timeValue: 5,
              timeUnits: 'Minute',
            },
            { text: `10 ${minString}`, timeValue: 10, timeUnits: 'Minute' },
            { text: `30 ${minString}`, timeValue: 30, timeUnits: 'Minute' },
            { text: `1 ${hourString}`, timeValue: 1, timeUnits: 'Hour' },
          ],
        },
      ],
      displayCustomMessage: true,
    };
  }

  getUIFunctions({
    params: { sessionId, type = 'active' },
  }: ReplyWithMessageUIContainerProps): UIFunctions<ReplyWithMessageUIPanelProps> {
    return {
      onBackClick: () => {
        this._deps.routerInteraction.goBack();
      },
      reply: async (params) => {
        // use active call control api
        if (type === 'active') {
          await this._deps.activeCallControl?.replyWithMessage(
            params,
            sessionId,
          );
        }
      },
    };
  }
}
