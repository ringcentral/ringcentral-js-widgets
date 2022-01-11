import React, { Component } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { debounce } from '@ringcentral-integration/commons/lib/debounce-throttle/debounce';
import { RcIconButton } from '@ringcentral/juno';
import {
  Attachment as attachmentSvg,
  Close as removeSvg,
} from '@ringcentral/juno/icon';

import i18n from './i18n';
import styles from './styles.scss';

const UIHeightOffset = 23;
// the extra height of the entire field with paddings and borders

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
    attachments: PropTypes.array,
    addAttachment: PropTypes.func,
    removeAttachment: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    sendButtonDisabled: false,
    onSend: undefined,
    onChange: undefined,
    onHeightChange: undefined,
    minHeight: 63,
    maxHeight: 300,
    maxLength: 1000,
    inputExpandable: true,
    supportAttachment: false,
    attachments: [],
    addAttachment: undefined,
    removeAttachment: undefined,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.value,
      height: props.minHeight,
    };
    this._lastValueChange = 0;
    this._fileInputRef = React.createRef();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.value !== this.state.value &&
      // ignore value changes from props for 300ms after typing
      // this is to prevent unnecessary value changes when used in chrome extension
      // where value pushed back to background and back takes longer
      Date.now() - this._lastValueChange > 300
    ) {
      // use setState(updater, callback) to recaculate height after value has been update to DOM
      this.setState(
        () => ({
          value: nextProps.value,
        }),
        () => {
          const newHeight = this.calculateNewHeight();
          if (newHeight !== this.state.height) {
            if (typeof this.props.onHeightChange === 'function') {
              this.props.onHeightChange(newHeight);
            }
            this.setState({
              height: newHeight,
            });
          }
        },
      );
    }
  }

  componentDidMount() {
    // do a initial size check in case the component is mounted with multi line value
    const newHeight = this.calculateNewHeight();
    if (newHeight !== this.state.height) {
      if (typeof this.props.onHeightChange === 'function') {
        this.props.onHeightChange(newHeight);
      }
      this.setState({
        height: newHeight,
      });
    }
  }

  calculateNewHeight() {
    if (!this.props.inputExpandable) {
      return this.props.minHeight;
    }
    // temperarily set height to 0 to check scrollHeight
    this.textArea.style.height = 0;
    const newHeight = this.textArea.scrollHeight + 10 + UIHeightOffset;
    // set height back to original to avoid messing with react
    this.textArea.style.height = `${this.state.height - UIHeightOffset}px`;
    const { minHeight, maxHeight } = this.props;
    if (newHeight < minHeight) {
      return minHeight;
    }
    if (newHeight > maxHeight) {
      return maxHeight;
    }
    return newHeight;
  }

  onChange = (e) => {
    this._lastValueChange = Date.now();
    const {
      currentTarget: { value },
    } = e;
    const newHeight = this.calculateNewHeight();
    if (
      newHeight !== this.state.height &&
      typeof this.props.onHeightChange === 'function'
    ) {
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
    typeof this.props.onChange === 'function'
      ? debounce({
          fn: () => this.props.onChange(this.state.value),
        })
      : null;

  onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.onSend();
    }
  };

  onSend = () => {
    this.updateMessageText?.flush();
    if (!this.props.disabled && typeof this.props.onSend === 'function') {
      this.props.onSend(this.state.value, this.props.attachments);
    }
  };

  onAttachmentIconClick = () => {
    this._fileInputRef.current.click();
  };

  onSelectAttachment = ({ currentTarget }) => {
    if (currentTarget.files.length === 0) {
      return;
    }
    const { addAttachment } = this.props;
    let file = currentTarget.files[0];
    if (
      (file.name.endsWith('.vcard') || file.name.endsWith('.vcf')) &&
      file.type !== 'text/vcard'
    ) {
      file = new File([file], file.name, { type: 'text/vcard' });
    }
    addAttachment({
      name: file.name,
      size: file.size,
      file,
    });
  };

  render() {
    const {
      currentLocale,
      disabled,
      sendButtonDisabled,
      maxLength,
      supportAttachment,
      attachments,
      removeAttachment,
    } = this.props;
    const { value, height } = this.state;
    const inputHeight = height - UIHeightOffset;
    return (
      <div
        className={classnames(
          styles.root,
          supportAttachment && styles.supportAttachment,
        )}
      >
        <div className={styles.attachmentIcon}>
          <RcIconButton
            variant="round"
            size="small"
            symbol={attachmentSvg}
            onClick={this.onAttachmentIconClick}
            disabled={disabled}
          />
          <input
            type="file"
            accept="image/tiff,image/gif,image/jpeg,image/bmp,image/png,image/svg+xml,text/vcard,application/rtf,video/mpeg,audio/mpeg,video/mp4,application/zip"
            style={{ display: 'none' }}
            ref={this._fileInputRef}
            onChange={this.onSelectAttachment}
            disabled={disabled}
          />
        </div>
        <div className={styles.textField}>
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
            style={{
              height: inputHeight,
            }}
            disabled={disabled}
          />
        </div>
        <div className={styles.submitField}>
          <input
            data-sign="messageButton"
            type="button"
            value={i18n.getString('send', currentLocale)}
            onClick={this.onSend}
            className={styles.sendButton}
            disabled={disabled || sendButtonDisabled}
          />
        </div>
        <div className={styles.attachments}>
          {attachments.map((attachment) => {
            return (
              <div
                className={styles.attachmentItem}
                key={attachment.name}
                title={attachment.name}
              >
                {attachment.name}
                <div className={styles.attachmentRemoveIcon}>
                  <RcIconButton
                    size="small"
                    symbol={removeSvg}
                    disabled={disabled}
                    onClick={() => {
                      removeAttachment(attachment);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MessageInput;
