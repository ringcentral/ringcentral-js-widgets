import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import EngageVoiceLogo from '../../assets/icons/engageVoiceLogo.svg';

import styles from './styles.scss';

export interface EvLoginHeaderProps {
  wrapperStyle?: string;
  svgStyle?: string;
}

export const EvLoginHeader: FunctionComponent<EvLoginHeaderProps> = ({
  wrapperStyle,
  svgStyle,
}) => {
  return (
    <div className={clsx(styles.evLogin, wrapperStyle)}>
      <EngageVoiceLogo className={svgStyle} />
    </div>
  );
};
