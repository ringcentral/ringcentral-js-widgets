import React from 'react';

import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import { Header } from '../Header';
import styles from './styles.scss';

type BackHeaderProps = {
  className?: string;
  backButton?: React.ReactNode;
  buttons?: {
    label: React.ReactNode;
    onClick?: (...args: any[]) => any;
    placement?: 'left' | 'right';
  }[];
  onBackClick?: (...args: any[]) => any;
};
const BackHeader: React.SFC<BackHeaderProps> = (props) => {
  const buttons = props.buttons || [];
  const defaultBackButton = (
    <i
      data-sign="backButton"
      className={classnames(dynamicsFont.arrow, styles.iconRotate)}
    />
  );
  buttons.push({
    label: props.backButton || defaultBackButton,
    onClick: props.onBackClick,
    placement: 'left',
  });
  return (
    <Header buttons={buttons} className={props.className}>
      {props.children}
    </Header>
  );
};
BackHeader.defaultProps = {
  className: '',
  children: undefined,
  buttons: undefined,
  backButton: undefined,
  onBackClick: undefined,
};
export default BackHeader;
