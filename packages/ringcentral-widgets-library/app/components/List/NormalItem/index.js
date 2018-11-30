import React from 'react';
import PropsTypes from 'prop-types';
import classnames from 'classnames';

import SwitchItem from './Switch';
import LineItem from './Line';

import styles from './styles.scss';

function NormalItem({
  className,
  children
}) {
  const cls = classnames(styles.normalWrapper, className);
  return (
    <div className={cls}>
      {children}
    </div>
  );
}

NormalItem.propTypes = {
  className: PropsTypes.string,
  children: PropsTypes.object
};

NormalItem.defaultProps = {
  className: '',
  children: null
};

NormalItem.Switch = SwitchItem;
NormalItem.Line = LineItem;

export default NormalItem;
