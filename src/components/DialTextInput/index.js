import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import i18n from './i18n';
import TextInput from '../TextInput';
import rcFont from '../../assets/RcFont/RcFont.scss';

class DialTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: (props.value) ? props.value : ''
    };
  }
  render() {
    const props = this.props;
    return (
      <div
        className={classnames(
          styles.dialInput,
          props.className,
          props.invalid && styles.invalid,
          )}>
        <span className={classnames(styles.to)}>
          {i18n.getString('to')}
        </span>
        <TextInput
          className={styles.dial_Input}
          value={props.value}
          onChange={props.onChangeEvent}
        />
        <span className={classnames(rcFont.RC_close, styles.delete)} onClick={props.onDelete}>
        </span>
      </div>
    );
  }
}

DialTextInput.propTypes = {
  value: PropTypes.string,
  onChangeEvent: PropTypes.func,
  onDelete: PropTypes.func,
};
DialTextInput.defaultValue = {
  className: styles.input
};


export default DialTextInput;
