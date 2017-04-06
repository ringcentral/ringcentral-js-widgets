import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import Header from '../Header';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

const BackHeader = (props) => {
  const buttons = props.buttons;
  buttons.push({
    label: <i className={classnames(dynamicsFont.arrow, styles.iconRotate)} />,
    onClick: props.onBackClick,
    placement: 'left',
  });
  return (
    <Header
      buttons={buttons}
      className={props.className}>
      {props.children}
    </Header>);
};
export default BackHeader;

BackHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node.isRequired,
    onClick: PropTypes.funcs,
    placement: PropTypes.oneOf(['left', 'right']),
  })),
  onBackClick: PropTypes.func,
};

BackHeader.defaultProps = {
  className: '',
  buttons: [],
};
