import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import { CaretLeftMd, SendMd } from '@ringcentral/spring-icon';
import {
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Textarea,
  useResizeObserver,
} from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React, { useRef, useState } from 'react';

import { useContactRenderInfoFromCall } from '../../../../../hooks';
import { ReplyWithMessageViewPanelProps } from '../ReplyWithMessage.view.interface';

import i18n from './i18n';
import { sanitizedMessage } from './sanitizedMessage';

/**
 * base on container height, calculate the max row of textarea dynamically
 *
 * TODO: if other place need that, move to react-hooks and make that be more generic
 */
const useSpringTextareaDynamicMaxRows = () => {
  const [maxRow, setMaxRow] = useState(20);
  const textareaContainerRef = useRef<HTMLDivElement>(null);

  useResizeObserver(
    textareaContainerRef,
    () => {
      const hullElm = textareaContainerRef.current;
      if (!hullElm) return;
      const formField =
        textareaContainerRef.current.querySelector<HTMLDivElement>(
          '.sui-form-field-container',
        );
      if (!formField) return;

      const clientHeight = hullElm.clientHeight;
      formField.style.display = 'none';
      const spaceHeight =
        clientHeight -
        formField.clientHeight -
        // space
        32 -
        // textarea padding
        32 -
        // buffer
        32;
      formField.style.display = '';

      const newMaxRow = Math.floor((spaceHeight || 16 * 20) / 16);

      setMaxRow(newMaxRow);
    },
    {
      mode: 'throttle',
    },
  );

  return { textareaContainerRef, maxRow };
};

export const ReplyWithMessagePanel: FunctionComponent<
  ReplyWithMessageViewPanelProps
> = ({
  call,
  options,
  replayMessage: replayMessageProp,
  onAction,
  onOptionClick,
  onReplayMessageChange: onReplayMessageChangeProp,
}) => {
  const [replayMessage, onReplayMessageChange] = useAsyncState(
    replayMessageProp,
    onReplayMessageChangeProp,
  );
  const { DisplayName, displayPhoneNumber, Avatar } =
    useContactRenderInfoFromCall(call, {
      phoneNumberDisplayMode: 'unknown',
      hideBlockedFromInfo: true,
    });

  const { t } = useLocale(i18n);

  const { textareaContainerRef, maxRow } = useSpringTextareaDynamicMaxRows();

  return (
    <div data-sign="replyWithMessagePage" className="flex flex-col h-full">
      <div
        data-sign="call-information"
        className="mt-5 mx-2 gap-1 flex items-center flex-none"
      >
        <IconButton
          symbol={CaretLeftMd}
          color="secondary"
          variant="icon"
          data-sign="backButton"
          onClick={() => {
            onAction('activeCall');
          }}
        />
        <Avatar size="xlarge" />

        <div className="ml-2">
          <h3
            className="typography-title text-neutral-b0 truncate w-full flex flex-col"
            data-sign="userDisplayName"
          >
            <DisplayName
              displayControl={{
                maybe: true,
                viewable: true,
                matchCounts: true,
              }}
            />
          </h3>
          <p
            className="typography-descriptorMini text-neutral-b0"
            data-sign="userPhoneNumber"
          >
            {displayPhoneNumber}
          </p>
        </div>
      </div>

      <List className="mt-8 flex-none">
        {options.map((item, index) => (
          <ListItem
            key={index}
            divider={false}
            onClick={() => {
              onOptionClick?.(item);
            }}
            className="group"
            data-sign={item.text}
          >
            <ListItemText primary={item.text} />
            <i className="flex-auto" />
            {!item.options && (
              <Icon
                color="action.grayLight"
                size="small"
                symbol={SendMd}
                className="hidden group-hover:block"
                data-sign="sendIcon"
              />
            )}
          </ListItem>
        ))}
      </List>
      <div
        className="mt-5 mb-3 mx-4 flex-auto overflow-hidden"
        ref={textareaContainerRef}
        data-sign="customMessage"
      >
        <Textarea
          fullWidth
          value={replayMessage}
          minRows={2}
          maxRows={maxRow}
          onChange={(event) => {
            const result = sanitizedMessage(event.target.value);

            onReplayMessageChange(result);
          }}
          label={t('customMessage')}
          placeholder={t('customMessagePlaceholder')}
          inputProps={{ maxLength: 100 }}
          showCharacterCount
          onKeyDown={(e) => {
            // when in composition mode, do not handle enter key, user still typing
            if (e.nativeEvent.isComposing) return;

            const event = e as React.KeyboardEvent;
            const value = (event.target as HTMLTextAreaElement)?.value;

            if (!event.shiftKey && event.key === 'Enter') {
              onAction('startReply', {
                // remove leading and trailing spaces
                replyWithText: value.trim(),
              });
              e.preventDefault();
            }
          }}
        />
      </div>
    </div>
  );
};
