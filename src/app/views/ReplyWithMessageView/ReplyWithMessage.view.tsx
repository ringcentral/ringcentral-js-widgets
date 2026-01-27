import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import {
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  UIFunctions,
  UIProps,
  useConnector,
  useParams,
} from '@ringcentral-integration/next-core';
import { ReplyWithMessagePanel } from '@ringcentral-integration/widgets/components/ReplyWithMessagePanel';
import React, { useRef } from 'react';

import { ActiveCallControl, Webphone } from '../../services';

import type {
  ReplyWithMessageViewContainerProps,
  ReplyWithMessageViewOptions,
  ReplyWithMessageViewPanelProps,
  ReplyWithMessageViewParams,
} from './ReplyWithMessage.view.interface';
import { ReplyWithPattern } from './ReplyWithMessage.view.interface';
import { t } from './i18n';

@injectable({
  name: 'ReplyWithMessageView',
})
export class ReplyWithMessageView extends RcViewModule {
  private params: ReplyWithMessageViewParams = {};
  constructor(
    protected _locale: Locale,
    protected _router: RouterPlugin,
    @optional() protected _webphone?: Webphone,
    @optional()
    protected _activeCallControl?: ActiveCallControl,
    @optional('ReplyWithMessageViewOptions')
    protected _replyWithMessageViewOptions?: ReplyWithMessageViewOptions,
  ) {
    super();
  }

  getUIProps(
    props: ReplyWithMessageViewContainerProps,
  ): UIProps<ReplyWithMessageViewPanelProps> {
    const minString = t('min');
    const hourString = t('hour');
    return {
      currentLocale: this._locale.currentLocale,
      options: [
        {
          pattern: ReplyWithPattern.inAMeeting,
          text: t('inAMeeting'),
        },
        {
          pattern: ReplyWithPattern.onMyWay,
          text: t('onMyWay'),
        },
        {
          pattern: ReplyWithPattern.callMeBack,
          text: t('callMeBackIn'),
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
          text: t('willCallYouBackIn'),
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

  getUIFunctions(): UIFunctions<ReplyWithMessageViewPanelProps> {
    return {
      onBackClick: () => {
        this._router.goBack();
      },
      reply: async (params) => {
        const { type = 'active', sessionId } = this.params;

        if (!sessionId) {
          return;
        }
        // use active call control api
        if (type === 'active') {
          await this._activeCallControl?.replyWithMessage(params, sessionId);
        }
      },
    };
  }

  component(props: ReplyWithMessageViewContainerProps) {
    this.params = useParams<ReplyWithMessageViewParams>();

    const { current: uiFunctions } = useRef(this.getUIFunctions());
    // TODO: fix type
    const _props: any = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component =
      this._replyWithMessageViewOptions?.component || ReplyWithMessagePanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
