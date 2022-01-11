import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type IconFieldProps = {
  icon?: React.ReactNode;
  className?: string;
  title?: string;
};
const IconField: React.SFC<IconFieldProps> = (props) => {
  return (
    <div className={classnames(styles.wrapper, props.className)}>
      <div className={styles.content} title={props.title} data-sign="iconField">
        {props.children}
      </div>
      <div className={styles.iconHolder}>
        <div className={styles.icon}>{props.icon}</div>
      </div>
    </div>
  );
};
IconField.defaultProps = {
  title: null,
};
export default IconField;
