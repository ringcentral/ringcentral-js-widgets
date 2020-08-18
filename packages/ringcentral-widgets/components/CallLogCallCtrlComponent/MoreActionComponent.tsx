import React, { FunctionComponent, useState } from 'react';
import classnames from 'classnames';

import {
  RcPopover,
  RcMenuList,
  RcMenuItem,
  RcIcon,
} from '@ringcentral-integration/rcui';
import MoreIcon from '../../assets/images/MoreIcon.svg';
import i18n from './i18n';
import styles from './styles.scss';
import CircleButton from '../CircleButton';
import { MoreActionComponentProps } from './MoreActionComponent.interface';

export const MoreActionComponent: FunctionComponent<MoreActionComponentProps> = ({
  currentLocale,
  actionsList,
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <span title={i18n.getString('more', currentLocale)}>
        <CircleButton
          icon={MoreIcon}
          onClick={handleClick}
          className={classnames({
            [styles.button]: true,
            [styles.buttonDisabled]: disabled,
          })}
          disabled={disabled}
        />
      </span>
      <RcPopover
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
        <RcMenuList>
          {actionsList.map(({ icon, text, onClick, iconClassName }) => (
            <RcMenuItem key={text} onClick={onClick}>
              <div className={styles.moreActionItem}>
                <RcIcon
                  iconSize="small"
                  symbol={icon}
                  className={iconClassName}
                />
                <span className={styles.actionText}>
                  {i18n.getString(text, currentLocale)}
                </span>
              </div>
            </RcMenuItem>
          ))}
        </RcMenuList>
      </RcPopover>
    </>
  );
};
