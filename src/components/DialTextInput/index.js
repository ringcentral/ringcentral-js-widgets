import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import i18n from './i18n';
import TextInput from '../TextInput';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

function DialTextInput({
  className,
  invalid,
  value,
  onChangeEvent,
  onDelete,
  autoFocus
}) {
  const deleteDisplay = value === '' ? { display: 'none' } : { display: 'block' };
  return (
    <div
      className={classnames(
        styles.dialInput,
        className,
        invalid && styles.invalid,
        )}>
      <span className={classnames(styles.to)}>
        {i18n.getString('to')}
      </span>
      <TextInput
        placeholder={i18n.getString('enterNameOrPhoneNumber')}
        className={styles.dial_Input}
        value={value}
        onChange={onChangeEvent}
        autoFocus={autoFocus}
      />
      <span
        style={deleteDisplay}
        className={classnames(styles.delete, dynamicsFont.clear)}
        onClick={onDelete}
      />
    </div>
  );
}

DialTextInput.propTypes = {
  className: PropTypes.string,
  invalid: PropTypes.bool,
  value: PropTypes.string,
  onChangeEvent: PropTypes.func,
  onDelete: PropTypes.func,
  autoFocus: PropTypes.bool,
};
DialTextInput.defaultValue = {
  className: styles.input,
  autoFocus: false,
};


export default DialTextInput;
