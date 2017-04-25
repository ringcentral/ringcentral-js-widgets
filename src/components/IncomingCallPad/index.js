import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Button from '../Button';
import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

function OperationButton(props) {
  const className = classnames(styles.operationButton, props.className);
  const buttonClassName = classnames(styles.button, props.active ? styles.buttonActive : null);
  return (
    <div className={className}>
      <Button
        className={buttonClassName}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </Button>
      <div className={styles.buttonTitle}>
        {props.title}
      </div>
    </div>
  );
}

OperationButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

OperationButton.defaultProps = {
  className: undefined,
  disabled: false,
  active: false,
  children: undefined,
};

export default function IncomingCallPad(props) {
  return (
    <div>
      <div className={styles.buttonRow}>
        <OperationButton
          onClick={() => null}
          title={'Forward'}
        >
          <i className={rcFont.icon_collapse} />
        </OperationButton>
        <OperationButton
          onClick={() => null}
          title={'Reply'}
        >
          <i className={rcFont.RC_Sms_pressed} />
        </OperationButton>
        <OperationButton
          onClick={() => null}
          title={'Ignore'}
        >
          <i className={rcFont.uni43} />
        </OperationButton>
      </div>
      <div className={styles.buttonRow}>
        <OperationButton
          onClick={props.reject}
          title={'To Voicemail'}
          className={styles.rejectButton}
        >
          <i className={rcFont.uniA8} />
        </OperationButton>
        <OperationButton
          onClick={props.answer}
          title={'Answer'}
          className={styles.answserButton}
        >
          <i className={rcFont.icon_call} />
        </OperationButton>
      </div>
    </div>
  );
}

IncomingCallPad.propTypes = {
  answer: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
};
