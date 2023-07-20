import type { FunctionComponent } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import classnames from 'classnames';

import type { RcIconButtonProps } from '@ringcentral/juno';
import { RcIconButton, RcTypography, styled } from '@ringcentral/juno';
import { ChevronLeft as chevronLeftSvg } from '@ringcentral/juno-icon';

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

const Title = styled(RcTypography)<{ $maxWidth?: number }>`
  max-width: ${({ $maxWidth }) => $maxWidth}px;
`;

const BackHeader: FunctionComponent<BackHeaderProps> = ({
  onBackClick,
  title = '',
  rightIcon = null,
  className,
  currentLocale = 'en-US',
  isWide = true,
  backIcon = chevronLeftSvg,
}) => {
  const [maxWidth, setMaxWidth] = useState(initWidth);
  const rightRef = useRef<HTMLDivElement>(null);
  const isClassic = !isWide;
  useEffect(() => {
    if (isClassic && rightRef.current) {
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
      <div className={styles.title} data-sign="backHeaderTitle">
        {title ? (
          <Title
            color="neutral.f06"
            variant="body2"
            component="span"
            $maxWidth={isClassic ? maxWidth : undefined}
            title={title}
          >
            {title}
          </Title>
        ) : null}
      </div>
      <div ref={rightRef} className={rightIconClass}>
        {rightIcon}
      </div>
    </div>
  );
};

export default BackHeader;
