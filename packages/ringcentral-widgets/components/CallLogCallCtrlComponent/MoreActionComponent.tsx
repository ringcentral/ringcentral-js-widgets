import type { FunctionComponent } from 'react';
import React from 'react';

import classnames from 'classnames';

import {
  RcIcon,
  RcIconButton,
  RcMenuItem,
  RcMenuList,
  RcPopover,
} from '@ringcentral/juno';

import CircleButton from '../CircleButton';
import type { MoreActionComponentProps } from './MoreActionComponent.interface';
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
    useJunoIcon = false,
  }) => {
    if (!Array.isArray(actionsList) || actionsList.length === 0) {
      return <></>;
    }

    return (
      <>
        <span title={rootButtonProps.tooltip}>
          {!useJunoIcon ? (
            <CircleButton
              dataSign={dataSign}
              icon={rootButtonProps.icon}
              onClick={handleClick}
              className={classnames(rootButtonProps.className, styles.button, {
                [styles.buttonDisabled]: disabled,
                [styles.rootButtonActive]: !!anchorEl,
              })}
              disabled={false}
            />
          ) : (
            <RcIconButton
              data-sign={dataSign}
              symbol={rootButtonProps.junoIcon}
              color="action.primary"
              variant={anchorEl ? 'inverse' : undefined}
              onClick={handleClick}
              disabled={false}
            />
          )}
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
                    // @ts-expect-error TS(2322): Type '{ children: Element; key: string; onClick: (... Remove this comment to see the full error message
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
