import React, { FunctionComponent, memo, useState } from 'react';

import {
  RcIcon,
  RcIconButton,
  RcMenu,
  RcMenuItem,
  RcSubMenu,
} from '@ringcentral/juno';

import { CallLogMenuItem } from '../CallHistoryPanel.interface';

export const MenuButton: FunctionComponent<CallLogMenuItem> = memo(
  ({ icon, label, disabled, subMenu, dataSign }) => {
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
      dataSign,
    }: CallLogMenuItem) => {
      const menuIcon = icon && <RcIcon symbol={icon} size="small" />;

      if (action) {
        return (
          <RcMenuItem
            onClick={action}
            icon={menuIcon}
            key={label}
            disabled={disabled}
            data-sign={dataSign}
          >
            {label}
          </RcMenuItem>
        );
      }

      if (subMenu) {
        return (
          <RcSubMenu
            title={label}
            icon={menuIcon}
            key={label}
            disabled={disabled}
            data-sign={dataSign}
          >
            {subMenu.map(renderMenuItem)}
          </RcSubMenu>
        );
      }
    };

    return (
      <>
        <RcIconButton
          onClick={handleClick}
          symbol={icon}
          size="medium"
          variant="plain"
          disabled={disabled}
          data-sign={dataSign}
        />
        <RcMenu
          anchorEl={anchorEl}
          keepMounted
          autoClose
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
          {subMenu.map(renderMenuItem)}
        </RcMenu>
      </>
    );
  },
);
