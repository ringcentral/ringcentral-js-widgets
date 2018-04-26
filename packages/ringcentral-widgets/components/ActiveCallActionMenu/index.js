import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import Button from '../Button';
import LogButton from '../LogButton';
import EntityButton from '../EntityButton';

import styles from './styles.scss';

export default class ActiveCallActionMenu extends Component {
  constructor(props) {
    super(props);

    this.captureClick = (e) => {
      // e.captureClick = this.props.captureClick;
      if (this.props.stopPropagation) {
        e.stopPropagation();
      }
    };
  }

  render() {
    const {
      className,
      onClickToSms,
      disableLinks,
      phoneNumber,
      textTitle,
      onLog,
      isLogged,
      isLogging,
      currentLocale,
      addLogTitle,
      editLogTitle,
      hasEntity,
      onViewEntity,
      onCreateEntity,
      createEntityTitle,
      viewEntityTitle,
    } = this.props;

    const smsButton = onClickToSms ?
      (
        <Button
          className={classnames(styles.actionButton, styles.sms)}
          onClick={onClickToSms}
          disabled={disableLinks || !phoneNumber} >
          <span
            className={dynamicsFont.composeText}
            title={textTitle}
          />
        </Button>
      ) : null;
    const logButton = onLog ?
      (
        <LogButton
          className={classnames(styles.actionButton, styles.log)}
          onLog={onLog}
          disableLinks={disableLinks}
          isLogged={isLogged}
          isLogging={isLogging}
          currentLocale={currentLocale}
          addTitle={addLogTitle}
          editTitle={editLogTitle}
        />
      ) :
      null;
    let entityButton;
    if (hasEntity && onViewEntity) {
      entityButton = (<EntityButton
        className={classnames(styles.actionButton, styles.entity)}
        onViewEntity={onViewEntity}
        hasEntity={hasEntity}
        disableLinks={disableLinks}
        viewEntityTitle={viewEntityTitle}
      />);
    } else if (!hasEntity && phoneNumber && onCreateEntity) {
      entityButton = (
        <Button
          className={classnames(styles.actionButton, styles.addContact)}
          onClick={onCreateEntity}
          disabled={disableLinks || !phoneNumber} >
          <span
            className={dynamicsFont.add2}
            title={createEntityTitle}
          />
        </Button>
      );
    } else {
      entityButton = null;
    }
    return (
      <div
        className={classnames(
          styles.root,
          className,
        )}
        onClick={this.captureClick}
      >
        {smsButton}
        {entityButton}
        {logButton}
      </div>
    );
  }
}

ActiveCallActionMenu.propTypes = {
  className: PropTypes.string,
  onClickToSms: PropTypes.func,
  disableLinks: PropTypes.bool,
  phoneNumber: PropTypes.string,
  textTitle: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  onLog: PropTypes.func,
  isLogged: PropTypes.bool,
  isLogging: PropTypes.bool,
  addLogTitle: PropTypes.string,
  editLogTitle: PropTypes.string,
  stopPropagation: PropTypes.bool,
  onCreateEntity: PropTypes.func,
  hasEntity: PropTypes.bool,
  onViewEntity: PropTypes.func,
  createEntityTitle: PropTypes.string,
  viewEntityTitle: PropTypes.string,
};

ActiveCallActionMenu.defaultProps = {
  className: undefined,
  onClickToSms: undefined,
  disableLinks: false,
  phoneNumber: undefined,
  textTitle: undefined,
  onLog: undefined,
  isLogged: false,
  isLogging: false,
  addLogTitle: undefined,
  editLogTitle: undefined,
  stopPropagation: false,
  onCreateEntity: undefined,
  createEntityTitle: undefined,
  viewEntityTitle: undefined,
  onViewEntity: undefined,
  hasEntity: false,
};
