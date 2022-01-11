import React, { Component } from 'react';

import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import { Button } from '../Button';
import EntityButton from '../EntityButton';
import LogButton from '../LogButton';
import styles from './styles.scss';

type ActiveCallActionMenuProps = {
  className?: string;
  onClickToSms?: (...args: any[]) => any;
  disableLinks?: boolean;
  phoneNumber?: string;
  textTitle?: string;
  currentLocale: string;
  onLog?: (...args: any[]) => any;
  isLogged?: boolean;
  isLogging?: boolean;
  addLogTitle?: string;
  editLogTitle?: string;
  stopPropagation?: boolean;
  onCreateEntity?: (...args: any[]) => any;
  hasEntity?: boolean;
  onViewEntity?: (...args: any[]) => any;
  createEntityTitle?: string;
  viewEntityTitle?: string;
};
class ActiveCallActionMenu extends Component<ActiveCallActionMenuProps, {}> {
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
    const smsButton = onClickToSms ? (
      <Button
        className={classnames(styles.actionButton, styles.sms)}
        onClick={onClickToSms}
        disabled={disableLinks || !phoneNumber}
      >
        <span className={dynamicsFont.composeText} title={textTitle} />
      </Button>
    ) : null;
    const logButton = onLog ? (
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
    ) : null;
    let entityButton;
    if (hasEntity && onViewEntity) {
      entityButton = (
        <EntityButton
          className={classnames(styles.actionButton, styles.entity)}
          onViewEntity={onViewEntity}
          hasEntity={hasEntity}
          disableLinks={disableLinks}
          viewEntityTitle={viewEntityTitle}
        />
      );
    } else if (!hasEntity && phoneNumber && onCreateEntity) {
      entityButton = (
        <Button
          className={classnames(styles.actionButton, styles.addContact)}
          onClick={onCreateEntity}
          disabled={disableLinks || !phoneNumber}
        >
          <span className={dynamicsFont.add2} title={createEntityTitle} />
        </Button>
      );
    } else {
      entityButton = null;
    }
    return (
      <div
        className={classnames(styles.root, className)}
        onClick={this.captureClick}
      >
        {smsButton}
        {entityButton}
        {logButton}
      </div>
    );
  }
}
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
export default ActiveCallActionMenu;
