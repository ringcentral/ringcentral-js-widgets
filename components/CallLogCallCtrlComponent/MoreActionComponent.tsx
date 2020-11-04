import React, { FunctionComponent, useState } from 'react';
import classnames from 'classnames';
import { RcPopover, RcMenuList, RcMenuItem, RcIcon } from '@ringcentral/juno';
import styles from './styles.scss';
import CircleButton from '../CircleButton';
import { MoreActionComponentProps } from './MoreActionComponent.interface';

export const MoreActionComponent: FunctionComponent<MoreActionComponentProps> = ({
  actionsList,
  disabled = false,
  rootButtonProps,
  withSubText,
  anchorEl,
  handleClick,
  handleClose,
  popoverClasses,
}) => {
  if (!Array.isArray(actionsList) || actionsList.length === 0) {
    return <></>;
  }

  return (
    <>
      <span title={rootButtonProps.tooltip}>
        <CircleButton
          dataSign="more"
          icon={rootButtonProps.icon}
          onClick={handleClick}
          className={classnames(rootButtonProps.className, styles.button, {
            [styles.buttonDisabled]: disabled,
          })}
          disabled={false}
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
        classes={popoverClasses}
      >
        <RcMenuList>
          {actionsList.map(
            ({
              icon,
              text,
              subText,
              onClick,
              disabled,
              iconClassName,
              key,
            }) => (
              <RcMenuItem
                key={key}
                onClick={onClick}
                maxWidth={170}
                data-value={key}
                disabled={disabled}
              >
                <div
                  className={classnames(styles.moreActionItem, {
                    [styles.withSubText]: withSubText,
                  })}
                  data-sign={key}
                >
                  {icon && (
                    <RcIcon
                      iconSize="small"
                      symbol={icon}
                      className={iconClassName}
                    />
                  )}
                  {text && <span className={styles.actionText}>{text}</span>}
                  {withSubText && subText && (
                    <span className={styles.subText}>{subText} </span>
                  )}
                </div>
              </RcMenuItem>
            ),
          )}
        </RcMenuList>
      </RcPopover>
    </>
  );
};
