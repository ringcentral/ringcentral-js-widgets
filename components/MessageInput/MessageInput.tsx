import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { SendMd } from '@ringcentral/spring-icon';
import {
  IconButton,
  Textarea,
  getSelectionPosition,
  setSelectionPosition,
  useEventListener,
  useForkRef,
  usePrevious,
} from '@ringcentral/spring-ui';
import React, { FunctionComponent, useLayoutEffect, useRef } from 'react';

import { EmojiMenu, EmojiMenuAction } from './EmojiMenu';
import {
  AttachButton,
  AttachmentList,
  FileItem,
  SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE,
} from './FileAttacher';
import i18n from './i18n';
import { getTextFieldInsertResult, setNativeValue } from './utils';

export type MessageInputProps = {
  inputText: string;
  onChange: (text: string) => void;
  acceptFileTypes?: string;
  /**
   * is that can add attachment
   *
   * @default true
   * */
  supportAttachment?: boolean;
  /**
   * the additional toolbar react node
   */
  toolbar?: React.ReactNode;
  attachments: FileItem[];
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  sendDisabled: boolean;
  /**
   * is that listen keyboard send event with `enter` and also show send button
   *
   * @default true
   */
  sendButton?: boolean;
  onAddAttachment: (files: File[], sendDirectly?: boolean) => void;
  onRemoveAttachment: (file: FileItem) => void;
  onSend?: (value: string, attachments: FileItem[]) => void;
  className?: string;
  /**
   * the max length of the input text
   *
   * @default 1000
   */
  maxLength?: number;
  /**
   * additional end adornment element
   */
  endAdornment?: React.ReactNode;
};
const SMS_ACCEPT_TYPES = SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE.join();

export const MessageInput: FunctionComponent<MessageInputProps> = ({
  inputText,
  acceptFileTypes = SMS_ACCEPT_TYPES,
  supportAttachment = true,
  toolbar,
  attachments: inputAttachmentList,
  inputRef: inputRefProp,
  sendDisabled,
  sendButton = true,
  onAddAttachment,
  onRemoveAttachment,
  onChange,
  onSend,
  className,
  maxLength = 1000,
  endAdornment,
  ...rest
}) => {
  const { t } = useLocale(i18n);
  const attachmentListLength = inputAttachmentList.length;
  const innerRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useForkRef(innerRef, inputRefProp!);
  const emojiActionRef = useRef<EmojiMenuAction>(null);

  const latestPosRef = useRef<ReturnType<typeof getSelectionPosition> | null>(
    null,
  );

  const prevAttachmentListLength = usePrevious(
    () => attachmentListLength,
    true,
  );

  const onSendSms = () => {
    if (sendDisabled) return;

    // after send message auto close emoji dialog
    emojiActionRef.current?.close();
    onSend?.(inputText, inputAttachmentList);
  };

  // when have new attachment, scroll to bottom of attachment list
  useLayoutEffect(() => {
    const addNewAttachment = attachmentListLength > prevAttachmentListLength;
    if (!addNewAttachment) return;

    const scrollElm = scrollRef.current;
    if (scrollElm) {
      scrollElm.scrollTop = scrollElm.scrollHeight;
    }
  });

  useEventListener(innerRef, 'change-programmatically', (e: CustomEvent) => {
    onChange(e.detail);
  });

  return (
    <div data-sign="message-editor" className={className} {...rest}>
      {/* Action Bar */}
      <div className="h-10 flex items-center justify-between px-3">
        <div className="flex items-center">
          {supportAttachment && (
            <AttachButton
              multiple
              acceptTypes={acceptFileTypes}
              TooltipProps={{
                title: t('attachFiles'),
              }}
              onUpload={(files: File[]) => {
                // when upload be trigger also close popup
                emojiActionRef.current?.close();
                onAddAttachment(files);
              }}
            />
          )}
          <EmojiMenu
            action={emojiActionRef}
            getInputElement={() => innerRef.current!}
            onSelect={(data: any, position: any) => {
              const textarea = innerRef.current;
              if (!textarea) return;

              const emoji = data.native;

              const result = getTextFieldInsertResult({
                input: textarea,
                insertValue: emoji,
                sourcePosition: position,
              });

              const nextPositionInfo = result.start;

              if (nextPositionInfo) {
                requestAnimationFrame(() => {
                  setSelectionPosition(textarea, {
                    start: nextPositionInfo,
                    end: nextPositionInfo,
                  });
                });
              }

              setNativeValue(textarea, result.value);
              textarea.focus();
            }}
          />
          {toolbar}
        </div>
        {inputText && (
          <span
            title={t('smsNewLineHint')}
            className="typography-descriptor text-neutral-b2 truncate"
          >
            {t('smsNewLineHint')}
          </span>
        )}
      </div>

      {/* Text Field */}
      <div className="relative px-3 pb-2">
        <Textarea
          maxRows={17}
          size="medium"
          placeholder={t('smsEditHint')}
          classes={{
            formFieldContent: 'flex-col items-start',
          }}
          variant="outlined"
          value={inputText}
          inputRef={inputRef}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onPaste={(e) => {
            if (!supportAttachment) return;

            const files = Array.from(e.clipboardData.files);
            if (files.length > 0) {
              onAddAttachment(files);
            }
          }}
          className="w-full"
          inputProps={{
            'data-sign': 'messageInput',
            onKeyPress: sendButton
              ? (e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();

                    return onSendSms();
                  }
                }
              : undefined,
            onKeyDown: (e) => {
              if (e.key === 'Escape') {
                emojiActionRef.current?.close();
              }
            },
            onBlur: (e) => {
              // save the latest position when the textarea is blurred for we can insert the template at the right position
              latestPosRef.current = getSelectionPosition(e.currentTarget);

              e.currentTarget.dataset.latestPos = JSON.stringify(
                latestPosRef.current,
              );
            },
            maxLength,
          }}
          clearBtn={false}
          endAdornment={
            sendButton ? (
              <>
                {endAdornment}
                <div className="absolute right-1 bottom-1">
                  <IconButton
                    TooltipProps={{
                      title: sendDisabled ? undefined : t('smsSendTooltip'),
                    }}
                    disabled={sendDisabled}
                    color="primary"
                    size="small"
                    data-sign="messageButton"
                    variant="icon"
                    onMouseDown={(e) => e.preventDefault()}
                    symbol={SendMd}
                    onClick={onSendSms}
                  />
                </div>
                <div className="w-6" />
              </>
            ) : (
              endAdornment
            )
          }
        />
      </div>

      {/* Attachment List */}
      {inputAttachmentList.length > 0 && (
        <section
          ref={scrollRef}
          className="max-h-[125px] overflow-y-auto px-3 pb-3"
        >
          <div className="flex flex-1 flex-wrap gap-2">
            <AttachmentList
              files={inputAttachmentList}
              onRemoveAttachment={onRemoveAttachment}
              data-sign="textAttachmentsList"
            />
          </div>
        </section>
      )}
    </div>
  );
};
