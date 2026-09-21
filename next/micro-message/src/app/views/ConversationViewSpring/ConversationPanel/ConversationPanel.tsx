import {
  AppFooterNav,
  AppHeaderNav,
} from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { useContactRenderInfoFromConversation } from '@ringcentral-integration/micro-phone/src/app/hooks';
import { ContactDisplayRender } from '@ringcentral-integration/micro-phone/src/app/hooks/useContactRenderInfo/components';
import {
  MessageInput,
  PageHeader,
} from '@ringcentral-integration/next-widgets/components';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import { fileToBase64 } from '@ringcentral-integration/utils';
import { Alert, CircularProgressIndicator } from '@ringcentral/spring-ui';
import React, { FC, useRef } from 'react';

import type { FileItem } from '../../../services';
import { useConversationActionButtons } from '../../ConversationsViewSpring/useConversationActionButtons';
import { useThreadInfoDisplay } from '../../MessageThreadsView/useThreadInfoDisplay';
import { ConversationViewSpringPanelProps } from '../Conversation.view.interface';

import {
  ConversationMessageList,
  type ConversationMessageListProps,
} from './ConversationMessageList';
import i18n from './i18n';

export const ConversationPanel: FC<
  Omit<ConversationViewSpringPanelProps, 'conversation'> &
    Required<Pick<ConversationViewSpringPanelProps, 'conversation'>> &
    Pick<ConversationMessageListProps, 'timeKey'>
> = ({
  messageText: _messageText = '',
  updateMessageText = () => null,
  attachments = [],
  supportAttachment = false,
  addAttachments = () => null,
  removeAttachment = () => null,
  conversation,
  messages,
  replyToReceivers,
  sendButtonDisabled,
  acceptFileTypes,
  onLinkClick,
  goBack,
  inputRef,
  toolbar,
  createNewEntityTooltip,
  alertProps,
  showAlert,
  displayLogStatus = false,
  showLogPopover,
  renderLogIndicator,
  useConversationItemInfo,
  useActionsHandler,
  threadInfo,
  extensionId,
  threadMetadata,
  sending = false,
  timeKey,
  endAdornment,
  showSharedSmsLogReminder = false,
  onDismissSharedSmsLogReminder,
}) => {
  const { t } = useLocale(i18n);
  const viewLogAnchorRef = useRef<HTMLDivElement>(null);
  const [messageText, setMessageText] = useAsyncState(
    _messageText,
    updateMessageText,
  );

  const { DisplayName, correspondentsDisplayInfoMap } =
    useContactRenderInfoFromConversation(conversation, {
      timePresentationMode: 'withTime',
      displayLogStatus,
    });

  const { info, actions = [] } = useConversationItemInfo(conversation);
  const onAction = useActionsHandler(
    conversation,
    info,
    'Text conversation page',
  );

  const {
    bannerDisplay,
    ThreadBanner,
    ThreadStatus,
    showInput: threadShowInput,
  } = useThreadInfoDisplay({
    info: threadInfo,
    extensionId,
    onAction,
    metadata: threadMetadata,
  });

  // Hide input when alert is shown (e.g., opt out)
  const showInput = !showAlert && threadShowInput;

  const buttons = useConversationActionButtons({
    actions,
    conversation,
    showLogPopover,
    onAction,
    createNewEntityTooltip,
    variant: 'plain',
    displayCount: 2,
    moreButtonProps: { variant: 'contained' },
  });

  return (
    <>
      <AppHeaderNav override>
        <PageHeader onBackClick={() => goBack()} endAdornment={buttons}>
          <div
            data-sign="currentName"
            className="flex justify-center items-center gap-1 overflow-hidden"
          >
            <DisplayName
              displayControl={{
                maybe: true,
                matchCounts: true,
                align: 'center',
              }}
            />
            <ThreadStatus />
          </div>
        </PageHeader>
        {showSharedSmsLogReminder ? (
          <div className="px-4 pb-2 border-b border-neutral-b0-t10">
            <Alert
              data-sign="sharedSmsLogReminder"
              severity="info"
              onClose={() => {
                onDismissSharedSmsLogReminder?.();
              }}
              className="typography-mainText text-neutral-b1"
            >
              {t('sharedSmsLogReminder')}
            </Alert>
          </div>
        ) : null}
      </AppHeaderNav>

      <div
        data-sign="conversationPanel"
        ref={viewLogAnchorRef}
        className="relative h-full"
      >
        {sending && (
          <div className="absolute bottom-2 left-2">
            <CircularProgressIndicator size="xsmall" />
          </div>
        )}
        <ConversationMessageList
          messages={messages}
          className="h-full"
          timeKey={timeKey}
          renderSenderName={(message) => {
            const phoneNumber =
              message.from &&
              (message.from.extensionNumber ?? message.from.phoneNumber);

            const displayInfo = phoneNumber
              ? correspondentsDisplayInfoMap?.get(phoneNumber)
              : undefined;

            if (!displayInfo) return null;

            return (
              <div className="text-neutral-b2 typography-detailBold mb-1">
                <ContactDisplayRender info={displayInfo} />
              </div>
            );
          }}
          renderLogIndicator={renderLogIndicator}
          onLinkClick={onLinkClick}
        />
      </div>
      <AppFooterNav>
        {showAlert ? (
          <Alert
            className="m-4"
            severity="error"
            startSlot={null}
            {...alertProps}
          />
        ) : bannerDisplay ? (
          <ThreadBanner />
        ) : null}

        {showInput ? (
          <div className="border-t border-neutral-b0-t20">
            <MessageInput
              inputText={messageText}
              acceptFileTypes={acceptFileTypes}
              onChange={setMessageText}
              sendDisabled={sendButtonDisabled}
              onSend={replyToReceivers}
              attachments={attachments as FileItem[]}
              supportAttachment={supportAttachment}
              onAddAttachment={async (data) => {
                const files = await Promise.all(
                  data.map(async (file) => {
                    const { name, size } = file;
                    const base64Url = await fileToBase64(file);
                    return {
                      name,
                      size,
                      file,
                      base64Url,
                    };
                  }),
                );
                addAttachments(files);
              }}
              onRemoveAttachment={removeAttachment}
              inputRef={inputRef}
              endAdornment={endAdornment}
              toolbar={toolbar}
            />
          </div>
        ) : null}
      </AppFooterNav>
    </>
  );
};

ConversationPanel.displayName = 'ConversationPanel';
