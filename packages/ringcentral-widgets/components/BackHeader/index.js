import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import Header from '../Header';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

export default function BackHeader(props) {
  const buttons = props.buttons || [];
  const defaultBackButton =
    <i className={classnames(dynamicsFont.arrow, styles.iconRotate)} />;
  buttons.push({
    label: props.backButton || defaultBackButton,
    onClick: props.onBackClick,
    placement: 'left',
  });
  return (
    <Header
      buttons={buttons}
      className={props.className}>
      {props.children}
    </Header>
  );
}

BackHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  backButton: PropTypes.node,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node.isRequired,
    onClick: PropTypes.funcs,
    placement: PropTypes.oneOf(['left', 'right']),
  })),
  onBackClick: PropTypes.func,
};

BackHeader.defaultProps = {
  className: '',
  children: undefined,
  buttons: undefined,
  backButton: undefined,
  onBackClick: undefined,
};
