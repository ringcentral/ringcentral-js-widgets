import React, { FC, ReactNode } from 'react';
import { RcFormControlLabel, RcTooltip, RcIcon } from '@ringcentral/juno';
import lockSvg from '@ringcentral/juno/icon/LockBorder';
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
      <RcIcon size="small" className={styles.lockButton} symbol={lockSvg} />
    </RcTooltip>
  ) : null;
}

interface VideoSecuritySettingsItemProps {
  dataSign: string;
  label: string | React.ReactNode;
  isLock?: boolean;
  currentLocale: string;
  children: ReactNode;
  hasScrollBar: boolean;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  classes?: {};
}

export const VideoSecuritySettingsItem: FC<VideoSecuritySettingsItemProps> = ({
  dataSign,
  label,
  isLock = false,
  currentLocale,
  children,
  hasScrollBar = false,
  labelPlacement,
}) => {
  return (
    <RcFormControlLabel
      data-sign={dataSign}
      disabled={isLock}
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
