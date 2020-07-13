import { RcIconButton, RcIconButtonProps } from '@ringcentral-integration/rcui';
import chevronLeftSvg from '@ringcentral-integration/rcui/icons/icon-chevron_left.svg';
import classnames from 'classnames';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import { TOOLTIP_DEFAULT_DELAY_TIME } from '../../lib/toolTipDelayTime';
import { Tooltip } from '../Rcui/Tooltip';
import styles from './styles.scss';

const initWidth = 67;

export interface BackHeaderProps {
  onBackClick: (...args: any[]) => any;
  title?: string;
  backIcon?: RcIconButtonProps['symbol'];
  rightIcon?: React.ReactNode;
  className?: string;
  currentLocale?: string;
  isWide?: boolean;
}

const BackHeader: FunctionComponent<BackHeaderProps> = ({
  onBackClick,
  title,
  rightIcon,
  className,
  currentLocale,
  isWide,
  backIcon,
}) => {
  const [maxWidth, setMaxWidth] = useState(initWidth);
  const rightRef = useRef<HTMLDivElement>();
  const isClassic = !isWide;
  useEffect(() => {
    if (isClassic) {
      // this smallest clientWidth is 62.
      setMaxWidth(initWidth - (rightRef.current.clientWidth - 62));
    }
  }, [currentLocale, isClassic]);
  const rootClass = classnames(
    styles.root,
    isClassic && styles.classic,
    className,
  );
  return (
    <div className={rootClass}>
      <RcIconButton
        className={classnames(styles.back)}
        variant="round"
        size="small"
        symbol={backIcon}
        data-sign="backButton"
        onClick={onBackClick}
      />
      <div className={styles.title}>
        {title ? (
          <Tooltip title={title} enterDelay={TOOLTIP_DEFAULT_DELAY_TIME}>
            <span style={{ maxWidth: isClassic ? maxWidth : null }}>
              {title}
            </span>
          </Tooltip>
        ) : null}
      </div>
      <div ref={rightRef} className={styles.rightIcon}>
        {rightIcon}
      </div>
    </div>
  );
};

BackHeader.defaultProps = {
  title: '',
  rightIcon: null,
  backIcon: chevronLeftSvg,
  className: null,
  currentLocale: 'en-US',
  isWide: true,
};

export default BackHeader;
