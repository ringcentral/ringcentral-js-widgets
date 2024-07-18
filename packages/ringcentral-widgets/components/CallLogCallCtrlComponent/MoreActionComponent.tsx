import {
  RcIcon,
  RcIconButton,
  RcMenuItem,
  RcMenuList,
  RcPopover,
  styled,
} from '@ringcentral/juno';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import { CircleButtonWithTitle } from '../CircleButton';

import type { MoreActionComponentProps } from './MoreActionComponent.interface';
import styles from './styles.scss';

export const StyledMenuItem = styled(RcMenuItem)`
  max-width: 170px;
`;

export const MoreActionComponent: FunctionComponent<
  MoreActionComponentProps
> = ({
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
      {!useJunoIcon ? (
        <CircleButtonWithTitle
          title={rootButtonProps.tooltip}
          dataSign={dataSign}
          icon={rootButtonProps.icon}
          onClick={handleClick}
          className={clsx(rootButtonProps.className, styles.button, {
            [styles.buttonDisabled]: disabled,
            [styles.rootButtonActive]: !!anchorEl,
          })}
          disabled={false}
        />
      ) : (
        <span title={rootButtonProps.tooltip}>
          <RcIconButton
            data-sign={dataSign}
            title={rootButtonProps.tooltip}
            useRcTooltip={false}
            symbol={rootButtonProps.junoIcon}
            color="action.primary"
            variant={anchorEl ? 'inverse' : undefined}
            onClick={handleClick}
            disabled={false}
          />
        </span>
      )}
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
                <StyledMenuItem
                  key={key}
                  onClick={onClick}
                  data-value={key}
                  disabled={disabled}
                  title={text}
                >
                  <div
                    className={clsx(styles.moreActionItem, {
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
                    {text && <span className={styles.actionText}>{text}</span>}
                    {withSubText && subText && (
                      <span className={styles.subText}>{subText} </span>
                    )}
                  </div>
                </StyledMenuItem>
              ),
            )}
          </RcMenuList>
        </div>
      </RcPopover>
    </>
  );
};
