import React, { FunctionComponent, useState } from 'react';

import classnames from 'classnames';

import { RcMenuItem, RcMenuList, RcPopover } from '@ringcentral/juno';
import { Ignore as IgnoreIcon } from '@ringcentral/juno/icon';

import dynamicsFont from '../../../assets/DynamicsFont/DynamicsFont.scss';
import ForwardIcon from '../../../assets/images/Forward_white.svg';
import MoreIcon from '../../../assets/images/MoreIcon.svg';
import CircleButton from '../../CircleButton';
import i18n from '../i18n';
import { MoreActionWithForwardProps } from './MoreActionWithForward.interface';
import styles from './styles.scss';

const MoreActionWithForward: FunctionComponent<MoreActionWithForwardProps> = (
  props,
) => {
  const {
    disabled,
    currentLocale,
    forwardingNumbers,
    forward,
    ignore,
    clickForwardTrack,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [forwardListEl, setForwardListEl] = useState(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleForwardListClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    clickForwardTrack();
    setForwardListEl(event.currentTarget.children?.[0]);
  };
  const handleForwardListClose = () => {
    setForwardListEl(null);
  };

  const onForward = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedValue = event.currentTarget.attributes['data-value'].value;
    if (selectedValue === 'custom') {
      setForwardListEl(null);
      setAnchorEl(null);
    }
    forward(selectedValue);
  };
  return (
    <>
      <span title={i18n.getString('more', currentLocale)}>
        <CircleButton
          dataSign="more"
          icon={MoreIcon}
          onClick={handleClick}
          className={classnames(styles.button, {
            [styles.buttonDisabled]: disabled,
          })}
        />
      </span>
      <RcPopover
        open={!!anchorEl}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <RcMenuList data-sign="moreList">
          <RcMenuItem
            onClick={handleForwardListClick}
            className={styles.menuItem}
            data-sign="forward"
          >
            <span className={styles.itemIconLeft}>
              <ForwardIcon />
            </span>
            <span className={styles.itemText}>Forward</span>
            <span className={styles.backIcon}>
              <i data-sign="backButton" className={dynamicsFont.arrow} />
            </span>
          </RcMenuItem>
          <RcMenuItem
            className={styles.menuItem}
            onClick={ignore}
            data-sign="ignore"
          >
            <span
              className={classnames(styles.itemIconLeft, styles.ignoreIcon)}
            >
              <IgnoreIcon />
            </span>
            <span className={styles.itemText}>Ignore</span>
          </RcMenuItem>
        </RcMenuList>
      </RcPopover>
      <RcPopover
        open={!!forwardListEl}
        onClose={handleForwardListClose}
        anchorEl={forwardListEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <RcMenuList classes={{ root: styles.forwardMenuList }}>
          {[
            ...forwardingNumbers,
            {
              phoneNumber: 'custom',
              label: i18n.getString('custom', currentLocale),
            },
          ].map((item) => {
            return (
              <RcMenuItem
                onClick={onForward}
                key={item.phoneNumber}
                data-value={item.phoneNumber}
                data-sign={item.phoneNumber}
              >
                <div className={styles.forwardNumberItem}>
                  <span className={styles.actionText}>{item.label}</span>
                  {item.phoneNumber !== 'custom' && (
                    <span className={styles.subText}>{item.phoneNumber}</span>
                  )}
                </div>
              </RcMenuItem>
            );
          })}
        </RcMenuList>
      </RcPopover>
    </>
  );
};

export { MoreActionWithForward };
