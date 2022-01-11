import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import { RcIcon, RcMenuItem, RcMenuList, RcPopover } from '@ringcentral/juno';

import CircleButton from '../CircleButton';
import { MoreActionComponentProps } from './MoreActionComponent.interface';
import styles from './styles.scss';

export const MoreActionComponent: FunctionComponent<MoreActionComponentProps> =
  ({
    actionsList,
    disabled = false,
    rootButtonProps,
    withSubText,
    anchorEl,
    handleClick,
    handleClose,
    popoverClasses,
    dataSign,
  }) => {
    if (!Array.isArray(actionsList) || actionsList.length === 0) {
      return <></>;
    }

    return (
      <>
        <span title={rootButtonProps.tooltip}>
          <CircleButton
            dataSign={dataSign}
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
          <div data-sign={`${dataSign}List`}>
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
                          size="small"
                          symbol={icon}
                          className={iconClassName}
                        />
                      )}
                      {text && (
                        <span title={text} className={styles.actionText}>
                          {text}
                        </span>
                      )}
                      {withSubText && subText && (
                        <span className={styles.subText}>{subText} </span>
                      )}
                    </div>
                  </RcMenuItem>
                ),
              )}
            </RcMenuList>
          </div>
        </RcPopover>
      </>
    );
  };
