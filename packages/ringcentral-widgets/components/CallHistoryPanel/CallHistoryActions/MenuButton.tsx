import React, { useState, memo, FunctionComponent } from 'react';
import {
  RcIconButton,
  RcIcon,
  RcMenu,
  RcMenuItem,
  RcSubMenu,
} from '@ringcentral/juno';
import { CallLogMenuItem } from 'ringcentral-integration/interfaces/CallLog.interface';

import styles from './styles.scss';

export const MenuButton: FunctionComponent<CallLogMenuItem> = memo(
  ({ icon, label, disabled, subMenu }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const renderMenuItem = ({
      icon,
      label,
      disabled,
      action,
      subMenu,
    }: CallLogMenuItem) => {
      const menuIcon = icon && <RcIcon symbol={icon} size="small" />;

      if (action) {
        return (
          <RcMenuItem
            onClick={action}
            icon={menuIcon}
            key={label}
            disabled={disabled}
          >
            {label}
          </RcMenuItem>
        );
      }

      if (subMenu) {
        return (
          <RcSubMenu
            title={label}
            titleIcon={menuIcon}
            key={label}
            disabled={disabled}
          >
            {subMenu.map(renderMenuItem)}
          </RcSubMenu>
        );
      }
    };

    return (
      <div className={styles.menu}>
        <RcIconButton
          onClick={handleClick}
          symbol={icon}
          size="medium"
          variant="plain"
          title={label}
          disabled={disabled}
        />
        <RcMenu
          anchorEl={anchorEl}
          keepMounted
          autoClose
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {subMenu.map(renderMenuItem)}
        </RcMenu>
      </div>
    );
  },
);
