import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Button from '../Button';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

function ContactUser(props) {
  return (
    <div className={styles.user}>
      <div className={styles.userAvatar}>
        <i className={dynamicsFont.portrait} />
      </div>
      <div className={styles.userPhoneNumber}>{props.phoneNumber}</div>
      <div className={styles.userName}>{props.name}</div>
    </div>
  );
}

ContactUser.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

function OperationButton(props) {
  const className = classnames(styles.operationButton, props.className);
  return (
    <div className={className}>
      <Button
        className={styles.button}
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
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

OperationButton.defaultProps = {
  className: undefined,
  disabled: false,
  children: undefined,
};

function ActiveCallPanel(props) {
  return (
    <div className={styles.root}>
      <ContactUser
        name={'First Last'}
        phoneNumber={'101'}
      />
      <div className={styles.buttonRow}>
        <OperationButton
          onClick={() => null}
          title={'Mute'}
        >
          <i className={rcFont.uni7B} />
        </OperationButton>
        <OperationButton
          onClick={() => null}
          title={'Keypad'}
        >
          <i className={rcFont.uniA4} />
        </OperationButton>
        <OperationButton
          onClick={() => null}
          title={'Audio'}
        >
          <i className={rcFont.uni2496} />
        </OperationButton>
      </div>
      <div className={styles.buttonRow}>
        <OperationButton
          onClick={() => null}
          title={'Hold'}
        >
          <i className={rcFont.uni2474} />
        </OperationButton>
        <OperationButton
          onClick={() => null}
          title={'Record'}
        >
          <i className={rcFont.icon_radio_off} />
        </OperationButton>
        <OperationButton
          onClick={() => null}
          title={'Add'}
        >
          <i className={rcFont.ActionButtons_Add} />
        </OperationButton>
      </div>
      <div className={styles.buttonRow}>
        <OperationButton
          onClick={() => null}
          title={'Transfer'}
        >
          <i className={rcFont['icon-transfer']} />
        </OperationButton>
        <OperationButton
          onClick={() => null}
          title={'Park'}
        >
          <i className={rcFont.uni2E} />
        </OperationButton>
        <OperationButton
          onClick={() => null}
          title={'Flip'}
        >
          <i className={rcFont['icon-flip']} />
        </OperationButton>
      </div>
      <div className={styles.buttonRow}>
        <Button
          className={classnames(styles.button, styles.stopButton)}
          onClick={() => null}
          disabled={false}
        >
          <i className={rcFont.uni44} />
        </Button>
      </div>
    </div>
  );
}

export default ActiveCallPanel;
