import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import classnames from 'classnames';

import {
  RcIconButton,
  RcIconButtonProps,
  RcTypography,
  styled,
} from '@ringcentral/juno';
import { ChevronLeft as chevronLeftSvg } from '@ringcentral/juno/icon';

import { TOOLTIP_LONG_DELAY_TIME } from '../../lib/toolTipDelayTime';
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

const Title = styled(RcTypography)<{ $maxWidth: number }>`
  max-width: ${({ $maxWidth }) => $maxWidth}px;
`;

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
  // if right icon is empty then should occupy position to make title actually center align
  const rightIconClass = classnames(styles.rightIcon, {
    [styles.emptyRightIcon]: !rightIcon,
  });
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
          <Tooltip title={title} enterDelay={TOOLTIP_LONG_DELAY_TIME}>
            <Title
              color="neutral.f06"
              variant="body2"
              component="span"
              $maxWidth={isClassic ? maxWidth : null}
            >
              {title}
            </Title>
          </Tooltip>
        ) : null}
      </div>
      <div ref={rightRef} className={rightIconClass}>
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
