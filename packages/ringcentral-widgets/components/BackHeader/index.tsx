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
    // @ts-expect-error TS(2322): Type '{ label: ReactNode; onClick?: ((...args: any... Remove this comment to see the full error message
    <Header buttons={buttons} className={props.className}>
      {props.children}
    </Header>
  );
};
BackHeader.defaultProps = {
  className: '',
  // @ts-expect-error TS(2322): Type '{ className: string; children: undefined; bu... Remove this comment to see the full error message
  children: undefined,
  buttons: undefined,
  backButton: undefined,
  onBackClick: undefined,
};
export default BackHeader;
