import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import 'rc-editor-mention/assets/index.css';
import Mention, { Nav, toString, toEditorState, getMentions } from 'rc-editor-mention';

import EmojiSelect from '../EmojiSelect';

import emojiIcon from '../../assets/images/emoji.png';
import uploadIcon from '../../assets/images/upload.png';
import styles from './styles.scss';

function isOnMobileDevice() {
  if (typeof navigator !== 'undefined') {
    return (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i)
    );
  }
  return false;
}

export default class GlipChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: toEditorState(props.textValue),
      suggestions: [],
    };
    this._onInputChange = (editorState) => {
      this.setState({
        defaultValue: editorState
      });
      if (typeof this.props.onTextChange === 'function') {
        const mentions = getMentions(editorState).map((mention) => {
          const email = mention.replace('@[', '').replace(']', '');
          const member = this.props.members.find(m => m.email === email);
          return {
            mention,
            matcherId: (member && member.id),
          };
        });
        this.props.onTextChange(toString(editorState), mentions);
      }
    };

    this._onSearchChange = (value) => {
      const members = this.props.members.filter((m) => {
        const search = value && value.toLowerCase();
        if (!search) {
          return true;
        }
        const name = `${m.firstName} ${m.lastName}`.toLowerCase();
        if (name.indexOf(search) > -1) {
          return true;
        }
        if (m.email && m.email.indexOf(search) > -1) {
          return true;
        }
        return false;
      });
      const suggestions = this._getSuggestions(members);
      this.setState({
        suggestions,
      });
    };

    this._onSubmit = (e) => {
      this.props.onSubmit();
      e.preventDefault();
    };

    this._onTextAreaKeyDown = (e) => {
      if (
        e.key === 'Enter' &&
        !e.shiftKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        this.props.onSubmit();
        e.preventDefault();
      }
    };

    this._onSelectEmoji = (emoji) => {
      const newText = this.props.textValue ? `${this.props.textValue} ${emoji} ` : `${emoji} `;
      if (typeof this.props.onTextChange === 'function') {
        this.props.onTextChange(newText);
      }
      this.setState({
        defaultValue: toEditorState(newText),
      });
      setTimeout(() => {
        if (this._metionInput) {
          this._metionInput.reset();
        }
      }, 10);
    };

    this._onSelectFile = (e) => {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onloadend = (evt) => {
        if (evt.target.readyState === FileReader.DONE) {
          this.props.onUploadFile(file.name, evt.target.result);
        }
      };
      reader.readAsArrayBuffer(file);
    };
  }

  componentDidMount() {
    this._autoFocus();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.members !== nextProps.members) {
      const suggestions = this._getSuggestions(nextProps.members);
      this.setState({
        suggestions,
      });
    }
    if (
      nextProps.groupId !== this.props.groupId
    ) {
      const suggestions = this._getSuggestions(nextProps.members);
      this.setState({
        suggestions,
        defaultValue: toEditorState(nextProps.textValue)
      });
    }
    if (this.props.textValue !== nextProps.textValue) {
      this.setState({
        defaultValue: toEditorState(nextProps.textValue)
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.groupId !== this.props.groupId
    ) {
      this._autoFocus();
      if (this._metionInput) {
        this._metionInput.reset();
      }
    }
    if (this.props.textValue.length === 0 && prevProps.textValue.length > 0) {
      if (this._metionInput) {
        this._metionInput.reset();
      }
    }
  }

  _getSuggestions(suggestions) {
    return suggestions.map(
      suggestion =>
        <Nav style={{ height: 34 }} value={`[${suggestion.email}]`} key={suggestion.id} >
          <span>{suggestion.firstName} {suggestion.lastName}</span>
        </Nav>
    );
  }

  _autoFocus() {
    if (isOnMobileDevice()) {
      return;
    }
    if (this._metionInput) {
      this._metionInput._editor.focusEditor();
    }
  }

  render() {
    const {
      className,
      placeholder,
      height,
    } = this.props;

    return (
      <div className={classnames(styles.root, className)} style={{ height }} >
        <div className={styles.tools}>
          <Tooltip
            placement="top"
            trigger="click"
            arrowContent={<div className="rc-tooltip-arrow-inner" />}
            overlayClassName={styles.emojisTooltip}
            overlay={(
              <div style={{ width: 325, height: 250 }}>
                <EmojiSelect onSelect={this._onSelectEmoji} />
              </div>
            )}
          >
            <img alt="emoji" src={emojiIcon} className={styles.emoji} />
          </Tooltip>
          <label className={styles.file}>
            <img alt="emoji" src={uploadIcon} />
            <input type="file" onChange={this._onSelectFile} />
          </label>
        </div>
        <form onSubmit={this._onSubmit}>
          <Mention
            style={{ width: '100%', height: (height - 35), lineHeight: '18px' }}
            className={styles.mentionInput}
            ref={(input) => { this._metionInput = input; }}
            placeholder={placeholder}
            placement="bottom"
            defaultValue={this.state.defaultValue}
            onChange={this._onInputChange}
            onSearchChange={this._onSearchChange}
            suggestions={this.state.suggestions}
            prefix="@"
            notFoundContent="No found."
            multiLines
            mode="immutable"
            onKeyDown={this._onTextAreaKeyDown}
          />
          <input type="submit" className={styles.submit} />
        </form>
      </div>
    );
  }
}

GlipChatForm.propTypes = {
  textValue: PropTypes.string,
  className: PropTypes.string,
  onTextChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onUploadFile: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  groupId: PropTypes.string,
  members: PropTypes.array,
  height: PropTypes.number,
};

GlipChatForm.defaultProps = {
  className: undefined,
  textValue: '',
  onTextChange: undefined,
  placeholder: undefined,
  groupId: undefined,
  members: [],
  height: 120
};
