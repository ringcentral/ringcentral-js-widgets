import React, { FunctionComponent, ReactNode } from 'react';

import { RcFormControlLabel, RcIcon, RcTooltip } from '@ringcentral/juno';
import { LockBorder } from '@ringcentral/juno/icon';

import i18n from './i18n';
import styles from './styles.scss';

function generateLockIcon(
  isLock: boolean,
  currentLocale: string,
  hasScrollBar: boolean,
) {
  const isMac = navigator.platform.includes('Mac');

  return isLock ? (
    <RcTooltip
      classes={{
        popper: isMac || !hasScrollBar ? styles.popper : styles.popperOfWin,
        tooltip: styles.tooltip,
      }}
      placement="bottom"
      data-sign="lockButtonTooltip"
      title={i18n.getString('lockTooltip', currentLocale)}
    >
      <RcIcon
        size="small"
        color="neutral.f04"
        className={styles.lockButton}
        symbol={LockBorder}
      />
    </RcTooltip>
  ) : null;
}

interface VideoSecuritySettingItemProps {
  dataSign: string;
  label: string | React.ReactNode;
  isLock?: boolean;
  isDisabled?: boolean;
  currentLocale: string;
  children: ReactNode;
  hasScrollBar: boolean;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  classes?: {};
}

export const VideoSecuritySettingItem: FunctionComponent<VideoSecuritySettingItemProps> =
  ({
    dataSign,
    label,
    isLock = false,
    isDisabled = false,
    currentLocale,
    children,
    hasScrollBar = false,
    labelPlacement,
  }) => {
    return (
      <RcFormControlLabel
        data-sign={dataSign}
        disabled={isLock || isDisabled}
        control={
          <span
            className={
              labelPlacement === 'start'
                ? styles.iconCombine
                : styles.checkboxSeparate
            }
          >
            {labelPlacement === 'start' &&
              generateLockIcon(isLock, currentLocale, hasScrollBar)}
            {children}
          </span>
        }
        label={
          <>
            {label}
            {labelPlacement !== 'start' &&
              generateLockIcon(isLock, currentLocale, hasScrollBar)}
          </>
        }
        labelPlacement={labelPlacement}
        classes={{
          root:
            labelPlacement === 'start'
              ? styles.labelPlacementStartRoot
              : styles.labelPlacementEndRoot,
          label: styles.labelText,
        }}
      />
    );
  };
