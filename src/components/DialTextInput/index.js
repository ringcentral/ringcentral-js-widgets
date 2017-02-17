import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import i18n from './i18n';
import TextInput from '../TextInput';
import rcFont from '../../assets/RcFont/RcFont.scss';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

function DialTextInput({
  className,
  invalid,
  value,
  onChangeEvent,
  onDelete,
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
        className={styles.dial_Input}
        value={value}
        onChange={onChangeEvent}
      />
      <span style={deleteDisplay} className={classnames(styles.delete, dynamicsFont.icon_clear)} onClick={onDelete}>
      </span>
    </div>
  );
}

DialTextInput.propTypes = {
  className: PropTypes.string,
  invalid: PropTypes.bool,
  value: PropTypes.string,
  onChangeEvent: PropTypes.func,
  onDelete: PropTypes.func,
};
DialTextInput.defaultValue = {
  className: styles.input
};


export default DialTextInput;
