import { debounce } from '@ringcentral-integration/commons/lib/debounce-throttle/debounce';
import { fileToBase64 } from '@ringcentral-integration/utils';
import { RcIconButton, setSelectionPosition } from '@ringcentral/juno';
import { SendFilled } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { EmojiMenu } from './EmojiMenu';
import {
  AttachButton,
  AttachmentList,
  FileItem,
  SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE,
} from './FileAttacher';
import i18n from './i18n';
import styles from './styles.scss';
import { getTextFieldInsertResult, setNativeValue } from './utils';

export const UIHeightOffset = 10;
// display up to preview 3 items in view
export const MAX_PREVIEW_ATTACHMENT_SIZE = 2.5;
const SMS_ACCEPT_TYPES = SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE.join();

class MessageInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    currentLocale: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    sendButtonDisabled: PropTypes.bool,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    maxLength: PropTypes.number,
    onSend: PropTypes.func,
    onChange: PropTypes.func,
    onHeightChange: PropTypes.func,
    inputExpandable: PropTypes.bool,
    supportAttachment: PropTypes.bool,
    supportEmoji: PropTypes.bool,
    attachments: PropTypes.array,
    addAttachments: PropTypes.func,
    removeAttachment: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    sendButtonDisabled: false,
    onSend: undefined,
    onChange: undefined,
    onHeightChange: undefined,
    minHeight: 41,
    maxHeight: 300,
    maxLength: 1000,
    inputExpandable: true,
    supportAttachment: false,
    supportEmoji: false,
    attachments: [],
    addAttachments: undefined,
    removeAttachment: undefined,
  };

  _lastValueChange: any;
  textArea: any;
  emojiActionRef: any;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      value: props.value,
      height: props.minHeight,
      attachmentsLength: 0,
    };
    this._lastValueChange = 0;
    this.emojiActionRef = React.createRef();
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
      nextProps.value !== this.state.value &&
      // ignore value changes from props for 300ms after typing
      // this is to prevent unnecessary value changes when used in chrome extension
      // where value pushed back to background and back takes longer
      Date.now() - this._lastValueChange > 300
    ) {
      // use setState(updater, callback) to recalculate height after value has been update to DOM
      this.setState(
        () => ({
          value: nextProps.value,
        }),
        () => {
          this.setNewHeight();
        },
      );
    }
    const newAttachmentsLength = nextProps.attachments?.length;
    if (
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
      newAttachmentsLength !== this.state.attachmentsLength &&
      nextProps.supportAttachment
    ) {
      this.setState({
        attachmentsLength: newAttachmentsLength,
      });
      // need to pass latest attachments length to calculate new height
      this.setNewHeight(newAttachmentsLength);
    }
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    // do a initial size check in case the component is mounted with multi line value
    this.setNewHeight();
  }

  calculateNewHeight(attachmentsLength?: number) {
    // @ts-expect-error TS(2339): Property 'inputExpandable' does not exist on type ... Remove this comment to see the full error message
    if (!this.props.inputExpandable) {
      // @ts-expect-error TS(2339): Property 'minHeight' does not exist on type 'Reado... Remove this comment to see the full error message
      return this.props.minHeight;
    }
    // temporarily set height to 0 to check scrollHeight
    this.textArea.style.height = 0;
    const newHeight = this.textArea.scrollHeight + UIHeightOffset;
    // set height back to original to avoid messing with react
    // @ts-expect-error TS(2339): Property 'height' does not exist on type 'Readonly... Remove this comment to see the full error message
    this.textArea.style.height = `${this.state.height - UIHeightOffset}px`;
    const {
      // @ts-expect-error TS(2339): Property 'minHeight' does not exist on type 'Reado... Remove this comment to see the full error message
      minHeight,
      // @ts-expect-error TS(2339): Property 'maxHeight' does not exist on type 'Reado... Remove this comment to see the full error message
      maxHeight,
      // @ts-expect-error TS(2339): Property 'attachments' does not exist on type 'Reado... Remove this comment to see the full error message
      attachments,
      // @ts-expect-error TS(2339): Property 'supportAttachment' does not exist on type 'Reado... Remove this comment to see the full error message
      supportAttachment,
      // @ts-expect-error TS(2339): Property 'supportEmoji' does not exist on type 'Reado... Remove this comment to see the full error message
      supportEmoji,
    } = this.props;
    const mmsLength = attachmentsLength ?? attachments.length;
    const attachmentsHeight =
      (mmsLength > MAX_PREVIEW_ATTACHMENT_SIZE
        ? MAX_PREVIEW_ATTACHMENT_SIZE
        : mmsLength) * 50;
    const inputToolBarHeight = supportAttachment || supportEmoji ? 40 : 0;
    const othersHeight = attachmentsHeight + inputToolBarHeight;
    if (newHeight < minHeight) {
      return minHeight;
    }
    if (newHeight > maxHeight - othersHeight) {
      return maxHeight - othersHeight;
    }
    return newHeight;
  }

  setNewHeight(attachmentsLength?: number) {
    const newHeight = this.calculateNewHeight(attachmentsLength);
    // @ts-expect-error TS(2339): Property 'height' does not exist on type 'Readonly... Remove this comment to see the full error message
    if (newHeight !== this.state.height) {
      // @ts-expect-error TS(2339): Property 'onHeightChange' does not exist on type '... Remove this comment to see the full error message
      if (typeof this.props.onHeightChange === 'function') {
        // @ts-expect-error TS(2339): Property 'onHeightChange' does not exist on type '... Remove this comment to see the full error message
        this.props.onHeightChange(newHeight);
      }
      this.setState({
        height: newHeight,
      });
    }
  }

  onChange = (e: any) => {
    this._lastValueChange = Date.now();
    const {
      currentTarget: { value },
    } = e;
    const newHeight = this.calculateNewHeight();
    if (
      // @ts-expect-error TS(2339): Property 'height' does not exist on type 'Readonly... Remove this comment to see the full error message
      newHeight !== this.state.height &&
      // @ts-expect-error TS(2339): Property 'onHeightChange' does not exist on type '... Remove this comment to see the full error message
      typeof this.props.onHeightChange === 'function'
    ) {
      // @ts-expect-error TS(2339): Property 'onHeightChange' does not exist on type '... Remove this comment to see the full error message
      this.props.onHeightChange(newHeight);
    }
    this.setState({
      value,
      height: newHeight,
    });
    // ues debounce for avoiding frequent updates compose text module state
    this.updateMessageText?.();
  };

  updateMessageText =
    // @ts-expect-error TS(2339): Property 'onChange' does not exist on type 'Readon... Remove this comment to see the full error message
    typeof this.props.onChange === 'function'
      ? debounce({
          // @ts-expect-error TS(2339): Property 'onChange' does not exist on type 'Readon... Remove this comment to see the full error message
          fn: () => this.props.onChange(this.state.value),
        })
      : null;

  onKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      // TODO: this component should be refactored whole UX logic
      // @ts-expect-error TS(2339): Property 'sendButtonDisabled' does not exist on ty... Remove this comment to see the full error message
      if (this.props.sendButtonDisabled) return;

      this.onSend();
    }
  };

  onSend = () => {
    this.updateMessageText?.flush();
    // @ts-expect-error TS(2339): Property 'disabled' does not exist on type 'Readon... Remove this comment to see the full error message
    if (!this.props.disabled && typeof this.props.onSend === 'function') {
      // @ts-expect-error TS(2339): Property 'onSend' does not exist on type 'Readonly... Remove this comment to see the full error message
      this.props.onSend(this.state.value, this.props.attachments);
    }
  };

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      currentLocale,
      // @ts-expect-error TS(2339): Property 'disabled' does not exist on type 'Readon... Remove this comment to see the full error message
      disabled,
      // @ts-expect-error TS(2339): Property 'sendButtonDisabled' does not exist on ty... Remove this comment to see the full error message
      sendButtonDisabled,
      // @ts-expect-error TS(2339): Property 'maxLength' does not exist on type 'Reado... Remove this comment to see the full error message
      maxLength,
      // @ts-expect-error TS(2339): Property 'supportAttachment' does not exist on typ... Remove this comment to see the full error message
      supportAttachment,
      // @ts-expect-error TS(2339): Property 'supportEmoji' does not exist on typ... Remove this comment to see the full error message
      supportEmoji,
      // @ts-expect-error TS(2339): Property 'attachments' does not exist on type 'Rea... Remove this comment to see the full error message
      attachments,
      // @ts-expect-error TS(2339): Property 'removeAttachment' does not exist on type... Remove this comment to see the full error message
      removeAttachment,
      // @ts-expect-error TS(2339): Property 'addAttachments' does not exist on type... Remove this comment to see the full error message
      addAttachments,
    } = this.props;
    // @ts-expect-error TS(2339): Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
    const { value, height } = this.state;
    const inputHeight = height - UIHeightOffset;
    const hasToolBar = supportEmoji || supportAttachment;
    return (
      <div className={clsx(styles.root)}>
        {hasToolBar && (
          <div>
            {supportAttachment && (
              <AttachButton
                multiple
                currentLocale={currentLocale}
                acceptTypes={SMS_ACCEPT_TYPES}
                onUpload={async (data) => {
                  // when upload be trigger also close popup
                  this.emojiActionRef.current?.close();
                  if (data?.length) {
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
                    addAttachments?.(files);
                  }
                }}
              />
            )}
            {supportEmoji && (
              <EmojiMenu
                data-sign="emojiButton"
                action={this.emojiActionRef}
                currentLocale={currentLocale}
                getInputElement={() => this.textArea!}
                onSelect={(data, position) => {
                  if (!this.textArea) return;

                  const emoji = data.native;

                  const result = getTextFieldInsertResult({
                    input: this.textArea,
                    insertValue: emoji,
                    sourcePosition: position,
                  });

                  const nextPositionInfo = result.start;

                  if (nextPositionInfo) {
                    requestAnimationFrame(() => {
                      setSelectionPosition(this.textArea, {
                        start: nextPositionInfo,
                        end: nextPositionInfo,
                      });
                    });
                  }

                  setNativeValue(this.textArea, result.value);
                  this.textArea.focus();
                }}
              />
            )}
          </div>
        )}
        <div
          className={clsx(
            styles.textField,
            !hasToolBar ? styles.textFieldMargin : null,
          )}
        >
          <textarea
            data-sign="messageInput"
            ref={(target) => {
              this.textArea = target;
            }}
            placeholder={i18n.getString('typeMessage', currentLocale)}
            value={value}
            maxLength={maxLength}
            onChange={this.onChange}
            onKeyPressCapture={this.onKeyDown}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                this.emojiActionRef.current?.close();
              }
            }}
            style={{
              height: inputHeight,
            }}
            disabled={disabled}
          />
          <div className={styles.submitField}>
            <RcIconButton
              size="small"
              data-sign="messageButton"
              disabled={disabled || sendButtonDisabled}
              symbol={SendFilled}
              color="action.primary"
              onClick={this.onSend}
            />
          </div>
        </div>
        {supportAttachment && attachments?.length > 0 && (
          <div className={styles.attachments}>
            <AttachmentList
              files={attachments as FileItem[]}
              onRemoveAttachment={removeAttachment}
              data-sign="textAttachmentsList"
            />
          </div>
        )}
      </div>
    );
  }
}

export default MessageInput;
