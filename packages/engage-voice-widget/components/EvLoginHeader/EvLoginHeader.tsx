import React, { FunctionComponent } from 'react';

import classNames from 'classnames';

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
    <div className={classNames(styles.evLogin, wrapperStyle)}>
      <EngageVoiceLogo className={svgStyle} />
    </div>
  );
};
