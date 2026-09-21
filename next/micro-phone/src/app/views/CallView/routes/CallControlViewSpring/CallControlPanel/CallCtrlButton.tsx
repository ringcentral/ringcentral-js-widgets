import {
  type DialPadButtonProps,
  IconButton,
  type MenuProps,
  Menu,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';

export interface CallCtrlButtonProps extends DialPadButtonProps {
  menuList?: ReactNode;
  menuPlacement: MenuProps['placement'];
}

export const CallCtrlButton: React.FC<CallCtrlButtonProps> = ({
  menuList,
  menuPlacement,
  onClick,
  label,
  className,
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  return (
    <>
      <div className="flex flex-col items-center justify-start gap-1 typography-descriptorMini w-full min-w-0">
        <IconButton
          size="xxlarge"
          color="secondary"
          variant="outlined"
          {...rest}
          onClick={
            menuList
              ? (event) => {
                  setAnchorEl(event.currentTarget);
                }
              : onClick
          }
          className={clsx('[&_svg_path:first-child]:fill-inherit', className)}
        />
        <div className="text-center break-words w-full px-1">{label}</div>
      </div>

      {menuList && (
        <Menu
          anchorEl={anchorEl}
          placement={menuPlacement}
          onClose={() => {
            setAnchorEl(null);
          }}
          open={isOpen}
          variant="pointed"
        >
          {menuList}
        </Menu>
      )}
    </>
  );
};
