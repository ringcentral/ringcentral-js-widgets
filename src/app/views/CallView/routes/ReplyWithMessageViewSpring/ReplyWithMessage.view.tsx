import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import {
  ModalView,
  useModalItemView,
} from '@ringcentral-integration/micro-core/src/app/views';
import {
  computed,
  injectable,
  optional,
  portal,
  PortManager,
  RcViewModule,
  takeUntilAppDestroy,
  UIFunctions,
  UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import { SendMd } from '@ringcentral/spring-icon';
import { Icon, List, ListItem, ListItemText } from '@ringcentral/spring-ui';
import React, { useRef } from 'react';
import { tap } from 'rxjs';

import { CallAction, CallMonitor } from '../../../../services';
import { CallViewState } from '../../services';

import type {
  ReplyOption,
  ReplyWithMessageViewContainerProps,
  ReplyWithMessageViewOptions,
  ReplyWithMessageViewPanelProps,
} from './ReplyWithMessage.view.interface';
import { ReplyWithPattern } from './ReplyWithMessage.view.interface';
import { ReplyWithMessagePanel } from './ReplyWithMessagePanel';
import { t } from './i18n';

type ReplayDrawerProps = { call: Call; option: ReplyOption };

@injectable({
  name: 'ReplyWithMessageView',
})
export class ReplyWithMessageView extends RcViewModule {
  @portal
  private replyDrawer = this._modalView.create<ReplayDrawerProps>({
    view: () => {
      const { props, action } = useModalItemView<ReplayDrawerProps>();

      const payload = props.payload;

      if (!payload || !action) return null;

      const { call, option } = payload;
      const options = option?.options || [];

      return (
        <List className="my-2">
          {options.map((item, index) => (
            <ListItem
              divider={false}
              className="group"
              onClick={async () => {
                const telephonySessionId = call.telephonySessionId!;
                const handlers =
                  this._callAction.createActionsHandler(telephonySessionId);
                await handlers('startReply', {
                  replyWithPattern: {
                    pattern: option.pattern,
                    time: item.timeValue,
                    timeUnit: item.timeUnits,
                  },
                });

                action.close();
              }}
              key={`time-${item.timeValue}-${index}`}
            >
              <ListItemText primary={item.text} />
              <i className="flex-auto" />
              <Icon
                color="action.grayLight"
                className="hidden group-hover:block"
                size="small"
                symbol={SendMd}
              />
            </ListItem>
          ))}
        </List>
      );
    },
    props: () => ({
      header: null,
      type: 'drawer',
      disableBackdropClick: false,
    }),
  });

  @computed
  get options(): ReplyOption[] {
    const minString = t('min');
    const hourString = t('hour');

    return [
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
    ];
  }

  constructor(
    private _modalView: ModalView,
    private _callAction: CallAction,
    private _portManager: PortManager,
    private _callViewState: CallViewState,
    @optional('ReplyWithMessageViewOptions')
    private _replyWithMessageViewOptions?: ReplyWithMessageViewOptions,
  ) {
    super();

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.bindClearListener();
      });
    } else {
      this.bindClearListener();
    }
  }

  private bindClearListener() {
    // when call ended, or change to another call, clear the replay message drawer
    this._callAction.displayCallTelephonyIdChange$
      .pipe(
        tap(() => {
          this._modalView.close(this.replyDrawer);
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  getUIProps({
    call,
  }: ReplyWithMessageViewContainerProps): UIProps<ReplyWithMessageViewPanelProps> {
    const callViewState = this._callViewState.getCallViewState(
      call.telephonySessionId!,
    );

    return {
      call,
      options: this.options,
      replayMessage: callViewState.replayMessage,
    };
  }

  getUIFunctions({
    call,
  }: ReplyWithMessageViewContainerProps): UIFunctions<ReplyWithMessageViewPanelProps> {
    return {
      onReplayMessageChange: (val) => {
        this._callViewState.setCallViewState(call.telephonySessionId!, {
          replayMessage: val,
        });
      },
      onOptionClick: (option) => {
        const telephonySessionId = call.telephonySessionId!;
        const handlers =
          this._callAction.createActionsHandler(telephonySessionId);

        if (!option.options) {
          return handlers('startReply', {
            replyWithPattern: {
              pattern: option.pattern,
            },
          });
        }

        this._modalView.open(this.replyDrawer, { option, call });
      },
      onAction: (...args) => {
        const telephonySessionId = call.telephonySessionId!;
        const handlers =
          this._callAction.createActionsHandler(telephonySessionId);
        return handlers(...args);
      },
    };
  }

  component(props: ReplyWithMessageViewContainerProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
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
