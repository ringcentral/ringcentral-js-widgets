import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import i18nCore from '@ringcentral-integration/micro-core/src/app/views/ModalView/ModalItemView/ModalItemPanel/i18n';
import {
  action,
  autobind,
  delegate,
  injectable,
  RcViewModule,
  state,
  StoragePlugin,
  useConnector,
  userStorage,
} from '@ringcentral-integration/next-core';
import {
  GuideAnchor,
  GuidePopover,
  useGuidePopover,
} from '@ringcentral-integration/next-widgets/components';
import { useEffectOnDocumentFocus } from '@ringcentral-integration/react-hooks';
import { Button, Chip, IconButton, usePrevious } from '@ringcentral/spring-ui';
import React, { useMemo } from 'react';

import {
  COMPOSE_TEXT_CONVERSATION,
  type FilteredConversation,
  SmsOptOut,
} from '../../services';
import conversationPanelI18n from '../ConversationViewSpring/ConversationPanel/i18n';

// TODO: wait spring-ui release a new version to get the icon component
import smsMdIcon from './SMSMD.svg';
import i18n from './i18n';

export interface SmsOptOutViewProps {
  conversation: FilteredConversation;
}

@injectable({
  name: 'SmsOptOutView',
})
export class SmsOptOutView extends RcViewModule {
  constructor(private _smsOptOut: SmsOptOut, private _storage: StoragePlugin) {
    super();
    this._storage.enable(this);
  }

  @userStorage
  @state
  private hasSeenPopover = false;

  @action
  private _setHasSeenPopover(value: boolean) {
    this.hasSeenPopover = value;
  }

  @delegate('server')
  async setHasSeenPopover(value: boolean) {
    this._setHasSeenPopover(value);
  }

  @autobind
  Chip({ conversation }: SmsOptOutViewProps) {
    const { enabled, label } = useConnector(() => ({
      enabled: this._smsOptOut.getOptOut(conversation.conversationId!),
      label: this._smsOptOut.getStopHint(),
    }));

    const { t } = useLocale(conversationPanelI18n);

    if (!enabled) return null;

    return (
      <Chip
        label={label}
        onDelete={() => {
          this._smsOptOut.setOptOut(conversation.conversationId!, false);
        }}
        data-sign="optOutChip"
        classes={{
          label: 'max-w-[200px]',
          root: 'rounded-none h-auto p-0 mb-1',
        }}
        DeleteIconProps={{
          TooltipProps: {
            title: t('removeOptOut'),
          },
        }}
        truncate={false}
      />
    );
  }

  @autobind
  private ActionButton({ conversation }: SmsOptOutViewProps) {
    const { enabled, showPopover } = useConnector(() => {
      return {
        enabled: this._smsOptOut.getOptOut(conversation.conversationId!),
        showPopover: !this.hasSeenPopover,
      };
    });

    const { t } = useLocale(conversationPanelI18n, i18nCore, i18n);

    const { anchorRef, popoverOpen, open, close } = useGuidePopover({});

    const handleButtonClick = () => {
      if (showPopover) {
        open();
        this.setHasSeenPopover(true);
      } else {
        this._smsOptOut.setOptOut(conversation.conversationId!, !enabled);
      }
    };

    return (
      <>
        <GuideAnchor
          ref={anchorRef}
          popoverOpen={popoverOpen}
          closePopover={close}
          showHint={showPopover}
        >
          <IconButton
            TooltipProps={{
              title: t('insertOptOut'),
            }}
            disabled={enabled}
            size="large"
            variant="icon"
            color="secondary"
            symbol={smsMdIcon}
            className="text-neutral-b2"
            onClick={handleButtonClick}
            data-sign="optOutButton"
          />
        </GuideAnchor>
        <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
          <div className="mb-3">
            <div className="typography-subtitleBold text-neutral-b0 mb-2">
              {t('optOutPopoverTitle')}
            </div>
            <div className="typography-descriptor text-neutral-b1">
              {t('optOutPopoverDescription')}
            </div>
          </div>
          <div className="flex justify-end w-full">
            <Button
              onClick={close}
              data-sign="optOutPopoverGotIt"
              size="medium"
            >
              {t('ok')}
            </Button>
          </div>
        </GuidePopover>
      </>
    );
  }

  component(props: SmsOptOutViewProps) {
    const { conversation } = props;
    const conversationId = conversation.conversationId!;
    const correspondentMatchesList = conversation?.correspondentMatchesList;

    const hasMatches = useMemo(() => {
      const hasMatches =
        correspondentMatchesList?.some(
          (matches) =>
            matches.length > 0 &&
            matches.some(
              (match) =>
                match.entityType === 'rcContact' && match.type === 'company',
            ),
        ) ?? false;

      return hasMatches;
    }, [correspondentMatchesList]);

    const isCompose =
      conversation.conversationId === COMPOSE_TEXT_CONVERSATION.conversationId;

    const notShowOptOut =
      // if be internal, we don't need to show the opt out button
      hasMatches ||
      // in compose text, always have the opt out button
      (!isCompose &&
        // if there is not one to one conversation, we don't need to show the opt out button
        correspondentMatchesList &&
        correspondentMatchesList?.length !== 1);
    const showOptOut = !notShowOptOut;

    const prevShowOptOut = usePrevious(() => showOptOut);

    useEffectOnDocumentFocus(() => {
      if (
        // when prev is showing, now is not showing, and the conversation is opt out, set the conversation to not opt out
        prevShowOptOut &&
        !showOptOut &&
        this._smsOptOut.getOptOut(conversationId) &&
        conversationId
      ) {
        this._smsOptOut.setOptOut(conversationId, false);
      }
    }, [conversationId, notShowOptOut, prevShowOptOut, showOptOut]);

    if (notShowOptOut) return null;

    return <this.ActionButton {...props} />;
  }
}
