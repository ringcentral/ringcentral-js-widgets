import classnames from 'classnames';
import PropTypes from 'prop-types';
import { RcIconButton } from '@ringcentral-integration/rcui';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.scss';

const initWidth = 67;

const BackHeader = ({
  onBackClick,
  title,
  rightIcon,
  className,
  currentLocale,
  isWide,
  backIcon,
}) => {
  const [maxWidth, setMaxWidth] = useState(initWidth);
  const rightRef = useRef();

  const isClassic = !isWide;

  if (isClassic) {
    useEffect(() => {
      // this smallest clientWidth is 62.
      setMaxWidth(initWidth - (rightRef.current.clientWidth - 62));
    }, [currentLocale]);
  }

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
        icon={backIcon}
        data-sign="backButton"
        onClick={onBackClick}
      />
      <div className={styles.title}>
        {title ? (
          <span style={{ maxWidth: isClassic ? maxWidth : null }} title={title}>
            {title}
          </span>
        ) : null}
      </div>
      <div ref={rightRef}>{rightIcon}</div>
    </div>
  );
};

BackHeader.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  backIcon: PropTypes.string,
  rightIcon: PropTypes.node,
  className: PropTypes.string,
  currentLocale: PropTypes.string,
  isWide: PropTypes.bool,
};

BackHeader.defaultProps = {
  title: '',
  rightIcon: null,
  backIcon: 'chevron_left',
  className: null,
  currentLocale: 'en-US',
  isWide: true,
};

export default BackHeader;
