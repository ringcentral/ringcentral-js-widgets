import {
  AppFooterNav,
  AppHeaderNav,
} from '@ringcentral-integration/micro-core/src/app/components';
import {
  FromField,
  MessageInput,
  PageHeader,
  SpringSpinnerOverlay as SpinnerOverlay,
} from '@ringcentral-integration/next-widgets/components';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import { fileToBase64 } from '@ringcentral-integration/utils';
import { InfoMd } from '@ringcentral/spring-icon';
import {
  Checkbox,
  FormLabel,
  Icon,
  Link,
  Text,
  Tooltip,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';

import { FileItem } from '../../../services';
import type {
  ComposeTextPanelSpringProps,
  SalesforceContact,
} from '../ComposeText.view.interface';

import { t } from './i18n';

export const ComposeTextPanel: React.FunctionComponent<
  ComposeTextPanelSpringProps
> = ({
  send,
  className,
  toNumbers,
  attachments,
  createGroupChecked,
  acceptFileTypes,
  onBackClick,
  messageText: originalMessageText,
  allowedCreateGroupText,
  showSpinner = false,
  senderNumber,
  maxRecipients,
  addAttachments,
  senderNumbers,
  typingToNumber,
  removeAttachment,
  supportAttachment = false,
  toolbar,
  updateMessageText,
  sendButtonDisabled,
  updateTypingToNumber,
  inputRef,
  updateSenderNumber,
  cleanTypingToNumber,
  addToNumbers,
  removeToNumber,
  onCreateGroupTextOptionChanged,
  ContactSearch: ToContactSearch,
  disabledGroupMessage = false,
  endAdornment,
}) => {
  const [messageText, setMessageText] = useAsyncState(
    originalMessageText,
    updateMessageText,
  );
  const [contactSearchExpanded, setContactSearchExpanded] = useState(false);

  const handleContactSelect = async (receiver: SalesforceContact[]) => {
    const isAdded = await addToNumbers(receiver);

    if (isAdded) cleanTypingToNumber();
  };

  const removeFromRecipients = (phoneNumber: string) => {
    removeToNumber({ phoneNumber });
  };

  const title = t('createNewText');

  const optOutCount = useMemo(() => {
    return toNumbers.filter(
      (toNumber) => toNumber.error && toNumber.errorReason === 'optOut',
    ).length;
  }, [toNumbers]);

  const showOptOutWarning = optOutCount > 0;

  const handleOptOutRemove = () => {
    toNumbers.forEach((toNumber) => {
      if (toNumber.error && toNumber.errorReason === 'optOut') {
        removeToNumber(toNumber);
      }
    });
  };
  return (
    <>
      <AppHeaderNav override>
        <PageHeader onBackClick={onBackClick}>
          <span className="sui-text sui-text-root truncate" title={title}>
            {title}
          </span>
        </PageHeader>
      </AppHeaderNav>
      <SpinnerOverlay loading={showSpinner}>
        <div
          className={clsx('h-full flex flex-col px-4 py-2 gap-2', className)}
        >
          <FromField
            fromNumber={senderNumber}
            fromNumbers={senderNumbers as any}
            onChange={({ phoneNumber }) => {
              updateSenderNumber(phoneNumber);
            }}
            hidden={!(senderNumbers.length > 0)}
            showAnonymous={false}
          />
          {/* @ts-ignore */}
          <ToContactSearch
            filterCallQueueExtension
            defaultTab="thirdParty"
            open={contactSearchExpanded}
            inputValue={typingToNumber}
            toNumbers={toNumbers}
            onSelect={handleContactSelect}
            maxRecipients={maxRecipients}
            onInputValueChange={updateTypingToNumber}
            onRemove={removeFromRecipients}
            onExpanded={setContactSearchExpanded}
            autoFocusInput={false}
            helperText={
              showOptOutWarning ? (
                <span>
                  {optOutCount === 1
                    ? t('optOutSingleRecipient')
                    : t('optOutMultipleRecipients')}{' '}
                  <Link variant="primary" onClick={handleOptOutRemove}>
                    {t('optOutRemove')}
                  </Link>
                </span>
              ) : undefined
            }
          />
          {!disabledGroupMessage && (
            <FormLabel
              className={clsx(contactSearchExpanded && 'hidden')}
              label={
                <span className="flex items-center gap-1">
                  <Text
                    className={clsx(
                      allowedCreateGroupText
                        ? 'text-neutral-b0'
                        : 'text-neutral-b3',
                      'typography-mainText',
                    )}
                  >
                    {t('createGroupText')}
                  </Text>
                  <Tooltip title={t('groupTextHint')}>
                    <Icon
                      size="small"
                      data-sign="groupTextHint"
                      symbol={InfoMd}
                      className="text-neutral-b2"
                    />
                  </Tooltip>
                </span>
              }
              placement="end"
            >
              <Checkbox
                disabled={!allowedCreateGroupText}
                inputProps={{
                  // @ts-ignore
                  'data-sign': 'createGroupText',
                }}
                checked={createGroupChecked}
                onChange={(e) => {
                  onCreateGroupTextOptionChanged(e.target.checked);
                }}
              />
            </FormLabel>
          )}
        </div>
      </SpinnerOverlay>

      <AppFooterNav>
        <div className="border-t border-neutral-b0-t20">
          <MessageInput
            inputRef={inputRef}
            inputText={messageText}
            acceptFileTypes={acceptFileTypes}
            onChange={setMessageText}
            toolbar={toolbar}
            sendDisabled={sendButtonDisabled}
            onSend={send}
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
            endAdornment={endAdornment}
            onRemoveAttachment={removeAttachment}
          />
        </div>
      </AppFooterNav>
    </>
  );
};
